function getOrderDetailsByUserName() {
    let username = document.getElementById("search").value;

    if (username === "") {
        alert("Nhập tên vào");
        return;
    }

    axios.get(`http://localhost:8080/order_admin/search?username=${username}`)
        .then(res => {
            let order = res.data.content;

            if (!order || order.length === 0) {
                document.getElementById("root").innerHTML = `<p>không tim thấy tài khoản</p>`;
                return;
            }

            axios.get(`http://localhost:8080/order_admin/users/${username}/totalAmount`)
                .then(response => {
                    let totalAmount = response.data; // Lấy tổng số tiền từ phản hồi API
                    let html = `
                        <div class="form-inline col-md-6">
                    <div class="input-group" data-widget="sidebar-search">
                        <input class="form-control form-control-sidebar" type="search" placeholder="Search"
                               aria-label="Search" id="search">
                        <div class="input-group-append">
                            <button class="btn btn-sidebar" onclick="getOrderDetailsByUserName()">
                                <i class="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>
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
                                                <th>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
            `;
                    if (orderList && orderList.length > 0) {
                        orderList.forEach(orderItem => {
                            html += `
                        <tr>
                            <td>${orderItem.id}</td>
                            <td>${orderItem.product_name}</td>
                            <td>${orderItem.price}</td>
                            <td>${orderItem.quantity}</td>
                            <td>${orderItem.order_date}</td>
                            <td>${orderItem.user_name}</td>
                            <td><button class="btn btn-danger" onclick="removeOrder(${orderItem.id})">Xóa</button></td>
                        </tr>
                    `;
                        });
                    } else {
                        html += `<tr><td colspan="7">Không có đơn hàng.</td></tr>`;
                    }
                    html += `
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                    html += `<p>Total amount spent: ${totalAmount}</p>`; // Hiển thị tổng số tiền
                    document.getElementById("main").innerHTML = html;
                })
                .catch(error => {
                    console.error('Error fetching total amount:', error);
                    document.getElementById("main").innerHTML = `<p>Lỗi số tiền</p>`;
                });
        })
        .catch(error => {
            console.error('Error fetching order details:', error);
            document.getElementById("main").innerHTML = `<p>Lỗi chi tiết đơn hàng</p>`;
        });
}