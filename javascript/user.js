function getAll() {
    axios.get('http://localhost:8080/products')
        .then(function (response) {
            let products = response.data;
            console.log(products);
            let html = ``;
            for (let i = 0; i < products.length; i++) {

                let product = `<div class="card h-100 col-12 col-md-4">
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

getAll();