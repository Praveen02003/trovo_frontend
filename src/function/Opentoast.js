export const Opentoast = (Setshowtoast) => {
    Setshowtoast(true);
    setTimeout(() => {
        Setshowtoast(false);
    }, 1000);
}