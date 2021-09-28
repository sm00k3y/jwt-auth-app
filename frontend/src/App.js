import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Bye from "./pages/Bye/Bye";
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/bye" component={Bye} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
