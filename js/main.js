function saveTokens() {
    const token = document.getElementById('inputToken1').value.trim();
    if (!token) return alert("Vui lòng nhập token!");
    
    // Lưu tạm vào localStorage (Lưu ý: Chỉ dùng cho test)
    localStorage.setItem('user_token', token);
    alert('✅ Đã lưu token vào trình duyệt!');
}
