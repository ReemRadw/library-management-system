
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthUser } from '../../helper/Storage';
import '../../style/CRUD.css'

function UpdateBOOK() {
  const [bookName, setBookName] = useState('')
  const auth = getAuthUser();
  const [Field, setField] = useState('')
  const [PDF, setPDF] = useState('')
  const { id } = useParams();
  const navigate = useNavigate();

  function handleSubmit(event) {
   
      axios.patch('http://127.0.0.1:5000/bookDashboard/updateBook/' + id, { bookName, Field,PDF },
      {
        headers: {
          Authorization: `Bearer ${auth.data.accessToken}`,
        },
        "Access-Control-Allow-Origin": "*",
      }

    ).then(res => {
      console.log(res);
      navigate("/readBooks");

    }).catch(err => console.log(err));
  }
  
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
      <div className='RCRUD-table'>  
        <form >
          <h2>Update Book</h2>
          <div className='mb-2'>
            <label htmlFor="">Book Name</label>
            <input type="text" placeholder='Enter Book Name' className='form-control'
              onChange={e => setBookName(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Field</label>
            <input type="text" placeholder='Enter Field' className='form-control'
              onChange={e => setField(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="">PDF</label>
            <input type="text" placeholder='Enter PDF' className='form-control'
              onChange={e => setPDF(e.target.value)} />
          </div>
        </form>

  <button className='btn btn-success' onClick={()=>{handleSubmit();}}>Update</button>
      </div>

    </div>
    
    )
}
export default UpdateBOOK;