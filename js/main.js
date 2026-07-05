function saveTokens() {
    const token = document.getElementById('inputToken1').value;
    localStorage.setItem('user_token', token);
    alert('Đã lưu!');
}
