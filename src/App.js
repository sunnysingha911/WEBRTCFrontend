import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// PAGE COMPONENT
import Home from "./pages/Home";
import Login from "./pages/Login";
import ChatRoom from "./pages/ChatRoom";
import Register from "./pages/Register";
import CreateRoom from "./pages/CreateRoom";

// MATERIAL UI COMPONENT
import CssBaseline from "@material-ui/core/CssBaseline";

// CUSTOM COMPONENT
import Appbar from "./components/Appbar";

// REDUX
import { getUser } from "./redux/actions/User";

const App = () => {
  let pageName = useSelector((state) => state.AppbarReducer.pageName);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Router>
      <CssBaseline />
      <Appbar pageName={pageName} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/createroom" exact component={CreateRoom} />
        <Route path="/chatroom" component={ChatRoom} />
      </Switch>
    </Router>
  );
};

export default App;
