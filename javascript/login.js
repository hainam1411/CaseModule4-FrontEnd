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
        // điều hướng
    }).catch(error =>{
        let notification = error.response.data;
        let check = (typeof notification === 'string')?error.response.data:"Sai tài khoản hoặc mật khẩu";
        alert(check)
    })
}