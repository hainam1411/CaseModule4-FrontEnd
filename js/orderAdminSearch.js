function getOrderDetailsByUserName() {
    let username = document.getElementById("search").value;

    if (username === "") {
        alert("Please enter a username.");
        return;
    }

    axios.get(`http://localhost:8080/order_admin/search?username=${username}&page=0&size=5`)
        .then(res => {
            let orderList = res.data.content;

            axios.get(`http://localhost:8080/order_admin/users/${username}/totalAmount`)
                .then(response => {
                    let totalAmount = response.data;

                    let html = `<table border="1">
                                    <tr>
                                        <th>Id</th>
                                        <th>NameProduct</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>OrderDate</th>
                                        <th>UserName</th>
                                    </tr>`;
                    orderList.forEach(order => {
                        html += `<tr>
                                    <td>${order.id}</td>
                                    <td>${order.name}</td>
                                    <td>${order.price}</td>
                                    <td>${order.quantity}</td>
                                    <td>${order.total}</td>
                                    <td>${order.orderDate}</td>
                                    <td>${order.username}</td>
                                </tr>`;
                    });
                    html += `</table>`;
                    html += `<p>Total amount spent: ${totalAmount}</p>`;
                    document.getElementById("root").innerHTML = html;
                })
                .catch(error => {
                    console.error('lỗi tổng số tiền:', error);
                    document.getElementById("root").innerHTML = `<p>Lỗi số tiền</p>`;
                });
        })
        .catch(error => {
            console.error('Lỗi chi tiết đơn hàng:', error);
            document.getElementById("root").innerHTML = `<p>Lỗi chi tiết đơn hàng</p>`;
        });
}