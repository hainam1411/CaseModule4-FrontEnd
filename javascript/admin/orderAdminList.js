function getAllOrderList(page = 0, size = 5) {
    axios.get(`http://localhost:8080/order_admin/list?page=${page}&size=${size}`)
        .then(res => {
            let order = res.data.content; // Lấy danh sách đơn hàng từ response.data.content
            let html = `<table border="1">
                             <tr>
                                 <td>Id</td>
                                 <td>NameProduct</td>
                                 <td>Price</td>
                                 <td>Quantity</td>
                                 <td>Total</td>
                                 <td>OrderDate</td>
                                 <td>UserName</td>
                                 <td colspan="2">Action</td>
                             </tr>`;
            order.forEach(orderItem => {
                html += `<tr>
                            <td>${orderItem.id}</td>
                            <td>${orderItem.name}</td>
                            <td>${orderItem.price}</td>
                            <td>${orderItem.quantity}</td>
                            <td>${orderItem.total}</td>
                            <td>${orderItem.orderDate}</td>
                            <td>${orderItem.username}</td>
                            <td><button onclick="removeOrder(${orderItem.id})">Delete</button></td>
                         </tr>`;
            });
            html += `</table>`;
            document.getElementById("main").innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching order details:', error);
        });
}
