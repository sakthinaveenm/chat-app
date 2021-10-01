import React, { useState, useContext } from "react";
import { userContext } from "../../userContext";
import { Redirect } from "react-router";
import axios from "axios";
export default function Signup() {
  const { user, setUser } = useContext(userContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [ename, setEName] = useState("");
  const [eemail, setEEmail] = useState("");
  const [epassword, setEPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("Result" + name, email, password);

      // const res = await fetch("http://localhost:5000/signup", {
      //   mode: "no-cors",
      //   method: "POST",
      //   credentials: "include",
      //   body: JSON.stringify({ name, email, password }),
      //   headers: { "Content-Type": "application/json" },
      // })
      const res = axios
        .post("http://localhost:5000/signup", {
          name,
          email,
          password,
        })
        .then((res) => setData(JSON.stringify(res)))
        .catch((err) => console.log(err));
      // console.log("respon", typeof respon);
      // const data = respon;
      if (data) {
        console.log(data);
        console.log(data["data"]);
        // if (data.data.user.errors) {
        //   setEEmail(data.errors.email);
        //   setEName(data.errors.name);
        //   setEPassword(data.errors.password);
        // }
        // if (data.data.user) {
        //   setUser(data.user);
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (user) {
    return <Redirect to="/" />;
  }
  console.log("user", user);
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className="card-title text-center">Register</h2>
              <div className="card-body py-md-4">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  {ename}
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  {eemail}
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  {epassword}
                  <button className="btn btn-primary" type="submit">
                    Create Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
