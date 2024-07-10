// function getAllOrderList() {
//     axios.get(`http://localhost:8080/order_admin/list`)
//         .then(res => {
//             let orderList = res.data;
//             let html = `
//                 <div class="form-inline col-md-6">
//                     <div class="input-group" data-widget="sidebar-search">
//                         <input class="form-control form-control-sidebar" type="search" placeholder="Search"
//                                aria-label="Search" id="search">
//                         <div class="input-group-append">
//                             <button class="btn btn-sidebar" onclick="getOrderDetailsByUserName()">
//                                 <i class="fas fa-search fa-fw"></i>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div id="root"></div>
//                 <div class="container-fluid">
//                     <div class="row">
//                         <div class="col-lg-12">
//                             <div class="card">
//                                 <div class="card-body table-responsive p-0">
//                                     <table class="table table-striped table-valign-middle table-bordered">
//                                         <thead>
//                                             <tr>
//                                                 <th>ID</th>
//                                                 <th>Tên Sản Phẩm</th>
//                                                 <th>Giá</th>
//                                                 <th>Số Lượng</th>
//                                                 <th>Thời Gian Order</th>
//                                                 <th>Tên Người Đặt</th>
//                                                 <th>Thao Tác</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//             `;
//             if (orderList && orderList.length > 0) {
//                 orderList.forEach(orderItem => {
//                     let formattedDate = new Date(orderItem.orderDate).toLocaleDateString('vi-VN', {
//                         day: '2-digit',
//                         month: '2-digit',
//                         year: 'numeric'
//                     });
//                     html += `
//                         <tr>
//                             <td>${orderItem.id}</td>
//                             <td>${orderItem.name}</td>
//                             <td>${orderItem.price}</td>
//                             <td>${orderItem.quantity}</td>
//                             <td>${formattedDate}</td>
//                             <td>${orderItem.username}</td>
//                             <td><button class="btn btn-danger" onclick="removeOrder(${orderItem.id})">Xóa</button></td>
//                         </tr>
//                     `;
//                 });
//             } else {
//                 html += `<tr><td colspan="7">Không có đơn hàng.</td></tr>`;
//             }
//             html += `
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             `;
//             document.getElementById("main").innerHTML = html;
//         })
//         .catch(error => {
//             console.error('Lỗi khi lấy danh sách đơn hàng', error);
//             document.getElementById("main").innerHTML = `<p>Có lỗi xảy ra khi lấy danh sách đơn hàng.</p>`;
//         });
// }


function getAllOrderList() {
    axios.get(`http://localhost:8080/order_admin/list`)
        .then(res => {
            let orderList = res.data;
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
                <div id="root"></div>
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
                    let formattedDate = new Date(orderItem.orderDate).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    html += `
                        <tr>
                            <td>${orderItem.id}</td>
                            <td>${orderItem.name}</td>
                            <td>${orderItem.price}</td>
                            <td>${orderItem.quantity}</td>
                            <td>${formattedDate}</td>
                            <td>${orderItem.username}</td>
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
            document.getElementById("main").innerHTML = html;
        })
        .catch(error => {
            console.error('Lỗi khi lấy danh sách đơn hàng', error);
            document.getElementById("main").innerHTML = `<p>Có lỗi xảy ra khi lấy danh sách đơn hàng.</p>`;
        });
}