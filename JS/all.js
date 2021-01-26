//@DOM
const headerLinks = document.querySelector('.header-links');
const headerInput = document.querySelector('.header-input');
const itemNumber = document.querySelector('.number');
const carNumber = document.querySelector('.car');
const data = JSON.parse(localStorage.getItem('cartList')) || [];
const search = document.querySelector('.search');
const closeButton = document.querySelector('.close-input');
const minusButton = document.querySelector('.minus');
const plusButton = document.querySelector('.plus');
const addToCartButton = document.querySelector('.add-cart-btn');
const cartItems = document.querySelector('.car-items');

//@variables
let buyItem = 0;

//@Event
search.addEventListener('click', displayInput);
closeButton.addEventListener('click', closeInput);
minusButton.addEventListener('click', minusItem);
plusButton.addEventListener('click', plusItem);
addToCartButton.addEventListener('click', addItems);

//@Function
updateAll(data);

function displayInput(){
    headerLinks.style.display = "none";
    headerInput.style.display = "block";
}
function closeInput(){
    headerLinks.style.display = "flex";
    headerInput.style.display = "none";
}
function plusItem(e){
    e.stopPropagation();
    buyItem = buyItem + 1;
    itemNumber.innerText = buyItem;
}
function minusItem(e){ 
    if (buyItem <= 0){
        return;
    } else {
        e.stopPropagation();
        buyItem = buyItem - 1;
        itemNumber.innerText = buyItem;
    }  
}
function addItems(e){
    e.stopPropagation();
    let productType = document.querySelector('.product-type').innerText;
    let productImg = `img/${productType}.png`;
    let productName = document.querySelector('.product-Name').innerText;
    let str = document.querySelector('.total-price').innerText;
    let productPrice = Number((str.split('$'))[1]);
    let productNum = Number(itemNumber.innerText);

    const cartData = {
        productImg: productImg,
        productName: productName,
        productPrice: productPrice,
        productNum: productNum
    };
    if(productNum == "0"){
        return;
    }
    data.splice(0, 0, cartData);
    updateAll(data);
    localStorage.setItem('cartList', JSON.stringify(data));
}
function updateAll(item){
    
    let Num = 0;
    let total = 0;
    let str = "";
    
    for(let i=0; i<item.length; i++){
        str += `
        <li class="buy-info">
            <img src=${item[i].productImg}>
            <div class="text">
                <span>${item[i].productName}</span><br>
                <span>${item[i].productNum}</span>×<span>$${item[i].productPrice}</span>   
            </div>  
            <i class="far fa-times-circle" id="delete"></i>       
        </li>
        `;
        Num += item[i].productNum; //productTotalNumber 
        total += item[i].productNum*item[i].productPrice;
    }
    total = total.toFixed(2);

    
    // console.log(total);
    cartItems.innerHTML = `
    ${str}
    <p class="total"><span>Total:</span>${total}</p>
    <div class="cart-btn">
        <button class="left">VIEW CART</button>
        <button class="right">CHECK OUT</button>
    </div>
    `;
    carNumber.innerText = Num;
}

const deleteButton = document.querySelectorAll('.buy-info #delete');

for(let i=0; i<data.length; i++){
    deleteButton[i].addEventListener('click', function(){
        data.splice(i, 1);
        console.log(data);
        updateAll(data);
        localStorage.setItem('cartList', JSON.stringify(data));
    })
}



