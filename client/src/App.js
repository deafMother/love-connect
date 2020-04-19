import React from "react";
import { Route, Switch } from "react-router-dom";

import "./styles/App.scss";
import SignUpLogIn from "./components/SignUpLogin/LoginSignUp";
import Header from "./components/Header/Header";
import UserList from "./components/Users/UserList";
import ProfilePick from "./components/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={UserList} />
        <Route exact path="/signUp" component={SignUpLogIn} />
        <Route exact path="/profile" component={ProfilePick} />
      </Switch>
    </div>
  );
}

export default App;
