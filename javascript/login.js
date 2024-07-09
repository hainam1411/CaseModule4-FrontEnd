function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let userLogin = {
        username : username,
        password : password
    }
    axios.post("http://localhost:8080/login",userLogin).then(res =>{
        console.log(res.data)
        alert("Đăng nhập thành công")
        localStorage.setItem("currentUser",JSON.stringify(res.data))
        let token = getCurrenUser().accessToken;
        // showUsers(token)
    }).catch(error =>{
        console.log(error.response.data)
        alert("Sai tài khoản hoặc mật khẩu")
    })
}