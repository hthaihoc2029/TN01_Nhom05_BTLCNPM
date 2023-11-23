/*
This function is to get printer data from the server
*/
function getPrinterInfo(){
    // implement
    return {0:{'ID':'0001','model':'aaaa','location':"H1",'status':1},1:{'ID':'0002','model':'aaaa','location':"H6",'status':0}};
}

/*
this play general 
*/
function displayPrinterInfo(begin,end){
    let printerInfo =getPrinterInfo()
    for (printer in printerInfo){
        let row = `
            <tr id="row${printer}">
            <td scope="col pt-0" class="checkSingle">
                <input class="form-check-input" type="checkbox" value="-1" id="printer${printer}">
            </td>
            <td scope="col pt-0" class="printer_list_data">
            ${Number(printer)+1}
            </td>
            <td scope="col pt-0" class="printer_list_data">
            ${printerInfo[printer].model}
            </td>
            <td scope="col pt-0" class="printer_list_data" id="${printerInfo[printer].ID}">
            ${printerInfo[printer].ID}
            </td>
            <td scope="col pt-0" class="printer_list_data">
            ${printerInfo[printer].location}
            </td>
            <td scope="col pt-0" class="printer_list_data text-center">
                <span class="${(printerInfo[printer].status)?'enable':'disable'} px-2">
                ${(printerInfo[printer].status)?'Hoạt động':'Vô hiệu hóa'}
                </span>
            </td>
            <td scope="col pt-0 my-0 p-0" class="text-center">
                <img src="image/admin_printer/info.png" alt="info" class="infoPrinterBtn" id="info${printer}">
                <img src="image/admin_printer/delete.png" alt="del" class="delPrinterBtn" id="del${printer}">
            </td>
            <td scope="col pt-0">
            <div class="form-check form-switch p-0 m-0">
                <input class="form-check-input toggle_status w-50" type="checkbox" role="switch" id="toggle${printer}"${(printerInfo[printer].status)?" checked":""}>
            </div>
            </td>
            </tr>
        `
        $('tbody').append(row)
        if (printerInfo[printer].status == 0){
            let rowid = "#row"+printer
            $(rowid).css('color','#B2BEC3')
        }
    }
}

function showSuccessToast(){
    let toast = new bootstrap.Toast($('#successToast'))
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

    $('.infoPrinterBtn').click(function (){
        let rowID = 'row'+this.id.slice(4)
        let printerId = $('#'+rowID+'>td')[3].id
        window.location.href='printer_detail.html?printerid='+printerId
    })

    $(document).keydown(function(e){
        if (e.key=='s') {
            showSuccessToast()
        }
    })
});
