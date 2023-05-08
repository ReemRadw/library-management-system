import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";

function CreateReader() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const auth = getAuthUser();
  const navigate = useNavigate();
  function handleSubmit(event) {
    console.log(event.target.elements.email.value); // from elements property
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:5000/manageReader/createReader",
        {
          email: event.target.elements.email.value,
          phone: event.target.elements.phone.value,
          password: event.target.elements.password.value,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.data.accessToken}`,
          },
          "Access-Control-Allow-Origin": "*",
        }
      )
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="RCRUD-table">
        <form onSubmit={handleSubmit}>
          <h2>Add Reader</h2>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">password</label>
            <input
              name="password"
              type="text"
              placeholder="Enter password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">phone</label>
            <input
              name="phone"
              type="text"
              placeholder="Enter phone"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default CreateReader;
