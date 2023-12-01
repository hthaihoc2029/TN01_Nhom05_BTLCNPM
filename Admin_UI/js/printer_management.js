/*
This function is to get printer data from the server
*/
async function getPrinterInfo(){
    // implement
    let tmp = await fetch('http://localhost:3001/printers');
    let res = await tmp.json();
    return res
}

/*
this play general 
*/
async function displayPrinterInfo(begin,end){
    let printerInfo = await getPrinterInfo()
    for (let printer=0;printer<printerInfo.length;printer++){
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
}
function toggleStatus(id){
    fetch(`http://localhost:3001/printers/${id}/status`,{method:"PUT"})
    .then(res=>res.json())
    .then(data => {
        showToast('successToast',"Thay đổi trạng thái thành công")
        $('tbody').html('')
        displayPrinterInfo(0,10)
    })
    .catch(err => {
        showToast('failToast',"Thay đổi trạng thái thất bại")
    })

}
function deletePrinter(id){
    $.ajax({
        url:`http://localhost:3001/printers/${id}`,
        type:'DELETE',
        success: function(msg){
            console.log(msg)
            if (msg.message == "Printer deleted successfully"){
                showToast('successToast',"Máy in đã được xóa")
                $('tbody').html('')
                displayPrinterInfo(0,10)
            } else {
                console.log(msg)
                showToast('failToast',"Xóa máy in không thành công")
            }
        },
        error: function(){
            showToast('failToast',"Xóa máy in không thành công")
        }   
    });
}
$(document).ready(function() {
    $('#menu').html(getMenuContent())
    $('#account_bar').html(getAccountBarContent())
    $('#printer_management_button').css("background-color","#C8C2F2")
    $('#logo').click(function(){
        window.location.href = "home_admin.html"
    })
    
    displayPrinterInfo(0,10)
    $('.delPrinterBtn').click(function(){
        console.log(1)
    })
    $('#checkAll').click(function(){
        $('.checkSingle>input').not(this).prop('checked', this.checked)
    })

    $(".checkSingle>input").click(function () {
        if ($('.checkSingle>input:checked').length == $('.checkSingle>input').length){
            console.log()
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
            success: function(msg){
                console.log(msg);
                if (msg.message == "Printer added successfully"){
                    showToast('successToast',"Thêm máy in thành công")
                    $('tbody').html('')
                    $('.cancel-form').click()
                    displayPrinterInfo(0,10)
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
});
