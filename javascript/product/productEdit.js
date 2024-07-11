function showFromUpdate(id) {
    let token = getCurrenUser().accessToken;
    axios.get('http://localhost:8080/products/' + id,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        let product = res.data;
        axios.get('http://localhost:8080/categories').then(response => {
            let html = `
            <div id="root"></div>
<!--            moi-->
            <div class="container">
    <form>
        <div class="card-body">
            <div class="form-group">
            <label for="id" class="form-label">ID</label>
            <input class="form-control" type="number" id="id" value="${product.id}" readonly>
            </div>
            <div class="form-group">
            <label for="name" class="form-label">Sản Phẩm</label>
            <input class="form-control" type="text" id="name" value="${product.name}">
            <span id="errorname"></span>
            </div>
            <div class="form-group">
            <label for="price" class="form-label">Giá</label>
            <input class="form-control" type="text" id="price" value="${product.price}">
            <span id="errorprice"></span>
            </div>
            <div class="form-group">
            <label for="fileButton" class="form-label">Ảnh</label>
            <input class="form-control" type="file" id="fileButton" onchange="uploadImage(event)">
            <input class="form-control" type="hidden" id="image" value="${product.image}">
            <img src="${product.image}" alt="">
            </div>
            <div class="form-group">
            <div id="imgDiv"></div>
            </div>
            <div class="form-group">
            <label for="category" class="form-label">Danh Mục</label>
            <select class="form-select form-select-sm" aria-label="Small select example"  id="category">
                <option value="">---Lựa chọn---</option>`;
                let categories = response.data;
                categories.forEach(item => {
                if (item.id === product.category.id) {
                html += `<option value="${item.id}" selected>${item.name}</option>`;
                } else {
                html += `<option value="${item.id}">${item.name}</option>`;
                }
                });

                html += `</select>
                <span id="errorcategory"></span>
            </div>
            <div class="d-flex flex-row-reverse card-footer">
                <div class="p-2">
                    <button type="button" class="btn btn-secondary" onclick="update(${product.id})">Update</button>
                </div>
                <div class="p-2">
                    <button type="button" class="btn btn-secondary" onclick="getAllProduct()">Hủy</button>
                </div>
            </div>
        </div>
    </form>
</div>`
// <!--            moi-->
//             <div>
//                 <label for="id" class="form-label">ID</label>
//                 <input class="form-control" type="number" id="id" value="${product.id}" readonly>
//                 <label for="name" class="form-label"></label>
//                 <input class="form-control" type="text" id="name" value="${product.name}">
//                 <span id="errorname"></span>
//                 <label for="price" class="form-label"></label>
//                 <input class="form-control" type="text" id="price" value="${product.price}">
//                 <span id="errorprice"></span>
//                 <label for="fileButton" class="form-label">Ảnh</label>
//                 <br>
//                 <input class="form-control" type="file" id="fileButton" onchange="uploadImage(event)">
//                 <input class="form-control" type="hidden" id="image" value="${product.image}">
//                 <img src="${product.image}" alt="">
//                 <div id="imgDiv"></div>
//                  <label for="category" class="form-label">Danh Mục</label>
//                 <select class="form-select form-select-sm" aria-label="Small select example"  id="category">
//                     <option value="">---Lựa chọn---</option>`;
//
//             let categories = response.data;
//             categories.forEach(item => {
//                 if (item.id === product.category.id) {
//                     html += `<option value="${item.id}" selected>${item.name}</option>`;
//                 } else {
//                     html += `<option value="${item.id}">${item.name}</option>`;
//                 }
//             });
//
//             html += `</select>
//                     <span id="errorcategory"></span>
//                     <div class="row">
//                     <div class="col-2">
//                     <button type="button" class="btn btn-secondary" onclick="update(${product.id})">Update</button>
//                     </div class="col-2">
//                     <div>
//                 <button type="button" class="btn btn-secondary" onclick="getAllProduct()">Hủy</button>
//                 </div>
//                     <div>
//
// </div>
// </div>
//
//                 </div>
//
//
//             `
            ;

            document.getElementById("main").innerHTML = html;
        }).catch(error => {
            console.error("Lỗi khi tìm categories:", error);
        });
    }).catch(error => {
        console.error("Lỗi khi tìm sản phẩm", error);
        document.getElementById("root").innerHTML = html;
    });
}

function update(id) {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let image = document.getElementById("image").value;
    let category_id = document.getElementById("category").value;

    let product = {
        name: name,
        price: price,
        image: image,
        category: {
            id: category_id
        }
    };
    axios.put('http://localhost:8080/products/' + id, product)
        .then(res => {
            alert("Sửa thành công");
            getAllProduct();
        })
        .catch(error => {
            console.log(error.response);
            // checkInput(error.response.data);
        });
}