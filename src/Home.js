import React, { useState, useEffect } from "react";
import MoviesCard from "./BookCard";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import './style/MovieCard.css'
import BookCard from "./BookCard";

const Home = () => {
  const [books, setBooks] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const { bookName } = useParams();
  const [search, setSearch] = useState("");
  const [req, setReq] = useState("");



  useEffect(() => {
    setBooks({ ...books, loading: true });
    axios
      .get("http://127.0.0.1:5000/bookDashboard/getAll", {
  
      })
      .then((resp) => {
        console.log(resp);
        setBooks({ ...books, results: resp.data, loading: false, err: null });
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
    event.preventDefault();
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyZWVtMTAwQGdtYWlsLmNvbSIsImlhdCI6MTY4MzE5MzU1MCwiZXhwIjoxNjgzNzk4MzUwfQ.MlxYFxJ7PU3aA5-ocPOwf5Kfb-CNq0gyC6hOypm0zZ0";
  axios
    .get("http://127.0.0.1:5000/readerDashboard/search/"  + bookName,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      "Access-Control-Allow-Origin": "*",
    }
    ).then(res => setBooks({...books})).catch(err => console.log(err))
   
  

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
                type="text"
                placeholder="Search Movies"
                className="rounded-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-dark rounded-0">Search</button>
            </Form.Group>
          </Form>

          <div className="row ">
            {books.results.map((book) => (
              <div className="col-3 card-movie-container" key={book.id}>
                <BookCard
                  name={book.bookName}
                  description={book.Description}
                  field = {book.Field}
                  pubDate = {book.publicationDate}
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
            No Movies, please try again later !
          </Alert>
        )}
    </div>
  );
        };

export default Home;
