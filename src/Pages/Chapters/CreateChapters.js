import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";

function CreateReader() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bookId, setBookId] = useState("");
  const auth = getAuthUser();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:5000/chaptersDashboard/createChapters",
        {
          title,
          description,
          bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.data.accessToken}`,
          },
          "Access-Control-Allow-Origin": "*",
        }

      )
      .then((res) => {
        console.log(res);
        navigate("/readChapters");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="RCRUD-table">
        <form onSubmit={handleSubmit}>
          <h2>Add Chapter</h2>
          <div className="mb-2">
            <label htmlFor="">Title</label>
            <input
              name="email"
              type="text"
              placeholder="Enter Title"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Description</label>
            <input
              name="password"
              type="text"
              placeholder="Enter Description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Book Id</label>
            <input
              name="phone"
              type="text"
              placeholder="Enter Book Id"
              className="form-control"
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>

          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default CreateReader;
