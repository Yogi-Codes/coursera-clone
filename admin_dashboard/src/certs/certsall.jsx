import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CONST } from '../constant'
import Sidebar from '../widgets/Sidebar'

function Cert() {

  const [usr, setUsr] = useState([]);
  const [certificates,setCertificate]= useState([])
 

  function findIndexByName(id, names) {
   
    for (let i = 0; i < names.length; i++) {
      if (names[i].id == id) {

        console.log("returning "+i);
        return i;
      }
    }
    return -1;
  }
  


  


  const getCerts =async () =>{

    const formData = new FormData();
    formData.append('action', 'getCategory');
    const rsp = await axios.post(CONST.API_SERVER + '/certs/all', formData, {
        'Content-Type': 'text/plain',
    });

setCertificate(rsp.data.result)

 }
   const getUsers =async () =>{

    const formData = new FormData();
    formData.append('action', 'getCategory');
    const rsp = await axios.post(CONST.API_SERVER + '/users/get', formData, {
        'Content-Type': 'text/plain',
    });

setUsr(rsp.data.result)





  }

  useEffect(() => {
   getCerts();
   getUsers();
  }, []);

  return (
   
<div style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
<a href="/"><button style={{ backgroundColor: "#0365a6", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", marginRight: "10px" }}>Home</button></a>
  <a href="/certs/allocate"><button style={{ backgroundColor: "#f5f5f5", color: "#0365a6", padding: "10px 20px", borderRadius: "5px", border: "1px solid #0365a6" }}>New</button></a>
  <h1 style={{ color: "#0365a6", marginBottom: "20px" }}>Certificates</h1>
  <ul>
    {certificates.map(user => (
      <li key={user.id} style={{ marginBottom: "10px" }}>
        {user.user_id}:{" "}
        {usr[findIndexByName(user.user_id, usr)]?.name || "Unknown User"}:{" "}
        {user.progress}%
      </li>
    ))}
  </ul>
 
</div>

  );
}

export default Cert;
