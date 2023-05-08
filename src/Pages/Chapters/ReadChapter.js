import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthUser } from '../../helper/Storage'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import '../../style/CRUD.css'

function ReadChapters() {

    const [chapter, setChapter] = useState([])
    const auth = getAuthUser();
    const navigate = useNavigate();

      useEffect(() => { axios.get
        ('http://127.0.0.1:5000/chaptersDashboard/getAll',
        {
            headers: {
              Authorization: `Bearer ${auth.data.accessToken}`,
            },
            "Access-Control-Allow-Origin": "*",
          }

        ).then(res => setChapter(res.data)).catch(err => console.log(err)); }, [])
        
        const deleteChapter = (id) => {
            axios
              .delete("http://127.0.0.1:5000/chaptersDashboard/deleteChapters/" + id, 
              {
                headers: {
                  Authorization: `Bearer ${auth.data.accessToken}`,
                },
                "Access-Control-Allow-Origin": "*",
              }
    
              )
              .then((res) => {
                console.log(res);
                
                
              })
              .catch((err) => console.log(err));
          };
        

    return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className= 'CRUD-table'>
        <Link to="/createChapter" className='btn btn-success ' ><PersonAddAltOutlinedIcon/></Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Chapter Title</th>
                        <th>Description</th>
                        <th> Manage Books</th>
                    </tr>
                </thead>
                <tbody>
                    {chapter.map((data, i) =>
                    (<tr key={i}>
                        <td>{data.title}</td>
                        <td>{data.description}</td>
                        <td>
                            <Link to={`/updateChapter/${data.id}`} className='btn btn-primary'><UpdateOutlinedIcon /></Link>&nbsp;
                            <button className='btn btn-danger ' onClick={e => deleteChapter(data.id) + navigate("/readChapters")}><DeleteForeverOutlinedIcon/></button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>)
}
export default ReadChapters;