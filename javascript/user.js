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
                  <div class="d-flex justify-content-around mb-5">
                    <h3 class="text-danger">${products[i].price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h3>
                  </div>
                  </div> 
                </div>`;
                html += product;
            }
            document.getElementById('product').innerHTML = html;
        })
}

getAll(null, elm);

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


