let currPage;
/*
This function is to get printer data from the server
*/
async function getPrinterInfo(){
    // implement
    let tmp = await fetch('http://localhost:3001/printers');
    let res = await tmp.json();
    let condition = $('#search_bar').val().toLowerCase()
    let mask = await Promise.all(await res.map(async function(data){
        return data.Model.toLowerCase().includes(condition)||data.ID.toLowerCase().includes(condition)
    }));
    // console.log(res.filter((item, i) => mask[i]))
    return res.filter((item, i) => mask[i])
}

/*
this play general 
*/
async function displayPrinterInfo(begin,end){
    let printerInfo = await getPrinterInfo()
    begin = parseInt(begin);
    end = parseInt(end);
    if (begin<0) begin=0;
    if (end<=0) end=6;
    if (begin == printerInfo.length) begin = printerInfo.length -6;
    else if (begin > printerInfo.length) begin = printerInfo.length - printerInfo.length%6;
    end = Math.min(end,printerInfo.length);
    $("tbody").html('')
    if (printerInfo.length == 0) return 1;
    for (let printer=begin;printer<end;printer++){
        let row = `
            <tr id="row${printer}">
            <td scope="col pt-0" class="checkSingle">
                <input class="form-check-input" type="checkbox" value="-1" id="printer${printer}">
            </td>
            <td scope="col pt-0" class="printer_list_data">
            ${Number(printer)+1}
            </td>
            <td scope="col pt-0" class="printer_list_data">
            ${printerInfo[printer].Model}
            </td>
            <td scope="col pt-0" class="printer_list_data" id="${printerInfo[printer].ID}">
            ${printerInfo[printer].ID}
            </td>
            <td scope="col pt-0" class="printer_list_data">
            ${printerInfo[printer].ViTri}
            </td>
            <td scope="col pt-0" class="printer_list_data text-center">
                <span class="${(printerInfo[printer].TinhTrang == 'Working')?'enable':'disable'} px-2">
                ${(printerInfo[printer].TinhTrang == 'Working')?'Hoạt động':'Vô hiệu hóa'}
                </span>
            </td>
            <td scope="col pt-0 my-0 p-0" class="text-center">
            <a href="printer_detail.html?printerid=${printerInfo[printer].ID}" class="btn p-0 border-0">
                <img src="image/admin_printer/info.png" alt="info" class="infoPrinterBtn" id="info${printer}">
            </a> 
            <button class="btn p-0 border-0" type="button" onclick="deletePrinter('${printerInfo[printer].ID}')">   
                <img src="image/admin_printer/delete.png" alt="del" class="delPrinterBtn" id="del${printerInfo[printer].ID}">
            </button>
            </td>
            <td scope="col pt-0">
            <div class="form-check form-switch p-0 m-0 toggle-status">
                <input class="form-check-input toggle_status w-50" type="checkbox" value=1 role="switch" id="toggle${printerInfo[printer].ID}"${(printerInfo[printer].TinhTrang=="Working")?" checked":""} onchange="toggleStatus('${printerInfo[printer].ID}')">
            </div>
            </td>
            </tr>
        `
        $('tbody').append(row)
        if (printerInfo[printer].TinhTrang == 'Disabled'){
            let rowid = "#row"+printer
            $(rowid).css('color','#B2BEC3')
        }
    }
    $('#pageNumber').val(parseInt(begin/6)+1)
    return parseInt(begin/6)+1
}
async function toggleStatus(id){
    fetch(`http://localhost:3001/printers/${id}/status`,{method:"PUT"})
    .then(res=>res.json())
    .then(async data => {
        showToast('successToast',"Thay đổi trạng thái thành công")
        $('tbody').html('')
        currPage=await displayPrinterInfo(currPage*6-6,currPage*6)
    })
    .catch(err => {
        showToast('failToast',"Thay đổi trạng thái thất bại")
    })

}
async function deletePrinter(id){
    $.ajax({
        url:`http://localhost:3001/printers/${id}`,
        type:'DELETE',
        success: async function(msg){
            console.log(msg)
            if (msg.message == "Printer deleted successfully"){
                showToast('successToast',"Máy in đã được xóa")
                $('tbody').html('')
                currPage=await displayPrinterInfo(currPage*6-6,currPage*6)
            } else {
                console.log(msg)
                showToast('failToast',"Xóa máy in không thành công")
            }
        },
        error: function(){
            showToast('failToast',"Xóa máy in không thành công");
        }   
    });
}
$(document).ready(async function() {
    $('#menu').html(getMenuContent())
    $('#account_bar').html(getAccountBarContent())
    $('#printer_management_button').css("background-color","#C8C2F2")
    $('#logo').click(function(){
        window.location.href = "home_admin.html"
    })
    currPage=await displayPrinterInfo(0,6)
    $('#checkAll').click(function(){
        $('.checkSingle>input').not(this).prop('checked', this.checked)
    })

    $(".checkSingle>input").click(function () {
        if ($('.checkSingle>input:checked').length == $('.checkSingle>input').length){
            $('#checkAll').prop('checked',true);
        } else{
            $('#checkAll').prop('checked',false);
        }
    });

    $('.btn-check').click(function(){
        $('.btn-check').not(this).prop('checked',!this.checked)
    })
    $('#upload-image>button').click(function() {
        
    })

    $('form').submit(function (e) {
        e.preventDefault()

        let data = {
            'ID': 'MI0099',
            'Hang' : escapeHtml(e.target['firm'].value),
            'Model': escapeHtml($("#model>input").val()),
            'KhayGiay' : escapeHtml($("#capacity>input").val()),
            'LoaiMuc' : escapeHtml($("#ink>input").val()),
            'ViTri' :escapeHtml($("#location>input").val()),
            'TinhTrang' : escapeHtml($("#status>span").text() == 'Kích hoạt' ? 'Working' : 'Disabled'),
            'InMau' : $("#yes").is(":checked"),
            'CongSuat' : escapeHtml($("#watt>input").val()),
            'TrongLuong' : escapeHtml($("#weight>input").val()),
            'Kieu' : escapeHtml($("#type_printer>input").val()),
            'TocDoIn' : escapeHtml($("#speed>input").val()),
            'KichThuoc' : escapeHtml($("#shape>input").val()),
            'BoNho' : escapeHtml($("#memory>input").val()),
            'AnhMayIn' : 'https://s3.pricemestatic.com/Large/Images/RetailerProductImages/StRetailer1450/rp_39470408_0021477728_l.png',
            'DoPhanGiai' : escapeHtml($("#resolution>input").val()),
        }
        let preprocessedInput = preprocessInput(...["TocDoIn", "BoNho", "DoPhanGiai", "KhayGiay", "CongSuat", "TrongLuong", "KichThuoc"].map(key=> data[key]))
        for (let i = 0;i<preprocessedInput.length;i++){
            let key = ["TocDoIn", "BoNho", "DoPhanGiai", "KhayGiay", "CongSuat", "TrongLuong", "KichThuoc"];
            data[key[i]] = preprocessedInput[i];
        }
        let valid = validateInput(...preprocessedInput)
        if (!valid) {
            showToast('failToast',"Thông tin không hợp lệ");
            return;
        } else {
        $.ajax({
            url: 'http://localhost:3001/printers/',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: async function(msg){
                console.log(msg);
                if (msg.message == "Printer added successfully"){
                    showToast('successToast',"Thêm máy in thành công")
                    $('tbody').html('')
                    $('.cancel-form').click()
                    currPage=await displayPrinterInfo(0,6)
                } else {
                    showToast('failToast',"Thêm máy in thấy bại")
                }
            },
            error: function(){
                showToast('failToast',"Thêm máy in thất bại")
            }
        })
    }
    })
    $('#nextPage').click(async function(){
        currPage = await displayPrinterInfo(currPage*6,currPage*6+6);
    })
    $('#previousPage').click(async function(){
        currPage = await displayPrinterInfo(currPage*6 -12, currPage*6-6);
    })
    $('#gotoPage').click(async function(){
        let pagenumber = $('#pageNumber').val();
        currPage = await displayPrinterInfo(pagenumber*6-6,pagenumber*6);
    })
    $('#pageNumber').keydown(function(e){
        if (e.which == 13){
            $('#gotoPage').click();
        }
    });
    $('#search_bar').on('input',async function(){
        currPage = await displayPrinterInfo(0,6);
    });
});
