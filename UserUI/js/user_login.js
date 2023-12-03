async function preprocessedEmail(username) {
	return username.slice(0, username.search("@"));
}
async function login(username, password) {
	let status = { success: false, accessToken: 0, user: 0 };
	try {
		await $.ajax({
			url: "http://localhost:3001/auth/login",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify({
				username: username,
				password: password,
			}),
			success: async function (res) {
				status["success"] = true;
				status["accessToken"] = res.accessToken;
				status["user"] = res.user;
			},
			error: async function (err) {
				console.log(err);
			},
		});
	} catch (err) {}
	return status;
}

$(document).ready(async function () {
	if (Cookies.get("accessToken")) window.location.href = "user_home.html";
	$("#login").click(async function (e) {
		let username = $("#username").val();
		let password = $("#password").val();
		username = await preprocessedEmail(username);
		let loginStatus = await login(username, password);
		if (loginStatus["success"]) {
			console.log(loginStatus);
			Cookies.set("accessToken", loginStatus["accessToken"]);
			for (key in loginStatus["user"]) {
				Cookies.set(key, loginStatus["user"][key]);
			}
			window.location.href = "user_home.html";
		}
	});
	$(document).keydown(function (e) {
		if (e.which == 13) {
			$("#login").click();
		}
	});
});
const $password = document.querySelector("#passid");
const $toggler = document.querySelector("i");

const showHidePassword = () => {
	if ($password.getAttribute("type") === "password") {
		$password.setAttribute("type", "text");
	} else {
		$password.setAttribute("type", "password");
	}

	$toggler.classList.toggle("fa-eye");
	$toggler.classList.toggle("fa-eye-slash");
};

$toggler.addEventListener("click", showHidePassword);
