import React, { useEffect, useState } from "react";

import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";

function RequestsCRUD() {
  const [request, setRequest] = useState([]);
  const { id } = useParams();
  const auth = getAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/requestDashboard/getAll", {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => setRequest(res.data))
      .catch((err) => console.log(err));
  }, []);

  const declineRequest = (id) => {
    axios
      .get("http://127.0.0.1:5000/requestDashboard/declineRequest/" + id, {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => {
        navigate("/readRequests");
      })
      .catch((err) => console.log(err));
  };
  const acceptRequest = (id) => {
    axios
      .get("http://127.0.0.1:5000/requestDashboard/acceptRequest/" + id, {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  const deleteRequest = (id) => {
    axios
      .delete("http://127.0.0.1:5000/requestDashboard/deleteRequest/" + id, {
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
        <table className="table">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Book Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {request.map((data, i) => (
              //  r = `http://localhost:3000/ShowRequestsHistory/${data.userId}`
              <tr key={i}>
                <td>
                  <a href={`ShowRequestsHistory/${data.userId}`}>
                    {data.userId}
                  </a>
                </td>
                <td>{data.bookId}</td>
                <td>{data.status}</td>

                <td>
                  <button
                    className="btn btn-success ms-2"
                    onClick={(e) =>
                      acceptRequest(data.id) + navigate("/readRequests")
                    }
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-danger ms-2"
                    onClick={(e) =>
                      declineRequest(data.id) + navigate("/readRequests")
                    }
                  >
                    Decline
                  </button>

                  <button
                    className="btn btn-danger ms-2"
                    onClick={(e) =>
                      deleteRequest(data.id) + navigate("/readRequests")
                    }
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
export default RequestsCRUD;
