import { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Forget } from './forget/Forget.js';
import { Login } from './login/Login.js';
import { Signup } from './signup/Signup.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './user/home/Home.js';
import { Product } from './user/product/Product.js';
import { Adminhome } from './admin/home/Adminhome.js';
import { Allproducts } from './admin/products/Allproducts.js';
import { Orders } from './admin/orders/Orders.js';
import { Vieweachorder } from './admin/vieweachorder/Vieweachorder.js';
import { Editproduct } from './admin/edit/Editproduct.js';
import { Customers } from './admin/customers/Customers.js';
import { Vieweachcustomer } from './admin/vieweachcustomer/Vieweachcustomer.js';
import { Profile } from './admin/profile/Profile.js';
import { Allbrands } from './admin/brand/Allbrands.js';
import { Allcategories } from './admin/category/Allcategory.js';
import { Wishlist } from './user/wishlist/Wishlist.js';
import { Offer } from './user/offer/Offerpage.js';
import { Cart } from './user/cart/Cart.js';
import { Checkout } from './user/checkout/Checkout.js';
import { Payment } from './user/payment/Payment.js';
import { Viewproduct } from './user/viewproduct/Viewproduct.js';
import { Orderhistory } from './user/orderhistory/Orderhistory.js';
import { Myorder } from './user/myorders/Myorder.js';
import { Userprofile } from './user/profile/Userprofile.js';
import { Viewparticularorder } from './user/viewparticularorder/Viewparticularorder.js';
export const maincontext = createContext();

