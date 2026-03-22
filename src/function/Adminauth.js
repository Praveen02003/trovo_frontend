export const Adminauth = async () => {
    const token = localStorage.getItem("token");
    const loginuserRaw = localStorage.getItem("loginuser");

    if (!token || !loginuserRaw) {
        window.location.href = "/login"; // Not logged in
        return false;
    }

    try {
        const loginuser = JSON.parse(loginuserRaw);

        if (loginuser.role !== "admin") {
            window.location.href = "/"; // Not admin
            return false;
        }

        // If you need, you can await some API check here
        // Example: await fetch('/api/checktoken')

        return true; // Admin verified
    } catch (error) {
        console.error("Invalid loginuser data", error);
        localStorage.removeItem("token");
        localStorage.removeItem("loginuser");
        window.location.href = "/login";
        return false;
    }
};