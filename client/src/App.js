import React from "react";
import './bootstrap.min.css'
import './index.css'
import Header from "./components/Header";
import Footer from "./components/Footer"
import MainPage from "./pages/MainPage";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";

function App() {
    return (
        <Router>
            <div className="App" >
                <Header/>
                <div className="container py-4" style={{minHeight: '80vh'}}>

                    <Route path='/admin/productlist' component={ProductListPage} />
                    <Route path='/admin/user/:id/edit' component={UserEditPage}/>
                    <Route path='/admin/userlist' component={UserListPage}/>
                    <Route path='/order/:id' component={OrderPage} />
                    <Route exact path='/' component={MainPage}/>
                    <Route path='/product/:pid' component={ProductPage}/>
                    <Route path='/cart/:pid?' component={CartPage}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/register' component={RegisterPage}/>
                    <Route path='/profile' component={ProfilePage}/>
                    <Route path='/shipping' component={ShippingPage}/>
                    <Route path='/payment' component={PaymentPage}/>
                    <Route path='/placeorder' component={PlaceOrderPage}/>

                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
