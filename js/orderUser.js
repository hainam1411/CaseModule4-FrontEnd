function showFromCreate() {
    axios.get('http://localhost:8080/order_user').then(res =>{
        let html = `
    <div>
        <input type="text" value="">
    </div>
    <div>
        <input type="text" id="quantity" placeholder="quantity" >
        <span id="errorquantity"></span>
        <button onclick="addOrder()">Add</button>
    </div>`
        document.getElementById("main").innerHTML = html;
    })
}


function addOrder() {
    let user_id = JSON.parse(localStorage.getItem('token')).userId;
    let product_id = this.getAttribute("product");
    let quantity = document.getElementById("quantity").value;

    let orderData = {
        userId: user_id,
        productId: product_id,
        quantity: quantity
    };

    axios.post('http://localhost:8080/order_user/add', null, {
        params: orderData
    }).then(res => {
        alert("Order added successfully");
        //////////////////////////////////
    }).catch(error => {
        checkInput(error.response.data);
    });
}


function checkInput(errors) {
    errors.map(item => {
        let err = item.split(':')
        document.getElementById('error'+err[0]).innerHTML = err[1]
    })
}