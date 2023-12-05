const SIZE=5;
let history;
async function getPrintingInfo(){
    let res = [];
    try{
        await $.ajax({
            url:'http://localhost:3001/history/',
            method:'get',
            beforeSend: function (req) {
                req.setRequestHeader(
                    "Authorization",
                    "Bearer: " + Cookies.get("accessToken")
                );
            },
            success: async function (result, status, xhr){
                res = await result;
            },
            error: async function (err) {
                console.log(err)
            }
        })
    } catch(err) {
        console.log(err)
    }
    return res
}

async function displayHistory(page) {
	if (history.length == 0) return;
	$("tbody").html("");

	while (page * SIZE >= history.length) page--;
	if (page < 0) page = 0;

	let begin = page * SIZE;
	let end = Math.min((page + 1) * SIZE, history.length);

	for (let i = begin; i < end; i++) {
		let data = history[i];
		let row = $('<tr class="my-2"></tr>');
		row.append(
			$(`
            <td class="Montserrat">
				${data["Người dùng"]}
				<br>
				<footer class="Montserrat-500 text-secondary">
					${data['ID']}
				</footer>
            </td>
        `)
		);
		row.append(
			$(`
            <td>
				${data["Số lượt in"]}
            </td>
        `)
		);
		row.append(
			$(`
			<td>
				${data["Số lượng giấy đã in"]}
			</td>
			`)
		);
		row.append(
			$(`
			<td>
				<a href="user_history.html?ID=${data['ID']}&name=${data['Người dùng']}" class="bg-theme-color btn">
                xem lịch sử
                </a>
			</td>
			`)
		);
		await $("tbody").append(row);
	}
	$("#pageNumber").val(page + 1);
}

$(document).ready(async function() {
    $('#menu').html(getMenuContent())
    $('#account_bar').html(getAccountBarContent())
    $('#history_button').css("background-color","#C8C2F2")
    $('#logo').click(function(){
        window.location.href = "home_admin.html"
    })
    history= await getPrintingInfo()
    let currPage = 0
    currPage = await displayHistory(currPage)

    $("#nextPage").click(async function () {
		currPage++;
		await displayHistory(currPage);
	});

    $("#previousPage").click(async function () {
		currPage--;
        if (currPage<0) currPage = 1
		await displayHistory(currPage);
	});

	$("#gotoPage").click(async function () {
		currPage = $("#pageNumber").val();
        if (currPage < 0) currPage = 0
		await displayHistory(currPage);
	});

	$("#pageNumber").keydown(function (e) {
		if (e.which == 13 && !$(".printer-history").is(":hidden")) {
			$("#gotoPage").click();
		}
	});
})