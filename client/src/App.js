import React from "react";
import './bootstrap.min.css'
import Header from "./components/Header";
import Footer from "./components/Footer"
import MainPage from "./screens/MainPage";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProductPage from "./screens/ProductPage";
import CartPage from "./screens/CartPage";

function App() {
    return (
        <Router>
            <div className="App" >
                <Header/>
                <div className="container py-4" style={{minHeight: '80vh'}}>
                    <Route exact path='/' component={MainPage}/>
                    <Route path='/product/:pid' component={ProductPage}/>
                    <Route path='/cart/:pid?' component={CartPage}/>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
