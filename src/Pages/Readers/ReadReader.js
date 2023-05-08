import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import "../../style/CRUD.css";

function ReadReader() {
  const [reader, setReader] = useState([]);
  const auth = getAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/manageReader/getAll", {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => setReader(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteReader = (id) => {
    axios
      .delete("http://127.0.0.1:5000/manageReader/deleteReader/" + id, {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="CRUD-table">
        <Link to="/create" className="btn btn-success">
          <PersonAddAltOutlinedIcon />
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Manage Reader</th>
            </tr>
          </thead>
          <tbody>
            {reader.map((data, i) => (
              <tr key={i}>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.status}</td>
                <td>
                  <Link to={`/update/${data.id}`} className="btn btn-primary">
                    <UpdateOutlinedIcon />
                  </Link>
                  &nbsp;
                  <button
                    className="btn btn-danger "
                    onClick={(e) => deleteReader(data.id) + navigate("/home")}
                  >
                    <DeleteForeverOutlinedIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ReadReader;
