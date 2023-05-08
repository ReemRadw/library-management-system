import React, { useEffect, useState } from "react";

import axios from "axios";
import { getAuthUser } from "./helper/Storage";
import { useNavigate } from "react-router-dom";
const auth = getAuthUser();
let data;

function ShowHistory() {
  //   event.preventDefault();

  const [student, setStudent] = useState([]);
  const navigate = useNavigate();
  //   navigate("/ShowHistory");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/readerDashboard/getMySearch", {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => {
        data = res.data.data;
        setStudent(data);
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
              <th>ID</th>
              <th>Book Name</th>
              <th>User Email</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data, i) => (
              <tr key={i}>
                <td>{data.id}</td>
                <td>{data.bookName}</td>
                <td>{data.userEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ShowHistory;
