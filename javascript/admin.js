function create() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let identityCode = +document.getElementById("identityCode").value;
    console.log(identityCode)
    let user = {
        username: username,
        password: password,
        identityCode: identityCode
    }
    console.log(user)
    axios.post('http://localhost:8080/register', user).then(res => {
        alert("Thêm thành công");
        // quay về trang chủ
    }).catch(error => {
        checkInput(error.response.data)
    })

}

function checkInput(errors) {
    errors.map(item => {
        let err = item.split(':')
        document.getElementById('error' + err[0]).innerHTML = err[1]
    })
}