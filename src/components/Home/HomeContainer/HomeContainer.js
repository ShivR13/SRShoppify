import React from "react";
import { Container, Navbar } from "react-bootstrap";
import Header from "../../Navbar/Header";
import Landing from "../Landing/Landing";
import NewsLetter from "../NewsLetter/NewsLetter";
import ProductsFeatured from "../ProductsFeatured/ProductsFeatured";
import Services from "../Services/Services";
import "./HomeContainer.scss";

const HomeContainer = () => {
  return (
    <>
      <Landing />
      <ProductsFeatured />
      <Services />
      <NewsLetter />
    </>
  );
};

export default HomeContainer;
