function showSuccessToast(){
    let toast = new bootstrap.Toast($('#successToast'))
    toast.show()
}

$(document).ready(function(){
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
    $(document).keydown(function(e){
        if (e.key=='s') {
            showSuccessToast()
        }
    })
})