export const Authuser = () => {
    const token = localStorage.getItem('token');
    const loginuser = localStorage.getItem('loginuser');

    // Check if token and user exist
    if (token && loginuser) {
        try {
            const user = JSON.parse(loginuser); // parse JSON string
            if (user) {
                // Redirect to home/dashboard
                window.location.href = "/";
                return; // stop execution
            }
        } catch (error) {
            console.error("Invalid loginuser data in localStorage", error);
            // Optionally, clear invalid data
            localStorage.removeItem('loginuser');
            localStorage.removeItem('token');
        }
    }

    // If no token/user, stay on the current page (e.g., login page)
};