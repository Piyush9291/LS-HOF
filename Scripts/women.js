import navbar from "../Components/navbar.js";
let navbar_div = document.getElementById("navbar");
navbar_div.innerHTML = navbar();

let cartData = JSON.parse(localStorage.getItem("cart")) || [];
let productPrice = JSON.parse(localStorage.getItem("price")) || [];

let womandata = productData. womenClothingData;

let dataDiv = document.getElementById("womenProducts");
const renderData = (data) => {
  dataDiv.innerHTML = null;
  data.forEach((ele) => {
    let product = document.createElement("div");
    product.className = "items";

    let image = document.createElement("img");
    image.src = ele.img;

    image.onclick = () => {
      localStorage.setItem("Products", JSON.stringify(ele));
      window.location.href = "productPage.html"
    };

    let brand = document.createElement("p");
    brand.innerText = ele.brand;

    let title = document.createElement("h2");
    title.innerText = ele.title;

    let price = document.createElement("b");
    price.innerText = `Price: ₹${ele.price}`;

    let addBtn = document.createElement("button");
    addBtn.innerHTML = "Add to cart";
    addBtn.onclick = () => {
      cartData.push(ele);
      document.getElementById("cartCount").innerText = cartData.length;
      localStorage.setItem("cart", JSON.stringify(cartData));
      addBtn.innerHTML = "Added to cart";
      productPrice += Number(ele.price);
      localStorage.setItem("price", JSON.stringify(productPrice));
    };

    product.append(image, brand, title, price, addBtn);
    dataDiv.append(product);
  });
};
renderData(womandata);


document.getElementById("sortLH").addEventListener("click", ()=>{
  let sort = womandata.sort((a,b) => a.price - b.price)
  renderData(sort)
})

document.getElementById("sortHL").addEventListener("click", ()=>{
  let sort = womandata.sort((a,b) => b.price - a.price)
  renderData(sort)
})

let filter = document.getElementById("filter")
filter.addEventListener("click" , ()=>{
   if(filter.value === "")
    return(
    renderData(womandata)
  )

  let filtered = womandata.filter((ele) =>{
    return(
     (ele.category === filter.value)
    )
 })
 renderData(filtered);
})
