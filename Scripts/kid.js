import navbar from "../Components/navbar.js";
let navbar_div = document.getElementById("navbar");
navbar_div.innerHTML = navbar();

let cartData = JSON.parse(localStorage.getItem("cart")) || []
let productPrice = JSON.parse(localStorage.getItem("price"))

let kiddata = productData.kidsClothingData;

const dataDiv = document.getElementById("kidProducts")

const renderData = (data) => {

    dataDiv.innerHTML = null;

    data.forEach((ele) => {

        let product = document.createElement("div")
        product.className = "items"

        let image = document.createElement("img");
        image.src = ele.img;

        image.onclick = () => {
            localStorage.setItem("Products", JSON.stringify(ele))
            window.location.href = "productPage.html"
        }

        let brand = document.createElement("p")
        brand.innerText = ele.brand

        let title = document.createElement("h2")
        title.innerText = ele.title

        let price = document.createElement("b")
        price.innerText = `price: ₹${ele.price}`

        let addBtn = document.createElement("button")
        addBtn.innerText = "Add to Cart"
        addBtn.onclick = () => {
            cartData.push(ele)
            document.getElementById("cartCount").innerText = cartData.length;
            localStorage.setItem("cart", JSON.stringify(cartData));
            addBtn.innerText = "Added to cart"
            productPrice += Number(ele.price)
            localStorage.setItem("price", JSON.stringify(productPrice));
        }
        product.append(image, brand, title, price, addBtn)
        dataDiv.append(product)
    })
};

renderData(kiddata);

document.getElementById("sortLH").addEventListener("click", () => {
    let sort = kiddata.sort((a, b) => a.price - b.price)
    renderData(sort);
})

document.getElementById("sortHL").addEventListener("click", () => {
    let sort = kiddata.sort((a, b) => b.price - a.price)
    renderData(sort);
})

let filter = document.getElementById("filter")
filter.addEventListener("change", () => {
    if (filter.value === "")
        return (
            renderData(kiddata)
        )

    let filtered = kiddata.filter((ele) => {
        return (
            (ele.category === filter.value)
        )
    })
    renderData(filtered)
})