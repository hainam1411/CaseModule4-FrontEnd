function showFromCreate() {
    axios.get('http://localhost:8080/products').then(res => {
        axios.get('http://localhost:8080/categories').then(response => {
            let html = `
    <div>
       <label for="name" class="form-label">Tên Sản Phẩm</label>
        <input class="form-control" type="text" id="name" placeholder="Name">
        <span id="errorname"></span>
        <label for="price" class="form-label">Giá</label>
        <input class="form-control" type="text" id="price" placeholder="price">
        <span id="errorprice"></span>
        <label for="fileButton" class="form-label">Ảnh</label>
        <input class="form-control" type="file" id="fileButton" onchange="uploadImage(event)">
        <input class="form-control" type="hidden" id="image" value="">
        <div id="imgDiv"></div>
        <label for="category" class="form-label">Danh Mục</label>
        <select class="form-select form-select-sm" aria-label="Small select example"  id="category">
            <option value="">---Lựa chọn---</option>`
            let category = response.data;
            category.map(item => {
                html += `<option value="${item.id}">${item.name}</option>`;
            })
            html += `</select>
                <span id="errorcategory"></span>
                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="getAllProduct()">
                        Huỷ
                    </button>
                    <button type="button" class="btn btn-primary" onclick="createCategory()">Lưu</button>
    </div>`
            document.getElementById("main").innerHTML = html;
        })
    })
}

function createCategory() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let image = document.getElementById("image").value;
    let category_id = document.getElementById("category").value;
    let product = {
        name: name,
        price: price,
        image: image,
        type: {
            id: category_id
        }
    }
    axios.post('http://localhost:8080/products', product).then(res => {
        alert("Thêm thành công");
        getAllProduct();
    }).catch(error => {
        checkInput(error.response.data)
    })

}

function uploadImage(e) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="">`
            document.getElementById('image').value = downloadURL;
        });
}