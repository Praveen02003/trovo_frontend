export const Logout = () => {
    localStorage.removeItem('loginuser');
    localStorage.removeItem('token');
    window.location.href = "/login";
}