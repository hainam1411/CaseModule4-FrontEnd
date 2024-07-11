function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let userLogin = {
        username : username,
        password : password
    }
    axios.post("http://localhost:8080/login",userLogin).then(res =>{
        alert("Đăng nhập thành công")
        localStorage.setItem("currentUser",JSON.stringify(res.data))
        if (getCurrenUser().roles[0].authority == "ROLE_USER"){
            window.location = `./user.html`;
        }else {
            window.location = `./admin/index-admin.html`;
        }
    }).catch(error =>{
        alert("Sai tài khoản hoặc mật khẩu")
    })
}
function getCurrenUser() {
    let getCurrentUser =JSON.parse(localStorage.getItem("currentUser"));
    return getCurrentUser;

}

