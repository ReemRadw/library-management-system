import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import "./style/MovieCard.css";
import BookCard from "./BookCard";
import { getAuthUser } from "./helper/Storage";
import ShowHistory from "./ShowHistory";
import { useNavigate } from "react-router-dom";
import ShowRequestsHistory from "./Pages/Requests/ShowRequestsHistory";

let all;
const Home = () => {
  const auth = getAuthUser();
  const [books, setBooks] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setBooks({ ...books, loading: true });
    axios
      .get("http://127.0.0.1:5000/bookDashboard/getAll", {})
      .then((resp) => {
        setBooks({ ...books, results: resp.data, loading: false, err: null });
        all = resp.data;
      })
      .catch((err) => {
        setBooks({
          ...books,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [books.reload]);

  const handleSearchSubmit = (event) => {
    const query = event.target.query.value;
    event.preventDefault();
    query
      ? axios
          .get("http://127.0.0.1:5000/readerDashboard/search/" + query, {
            headers: {
              Authorization: `Bearer ${auth.data.accessToken}`,
            },
            "Access-Control-Allow-Origin": "*",
          })
          .then((res) => {
            setBooks({
              ...books,
              results: res.data.data,
              loading: false,
              err: null,
            });
          })
          .catch((err) => console.log(err))
      : setBooks({
          ...books,
          results: all,
          loading: false,
          err: null,
        });
  };

  return (
    <div className="home-container p-4">
      {books.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {books.loading === false && books.err == null && (
        <>
          {/* Filter  */}
          <Form onSubmit={handleSearchSubmit}>
            <Form.Group className="mb-3 d-flex">
              <Form.Control
                name="query"
                type="text"
                placeholder="Search Books"
                className="rounded-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-dark rounded-0">Search</button>
              <button
                className="btn btn-danger "
                onClick={(e) => navigate("/ShowHistory")}
              >
                Show History
              </button>
            </Form.Group>
          </Form>

          <div className="row ">
            {books.results.map((book) => (
              <div className="col-3 card-movie-container" key={book.id}>
                <BookCard
                  name={book.bookName}
                  description={book.Description}
                  field={book.Field}
                  pubDate={book.publicationDate}
                  image={book.imageUrl}
                  id={book.id}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {books.loading === false && books.err != null && (
        <Alert variant="danger" className="p-2">
          {books.err}
        </Alert>
      )}

      {books.loading === false &&
        books.err == null &&
        books.results.length === 0 && (
          <Alert variant="info" className="p-2">
            No Books, please try again later !
          </Alert>
        )}
    </div>
  );
};

export default Home;
