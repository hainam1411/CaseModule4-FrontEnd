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
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                 aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="modal-food">Thêm mới đồ ăn </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="foodName" class="form-label">Tên Đồ Ăn</label>
                                                <input class="form-control" id="foodName" placeholder="">
                                            </div>
                                            <div class="mb-3">
                                                <label for="foodCost" class="form-label">Đơn Giá</label>
                                                <input class="form-control" id="foodCost" placeholder="">
                                            </div>
                                            <div class="mb-3">
                                                <label for="formFile" class="form-label">Ảnh</label>
                                                <input class="form-control" type="file" id="formFile">
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                    Huỷ
                                                </button>
                                                <button type="button" class="btn btn-primary">Lưu</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    axios.get('http://localhost:8080/cars/search?name='+name).then(res => {
        let product = res.data;
        let html = `
            <div class="content">
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
        html += `                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        document.getElementById("main").innerHTML = html;
    })
}