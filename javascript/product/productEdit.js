function showFromUpdate(id) {
    axios.get('http://localhost:8080/products/' + id).then(res => {
        let product = res.data;
        axios.get('http://localhost:8080/categories').then(response => {
            let html = `
            <div>
                <input type="number" id="id" value="${product.id}" readonly>
                <input type="text" id="name" value="${product.name}">
                <span id="errorname"></span>
                <input type="text" id="price" value="${product.price}">
                <span id="errorprice"></span>
                <input type="file" id="fileButton" onchange="uploadImage(event)">
                <input type="hidden" id="image" value="${product.image}">
                <img src="${product.image}" alt="">
                <div id="imgDiv"></div>
                <select id="category">
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
                    <button onclick="update(${product.id})">Update</button>
                </div>`;

            document.getElementById("main").innerHTML = html;
        }).catch(error => {
            console.error("Error fetching categories:", error);
        });
    }).catch(error => {
        console.error("Error fetching product:", error);
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