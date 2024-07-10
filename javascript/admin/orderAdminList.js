function getAllOrderList(page = 0, size = 5) {
    axios.get(`http://localhost:8080/order_admin/list?page=${page}&size=${size}`)
        .then(res => {
            let order = res.data.content; // Lấy danh sách đơn hàng từ response.data.content
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
            `;
            document.getElementById("main").innerHTML = html;
        })
        .catch(error => {
            console.error('Lỗi orderDetail', error);
            document.getElementById("main").innerHTML = `<p>Lỗi orderDetail</p>`;
        });
}
