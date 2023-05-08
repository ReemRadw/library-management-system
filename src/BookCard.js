import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./style/MovieCard.css"
import axios from 'axios'
import { getAuthUser } from "./helper/Storage";


const BookCard = (props) => {

  const auth = getAuthUser();

  const SendRequest = (id) => {
    axios
      .post("http://127.0.0.1:5000/requestDashboard/createRequest/" + id,{
      userId : auth.data.user.id
      ,bookId: id
    },
      {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      }
      )
      .then((res) => {
        console.log(res.data);
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Card className="card-container">
       {/* <Card.Img className="card-image" variant="top" src={props.image} />*/}
        <Card.Body>
          <Card.Title>Book Name : {props.name} </Card.Title>
          <Card.Text>Subject : {props.description}</Card.Text>
          <Card.Text>Field : {props.field}</Card.Text>
          <Card.Text>Publication Date : {props.pubDate}</Card.Text>
          <button className='btn btn-danger ms-2' onClick={e => SendRequest(props.id)}>Request</button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookCard;
