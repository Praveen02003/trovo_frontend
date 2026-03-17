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



  return (
    <maincontext.Provider value={{
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
      Setblockedcustomerscont

    }}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgetpassword' element={<Forget />} />
          <Route path='/home' element={<Home />} />
          <Route path='/shop' element={<Product />} />

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
          <Route path='/vieworder' element={<Vieweachorder />} />

        </Routes>
      </BrowserRouter>
    </maincontext.Provider>
  );
}

export default App;
