export const Userauth = async () => {
    const token = localStorage.getItem("token");
    const loginuserRaw = localStorage.getItem("loginuser");

    // If no token or login user, redirect to home
    if (!token || !loginuserRaw) {
        window.location.href = "/";
        return false; // stop execution
    }

    try {
        const loginuser = JSON.parse(loginuserRaw);

        // You could add more checks here if needed
        return true; // user is authenticated
    } catch (error) {
        console.error("Invalid login user data", error);
        localStorage.removeItem("token");
        localStorage.removeItem("loginuser");
        window.location.href = "/";
        return false;
    }
};