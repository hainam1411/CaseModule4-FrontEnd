
function showFromOrder(productId) {
    let html = `
          <div>
              <input type="text" value="">
          </div>
          <div>
              <input type="text" id="quantity" placeholder="quantity">
              <span id="errorquantity"></span>
              <button onclick="addOrder(${productId})">Add</button>
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