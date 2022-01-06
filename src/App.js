import { Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Header";
import { useAuth0 } from "@auth0/auth0-react";
import HomeContainer from "./components/Home/HomeContainer/HomeContainer";

function App() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  return (
    <>
      <Header />
      <HomeContainer />
    </>
  );
}

export default App;
