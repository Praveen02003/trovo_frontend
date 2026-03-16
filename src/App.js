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
import { Addproduct } from './admin/add/Addproduct.js';
import { Editproduct } from './admin/edit/Editproduct.js';
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

  //pagination
  const [page, Setpage] = useState(1);

  // Editproduct
  const [eachproduct, Seteachproduct] = useState({})

  // add product
  const [addproduct, Setaddproduct] = useState({})



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

      eachproduct,
      Seteachproduct,

      allbrands,
      Setallbrands,

      addproduct,
      Setaddproduct

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
          <Route path='/addproduct/' element={<Addproduct />} />
          <Route path='/editproduct/:id' element={<Editproduct />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/vieworder' element={<Vieweachorder />} />

        </Routes>
      </BrowserRouter>
    </maincontext.Provider>
  );
}

export default App;
