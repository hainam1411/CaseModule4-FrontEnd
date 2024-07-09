function showListUser() {
    axios.get('http://localhost:8080/admin/users').then(res => {
        let users = res.data;
        let html = `<table class="table table-striped table-valign-middle">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tài Khoản</th>
                                        <th>CCCD</th>
                                        <th>Thời Gian Còn Lại</th>
                                        <th>Trạng Thái</th>
                                        <th>Thao Tác</th>
                                    </tr>
                                    </thead>
                                    <tbody>`
        for (let i = 0; i < users.length; i++) {
                let status = (users[i].enabled) ? "Hoạt động" : "Nghỉ";
            html += `<tr>
                                        <td>${i + 1}</td>
                                        <td>${users[i].username}</td>
                                        <td>${users[i].identityCode}</td>
                                        <td>1000</td>
                                        <td>${status}</td>
                                        <td>
                                            <button data-id="${users[i].username}" type="button" class="btn btn-success" data-bs-toggle="modal"
                                    data-bs-target="#updateUser"><i class="fas fa-edit"></i>
                                            </button>
                                       </div>    
                                            <button data-id="${users[i].username}" type="button" class="btn btn-warning" data-bs-toggle="modal" 
                                            data-bs-target="#naptien" ><i class="fas fa-dollar-sign"></i>
                                            </button>
<!--                                            <div class="modal fade" id="updateMoney" tabindex="-1" aria-labelledby="exampleModalLabel"-->
<!--                                 aria-hidden="true">-->
                                
                            </div>
                                        </td>
                                    </tr>`
        }
              html += `   </tbody>
                         </table>`
        document.getElementById("listUser").innerHTML = html;
    })
}
const modalMoney = document.getElementById('naptien')
if (modalMoney) {
    modalMoney.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget
        const id = button.getAttribute('data-id')
        const usernameInput = modalMoney.querySelector('.modal-body #txtUpdateUser')
        const moneyInput = modalMoney.querySelector('.modal-body #txtUpdateMoney')
        usernameInput.value = id
        moneyInput.value = 0;
        const modalTitle = modalMoney.querySelector('.modal-title')
        modalTitle.innerHTML = `Nạp tiền cho tài khoản <strong>${id}</strong>`;
    })
}
const updateUser = document.getElementById('updateUser')
if (updateUser) {
    updateUser.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget
        const id = button.getAttribute('data-id')
        const usernameInput = updateUser.querySelector('.modal-body #txtUser')
        const moneyInput = updateUser.querySelector('.modal-body #txtUpdatePassword')
        usernameInput.value = id
        const modalTitle = updateUser.querySelector('.modal-title')
        modalTitle.innerHTML = `Cập Nhật Mật Khẩu <strong>${id}</strong>`;
    })
}

function updatePassword(id) {
    let username = document.getElementById("txtUser").value;
    let password = document.getElementById("txtUpdatePassword").value;
    let user = {
        username : username,
        password : password
    }
    axios.put('http://localhost:8080/admin/users/'+id,user).then(res =>{
        alert("Sửa thành công")
    }).catch(error =>{
        checkInputPassword(error)
    })
}

function checkInputPassword(error) {
    error.map(item =>{
        let err = item.split(':')
        document.getElementById('error' + err[0]).innerHTML = err[1]
    })
}