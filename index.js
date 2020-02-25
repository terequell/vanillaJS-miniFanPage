var removeButton = document.getElementsByClassName('btn-danger')
var countItems = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i<removeButton.length; i++) {
   removeButton[i].addEventListener('click', removeButtonClick)
   countItems[i].addEventListener('change', updateCountItemsChange)
}

var shopItems = document.getElementsByClassName('shop-item')
for (var i = 0; i<shopItems.length; i++) {
   var addItemButton = shopItems[i].getElementsByClassName('shop-item-button')[0]
   addItemButton.addEventListener('click', addItemButtonClicked)
}

function addItemButtonClicked (event) {
   var mainElementItem = event.target.parentElement.parentElement
   var itemTitle = mainElementItem.getElementsByClassName('shop-item-title')[0].innerText
   var priceItem = mainElementItem.getElementsByClassName('shop-item-price')[0].innerText
   var picItem = mainElementItem.getElementsByClassName('shop-item-image')[0].src
   addNewItemToCart(itemTitle,priceItem, picItem)
}

function addNewItemToCart (itemTitle, priceItem, picItem) {
   var cartItemsTitles = document.getElementsByClassName('cart-item-title')
   for (var i = 0; i< cartItemsTitles.length; i++) {
      if (itemTitle == cartItemsTitles[i].innerHTML) {
         alert('This item already in the cart')
         return
      }
   }
   var cartRow = document.createElement('div')
   cartRow.className = 'cart-row'
   var cart = document.getElementsByClassName('cart-items')[0]
   var cartRowContent = `
      <div class="cart-item cart-column">
         <img class="cart-item-image" src=${picItem} width="100" height="100">
          <span class="cart-item-title">${itemTitle}</span>
      </div>
      <span class="cart-price cart-column">${priceItem}</span>
      <div class="cart-quantity cart-column">
         <input class="cart-quantity-input" type="number" value="2">
         <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`
   cartRow.innerHTML = cartRowContent 
   cart.append(cartRow)
   var removeBtn = cartRow.getElementsByClassName('btn-danger')[0]
   var countField = cartRow.getElementsByClassName('cart-quantity-input')[0]
   removeBtn.addEventListener('click', removeButtonClick)
   countField.addEventListener('change', updateCountItemsChange)
   updateTotalValue()
}

function updateCountItemsChange (event) {
   const value = event.target.value
   if (value >= 1) {
      updateTotalValue()
   }
   else event.target.value = 1
}

function removeButtonClick (event) {
   const button = event.target
   button.parentElement.parentElement.remove()
   updateTotalValue()
}

function updateTotalValue () {
   var totalPrice = document.getElementsByClassName('cart-total-price')
   var cartMain = document.getElementsByClassName('cart-items')[0]
   var cartItems = cartMain.getElementsByClassName('cart-row')
   var totalValue = 0
   for (var i = 0; i< cartItems.length; i++) {
      var priceItem = parseFloat(cartItems[i].getElementsByClassName('cart-price')[0].innerText.replace('$', ''))
      var countItems = cartItems[i].getElementsByClassName('cart-quantity-input')[0].value
      totalValue = totalValue + priceItem*countItems
   }
   totalValue = Math.round(totalValue*100) / 100
   totalPrice[0].innerText = '$' + totalValue
}