function App() {
  // signup
  const [signupname, Setsignupname] = useState("");
  const [signupmail, Setsignupmail] = useState("");
  const [signuppassword, Setsignuppassword] = useState("");
  const [signupconfirmpassword, Setsignupconfirmpassword] = useState("");
  const [signupmobilenumber, Setsignupmobilenumber] = useState("");
  const [signupaddress, Setsignupaddress] = useState("");

  // toast

  const [showtoast, Setshowtoast] = useState(false)
  const [toastcolor, Settoastcolor] = useState("")
  const [toastmessage, Settoastmessage] = useState("")

  // login

  const [loginmail, Setloginmail] = useState("");
  const [loginpassword, Setloginpassword] = useState("");

  // forgetpasword
  const [forgetmail, Setforgetmail] = useState("");
  const [forgetpassword, Setforgetpassword] = useState("");
  const [forgetconfirmpassword, Setforgetconfirmpassword] = useState("");

  //admin
  const [allproducts, Setallproducts] = useState([]);
  const [allcategories, Setallcategories] = useState([]);
  const [allbrands, Setallbrands] = useState([]);
  const [allcustomers, Setallcustomers] = useState([]);

  //pagination
  const [page, Setpage] = useState(1);
  const [status, Setstatus] = useState("");
  const [search, Setsearch] = useState("");
  const [category, Setcategory] = useState("");

  // Editproduct
  const [eachproduct, Seteachproduct] = useState({})
  const [eachcustomer, Seteachcustomer] = useState({})

  // add product
  const [addproduct, Setaddproduct] = useState({})

  // add brand
  const [addbrand, Setaddbrand] = useState("")
  const [editbranddata, Seteditbranddata] = useState({})

  // add category
  const [addcategory, Setaddcategory] = useState("")
  const [addcategoryimage, Setaddcategoryimage] = useState("")
  const [editcategorydata, Seteditcategorydata] = useState({});

  // Profile
  const [userprofile, Setuserprofile] = useState({})

  // Admindashboard
  const [customerscount, Setcustomerscount] = useState(0)
  const [productscount, Setproductscount] = useState(0)
  const [activeproductscount, Setactiveproductscount] = useState(0)
  const [inactiveproductscount, Setinactiveproductscount] = useState(0)
  const [brandscount, Setbrandscount] = useState(0)
  const [categoriescount, Setcategoriescount] = useState(0)
  const [activecustomerscont, Setactivecustomerscont] = useState(0)
  const [blockedcustomerscont, Setblockedcustomerscont] = useState(0)
  const [orderscount, Setorderscount] = useState(0)
  const [totalrevenue, Settotalrevenue] = useState(0);
  const [avgsale, Setavgsale] = useState(0);
  const [recenttransactions, Setrecenttransactions] = useState([]);

  //user

  const [loginuser, Setloginuser] = useState({});
  const [fewproducts, Setfewproducts] = useState([]);
  const [getactiveproducts, Setgetactiveproducts] = useState([]);
  const [particularproduct, Setparticularproduct] = useState({});
  const [wishlistids, Setwishlistids] = useState([]);
  const [wishlistdata, Setwishlistdata] = useState([]);
  const [cartids, Setcartids] = useState([]);
  const [cartdata, Setcartdata] = useState([]);
  const [getcategories, Setgetcategories] = useState([]);

  return (
    <maincontext.Provider value={{
      loginuser,
      Setloginuser,

      signupname,
      Setsignupname,
      signupmail,
      Setsignupmail,
      signuppassword,
      Setsignuppassword,
      signupconfirmpassword,
      Setsignupconfirmpassword,
      signupaddress,
      Setsignupaddress,
      signupmobilenumber,
      Setsignupmobilenumber,

      showtoast,
      Setshowtoast,
      toastcolor,
      Settoastcolor,
      toastmessage,
      Settoastmessage,

      loginmail,
      Setloginmail,
      loginpassword,
      Setloginpassword,
      forgetmail,
      Setforgetmail,
      forgetpassword,
      Setforgetpassword,
      forgetconfirmpassword,
      Setforgetconfirmpassword,

      allproducts,
      Setallproducts,

      allcategories,
      Setallcategories,

      page,
      Setpage,
      status,
      Setstatus,
      search,
      Setsearch,
      category,
      Setcategory,

      eachproduct,
      Seteachproduct,
      eachcustomer,
      Seteachcustomer,

      allbrands,
      Setallbrands,

      addproduct,
      Setaddproduct,

      addbrand,
      Setaddbrand,
      editbranddata,
      Seteditbranddata,

      addcategory,
      Setaddcategory,
      addcategoryimage,
      Setaddcategoryimage,
      editcategorydata,
      Seteditcategorydata,

      allcustomers,
      Setallcustomers,

      userprofile,
      Setuserprofile,

      customerscount,
      Setcustomerscount,
      orderscount,
      Setorderscount,
      productscount,
      Setproductscount,
      activeproductscount,
      Setactiveproductscount,
      inactiveproductscount,
      Setinactiveproductscount,
      brandscount,
      Setbrandscount,
      categoriescount,
      Setcategoriescount,
      activecustomerscont,
      Setactivecustomerscont,
      blockedcustomerscont,
      Setblockedcustomerscont,
      totalrevenue,
      Settotalrevenue,
      recenttransactions,
      Setrecenttransactions,
      avgsale,
      Setavgsale,

      getactiveproducts,
      Setgetactiveproducts,

      fewproducts,
      Setfewproducts,

      particularproduct,
      Setparticularproduct,

      wishlistids,
      Setwishlistids,
      wishlistdata,
      Setwishlistdata,

      cartids,
      Setcartids,
      cartdata,
      Setcartdata,

      getcategories,
      Setgetcategories,

    }}>

      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgetpassword' element={<Forget />} />


          {/* Admin routes */}

          <Route path='/admindashboard' element={<Adminhome />} />
          <Route path='/allproduct' element={<Allproducts />} />
          <Route path='/editproduct/:id' element={<Editproduct />} />
          <Route path='/customers' element={< Customers />} />
          <Route path='/vieweachcustomer/:id' element={< Vieweachcustomer />} />
          <Route path='/myprofile/:id' element={< Profile />} />
          <Route path='/allbrands' element={< Allbrands />} />
          <Route path='/allcategories' element={< Allcategories />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/vieworder/:id' element={<Vieweachorder />} />

          {/* User routes */}
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Product />} />
          <Route path='/offer' element={<Offer />} />

          <Route path='/viewproduct/:id' element={<Viewproduct />} />
          <Route path='/history/:id' element={<Orderhistory />} />
          <Route path='/trackorder/:id' element={<Myorder />} />
          <Route path='/userprofile/:id' element={<Userprofile />} />
          <Route path='/wishlist/:id' element={<Wishlist />} />
          <Route path='/cart/:id' element={<Cart />} />
          <Route path='/checkout/:id' element={<Checkout />} />
          <Route path='/payment/:id' element={<Payment />} />
          <Route path="/orderdetails/:orderId" element={<Viewparticularorder />} />






        </Routes>
      </BrowserRouter>
    </maincontext.Provider>
  );
}

export default App;
