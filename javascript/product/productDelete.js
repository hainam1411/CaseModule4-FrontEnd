function remove(id) {
    let token = getCurrenUser().accessToken;
    let choice = confirm("Bạn chắc chưa ???");
    if (choice){
        axios.delete('http://localhost:8080/products/'+id,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            alert("Xóa thành công");
            getAllProduct();
        })
    }else {
        alert("Mày đùa tao à");
    }
}