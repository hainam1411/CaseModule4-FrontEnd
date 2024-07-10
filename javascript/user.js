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

    let user_id = token.id;
    let quantity = document.getElementById("quantity").value;

    let orderData = {
        id: user_id,
        productId: productId,
        quantity: parseInt(quantity)
    };

    axios.post('http://localhost:8080/order_user/add', orderData)
        .then(res => {
            alert("Đã gọi món. Xin chờ trong giây lát");
        })
        .catch(error => {
            // checkInput(error.response.data);
        });
}

function checkInput(errors) {
    errors.forEach(item => {
        let err = item.split(':');
        document.getElementById('error' + err[0]).innerHTML = err[1];
    });
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


