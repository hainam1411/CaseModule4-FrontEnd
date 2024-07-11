function removeOrder(id) {
    let token = getCurrenUser().accessToken;
    let choice = confirm("Bạn chắc chưa ???");
    if (choice){
        axios.delete('http://localhost:8080/order_admin/'+id,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            alert("Xóa thành công");
            getAllOrderList();
        })
    }else {
        alert("Rảnh à");
    }
}