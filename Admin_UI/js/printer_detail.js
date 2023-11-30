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

$(document).ready(async function(){
    let printerID = (new URLSearchParams(window.location.search)).get('printerid')
    let res = await (await fetch(`http://localhost:3001/printers/${printerID}`)).json()
    updateInfo(res)
    // $("#resolution>span").html(res.D)
    
    await resetinput(res)
    $("#reset").click(async ()=>{
        await resetinput(res)}
    )

    $("#submit").click(async function(){
        let data = {
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

    $('.form-control').change(function(){
        $(this).css('color','red')
    })
    
    
})