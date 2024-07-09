function getOrderDetailsByUserName() {
    let username = document.getElementById("search").value;

    if (username === "") {
        alert("Please enter a username.");
        return;
    }

    axios.get(`http://localhost:8080/order_admin/search?username=${username}&page=0&size=5`)
        .then(res => {
            let order = res.data.content;

            axios.get(`http://localhost:8080/order_admin/users/${username}/totalAmount`)
                .then(response => {
                    let html = `
                        <div class="container-fluid">
                            <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body table-responsive p-0">
                                        <table class="table table-striped table-valign-middle table-bordered">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên Sản Phẩm</th>
                                                <th>Giá</th>
                                                <th>Số Lượng</th>
                                                <th>Thời Gian Order</th>
                                                <th>Tên Người Đặt</th>
                                                <th>Tổng Tiền</th>
                                                <th>Thao Tác</th>git
                                            </tr>
                                            </thead>
                                            <tbody>
            `;
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
                    html += `
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;;
                    html += `<p>Total amount spent: ${totalAmount}</p>`;
                    document.getElementById("main").innerHTML = html;
                })
                .catch(error => {
                    console.error('lỗi tổng số tiền:', error);
                    document.getElementById("main").innerHTML = `<p>Lỗi số tiền</p>`;
                });
        })
        .catch(error => {
            console.error('Lỗi chi tiết đơn hàng:', error);
            document.getElementById("main").innerHTML = `<p>Lỗi chi tiết đơn hàng</p>`;
        });
}