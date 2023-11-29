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
