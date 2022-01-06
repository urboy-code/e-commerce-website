function closeCart(){
    const cart = document.querySelector('.productsOnCart');
    cart.classList.toggle('hide');
    document.querySelector('body').classList.toggle('stopScrolling')
}

const openShopCart = document.querySelector('.shoppingCartButton');
openShopCart.addEventListener('click', ()=>{
    const cart = document.querySelector('.productsOnCart');
    cart.classList.toggle('hide');
    document.querySelector('body').classList.toggle('stopScrolling');
});

const closeShopeCart = document.querySelector('#closeButton');
const overlay = document.querySelector('.overlay');
closeShopeCart.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);