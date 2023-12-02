let resetinput = async function(res){
    $(".changable>input").css('color','black')
    $("#location>input").val(res.ViTri)
    $("#status>input").val(res.TinhTrang)
    $("#type_printer>input").val(res.Kieu)
    $("#speed>input").val(res.TocDoIn )
    $("#memory>input").val(res.BoNho )
    
    // $("#resolution>input").val(res.D)
    $("#support_color>input").val((res.InMau)?"Có":"Không")
    if (res.InMau){
        $("#yes").prop("checked",true)
    } else {
        $("#no").prop("checked",true)
    }
    $("#capacity>input").val(res.KhayGiay)
    $("#ink>input").val(res.LoaiMuc)
    $("#watt>input").val(res.CongSuat)
    $("#weight>input").val(res.TrongLuong)
    $("#shape>input").val(res.KichThuoc)

    }

function updateInfo(res) {
    $("#firm-name").html(res.Hang)
    $("#printer_id").html(res.ID)
    $("#printer_model").html(res.Model)
    $("#location>span").html(res.ViTri)
    $("#status>span").html((res.TinhTrang=="Working")?"Kích hoạt":"Vô hiệu hóa")
    $("#type_printer>span").html(res.Kieu)
    $("#speed>span").html(res.TocDoIn )
    $("#memory>span").html(res.BoNho )
    $("#shape>span").html(res.KichThuoc)
    $("#capacity>span").html(res.KhayGiay)
    $("#ink>span").html(res.LoaiMuc)
    $("#watt>span").html(res.CongSuat)
    $("#support_color>span").html((res.InMau)?"Có":"Không")
    $("#weight>span").html(res.TrongLuong )
}
async function getPrinterHistory(begin,end,printerID){
    begin = parseInt(begin);
    end = parseInt(end);
    if (begin<0) begin=0;
    if (end<=0) end=6;
    let res = await (await fetch(`http://localhost:3001/history/printer/${printerID}`)).json();
    $('.totalPrint').html(res.length);
    $('.start-day').html(`(tính từ ${dateProcess(res[res.length-1].ThoiGian)})`);
    $('tbody').html('');
    if (begin == res.length) begin = res.length -6;
    else if (begin >= res.length) begin = res.length - res.length%6;
    end = Math.min(end,res.length);
    for (var i=begin;i<end;i++){
        let data = res[i];
        let row = $('<tr class="my-2"></tr>'); 
        row.append($(`
            <td>${data.NguoiDung}<br>
            <footer class="Montserrat-500 text-secondary">${data.IDNguoiDung}</footer>
            </td>`
        ));
        row.append($(`
            <td>${dateProcess(data.ThoiGian)}<br>
            <footer class="Montserrat-500 text-secondary">${timeProcess(data.ThoiGian)}</footer>
            </td>
        `));
        row.append($(`
            <td>${data.SoTrang}<br>
            <footer class="Montserrat-500 text-secondary">${data.LoaiGiay}</footer>
            </td>
        `));
        row.append($(`<td>${data.TenTaiLieu}</td>`))
        row.append($(`
        <td class="d-flex justify-content-center align-items-center">
            <span class='text-center ${{"Hoàn Thành":'successStatus',"Đang In":'inprogressStatus',"Chờ Xử Lý":'waitingStatus',"Thất bại":'failingStatus'}[data.TinhTrang]} w-100 rounded'>${data.TinhTrang}<span>
        </td>`))
        $('tbody').append(row);
    }
    $('#pageNumber').val(parseInt(begin/6)+1);
    return parseInt(begin/6)+1;
}
$(document).ready(async function(){
    let printerID = (new URLSearchParams(window.location.search)).get('printerid')
    let res = await (await fetch(`http://localhost:3001/printers/${printerID}`)).json()
    updateInfo(res)
    let currPage=1;
    await resetinput(res)
    $("#reset").click(async ()=>{
        await resetinput(res)}
    )

    $("#submit").click(async function(){
        let data = {
            'KhayGiay' : escapeHtml($("#capacity>input").val()),
            'LoaiMuc' : escapeHtml($("#ink>input").val()),
            'ViTri' : escapeHtml($("#location>input").val()),
            'TinhTrang' : escapeHtml($("#status>span").text() == 'Kích hoạt' ? 'Working' : 'Disabled'),
            'InMau' : $("#yes").is(":checked"),
            'CongSuat' : escapeHtml($("#watt>input").val()),
            'TrongLuong' : escapeHtml($("#weight>input").val()),
            'Kieu' : escapeHtml($("#type_printer>input").val()),
            'TocDoIn' : escapeHtml($("#speed>input").val()),
            'KichThuoc' : escapeHtml($("#shape>input").val()),
            'BoNho' : escapeHtml($("#memory>input").val()),
            'AnhMayIn' : 'https://s3.pricemestatic.com/Large/Images/RetailerProductImages/StRetailer1450/rp_39470408_0021477728_l.png',
            'DoPhanGiai' : escapeHtml($("#resolution>span").text()),
        }
        let preprocessedInput = preprocessInput(...["TocDoIn", "BoNho", "DoPhanGiai", "KhayGiay", "CongSuat", "TrongLuong", "KichThuoc"].map(key=> data[key]))
        for (let i = 0;i<preprocessedInput.length;i++){
            let key = ["TocDoIn", "BoNho", "DoPhanGiai", "KhayGiay", "CongSuat", "TrongLuong", "KichThuoc"];
            data[key[i]] = preprocessedInput[i];
        }
        let valid = validateInput(...preprocessedInput)
        if (!valid){
            showToast('failToast',"Thông tin không hợp lệ")
        } else {
            try {
                let id = $('#printer_id').text()
                let res = await fetch(`http://localhost:3001/printers/${id}`, {
                    method:'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                let temp = await res.json()
                res = await (await fetch(`http://localhost:3001/printers/${id}`)).json()
                $('#editmode').click()
                updateInfo(res)
                if (temp.message=="Printer saved successfully") {
                    showToast('successToast',"Máy in đã được cập nhật thông tin")
                } else {
                    showToast('failToast',"Cập nhật không thành công")
                }
            } catch(err){
                console.log(err)
                showToast('failToast',"Có lỗi xảy ra")
            }
        }
    })

    $('.back').click(function(){
        window.location.href = 'printer_management.html'
    })
    
    $('#editmode').click(function(){
        $('.changable>span').prop('hidden',this.checked)
        $('.change-detail').prop('hidden',!this.checked)
        $("#submit").prop('disabled',!this.checked)
        $("#reset").prop('disabled',!this.checked)
        $('.btn-check').click(function(){
            $('.btn-check').not(this).prop('checked',!this.checked)
        })
    })

    $('.form-control').change(async function(){
        $(this).css('color','red')
    })  
    $('#showPrinterHistory').click(async function(){
        $('.printer-detail').prop('hidden',true);
        $('.printer-history').prop('hidden',false);
        try {
            currPage = await getPrinterHistory(0,6,printerID);
            $('.pagination-row').prop('hidden',false);
        } catch(err){
            $('.pagination-row').prop('hidden',true);
            $('#export').prop('hidden',true);
        }
    })
    $('#showPrinterDetail').click(async function(){
        $('.printer-history').prop('hidden',true);
        $('.printer-detail').prop('hidden',false);
        let res = await (await fetch(`http://localhost:3001/printers/${printerID}`)).json()
        updateInfo(res)
    })
    $('#nextPage').click(async function(){
        currPage = await getPrinterHistory(currPage*6,currPage*6+6,printerID);
    })
    $('#previousPage').click(async function(){
        console.log(currPage)
        currPage = await getPrinterHistory(currPage*6 -12, currPage*6-6,printerID);
    })
    $('#gotoPage').click(async function(){
        let pagenumber = $('#pageNumber').val();
        currPage = await getPrinterHistory(pagenumber*6-6,pagenumber*6,printerID);
    })
    $('#pageNumber').keydown(function(e){
        if (e.which == 13 && !$('.printer-history').is(":hidden")){
            $('#gotoPage').click();
        }
    });

})