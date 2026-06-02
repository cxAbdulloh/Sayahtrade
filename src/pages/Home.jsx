import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import FeaturesVideo from "../components/FeaturesVideo/FeaturesVideo";
import CareSection from "../components/CareSection/CareSection";
import Footer from "../components/Footer/Footer";
import NavBottom from "../components/NavBottom/NavBottom";
import Bestsellers from "../components/Bestsellers/Bestsellers.jsx";

const Home = () => {
    return (
        <>

            <Hero />
            <Categories />
            <Bestsellers/>
            <FeaturesVideo />
            <CareSection />
            <NavBottom />
        </>
    );
};

export default Home;