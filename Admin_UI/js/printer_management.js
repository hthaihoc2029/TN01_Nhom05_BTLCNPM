/*
This function is to get printer data from the server
*/
async function getPrinterInfo(){
    // implement
    let tmp = await fetch('http://localhost:3001/printers');
    let res = await tmp.json();
    // .then(
    //     (res) => res.json()
    // )
    // .then((data) => {
    //     res = data;
    //     console.log(res)
    // })
    // return [{'ID':'0001','model':'aaaa','location':"H1",'status':1},{'ID':'0002','model':'aaaa','location':"H6",'status':0}];
    console.log(res)
    return res
}

/*
this play general 
*/
async function displayPrinterInfo(begin,end){
    let printerInfo = await getPrinterInfo()
    // console.log(printerInfo)
    // $("tbody").html('')
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
            <a href="printer_detail.html?printerid=${printerInfo[printer].ID}">
                <img src="image/admin_printer/info.png" alt="info" class="infoPrinterBtn" id="info${printer}">
            </a>    
                <img src="image/admin_printer/delete.png" alt="del" class="delPrinterBtn" id="del${printer}">
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
        showSuccessToast()
        $('tbody').html('')
        displayPrinterInfo(0,10)
    })
    .catch(err => {
        showFailToast()
    })
    
}
function showSuccessToast(){
    let toast = new bootstrap.Toast($('#successToast'))
    toast.show()
}
function showFailToast(){
    let toast = new bootstrap.Toast($('#failToast'))
    toast.show()
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

    $(document).keydown(function(e){
        if (e.key=='s') {
            showSuccessToast()
        } else if (e.key=='f'){
            showFailToast()
        }
    })
    $('.btn-check').click(function(){
        $('.btn-check').not(this).prop('checked',!this.checked)
    })
    $('#toggleMI0001').click(function(){
        console.log(1)
    })

    $('#upload-image>button').click(function() {
        
    })

    $('form').submit(function (e) {
        e.preventDefault()

        let data = {
            'Hang' : e.target['firm'].value,
            'KhayGiay' : $("#capacity>input").val(),
            'LoaiMuc' : $("#ink>input").val(),
            'ViTri' : $("#location>input").val(),
            'TinhTrang' : $("#status>span").text() == 'Kích hoạt' ? 'Working' : 'Disabled',
            'InMau' : $("#yes").is(":checked"),
            'CongSuat' : $("#watt>input").val(),
            'TrongLuong' : $("#weight>input").val(),
            'Kieu' : $("#type_printer>input").val(),
            'TocDoIn' : $("#speed>input").val(),
            'KichThuoc' : $("#shape>input").val(),
            'BoNho' : $("#memory>input").val(),
            'AnhMayIn' : 'https://s3.pricemestatic.com/Large/Images/RetailerProductImages/StRetailer1450/rp_39470408_0021477728_l.png',
            'DoPhanGiai' : $("#resolution>span").text(),
        }

        for (let index = 0; index < e.target.length; index++) {
            // const element = array[index];
            console.log(index, e.target[index])
            
        }
        console.log(e.target['firm'].value)
    })
});
