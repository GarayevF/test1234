if(localStorage.getItem("basket") == null){
    localStorage.setItem("basket", JSON.stringify([]))
}

fetch("db.json")
.then(res => res.json())
.then(data => {
    let html = ""
    data.products.forEach(element => {
        html += 
        `
        <div class="col-lg-3 custom-box">
            <div class="custom-card">
                <div class="overlay">
                    <button data-id="${element.id}" data-price="${element.price}" class="addtobasket">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
                <div class="img-div">
                    <img src="${element.image}" alt="">
                </div>
                <div class="content">
                    <h3 class="title">${element.title}</h3>
                    <h2 class="price">${element.price}$</h2>
                </div>
            </div>
        </div>
        `
    });

    document.querySelector("#Products .container .row").innerHTML = html


    let btns = document.querySelectorAll(".addtobasket");
    let basket = JSON.parse(localStorage.getItem("basket"));

    btns.forEach(btn => {
        btn.addEventListener("click", function() {
            if(localStorage.getItem("basket") == null){
                localStorage.setItem("basket", JSON.stringify([]))
            }

            let data_id = this.getAttribute("data-id")
            let data_price = this.getAttribute("data-price")

            let exist = basket.find(a => {
                return a.id == data_id;
            })

            if(exist == undefined){
                let item = {
                    id: data_id,
                    price: data_price,
                    count: 1
                }

                basket.push(item);
            }else{
                exist.count++
            }

            localStorage.setItem("basket", JSON.stringify(basket));


        })
    })

})