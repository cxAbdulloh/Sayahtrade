import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NavBottom from "./components/NavBottom/NavBottom";
import Home from "./pages/Home";
import LoginSection from "./pages/LoginSection/LoginSection";
import CategoriesSlider from "./components/CategoriesSlider/CategoriesSlider.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import ContactWithUs from "./pages/ContactWithUs/ContactWithUs.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import WhereToBuy from "./pages/WheretoBuy/WheretoBuy.jsx";


const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-account" element={<LoginSection />} />
                <Route path="/shop" element={<CategoriesSlider/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/contactwithus" element={<ContactWithUs/>} />
                <Route path="/about" element={<AboutUs/>} />
                <Route path="/wheretobuy" element={<WhereToBuy/>} />
            </Routes>
            <Footer />
            <NavBottom />
        </BrowserRouter>
    );
};

export default App;