$(document).ready(function () {
	$("#headerbar").html(getMenuContent());

	$(".btn-pr").click(function () {
		location.href = "./user_service.html";
	});
});
