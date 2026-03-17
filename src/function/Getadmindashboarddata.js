import api from "../axios/Axios";

export const Getadmindashboarddata = async (
    Setcustomerscount,
    Setproductscount,
    Setactiveproductscount,
    Setinactiveproductscount,
    Setbrandscount,
    Setcategoriescount,
    Setactivecustomerscont,
    Setblockedcustomerscont
) => {
    try {
        const res = await api.get("/getadmindashboarddata");
        const d = res.data.data; // The single row object

        Setcustomerscount(d.customers);
        Setproductscount(d.products);
        Setactiveproductscount(d.active);
        Setinactiveproductscount(d.inactive);
        Setbrandscount(d.brands);
        Setcategoriescount(d.categories);
        Setactivecustomerscont(d.activeCustomers)
        Setblockedcustomerscont(d.blockedCustomers)
    } catch (error) {
        console.log("Error loading dashboard");
    }
};

