function productAdminShowDrink() {
    axios.get('http://localhost:8080/products/drink')
        .then(function (response) {
            let product = response.data;
            let html = `
                <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body table-responsive p-0">
                                <table class="table table-striped table-valign-middle table-bordered">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Đồ Uống</th>
                                        <th>Giá</th>
                                        <th>Hình ảnh</th>
                                    </tr>
                                    </thead>
                                    <tbody>
            `;
            for (let i = 0; i < product.length; i++) {
                html += `
                    <tr>
                         <td>${i+1}</td>
                         <td>${product[i].name}</td>
                         <td>${product[i].price}</td>
                         <td><img src="${product[i].image}" alt="" height="100px" width="auto"></td>
                    </tr>
                `
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
}