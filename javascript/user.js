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
                  <button type="submit" class="btn btn-danger" id="addCard" onclick="showFormOrder()" ><i class="fas fa-shopping-cart"></i></button>
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

function showFormOrder(productId) {
    let html = `<div class="container mt-5">
    <div class="row">
        <div class="col-md-6">
            <img src="https://via.placeholder.com/200" alt="Sản phẩm" class="product-image">
        </div>
        <div class="col-md-6">
            <h1>Tên sản phẩm</h1>
            <p id="product-price"><span>Giá: </span><strong></strong> </p>
            <div class="quantity-control">
                <button class="btn btn-secondary" id="decreaseQuantity">-</button>
                <input type="text" id="quantity" value="1" class="form-control" style="width: 60px; text-align: center;">
                <button class="btn btn-secondary" id="increaseQuantity">+</button>
            </div>
            <p class="mt-3">Tổng giá: <span id="total-price">100</span></p>
            <button class="btn btn-primary" id="buyButton" onclick="addOrder()"><i class="fas fa-shopping-cart"></i></button>
        </div>
    </div>
</div>
                                   `;
    document.getElementById("main").innerHTML = html;
}

function addOrder(productId) {
    let token = JSON.parse(localStorage.getItem('currentUser'));
    if (!token || !token.userId) {
        alert("Hãy đăng nhập lại");
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
            alert("Đã gọi món. Xin chờ trong giây lát");
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
    axios.get('http://localhost:8080/products/search?name='+name).then(res => {
        let cars = res.data;
        let html = ``;
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


