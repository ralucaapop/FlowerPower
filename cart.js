const cart= document.querySelector(".cart");
/*if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready);
}
else{ready();
}
function ready(){*/
    //remove itme
    var removeCartButtons =document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for(var i=0;i< removeCartButtons.length;i++)
    {
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem) ;
    }
    //Quantity change
    var quantityInputs= document.getElementsByClassName('cart-quantity')
    for(var i=0;i<quantityInputs.length;i++)
    {
        var input =quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    //add item to cart
    var addCart = document.getElementsByClassName("addcart");
    for(var i=0;i<addCart.length;i++)
    {
        var button= addCart[i];
        button.addEventListener("click", handle_addCartItem);

    }
    /*let addCart_btns = document.querySelectorAll(".addcart");
    addCart_btns.forEach(btn => {
        btn.addEventListener("click", handle_addCartItem);
    });*/




function handle_addCartItem(event)
{
    let button= event.target
    let product = button.parentElement.parentElement 
    let title =product.querySelector(".numeProdus").innerText;
    let price =product.querySelector(".pretProdus").innerText;
    let productImg =product.querySelector(".imagineProdus").src;
    console.log(title, price, productImg);
    
    let cartBoxElement = CartBoxComponent(title, price, productImg);
    let newNode = document.createElement("div");
    newNode.innerHTML= cartBoxElement;
    let cartConent= cart.querySelector(".cart-content");
    var cartItemsNames = cartConent.getElementsByClassName("cart-product-title")[0];
    if(cartItemsNames!=null)
    for(var i=0;i<cartItemsNames.length;i++)
    {
        if(cartItemsNames[i].innerHTML==title);
        {
            alert('Ai adaugat deja acest element in cosul tau');
            return ;
        }
    }
    cartConent.appendChild(newNode);
newNode
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click",removeCartItem);
newNode
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener("change",quantityChanged);
    updatetotal();
}

function CartBoxComponent(title,price, poza) {
    return `
    <div class="cart-box">
        <img class="imagineProdus mb-3" src= "${poza}">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!--Remove Cart -->
        <i class="fas fa-trash cart-remove"></i>
    </div>`;
 }

//Remove item from Cart
function removeCartItem(event){
    var buttonClicked =event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

///Quantity  Changes

function quantityChanged(event)
{
    var input =event.target;
    if(isNaN (input.value) || input.value <=0 )
    {
        input.value=1;
     }
    updatetotal();

}



///update Total
function updatetotal(){
    var cartConent = document.getElementsByClassName("cart-content")[0]
    var cartBoxes = cartConent.getElementsByClassName("cart-box")
    var total=0;
    for(var i=0;i< cartBoxes.length;i++)
    {
        var cartBox = cartBoxes[i];
        var prieceElement= cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement= cartBox.getElementsByClassName("cart-quantity")[0];
        var quantity =quantityElement.value;
        var price = parseFloat(prieceElement.innerText.replace("$",""));
        total=total+price*quantity;
    }
    document.getElementsByClassName('total-pret')[0].innerText= total + 'lei';
    
}