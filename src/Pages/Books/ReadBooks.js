import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import "../../style/CRUD.css";

function ReadBooks() {
  const [book, setBook] = useState([]);
  const auth = getAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/bookDashboard/getAll", {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteBook = (id) => {
    axios
      .delete("http://127.0.0.1:5000/bookDashboard/deleteBook/" + id, {
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
              <th>Book Name</th>
              <th>Field</th>
              <th>Publication Date</th>
              <th> PDF</th>
              <th> Manage Books</th>
            </tr>
          </thead>
          <tbody>
            {book.map((data, i) => (
              <tr key={i}>
                <td>{data.bookName}</td>
                <td>{data.Field}</td>
                <td>{data.publicationDate}</td>
                <td>{data.PDF}</td>

                <td>
                  <Link to="/createBooks" className="btn btn-success ">
                    <PersonAddAltOutlinedIcon />
                  </Link>
                  <Link
                    to={`/updateBook/${data.id}`}
                    className="btn btn-primary"
                  >
                    <UpdateOutlinedIcon />
                  </Link>
                  &nbsp;
                  <button
                    className="btn btn-danger "
                    onClick={(e) =>
                      deleteBook(data.id) + navigate("/readBooks")
                    }
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
export default ReadBooks;
