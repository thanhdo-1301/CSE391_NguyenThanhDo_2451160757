const nameInput=
document.querySelector("#name");

const emailInput=
document.querySelector("#email");

const passwordInput=
document.querySelector("#password");

const confirmInput=
document.querySelector("#confirm");

const phoneInput=
document.querySelector("#phone");

const submitBtn=
document.querySelector("#submitBtn");

const form=
document.querySelector("#registerForm");

const state={

name:false,
email:false,
password:false,
confirm:false,
phone:false

};


nameInput.addEventListener(
"input",
validateName
);

emailInput.addEventListener(
"input",
validateEmail
);

passwordInput.addEventListener(
"input",
validatePassword
);

confirmInput.addEventListener(
"input",
validateConfirm
);

phoneInput.addEventListener(
"input",
validatePhone
);



function validateName(){

const value=
nameInput.value.trim();

const status=
document.querySelector(
"#nameStatus"
);

if(
value.length>=2
&&
value.length<=50
){

status.textContent="✅";

state.name=true;

}
else{

status.textContent="❌";

state.name=false;

}

checkSubmit();

}


function validateEmail(){

const regex=
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const error=
document.querySelector(
"#emailError"
);

if(
regex.test(
emailInput.value
)
){

error.textContent="";

state.email=true;

}
else{

error.textContent=
"Email không hợp lệ";

state.email=false;

}

checkSubmit();

}


function validatePassword(){

const value=
passwordInput.value;

const bar=
document.querySelector(
"#strengthBar"
);

const text=
document.querySelector(
"#passwordText"
);

let strength=0;

if(
value.length>=8
)
strength++;

if(
/[A-Za-z]/.test(value)
&&
/\d/.test(value)
)
strength++;

if(
/[A-Z]/.test(value)
&&
/[a-z]/.test(value)
&&
/\d/.test(value)
&&
/[^A-Za-z0-9]/.test(value)
)
strength++;

if(strength===1){

bar.style.width="33%";
bar.style.background="red";

text.textContent=
"Yếu";

state.password=false;

}

else if(
strength===2
){

bar.style.width="66%";
bar.style.background="orange";

text.textContent=
"Trung bình";

state.password=true;

}

else if(
strength===3
){

bar.style.width="100%";
bar.style.background="green";

text.textContent=
"Mạnh";

state.password=true;

}
else{

bar.style.width="0%";

text.textContent="";

state.password=false;
}

validateConfirm();

checkSubmit();

}



function validateConfirm(){

const error=
document.querySelector(
"#confirmError"
);

if(
confirmInput.value===
passwordInput.value
&&
confirmInput.value!==""
){

error.textContent=
"";

state.confirm=true;

}
else{

error.textContent=
"Mật khẩu không khớp";

state.confirm=false;

}

checkSubmit();

}


function validatePhone(){

let value=
phoneInput.value
.replace(/\D/g,"");

value=
value.substring(0,10);

if(
value.length>4
){

value=
value.slice(0,4)
+"-"+
value.slice(4);

}

if(
value.length>8
){

value=
value.slice(0,9)
+"-"+
value.slice(9);

}

phoneInput.value=
value;

const error=
document.querySelector(
"#phoneError"
);

if(
value.replace(/-/g,"")
.length===10
){

error.textContent="";

state.phone=true;

}
else{

error.textContent=
"Phải đủ 10 số";

state.phone=false;

}

checkSubmit();

}



function checkSubmit(){

submitBtn.disabled=
!(
state.name
&&
state.email
&&
state.password
&&
state.confirm
&&
state.phone
);

}


form.addEventListener(
"submit",
e=>{

e.preventDefault();

const modal=
document.createElement(
"div"
);

modal.style=
`
position:fixed;
inset:0;
background:rgba(0,0,0,.5);

display:flex;

justify-content:center;
align-items:center;
`;

modal.innerHTML=`

<div style="
background:white;
padding:30px;
border-radius:10px;
width:350px;
">

<h2>
Đăng ký thành công!
</h2>

<p>
Tên:
${nameInput.value}
</p>

<p>
Email:
${emailInput.value}
</p>

<p>
Phone:
${phoneInput.value}
</p>

<button id="close">
Close
</button>

</div>

`;

document.body.append(
modal
);

modal.addEventListener(
"click",
e=>{

if(
e.target.id==="close"
||
e.target===modal
){

modal.remove();

}

}
);

});