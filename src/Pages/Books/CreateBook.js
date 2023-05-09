import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const CreateBook = () => {
  const auth = getAuthUser();
  const [book, setBook] = useState({
    bookName: "",
    Description: "",
    publicationDate: "",
    Field: "",
    PDF: "",
    authorId: "",
    categoryId: "",
    file: "",

    err: "",
    loading: false,
    success: null,
  });

  const image = useRef(null);

  const createMovie = (e) => {
    e.preventDefault();

    setBook({ ...book, loading: true });

    const formData = new FormData();
    formData.append("bookName", book.bookName);
    formData.append("Description", book.Description);
    formData.append("publicationDate", book.publicationDate);
    formData.append("Field", book.Field);
    formData.append("PDF", book.PDF);
    formData.append("authorId", book.authorId);
    formData.append("categoryId", book.categoryId);

    if (image.current.files && image.current.files[0]) {
      formData.append("file", image.current.files[0]);
    }
    console.log(formData);
    axios
      .post("http://127.0.0.1:5000/bookDashboard/createBook", formData, {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      })
      .then((resp) => {
        setBook({
          bookName: "",
          Description: "",
          publicationDate: "",
          Field: "",
          PDF: "",
          authorId: "",
          categoryId: "",
          file: "",
          err: null,
          loading: false,
          success: "Book Created Successfully !",
        });
        image.current.value = null;
      })
      .catch((err) => {
        setBook({
          ...book,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        {book.err && (
          <Alert variant="danger" className="p-2">
            {book.err}
          </Alert>
        )}

        {book.success && (
          <Alert variant="success" className="p-2">
            {book.success}
          </Alert>
        )}

        <Form onSubmit={createMovie}>
          <Form.Group className="mb-3">
            <Form.Control
              value={book.bookName}
              onChange={(e) => setBook({ ...book, bookName: e.target.value })}
              type="text"
              required
              placeholder="Book Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={book.Description}
              required
              onChange={(e) =>
                setBook({ ...book, Description: e.target.value })
              }
              rows={5}
            ></textarea>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={book.publicationDate}
              onChange={(e) =>
                setBook({ ...book, publicationDate: e.target.value })
              }
              type="text"
              required
              placeholder="publication Date"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={book.Field}
              onChange={(e) => setBook({ ...book, Field: e.target.value })}
              type="text"
              required
              placeholder="Field"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={book.PDF}
              onChange={(e) => setBook({ ...book, PDF: e.target.value })}
              type="text"
              required
              placeholder="PDF"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={book.authorId}
              onChange={(e) => setBook({ ...book, authorId: e.target.value })}
              type="text"
              required
              placeholder="author Id"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={book.categoryId}
              onChange={(e) => setBook({ ...book, categoryId: e.target.value })}
              type="text"
              required
              placeholder="category Id"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <input type="file" className="form-control" ref={image} required />
          </Form.Group>

          <Button className="btn btn-success" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateBook;
