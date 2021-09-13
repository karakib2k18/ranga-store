document.getElementById('my-cart').style.display = "none";
const loadProducts = () => {
  document.getElementById('spinnerh').style.display = "block";
  let url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));

};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p> Ratings: ${product.rating.rate}  (${product.rating.count})</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="font-weight-bold buy-now btn btn-warning">add to cart</button>
      <button onclick="singleProductLoad( ${product.id})" id="details-btn" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" >Details</button>
      </div>

      `;
    document.getElementById('spinnerh').style.display = "none";
    document.getElementById('my-cart').style.display = "block";
    document.getElementById("all-products").appendChild(div);

  }
};


//product count, price update, and taxt rate update and update total price
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

//getting value by passing id 
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  //only 2digit will show after decimal point
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  //only 2digit will show after decimal point
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  //if total price more than 200, delivery charge $30 and tax 20%
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  //if total price more than 200, delivery charge $30 and tax 30%
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  //if total price more than 200, delivery charge $60 and tax 40%
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  console.log(grandTotal);
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

//fetch product details using id number
const singleProductLoad = (singleID) => {
  document.getElementById("detailsSingle").innerHTML = "";
  let url = `https://fakestoreapi.com/products/${singleID}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => productDetails(data));
}

//  //detailsSingle show here
const productDetails = (productID) => {
  const div = document.createElement("div");
  div.classList.add('modal-body');
  div.innerHTML = `
   <img class="card-img-top single-img" src=${productID.image} alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Title: ${productID.title}</h5>
    <p class="card-text">Description: ${productID.description}</p>
    <p class="card-text">Category: ${productID.category}</p>
    <p class="card-text">Price: $(${productID.price})</p>
    <p class="card-text">Ratings: ${productID.rating.rate} (${productID.rating.count})</p>
  </div>
  
  `;
  //spinner hide
  document.getElementById('spinner').style.display = "none";
  document.getElementById("detailsSingle").appendChild(div);
}

//close modal using this function
const singleProductClose = () => {
  document.getElementById("detailsSingle").innerHTML = "";
}