let productInCart = [];
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');


const countTheSumPrice = function () {
    let sum = 0;
    productInCart.forEach(item => {
        sum += item.price;
    });
    return sum;
}


const updateShoppingCartHTML = function () {
    if (productInCart.length > 0) {
        let result = productInCart.map(product => {
            return `
            <li class="buyItem" >
                <img src="${product.image}">
                <div>
                    <h5>${product.name}</h5> 
                    <h6>Rp${product.price}</h6> 
                    <div>
                        <button class="button-minus" data-id='${product.id}'> - </button> 
                        <span class="countofProduct">${product.count}</span> 
                        <button class="button-plus" data-id='${product.id}'> + </button> 
                    </div> 
                </div> 
            </li>`
        });
        parentElement.innerHTML = result.join('');
        document.querySelector('.checkout').classList.remove('hidden');
        cartSumPrice.innerHTML = 'Rp ' + countTheSumPrice();

    } else {
        document.querySelector('.checkout').classList.add('hidden');
        parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
        cartSumPrice.innerHTML = '';
    }
}


function updateProductsInCart(product) {
    for (let i = 0; i < productInCart.length; i++) {
        if (productInCart[i].id == product.id) {
            productInCart[i].count += 1;
            productInCart[i].price = productInCart[i].basePrice * productInCart[i].count;
            return;
        }
    }
    productInCart.push(product);
}

products.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('addToCart')) {
            const productID = e.target.dataset.productId;
            const productName = item.querySelector('.product-name').innerHTML;
            const productPrice = item.querySelector('.priceValue').innerHTML;
            const productImage = item.querySelector('img').src;
            let product = {
                name: productName,
                image: productImage,
                id: productID,
                count: 1,
                price: +productPrice,
                basePrice: +productPrice,
            }
            updateProductsInCart(product);
            updateShoppingCartHTML();
        }
    });
});

parentElement.addEventListener('click', (e) =>{
    const isPlusButton = e.target.classList.contains('button-plus');
    const isMinusButton = e.target.classList.contains('button-minus');
    if(isPlusButton || isMinusButton){
        for(let i = 0; i < productInCart.length; i++){
            if(productInCart[i].id == e.target.dataset.id){
                if(isPlusButton){
                    productInCart[i].count += 1
                }else{
                    productInCart[i].count -= 1
                }
                productInCart[i].price = productInCart[i].basePrice * productInCart[i].count;
            }
            if(productInCart[i].count <= 0){
                productInCart.splice(i, 1);
            }
        }
        updateShoppingCartHTML();
    }
});
updateShoppingCartHTML();