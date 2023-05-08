import React, { useEffect, useState } from "react";

import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "./helper/Storage";

function SendRequest() {
  const [student, setStudent] = useState([]);
  const auth = getAuthUser();
  const [bookId, setBookId] = useState("");
  const [userId, setUID] = useState("");
  const navigate = useNavigate();
  //const {bookId} = useParams();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/bookDashboard/getAll", {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const SendRequest = (id) => {
    axios
      .post(
        "http://127.0.0.1:5000/requestDashboard/createRequest/" + id,
        {
          userId: auth.data.user.id,
          bookId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.data.accessToken}`,
          },
          "Access-Control-Allow-Origin": "*",
        }
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <table className="table">
          <thead>
            <tr>
              <th>userId</th>
              <th>bookId</th>
              <th>status</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data, i) => (
              <tr key={i}>
                <td>{data.bookName}</td>
                <td>{data.Field}</td>
                <td>{data.publicationDate}</td>
                <td>{data.PDF}</td>
                <td>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={(e) => SendRequest(data.id) + navigate("/home")}
                  >
                    Delete
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
export default SendRequest;
