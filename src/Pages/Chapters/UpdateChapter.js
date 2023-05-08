import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
import "../../style/CRUD.css";

function UpdateBOOK() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const auth = getAuthUser();
  const navigate = useNavigate();
  const { id } = useParams();
  function handleSubmit(event) {
    axios
      .patch(
        "http://127.0.0.1:5000/chaptersDashboard/updateChapters/" + id,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${auth.data.accessToken}`,
          },
          "Access-Control-Allow-Origin": "*",
        }
      )
      .then((res) => {
        navigate("/readChapters");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex vh-100  justify-content-center align-items-center">
      <div className="RCRUD-table">
        <form>
          <h2>Update Book</h2>
          <div className="mb-2">
            <label htmlFor="">Book Name</label>
            <input
              type="text"
              placeholder="Enter Book Name"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Field</label>
            <input
              type="text"
              placeholder="Enter Field"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </form>

        <button
          className="btn btn-success"
          onClick={() => {
            handleSubmit();
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}
export default UpdateBOOK;
