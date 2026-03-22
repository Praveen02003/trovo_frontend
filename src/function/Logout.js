import { showSwal } from "./SwalHelper";

export const Logout = async () => {
    const result = await showSwal({
        title: "Are you sure?",
        text: "Do you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout",
        cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
        // Clear storage
        localStorage.removeItem('loginuser');
        localStorage.removeItem('token');

        // Show success message
        await showSwal({
            title: "Logout Successful!",
            text: "You have been logged out.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });

        // Redirect to login
        window.location.href = "/login";
    }
};