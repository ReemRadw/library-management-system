import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
import "../../style/CRUD.css";

function UpdateReader() {
  const auth = getAuthUser();

  var [email, setEmail] = useState(auth.data.email);
  var [phone, setPhone] = useState(auth.data.phone);
  var [status, setStatus] = useState(auth.data.status);
  const navigate = useNavigate();
  const { id } = useParams();

  function handleSubmit(event) {
    axios
      .patch(
        "http://127.0.0.1:5000/manageReader/updateReader/" + id,
        { email, phone },
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
  function handleRadioSubmit(event) {
    axios
      .patch(
        "http://127.0.0.1:5000/manageReader/activateReader/" + id,
        { status },
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
    <div className="d-flex vh-100  justify-content-center align-items-center">
      <div className="RCRUD-table">
        <form>
          <h2>Update Reader</h2>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Phone</label>
            <input
              type="text"
              placeholder="Enter Phone"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </form>
        <form>
          <label className="radioBtn ">
            <input type="radio" onChange={(e) => setStatus(e.target.value)} />{" "}
            Activate
          </label>
        </form>
        <button
          className="btn btn-success"
          onClick={() => {
            handleRadioSubmit();
            handleSubmit();
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}
export default UpdateReader;
