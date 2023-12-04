const SIZE = 6;

let queue;

function dateProcess(dateString) {
	let date = new Date(dateString);
	let dd = date.getDate();
	let mm = date.getMonth() + 1;
	let yyyy = date.getFullYear();
	if (dd < 10) dd = "0" + dd;
	if (mm < 10) mm = "0" + mm;
	return dd + "/" + mm + "/" + yyyy;
}

function timeProcess(dateString) {
	let date = new Date(dateString);
	let hh = date.getHours();
	let mm = date.getMinutes();
	let ss = date.getSeconds();
	if (hh < 10) hh = "0" + hh;
	if (mm < 10) mm = "0" + mm;
	if (ss < 10) ss = "0" + ss;
	return hh + ":" + mm + ":" + ss;
}
async function getUserQueue() {
	let res = [];
	try {
		await $.ajax({
			url: `http://localhost:3001/printing/queue/${Cookies.get("ID")}`,
			method: "GET",
			beforeSend: function (request) {
				request.setRequestHeader(
					"Authorization",
					"Bearer: " + Cookies.get("accessToken")
				);
			},
			success: async function (result, status, xhr) {
				res = result;
			},
			error: async function (result, status, xhr) {
				console.log(result);
				console.log(status);
				console.log(xhr);
			},
		});
	} catch {
		await requestToken();
		return getUserQueue();
	}
	return res;
}

async function displayQueue(page) {
	if (queue.length == 0) return;

	while (page * SIZE >= queue.length) page--;
	if (page < 0) page = 0;

	$(".pagination-row").prop("hidden", false);
	$("#queue").removeClass("text-secondary");
	$("#queue").html(
		`<div class="row mb-2 theme-color">
			<div class="col-1"></div>
			<div class="col-5">Tên file</div>
			<div class="col-2">Vị trí</div>
			<div class="col-4"></div>
		</div>`
	);

	let begin = page * SIZE;
	let end = Math.min((page + 1) * SIZE, queue.length);

	for (let i = begin; i < end; i++) {
		let data = queue[i];
		let row = $('<div class="my-1 row text-black"></div>');
		row.append($(`<div class="col-1"></div>`));
		row.append($(`<div class="col-5">${data.TenTaiLieu}</div>`));
		row.append($(`<div class="col-2">${data.SoThuTuHangDoi}</div>`));
		row.append(
			// <img src="./images/user_queue/loading.svg"/>
			$(`
        <div class="col-4 justify-content-center align-items-center">
		${data.TinhTrang}
		
        </div>
		`)
		);
		$("#queue").append(row);
	}

	$("#pageNumber").val(page + 1);
}

$(document).ready(async function () {
	if (!Cookies.get("accessToken")) {
		window.location.href = "user_login.html";
	}

	// Load nav bar
	$("#headerbar").html(await getMenuContent());

	let currPage = 0;
	queue = await getUserQueue();

	await displayQueue(currPage);

	if (queue.length == 0) $(".pagination-row").prop("hidden", true);
	else $(".pagination-row").prop("hidden", false);

	$("#nextPage").click(async function () {
		currPage++;
		await displayQueue(currPage);
	});
	$("#previousPage").click(async function () {
		currPage--;
		await displayQueue(currPage);
	});
	$("#gotoPage").click(async function () {
		currPage = $("#pageNumber").val();
		await displayQueue(currPage);
	});
	$("#pageNumber").keydown(function (e) {
		if (e.which == 13 && !$(".printer-history").is(":hidden")) {
			$("#gotoPage").click();
		}
	});
});
