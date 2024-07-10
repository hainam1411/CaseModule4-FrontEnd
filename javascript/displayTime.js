function getTime() {
    let token = getCurrenUser().accessToken;
    let username = getCurrenUser().username;
    document.getElementById("username").innerHTML = username;
    axios.post("http://localhost:8080/users/time", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        let time = res.data;
        console.log(time)
        let countdownDate = localStorage.getItem('countdownDate');

        if (!countdownDate) {
            // Nếu không có giá trị trong localStorage, tạo giá trị mới
            countdownDate = new Date().getTime() + time * 1000;
            localStorage.setItem('countdownDate', countdownDate);
        } else {
            // Chuyển đổi giá trị từ localStorage thành số
            countdownDate = parseInt(countdownDate, 10);
        }

// Cập nhật đếm ngược mỗi giây
        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            // Tính toán thời gian cho giờ, phút và giây
            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            let timeString = hours + "h " + minutes + "m " + seconds + "s ";
            document.getElementById("countdown").innerHTML = timeString;

            // Nếu thời gian đếm ngược kết thúc, hiển thị nội dung kết thúc
            if (distance < 2) {
                clearInterval(countdownInterval);
                document.getElementById("countdown").innerHTML = "Hết giờ";
                logout();
            }
        }, 1000);
    }).catch(error => {
        console.log(error)
    })
}

getTime()
