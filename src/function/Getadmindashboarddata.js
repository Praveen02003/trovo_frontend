import api from "../axios/Axios";

export const Getadmindashboarddata = async (
    Setcustomerscount,
    Setproductscount,
    Setactiveproductscount,
    Setinactiveproductscount,
    Setbrandscount,
    Setcategoriescount,
    Setactivecustomerscont,
    Setblockedcustomerscont,
    Setorderscount,
    Settotalrevenue,       // New Setter
    Setrecenttransactions  // New Setter
) => {
    try {
        const res = await api.get("/getadmindashboarddata");
        
        // d contains the single row counts/revenue
        const d = res.data.data; 
        // rt contains the array of the last 5 transactions
        const rt = res.data.recentTransactions;
        console.log(rt,"===>");
        

        // Set counts
        Setcustomerscount(d.customers);
        Setproductscount(d.products);
        Setactiveproductscount(d.active);
        Setinactiveproductscount(d.inactive);
        Setbrandscount(d.brands);
        Setcategoriescount(d.categories);
        Setactivecustomerscont(d.activeCustomers);
        Setblockedcustomerscont(d.blockedCustomers);
        Setorderscount(d.orders);

        // Set New Data
        Settotalrevenue(d.totalRevenue || 0); // Handles null if no orders exist
        Setrecenttransactions(rt || []);      // Handles empty transactions

    } catch (error) {
        console.log("Error loading dashboard", error);
    }
};
