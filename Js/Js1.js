document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('myModal');
    const registerBtn = document.querySelector('#myModal .modal-footer button');
    const fullNameInput = document.querySelector('#myModal input[placeholder="Họ và tên"]');
    const phoneInput = document.querySelector('#myModal input[placeholder="Số điện thoai"]');
    const dobInput = document.querySelector('#myModal input[type="date"]');
    const emailInput = document.querySelector('#myModal input[type="email"]');
    const passwordInput = document.querySelector('#myModal input[type="password"]');
    const togglePassword = document.getElementById('togglePassword');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('active');
    });

    registerBtn.addEventListener('click', function() {
        let error = false;

        // Validate Full Name// Xác thực họ tên
        if (!/^[A-Za-zÀ-Ỹà-ỹ]*([\s][A-Za-zÀ-Ỹà-ỹ]*)*$/.test(fullNameInput.value.trim())) {
            alert('Họ tên phải bắt đầu bằng kí tự hoa và không chứa kí tự đặc biệt.');
            error = true;
        }

        // Validate Phone Number //Xác thực số điện thoại
        if (!/^\d{10}$/.test(phoneInput.value.trim())) {
            alert('Số điện thoại phải có đúng 10 chữ số.');
            error = true;
        }

        // Validate Date of Birth //Xác thực ngày sinh
        const currentDate = new Date();
        const inputDate = new Date(dobInput.value);
        const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
        if (inputDate >= oneYearAgo) {
            alert('Ngày sinh phải bé hơn ngày hiện tại 1 năm.');
            error = true;
        }

        // Validate Email
        if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
            alert('Email không hợp lệ.');
            error = true;
        }

        // Validate Password
        if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(passwordInput.value)) {
            alert('Password phải có ít nhất 6 kí tự, bao gồm ít nhất một chữ hoa, một chữ thường, một số, và một kí tự đặc biệt.');
            error = true;
        }

        // If no error, proceed with registration
        if (!error) {
            // Lưu email và password vào Local Storage
            localStorage.setItem('registeredEmail', emailInput.value);
            localStorage.setItem('registeredPassword', passwordInput.value);
            
            // Thực hiện hành động của bạn sau khi đăng ký thành công
            alert('Đăng ký thành công!');

            // Đóng form
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('myModal2');
    const loginBtn = document.querySelector('#myModal2 .modal-footer button');
    const emailInput = document.querySelector('#myModal2 input[type="email"]');
    const passwordInput = document.querySelector('#myModal2 input[type="password"]');
    const eyeIcon = document.querySelector('#myModal2 .toggle-password i');

    loginBtn.addEventListener('click', function() {
        const enteredEmail = emailInput.value.trim();
        const enteredPassword = passwordInput.value;

        // Lấy email và password đã đăng ký từ Local Storage
        const registeredEmail = localStorage.getItem('registeredEmail');
        const registeredPassword = localStorage.getItem('registeredPassword');

        // Kiểm tra xem email và password nhập vào có khớp với email và password đã đăng ký hay không
        if (enteredEmail === registeredEmail && enteredPassword === registeredPassword) {
            alert('Đăng nhập thành công!');
        } else {
            // Nếu không khớp, hiển thị thông báo lỗi
            alert('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
        }
    });

    // click biểu tượng 
    eyeIcon.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // Thay đổi icon tùy thuộc vào kiểu hiển thị mật khẩu
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});
