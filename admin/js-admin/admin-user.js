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
                let time = Math.round(users[i].time/60);
            html += `<tr>
                                        <td>${i + 1}</td>
                                        <td>${users[i].username}</td>
                                        <td>${users[i].identityCode}</td>
                                        <td>${time}</td>
                                        <td>${status}</td>
                                        <td>
                                            <button data-id="${users[i].username}" type="button" class="btn btn-success" data-bs-toggle="modal"
                                    data-bs-target="#updateUser"><i class="fas fa-edit"></i>
                                            </button>
                                       </div>    
                                            <button data-id="${users[i].username}" type="button" class="btn btn-warning" data-bs-toggle="modal" 
                                            data-bs-target="#naptien" ><i class="fas fa-dollar-sign"></i>
                                            </button>                                
                            </div>
                                        </td>
                                    </tr>`
        }
              html += `   </tbody>
                         </table>`
        document.getElementById("main").innerHTML = html;
    })
}
showListUser()
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

function updatePassword() {
    let username = document.getElementById("txtUser").value;
    let password = document.getElementById("txtUpdatePassword").value;
    let user = {
        username : username,
        password : password
    }
    axios.post('http://localhost:8080/admin/users',user).then(res =>{
        alert("Sửa thành công")
    })
}

function updateMoney() {
    let username = document.getElementById("txtUpdateUser").value;
    let money = document.getElementById("txtUpdateMoney").value;
    let time = (money/10000)*60*60;
    let user = {
        username : username,
        time : time
    }

    axios.post('http://localhost:8080/admin/users/money',user).then(res =>{
        alert("Nạp tiền thành công");
        let idUser = res.data.id;
        let transactionHistory={
            user : {
                id : idUser
            },
            price : money
        }
            axios.post('http://localhost:8080/history',transactionHistory).then(res =>{
                console.log("Lưu lịch sử thành công")
            })
    })
}

function createUser() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let identityCode = +document.getElementById("identityCode").value;
    console.log(identityCode)
    let user = {
        username: username,
        password: password,
        identityCode: identityCode
    }
    axios.post('http://localhost:8080/register', user).then(res => {
        alert("Thêm thành công");
        // quay về trang chủ
    }).catch(error => {
        console.log(1)
        checkInput(error.response.data)
    })

}

function checkInput(errors) {
    errors.map(item => {
        let err = item.split(':')
        document.getElementById('error' + err[0]).innerHTML = err[1]
    })
}

// let countdownDate = localStorage.getItem('countdownDate');
//
// if (!countdownDate) {
//     // Nếu không có giá trị trong localStorage, tạo giá trị mới
//     countdownDate = new Date().getTime() + 5 * 60 * 1000; // Đếm ngược 5 phút
//     localStorage.setItem('countdownDate', countdownDate);
// } else {
//     // Chuyển đổi giá trị từ localStorage thành số
//     countdownDate = parseInt(countdownDate, 10);
// }
//
// // Cập nhật đếm ngược mỗi giây
// const countdownInterval = setInterval(() => {
//     const now = new Date().getTime();
//     const distance = countdownDate - now;
//
//     // Tính toán thời gian cho phút và giây
//     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
//
//     // Hiển thị kết quả trong phần tử có id="countdown"
//     document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s ";
//
//     // Nếu thời gian đếm ngược kết thúc, hiển thị nội dung kết thúc
//     if (distance < 0) {
//         clearInterval(countdownInterval);
//         document.getElementById("countdown").innerHTML = "EXPIRED";
//         localStorage.removeItem('countdownDate');
//     }
// }, 1000);