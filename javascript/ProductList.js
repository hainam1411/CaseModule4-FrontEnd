function getAll() {
    axios.get('http://localhost:8080/products')
        .then(function (response) {
            let product = response.data;
            let html = `<table border="1">
                             <tr>
                                 <td>Id</td>
                                 <td>Name</td>
                                 <td>Price</td>
                                 <td>Image</td>
                                 <td>Category</td>
                                 <td colspan="2">Action</td>
                             </tr>`;
            for (let i = 0; i < product.length; i++) {
                let category_name = (product[i].category != null) ? product[i].category.name : null;
                html += `<tr>
                                <td>${product[i].id}</td>
                                <td>${product[i].name}</td>
                                <td>${product[i].price}</td>
                                <td><img src="${product[i].image}" alt=""></td>
                                <td>${category_name}</td>
                                <td><button onclick="showFromUpdate(${product[i].id})">Edit</button></td>
                                <td><button onclick="remove(${product[i].id})">Delete</button></td>
                             </tr>`
            }
            html += `</table>`;
            document.getElementById("main").innerHTML = html;
        })
}

getAll()

function search() {
    let name = document.getElementById("search").value;
    axios.get('http://localhost:8080/cars/search?name='+name).then(res => {
        let cars = res.data;
        let html = `<table border="1">
                             <tr>
                                 <td>Id</td>
                                 <td>Name</td>
                                 <td>Frame Code</td>
                                 <td>Machine Code</td>
                                 <td>Production Date</td>
                                 <td>Price</td>
                                 <td>Quantity</td>
                                 <td>Image</td>
                                 <td>Producer</td>
                                 <td>Type</td>
                                 <td colspan="2">Action</td>
                             </tr>`;
        for (let i = 0; i < cars.length; i++) {
            let dateArr = cars[i].productionDate;
            let dateObject = new Date(dateArr[0],dateArr[1]-1,dateArr[2]);
            let dateString = dateObject.getFullYear() + '-' + ('0' + (dateObject.getMonth() + 1)).slice(-2) + '-' + ('0' + dateObject.getDate()).slice(-2);
            let type_name = (cars[i].type != null) ? cars[i].type.name : null;
            let producer_name = (cars[i].producer != null) ? cars[i].producer.name : null;
            html += `<tr>
                                <td>${cars[i].id}</td>
                                <td>${cars[i].name}</td>
                                <td>${cars[i].frameCode}</td>
                                <td>${cars[i].machineCode}</td>
                                <td>${dateString}</td>
                                <td>${cars[i].price}</td>
                                <td>${cars[i].quantity}</td>
                                <td><img src="${cars[i].image}" alt=""></td>
                                <td>${producer_name}</td>
                                <td>${type_name}</td>
                                <td><button onclick="showFromUpdate(${cars[i].id})">Edit</button></td>
                                <td><button onclick="remove(${cars[i].id})">Delete</button></td>
                             </tr>`
        }
        html += `</table>`;
        document.getElementById("main").innerHTML = html;
    })
}

function goToProducer() {
    window.location.href = "producer.html"
}

function goToType() {
    window.location.href = "type.html"
}