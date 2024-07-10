function getCurrenUser() {
    let getCurrentUser =JSON.parse(localStorage.getItem("currentUser"));
    return getCurrentUser;

}
function logout() {
    let token = getCurrenUser().accessToken;
    console.log(token)
    axios.post('http://localhost:8080/user/logout',{} ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res =>{
        localStorage.clear();
        window.location.href = "/login.html";
    }).catch(error =>{
        console.log(error)
    })
}