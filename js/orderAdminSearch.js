function getOrderDetailsByUsername(username) {
    axios.get(`http://localhost:8080/order_admin/search?username=${username}&page=0&size=5`)
        .then(res => {
            let orderList = res.data.content;
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
            document.getElementById("root").innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching order details:', error);
        });
}