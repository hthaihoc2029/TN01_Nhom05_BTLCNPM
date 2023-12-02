function dateProcess(dateString){
    let date = new Date(dateString);
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    if (dd<10) dd = '0'+dd;
    if (mm<10) mm = '0'+mm;
    return dd+'/'+mm+'/'+yyyy;
}

function timeProcess(dateString){
    let date = new Date(dateString);
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    if (hh<10) hh = '0'+hh;
    if (mm<10) mm = '0' + mm;
    if (ss<10) ss = '0' + ss;
    return hh+":"+mm+":"+ss;
}
async function getUserHistory(){
    let res;
    try {
        await $.ajax({
            url: `http://localhost:3001/history/${Cookies.get('ID')}`,
            method:'GET',
            beforeSend: function(request) {
                request.setRequestHeader("authorization","Bearer: "+Cookies.get('accessToken'));
            },
            success:async function(result,status,xhr){
                res = result
            },
            error:async function(result,status,xhr){
                console.log(result)
                console.log(status)
                console.log(xhr)
            }
        })
    } catch {
        res = []
    }
    return res
}
async function displayHistory(begin,end){
    let res = await getUserHistory()
    $('.totalPrint').html(res.length);
    if (res.length == 0) {
        $('.pagination-row').prop('hidden',true);
        $('#export').prop('hidden',true)
        return 1
    } else {
        $('.pagination-row').prop('hidden',false);
        $('#export').prop('hidden',false)
    }
    $('.start-day').html(`(tính từ ${dateProcess(res[res.length-1]['Thời gian In'])})`);
    $('tbody').html('');
    if (begin<0) begin = 0;
    else if (begin>=res.length) {
        if (res.length%6==0) begin = res.length-6;
        else begin = res.length - res.length%6;
    }
    if (end < 0) end = Math.min(6,res.length);
    else if (end > res.length) end = res.length;
    for (let i = begin;i<end;i++){
        let data = res[i];
        let row = $('<tr class="my-2"></tr>'); 
        row.append($(`
            <td>${data['Máy in']}<br>
            </td>`
        ));
        row.append($(`
            <td>${dateProcess(data['Thời gian In'])}<br>
            <footer class="Montserrat-500 text-secondary">${timeProcess(data['Thời gian In'])}</footer>
            </td>
        `));
        row.append($(`
            <td>${data['Số tờ']}<br>
            <footer class="Montserrat-500 text-secondary">${data['Loại giấy']}</footer>
            </td>
        `));
        row.append($(`<td>${data['Tên tài liệu']}</td>`))
        row.append($(`
        <td class="d-flex justify-content-center align-items-center">
            <span class='text-center ${{"Hoàn Thành":'successStatus',"Đang In":'inprogressStatus',"Chờ Xử Lý":'waitingStatus',"Thất bại":'failingStatus'}[data['Tình trạng']]} w-100 rounded'>${data['Tình trạng']}<span>
        </td>`))
        await $('tbody').append(row);
    }
    $('#pageNumber').val(parseInt(begin/6)+1);
    return parseInt(begin/6)+1;

}   
$(document).ready(async function(){
    if (!Cookies.get('accessToken')){
        window.location.href = 'user_login.html'
    }
    $('#user-name').html(Cookies.get('Ten'));
    $('#user-id').html(Cookies.get('ID'));
    let currPage = 1;
    currPage = await displayHistory(0,6)
    $('#nextPage').click(async function(){
        currPage = await displayHistory(currPage*6,currPage*6+6);
    })
    $('#previousPage').click(async function(){
        currPage = await displayHistory(currPage*6 -12, currPage*6-6);
    })
    $('#gotoPage').click(async function(){
        let pagenumber = $('#pageNumber').val();
        currPage = await displayHistory(pagenumber*6-6,pagenumber*6);
    })
    $('#pageNumber').keydown(function(e){
        if (e.which == 13 && !$('.printer-history').is(":hidden")){
            $('#gotoPage').click();
        }
    });
    $('.back').click(function(){
        window.location.href = 'user_home.html'
    })
})