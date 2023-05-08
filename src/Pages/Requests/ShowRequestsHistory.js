import React, { useEffect, useState } from "react";

import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import "../../style/CRUD.css";

let data;

function ShowRequestsHistory() {
  const [reader, setReader] = useState([]);
  const auth = getAuthUser();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/manageReader/requestsHistory/" + id, {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => {
        data = res.data.data.Request;
        setReader(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="CRUD-table">
        <table className="table">
          <thead>
            <tr>
              <th>Request Id</th>
              <th>book Name</th>
            </tr>
          </thead>
          <tbody>
            {reader.map((data, i) => (
              <tr key={i}>
                <td>{data.id}</td>
                <td>{data.Book.bookName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ShowRequestsHistory;
