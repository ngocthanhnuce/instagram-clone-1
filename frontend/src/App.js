// @ts-nocheck
import React, { useEffect, createContext, useReducer, useContext } from "react";
import NavBar from "./components/NavBar";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";
import UserProfile from "./components/UserProfile";
import SubscribesUserPosts from "./components/SubscribesUserPosts";
import Reset from "./components/Reset";
import NewPassword from "./components/NewPassword";
import { reducer, initialState } from "./reducers/userReducer";
import Messenger from "./components/Messenger";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      if (!history.location.pathname.startsWith("/reset"))
        history.push("/signin");
    }
  }, [dispatch, history]);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribesUserPosts />
      </Route>
      <Route exact path="/reset">
        <Reset />
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
      <Route exact path="/messenger">
        <Messenger />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <div style={{minHeight: "100vh"}}>
          <NavBar />
          <Routing />
        </div>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
