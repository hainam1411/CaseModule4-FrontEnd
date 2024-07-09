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
                let product = `<div class=" col-12 col-md-3">
                      <div class="card border-0"> 
                  <img src="./assets/food.png" alt="" class="img-fluid card-img-top"/>
                  <div class="card-body">
                    <h6 class="card-title text-center">${products[i].name}</h6>
                  </div>
                  <div class="row">
                  <div class="col-lg-9 col-md-10  justify-content-around mb-5">
                    <h3 class="text-danger">${products[i].price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h3>
                  </div>
                  <div class="col-lg-3 col-md-2  justify-content-around mx-auto">
                  <button type="submit" class="btn btn-danger" id="addCard" onclick="showFromOrder()" ><i class="fas fa-shopping-cart"></i></button>
                    </div>
                  </div>
                  </div> 
                </div>`;
                html += product;
            }
            document.getElementById('main').innerHTML = html;
        })
}

getAll(null, elm);

function showFromOrder(productId) {
    let html = `
                                      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                 aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="modal-food">Thêm Tài Khoản </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="foodName" class="form-label">Tên Tài Khoản</label>
                                                <input class="form-control" id="foodName" placeholder="">
                                            </div>
                                            <div class="mb-3">
                                                <label for="foodCost" class="form-label">Số CCCD</label>
                                                <input class="form-control" id="foodCost" placeholder="">
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                    Huỷ
                                                </button>
                                                <button type="button" class="btn btn-primary">Lưu</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
    document.getElementById("main").innerHTML = html;
}

function addOrder(productId) {
    let token = JSON.parse(localStorage.getItem('currentuser'));
    if (!token || !token.userId) {
        alert("User information not found. Please log in again.");
        return;
    }
    let user_id = token.userId;
    let quantity = document.getElementById("quantity").value;

    let orderData = {
        userId: user_id,
        productId: productId,
        quantity: parseInt(quantity)
    };

    axios.post('http://localhost:8080/order_user/add', orderData)
        .then(res => {
            alert("Order added successfully");
        })
        .catch(error => {
            checkInput(error.response.data);
        });
}

function checkInput(errors) {
    errors.forEach(item => {
        let err = item.split(':');
        document.getElementById('error' + err[0]).innerHTML = err[1];
    });
}


function search() {
    let name = document.getElementById("search").value;
    axios.get('http://localhost:8080/cars/search?name='+name).then(res => {
        let cars = res.data;
        let html = `<table border="1">
                             <tr>
                                 <td>Id</td>
                                 <td>Name</td>
                                 <td>Frame Code</td>
                                 <td>Machine Code</td>
                                 <td>Production Date</td>
                                 <td>Price</td>
                                 <td>Quantity</td>
                                 <td>Image</td>
                                 <td>Producer</td>
                                 <td>Type</td>
                                 <td colspan="2">Action</td>
                             </tr>`;
        for (let i = 0; i < cars.length; i++) {
            let dateArr = cars[i].productionDate;
            let dateObject = new Date(dateArr[0],dateArr[1]-1,dateArr[2]);
            let dateString = dateObject.getFullYear() + '-' + ('0' + (dateObject.getMonth() + 1)).slice(-2) + '-' + ('0' + dateObject.getDate()).slice(-2);
            let type_name = (cars[i].type != null) ? cars[i].type.name : null;
            let producer_name = (cars[i].producer != null) ? cars[i].producer.name : null;
            html += `<tr>
                                <td>${cars[i].id}</td>
                                <td>${cars[i].name}</td>
                                <td>${cars[i].frameCode}</td>
                                <td>${cars[i].machineCode}</td>
                                <td>${dateString}</td>
                                <td>${cars[i].price}</td>
                                <td>${cars[i].quantity}</td>
                                <td><img src="${cars[i].image}" alt=""></td>
                                <td>${producer_name}</td>
                                <td>${type_name}</td>
                                <td><button onclick="showFromUpdate(${cars[i].id})">Edit</button></td>
                                <td><button onclick="remove(${cars[i].id})">Delete</button></td>
                             </tr>`
        }
        html += `</table>`;
        document.getElementById("main").innerHTML = html;
    })
}

function goToProducer() {
    window.location.href = "producer.html"
}

function goToType() {
    window.location.href = "type.html"
}

// function getgames() {
//     const element = document.querySelector('.nav-link.active');
//     if (element) {
//         element.classList.remove('active');
//     }
//
//     // Thêm class "active" vào phần tử được chỉ định
//     document.getElementById(elm).classList.add("active");
//     let games = document.getElementById("games");
//     let html = `
//     <div class="col-md-10">
//         <div class="row g-4 mx-auto p-3">
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//         </div>
//         <div class="row g-4 mx-auto p-3">
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//             <div class="card col-12 col-md-1 text-center text-md-center mx-auto">
//                 <img src="assets/logogame/lol.jpg"/>LoL
//             </div>
//         </div>
//
//     `;
//     games.insertAdjacentElement('afterend', html);
//
//     // Thêm đoạn HTML vào phần tử có id "games"
//     // document.getElementById('games').innerHTML = html;
// }
//
// getgames(null, elm);


