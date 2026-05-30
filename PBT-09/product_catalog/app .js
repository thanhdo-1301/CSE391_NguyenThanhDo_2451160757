const products=[

{id:1,name:"iPhone 16",
price:25990000,
category:"phone",
image:"https://placehold.co/200",
rating:4.5,inStock:true},

{id:2,name:"Galaxy S26",
price:22000000,
category:"phone",
image:"https://placehold.co/200",
rating:4.7,inStock:true},

{id:3,name:"MacBook Pro",
price:35000000,
category:"laptop",
image:"https://placehold.co/200",
rating:4.8,inStock:true},

{id:4,name:"Asus ROG",
price:29000000,
category:"laptop",
image:"https://placehold.co/200",
rating:4.6,inStock:true},

{id:5,name:"AirPods",
price:4000000,
category:"accessory",
image:"https://placehold.co/200",
rating:4.3,inStock:true},

{id:6,name:"Sony XM6",
price:8000000,
category:"accessory",
image:"https://placehold.co/200",
rating:4.9,inStock:true},

{id:7,name:"iPad Pro",
price:21000000,
category:"tablet",
image:"https://placehold.co/200",
rating:4.6,inStock:true},

{id:8,name:"Galaxy Tab",
price:17000000,
category:"tablet",
image:"https://placehold.co/200",
rating:4.4,inStock:true},

{id:9,name:"Dell XPS",
price:28000000,
category:"laptop",
image:"https://placehold.co/200",
rating:4.7,inStock:true},

{id:10,name:"Xiaomi 16",
price:14000000,
category:"phone",
image:"https://placehold.co/200",
rating:4.1,inStock:true},

{id:11,name:"Keyboard",
price:1500000,
category:"accessory",
image:"https://placehold.co/200",
rating:4.2,inStock:true},

{id:12,name:"Mouse",
price:800000,
category:"accessory",
image:"https://placehold.co/200",
rating:4.0,inStock:true}

];

let filteredProducts=[...products];
let cartCount=0;

createLayout();

function createLayout(){

const app=document.createElement("div");

app.innerHTML=`

<div class="header">

<h1>Product Catalog</h1>

<div>

<button id="themeBtn">
🌙
</button>

<div class="cart">
🛒
<span class="badge">
0
</span>
</div>

</div>

</div>

<div class="controls">

<input
id="search"
placeholder="Search..."
>

<select id="sort">

<option value="">
Sort
</option>

<option value="low">
Price ↑
</option>

<option value="high">
Price ↓
</option>

<option value="name">
Name A-Z
</option>

<option value="rating">
Rating
</option>

</select>

<div id="categories">
</div>

</div>

<div
id="productGrid"
class="grid">
</div>

`;

document.body.append(app);

renderCategories();
renderProducts(filteredProducts);

bindEvents();

}

function renderCategories(){

const categories=
["all",
...new Set(
products.map(
p=>p.category
)
)];

const box=
document.querySelector(
"#categories"
);

categories.forEach(cat=>{

const btn=
document.createElement(
"button"
);

btn.textContent=cat;

btn.dataset.category=
cat;

box.append(btn);

});

}


function renderProducts(data){

const grid=
document.querySelector(
"#productGrid"
);

grid.textContent="";

data.forEach(product=>{

const card=
document.createElement(
"div"
);

card.className=
"card";

card.dataset.id=
product.id;

const img=
document.createElement(
"img"
);

img.src=
product.image;

const title=
document.createElement(
"h3"
);

title.textContent=
product.name;

const price=
document.createElement(
"p"
);

price.className=
"price";

price.textContent=
product.price
.toLocaleString()
+"đ";

const rating=
document.createElement(
"p"
);

rating.textContent=
"⭐ "+product.rating;

const add=
document.createElement(
"button"
);

add.textContent=
"Thêm giỏ";

add.className=
"add-cart";

card.append(
img,
title,
price,
rating,
add
);

grid.append(card);

});

}

function searchProducts(){

const keyword=
document
.querySelector(
"#search"
)
.value
.toLowerCase();

filteredProducts=
products.filter(p=>
p.name
.toLowerCase()
.includes(keyword)
);

renderProducts(
filteredProducts
);

}

function filterByCategory(cat){

if(cat==="all"){

filteredProducts=
[...products];

}
else{

filteredProducts=
products.filter(
p=>
p.category===cat
);

}

renderProducts(
filteredProducts
);

}

function sortProducts(type){

if(type==="low"){

filteredProducts.sort(
(a,b)=>
a.price-b.price
);

}

if(type==="high"){

filteredProducts.sort(
(a,b)=>
b.price-a.price
);

}

if(type==="name"){

filteredProducts.sort(
(a,b)=>
a.name
.localeCompare(
b.name
)
);

}

if(type==="rating"){

filteredProducts.sort(
(a,b)=>
b.rating-a.rating
);

}

renderProducts(
filteredProducts
);

}

function showModal(product){

const modal=
document.createElement(
"div"
);

modal.className=
"modal";

modal.innerHTML=`

<div class="modal-content">

<h2>
${product.name}
</h2>

<img src=
"${product.image}"
>

<p>
Price:
${product.price.toLocaleString()}đ
</p>

<p>
Rating:
⭐${product.rating}
</p>

<button id="closeModal">
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
e.target.id==="closeModal"
||
e.target===modal
){

modal.remove();

}

}
);

}

function bindEvents(){

document
.querySelector(
"#search"
)
.addEventListener(
"input",
searchProducts
);

document
.querySelector(
"#sort"
)
.addEventListener(
"change",
e=>{

sortProducts(
e.target.value
);

});

document
.querySelector(
"#categories"
)
.addEventListener(
"click",
e=>{

if(
e.target.dataset.category
){

filterByCategory(
e.target.dataset.category
);

}

});

document
.querySelector(
"#productGrid"
)
.addEventListener(
"click",
e=>{

const card=
e.target.closest(
".card"
);

if(!card) return;

const id=
Number(
card.dataset.id
);

const product=
products.find(
p=>p.id===id
);

if(
e.target.classList
.contains(
"add-cart"
)
){

cartCount++;

document
.querySelector(
".badge"
)
.textContent=
cartCount;

return;

}

showModal(
product
);

});

document
.querySelector(
"#themeBtn"
)
.addEventListener(
"click",
()=>{

document.body
.classList.toggle(
"dark-mode"
);

});

}