const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, passwordConfirm]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, passwordConfirm);
});

function checkRequired(inputArr) {
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i].value.trim() === "") {
      isRequired = true;
      const label = inputArr[i].previousElementSibling;
      showError(inputArr[i], `${label.innerText}不能为空`);
    } else {
      showSuccess(inputArr[i]);
    }
  }
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function checkLength(input, min, max) {
  const label = input.previousElementSibling;
  if (input.value.length < min) {
    showError(input, `${label.innerText}的长度不能小于${min}`);
  } else if (input.value.length > max) {
    showError(input, `${label.innerText}的长度不能大于${max}`);
  } else {
    showSuccess(input);
  }
}

function checkEmail(input){
  const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(reg.test(input.value.trim())){
    showSuccess(input);
  }else{
    showError(input,"邮箱格式不正确");
  }
}

function checkPasswordsMatch(p1,p2){
  if(p1.value===p2.value){
    showSuccess(p2);
  }else{
    showError(p2,"两次输入的密码不相等");
  }
}
