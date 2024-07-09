function productAdminShowFood() {
    axios.get('http://localhost:8080/products/food')
        .then(function (response) {
            document.getElementById("main").innerHTML = "";
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
                html += `<tr>
                                <td>${product[i].id}</td>
                                <td>${product[i].name}</td>
                                <td>${product[i].price}</td>
                                <td><img src="${product[i].image}" alt=""></td>
                             </tr>`
            }
            html += `</table>`;
            document.getElementById("main").innerHTML = html;
        })
}