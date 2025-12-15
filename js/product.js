async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    renderProducts(data);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
getProducts();

const productList = document.querySelector(".products__list");

function renderProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const item = document.createElement("div");
    item.className = "products__item item";

    item.innerHTML = `
                <div class="item__photo">
                  <img src=${product.image} alt="" />
                </div>
                <div class="item__name">${product.title}</div>
                <div class="item__order">
                  <div class="item__price">${product.price} $</div>
                  <div class="item__button"><button>Add to card</button></div>
                </div>
    
    `;

    productList.appendChild(item);
  });
}
