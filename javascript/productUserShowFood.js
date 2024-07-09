function productUserShowFood() {
    axios.get('http://localhost:8080/products/food')
        .then(function (response) {
            let product = response.data;
            let html = `<table border="1">
                             <tr>
                                 <th>Image</th>
                                 <th>Name</th>
                                 <th>Price</th>
                             </tr>`;
            for (let i = 0; i < product.length; i++) {
                html += `<tr>
                                <td><img src="${product[i].image}" alt=""></td>
                                <td>${product[i].name}</td>
                                <td>${product[i].price}</td>
                                <td><button onclick="showFromOrder(${product[i].id})">Gọi đồ</button></td>
                             </tr>`
            }
            html += `</table>`;
            document.getElementById("main").innerHTML = html;
        })
}
