import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { userContext } from "./userContext";
import Home from "./components/home/Home";
import Chat from "./components/chat/Chat";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import axios from "axios";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        // console.log("Result" + name, email, password);

        // const res = await fetch("http://localhost:5000/signup", {
        //   mode: "no-cors",
        //   method: "POST",
        //   credentials: "include",
        //   body: JSON.stringify({ name, email, password }),
        //   headers: { "Content-Type": "application/json" },
        // })
        const res = await axios.get("http://localhost:5000/verifyuser");
        // .then((res) => setData(JSON.stringify(res)))
        // .catch((err) => console.log(err));
        // console.log("respon", typeof respon);
        // const data = respon;
        // if (data) {
        //   console.log(data);
        //   console.log(data["data"]);
        // if (data.data.user.errors) {
        //   setEEmail(data.errors.email);
        //   setEName(data.errors.name);
        //   setEPassword(data.errors.password);
        // }
        // if (data.data.user) {
        //   setUser(data.user);
        // }
        // }
        // setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  });
  return (
    <div className="App">
      <Router>
        <userContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/chat/:room_id/:room_name" component={Chat} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </userContext.Provider>
      </Router>
    </div>
  );
}

export default App;
