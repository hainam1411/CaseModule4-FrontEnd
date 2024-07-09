function getAllProduct() {
    axios.get('http://localhost:8080/products')
        .then(function (response) {
            let product = response.data;
            let html = `
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

function search() {
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