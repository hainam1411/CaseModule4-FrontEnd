function getAll(t, elm) {
    const element = document.querySelector('.nav-link.active');
    if (element) {
        element.classList.remove('active');
    }
    document.getElementById(elm).classList.add("active");
    axios.get('http://localhost:8080/products')
        .then(function (response) {
            let products = response.data;
            console.log(products);
            let html = ``;
            for (let i = 0; i < products.length; i++) {

                let product = `<div class="card col-12 col-md-1">
                  <img src="./assets/food.png" alt="" class="img-fluid  d-block mx-auto"/>
                  <div class="card-body">
                    <h5 class="card-title">${products[i].name}</h5>
                  </div>
                  <div class="d-flex justify-content-around mb-5">
                    <h3>${products[i].price} vnđ</h3>
                  </div>
                </div>`;
                html += product;
            }
            document.getElementById('product').innerHTML = html;
        })
}

getAll(null, 'games');



