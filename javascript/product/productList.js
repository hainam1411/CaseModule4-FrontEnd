function getAllProduct() {
    axios.get('http://localhost:8080/products')
        .then(function (response) {
            let product = response.data;
            let html = `
        <div class="container-fluid d-flex flex-row-reverse">
                <div class="row">
                    <div class="form-inline col-md-6">
                        <div class="input-group" data-widget="sidebar-search">
                            <input class="form-control form-control-sidebar" type="search" placeholder="Search"
                                   aria-label="Search" id="search">
                            <div class="input-group-append">
                                <button class="btn btn-sidebar" onclick="searchProduct()">
                                    <i class="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-2">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" onclick="showFromCreate()">
                                <i class="fas fa-user-plus">Thêm mới</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="row col-lg-12">
                        <div class="card col">
                            <div class="card-body table-responsive p-0">
                                <table class="table table-striped table-valign-middle">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Đồ Uống</th>
                                        <th>Giá</th>
                                        <th>Hình ảnh</th>
                                        <th>Thể Loại</th>
                                        <th>Thao Tác</th>
                                    </tr>
                                    </thead>
                                    <tbody>
        `;
            for (let i = 0; i < product.length; i++) {
                let category_name = (product[i].type != null) ? product[i].type.name : null;
                html += `
            <tr>
                  <td>${product[i].id}</td>
                  <td>${product[i].name}</td>
                  <td>${product[i].price}</td>
                  <td><img src="${product[i].image}" alt=""></td>
                  <td>${category_name}</td>
                  <td>
                         <button type="button" class="btn btn-success" onclick="showFromUpdate(${product[i].id})"><i class="fas fa-edit"></i></button>
                         <button type="button" class="btn btn-danger" onclick="remove(${product[i].id})"><i class="fas fa-trash"></i></button>
                  </td>
            </tr>
                                  
`
            }
            html += `                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`;
            document.getElementById("main").innerHTML = html;
        })
}

function searchProduct() {
    let name = document.getElementById("search").value;
    axios.get('http://localhost:8080/products/search?name=' + name)
        .then(res => {
            let products = res.data;
            if (products.length === 0) {
                // Hiển thị thông báo khi không tìm thấy sản phẩm
                document.getElementById("main").innerHTML = '<p>Không tìm thấy sản phẩm nào.</p>';
                return;
            }

            let html = `
                    <div class="container-fluid d-flex flex-row-reverse">
                <div class="row">
                    <div class="form-inline col-md-6">
                        <div class="input-group" data-widget="sidebar-search">
                            <input class="form-control form-control-sidebar" type="search" placeholder="Search"
                                   aria-label="Search" id="search">
                            <div class="input-group-append">
                                <button class="btn btn-sidebar" onclick="searchProduct()">
                                    <i class="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-2">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" onclick="showFromCreate()">
                                <i class="fas fa-user-plus">Thêm mới</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="row col-lg-12">
                                <div class="card col">
                                    <div class="card-body table-responsive p-0">
                                        <table class="table table-striped table-valign-middle">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Đồ Uống</th>
                                                    <th>Giá</th>
                                                    <th>Hình ảnh</th>
                                                    <th>Thể Loại</th>
                                                    <th>Thao Tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;

            products.forEach(product => {
                let category_name = (product.category != null) ? product.category.name : null;
                html += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td><img src="${product.image}" alt=""></td>
                        <td>${category_name}</td>
                        <td>
                            <button type="button" class="btn btn-success" onclick="showFromUpdate(${product.id})"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn btn-danger" onclick="remove(${product.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>`;
            });

            html += `           </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
`;

            document.getElementById("main").innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            // Xử lý lỗi khi request không thành công
            document.getElementById("main").innerHTML = '<p>Có lỗi xảy ra khi tải dữ liệu.</p>';
        });
}