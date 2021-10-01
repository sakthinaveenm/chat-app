import React, { useState, useContext } from "react";
import { userContext } from "../../userContext";
import { Redirect } from "react-router";
import axios from "axios";
import "./Login.css";
export default function Login() {
  const { user, setUser } = useContext(userContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [respon, setRespon] = useState({});
  const [ename, setEName] = useState("");
  const [eemail, setEEmail] = useState("");
  const [epassword, setEPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("Result" + name, email, password);

      const res = axios
        .post("http://localhost:5000/signup", {
          name,
          email,
          password,
        })
        .then((res) => setRespon(res))
        .catch((err) => console.log(err));
      const data = Object.values(respon);
      console.log("data" + data);
      if (data.errors) {
        setEEmail(data.errors.email);
        setEName(data.errors.name);
        setEPassword(data.errors.password);
      }
      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-heading">
            <h2 className="text-center">Login</h2>
          </div>
          <hr />
          <div className="modal-body">
            <form action="" role="form" onSubmit={submitHandler}>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-user"></span>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-lock"></span>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group text-center">
                <button type="submit" className="btn btn-success btn-lg">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
