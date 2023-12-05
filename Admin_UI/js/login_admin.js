async function login(e) {
	e.preventDefault();
	let username = $("#username").val();
	let password = $("#password").val();
	let remember = $("#remember").is(":checked");
	try {
		console.log(username, password);
		await $.ajax("http://localhost:3001/admin/login", {
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify({
				username: username,
				password: password,
				// remember: remember
			}),
			success: function (data) {
				Cookies.set("accessToken", data["accessToken"]);
				for (const key in data["admin"])
					Cookies.set(key, data["admin"][key]);
				window.location.href = "home_admin.html";
			},
			error: function (err) {},
		});
	} catch (error) {
		console.log(error);
	}
}

$(document).ready(function () {
	$("form").submit(login);
});
