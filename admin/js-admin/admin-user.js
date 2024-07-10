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
                let time = formatTime(users[i].time);
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



function showHistory() {
    axios.get('http://localhost:8080/history').then(res => {
        let history = res.data;
        let html = `<table class="table table-striped table-valign-middle table-bordered">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên Tài Khoản </th>
                                        <th>Số Tiền</th>
                                        <th>Thời Gian</th>
                                    </tr>
                                    </thead>
                                    <tbody>`
        for (let i = 0; i < history.length; i++) {
            let time = formatDate(history[i].dateTime)
            html += `<tr>
                                        <td>${i + 1}</td>
                                        <td>${history[i].user.username}</td>
                                        <td>${history[i].price}</td>
                                        <td>${time}</td>
                                    </tr>`
        }
        html += `   </tbody>
                         </table>`

        document.getElementById("main").innerHTML = html;
    })
}
function formatDate(dateString) {
    // Chuyển chuỗi thành đối tượng Date
    const date = new Date(dateString);

    // Tạo các thành phần ngày, giờ, phút, giây
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Tạo chuỗi định dạng mong muốn
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}