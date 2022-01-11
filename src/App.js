import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Navbar/Header";
import { useAuth0 } from "@auth0/auth0-react";
import HomeContainer from "./components/Home/HomeContainer/HomeContainer";
import Footer from "./components/Footer/Footer";
import Product from "./components/Product/Product";
import About from "./components/About/About";
function App() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomeContainer />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/product">
          <Product />
        </Route>
        <Route exact path="/demo" component={About} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
