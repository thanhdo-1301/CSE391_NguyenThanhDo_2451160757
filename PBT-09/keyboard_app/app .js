const images=[

"https://placehold.co/600x350?text=1",
"https://placehold.co/600x350?text=2",
"https://placehold.co/600x350?text=3",
"https://placehold.co/600x350?text=4",
"https://placehold.co/600x350?text=5",
"https://placehold.co/600x350?text=6",
"https://placehold.co/600x350?text=7",
"https://placehold.co/600x350?text=8",
"https://placehold.co/600x350?text=9"

];

const commands=[

"Home",
"Settings",
"Gallery",
"Dark Mode",
"Profile",
"Help"

];

let currentIndex=0;
let slideshow=null;

createLayout();

function createLayout(){

const app=document.querySelector(
"#app"
);

app.innerHTML=`

<div class="gallery">

<h1>
Keyboard Gallery
</h1>

<img
id="galleryImage"
src="${images[0]}"
aria-label="Gallery image"
>

<div class="info">

<p>
← → : Change image
</p>

<p>
1-9 : Jump image
</p>

<p>
Space : Play/Pause
</p>

<p>
Ctrl+K : Command Palette
</p>

</div>

<button
aria-label="Previous image"
id="prevBtn">

Previous

</button>

<button
aria-label="Next image"
id="nextBtn">

Next

</button>

</div>


<div
id="commandModal"
class="command-overlay hidden">

<div
class="command-box">

<input

id="commandInput"

aria-label=
"Command search"

placeholder=
"Type command..."

>

<div id="commandList">

</div>

</div>

</div>

`;

renderCommands(commands);

bindEvents();

}


function renderImage(){

document
.querySelector(
"#galleryImage"
)
.src=
images[currentIndex];

}


function nextImage(){

currentIndex++;

if(
currentIndex>=images.length
){

currentIndex=0;

}

renderImage();

}


function previousImage(){

currentIndex--;

if(
currentIndex<0
){

currentIndex=
images.length-1;

}

renderImage();

}


function toggleSlideshow(){

if(slideshow){

clearInterval(
slideshow
);

slideshow=null;

return;

}

slideshow=
setInterval(
nextImage,
2000
);

}



function renderCommands(data){

const list=
document.querySelector(
"#commandList"
);

list.textContent="";

data.forEach(cmd=>{

const div=
document.createElement(
"div"
);

div.className=
"command-item";

div.tabIndex=0;

div.textContent=
cmd;

div.setAttribute(
"aria-label",
cmd
);

list.append(div);

});

}


function openPalette(){

const modal=
document.querySelector(
"#commandModal"
);

modal.classList.remove(
"hidden"
);

document
.querySelector(
"#commandInput"
)
.focus();

}


function closePalette(){

document
.querySelector(
"#commandModal"
)
.classList.add(
"hidden"
);

}


function bindEvents(){

document
.querySelector(
"#nextBtn"
)
.addEventListener(
"click",
nextImage
);

document
.querySelector(
"#prevBtn"
)
.addEventListener(
"click",
previousImage
);

document
.addEventListener(
"keydown",
e=>{

if(
e.ctrlKey
&&
e.key==="k"
){

e.preventDefault();

openPalette();

return;

}


if(
e.key==="ArrowRight"
){

nextImage();

}

if(
e.key==="ArrowLeft"
){

previousImage();

}

if(
e.key===" "
){

e.preventDefault();

toggleSlideshow();

}

if(
e.key==="Escape"
){

closePalette();

}

if(
/^[1-9]$/
.test(
e.key
)
){

const index=
Number(
e.key
)-1;

if(
index<
images.length
){

currentIndex=
index;

renderImage();

}

}

});


document
.querySelector(
"#commandInput"
)
.addEventListener(
"input",
e=>{

const value=
e.target.value
.toLowerCase();

const filtered=
commands.filter(
c=>

c
.toLowerCase()
.includes(
value
)

);

renderCommands(
filtered
);

});


document
.querySelector(
"#commandList"
)
.addEventListener(
"click",
e=>{

if(
e.target.classList
.contains(
"command-item"
)
){

alert(
"Selected: "+
e.target.textContent
);

closePalette();

}

});

document
.querySelector(
"#commandInput"
)
.addEventListener(
"keydown",
e=>{

if(
e.key==="Enter"
){

const first=
document.querySelector(
".command-item"
);

if(first){

alert(
"Selected: "+
first.textContent
);

closePalette();

}

}

});

}