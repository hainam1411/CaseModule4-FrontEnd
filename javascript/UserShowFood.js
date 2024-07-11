function userShowFood() {
    let token = getCurrenUser().accessToken;
    axios.get('http://localhost:8080/products/food', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(function (response) {
            let products = response.data;
            let html = ``;
            for (let i = 0; i < products.length; i++) {
                let food = `<div class=" col-12 col-md-3">
                      <div class="card border-0"> 
                  <img src="${products[i].image}" alt="" class="img-fluid card-img-top"/>
                  <div class="card-body">
                    <h6 class="card-title text-center">${products[i].name}</h6>
                  </div>
                  <div class="row">
                  <div class="col-lg-9 col-md-10  justify-content-around mb-5">
                    <h3 class="text-danger">${products[i].price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h3>
                  </div>
                  <div class="col-lg-3 col-md-2  justify-content-around mx-auto">
                  <button type="submit" class="btn btn-danger" id="addCard" onclick="showFormOrder('${products[i].image}', ${products[i].id})" ><i class="fas fa-shopping-cart"></i></i></button>
                    </div>
                    </div>
                  </div>
                  </div> 
                </div>`;
                html += food;
            }

            document.getElementById("main").innerHTML = html;
        })
}
userShowFood();
