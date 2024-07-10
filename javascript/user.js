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

            let product = ``;

            for (let i = 0; i < products.length; i++) {
                product += `<div class=" col-12 col-md-3">
                      <div class="card border-0"> 
                  <img src="./assets/food.png" alt="" class="img-fluid card-img-top"/>
                  <div class="card-body">
                    <h6 class="card-title text-center">${products[i].name}</h6>
                  </div>
                  <div class="row">
                  <div class="col-lg-9 col-md-10  justify-content-around mb-5">
                    <h3 class="text-danger">${products[i].price.toLocaleString('it-IT', {
                    style: 'currency', currency: 'VND'
                })}</h3>
                  </div>
                  <div class="col-lg-3 col-md-2  justify-content-around mx-auto">
                  <button type="submit" class="btn btn-danger" id="addCard" onclick="showFormOrder()" ><i class="fas fa-shopping-cart"></i></button>
                    </div>
                  </div>
                  </div> 
                </div>`;
            }
            document.getElementById('main').innerHTML = product;
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
    headers: {
        Authorization: `Bearer ${token}`
    }

    if (!token || !token.id) {
        alert("Hãy đăng nhập lại");
        return;
    }
    let user_id = token.id;
    let quantity = document.getElementById("quantity").value;

    let orderData = {
        userId: user_id, productId: productId, quantity: parseInt(quantity)
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


function getGame() {
    let games = document.getElementById("games");
    let html = `
    <div class="col-md-10" style="">
    <div class="row g-4 mx-auto p-3">
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/lol.jpg"/>League of legends
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/logo.webp"/>Genshin impact
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/csgo.jpg"/>CS: go
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/honkai3.png"/>Honkai impact 3
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/pubg.png"/>Pubg
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/CoD.png"/>Call of duty
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/dota.jpg"/>Dota 2
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/val.png"/>Valorant
        </div>
        </div>

         <div class="row g-4 mx-auto p-3">
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/sekiro.jpg"/>Sekiro
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/RE2.jpg"/>Resident Evil 2
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/nier.jpg"/>Nier Automata
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/warframe.avif"/>Warframe
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/naraka.jpeg"/>Naraka
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/R6.jpg"/>Rainbow 6
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/apex.png"/>Apex legend
        </div>
        <div class="card col-12 col-md-1 text-center text-md-center mx-auto border-0 text-bold">
            <img class="game" src="assets/logogame/ww.jpg"/>Wuthering waves
        </div>
        </div>

    `;
    document.getElementById("main").innerHTML = html;
}

getGame();

function searchService() {
    let name = document.getElementById("search").value;
    axios.get('http://localhost:8080/products/search?name=' + name)
        .then(res => {
            let products = res.data;
            if (products.length === 0) {
                document.getElementById("root").innerHTML = '<p>Không tìm thấy sản phẩm nào.</p>';
                return;
            }

            let html = `
                    <div class="container-fluid d-flex flex-row-reverse">
            <div id="root"></div>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="row col-lg-12">
                                <div class="card col">
                                    <div class="card-body table-responsive p-0">
                                        <table class="table table-striped table-valign-middle">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Đồ Uống</th>
                                                    <th>Giá</th>
                                                    <th>Hình ảnh</th>
                                                    <th>Thể Loại</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>`;

            products.forEach(product => {
                let category_name = (product.category != null) ? product.category.name : null;
                html += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td><img src="${product.image}" alt=""></td>
                        <td>${category_name}</td>
                        <td><button type="submit" class="btn btn-danger" id="addCard" onclick="showFormOrder()" ><i class="fas fa-shopping-cart"></i></button></td>
                    </tr>`;
            });

            html += `           </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
`;

            document.getElementById("main").innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            document.getElementById("root").innerHTML = '<p>Có lỗi xảy ra khi tải dữ liệu.</p>';
        });
}


