export const Getloginuser = () => {
    const user = JSON.parse(localStorage.getItem('loginuser'));
    console.log(user);
    
    return user || null; // Return the user directly
}