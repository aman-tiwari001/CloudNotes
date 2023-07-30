import React from 'react';

const MyAccount = (props) => {

    let name = "";
    let email = "";

    props.setProgress(20);
    
    const fetchAccount = async () => {
      const url = `http://localhost:5000/api/auth/getuser`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      props.setProgress(60);
      name = json.name;
      email = json.email;
      props.setProgress(100);
    }

    fetchAccount();

    setTimeout(() => {
        document.getElementById("name").innerText = name;
        document.getElementById("email").innerText = email;
    }, 100);
    

  return (
    <div className='Container my-4'>
        <h3 className='mb-4'>My Acount Details</h3>
        <div style={{"fontSize" : "1.1rem"}}><strong>Name : </strong><span id="name">{name}</span></div>
        <div style={{"fontSize" : "1.1rem"}}><strong>Email : </strong><span id="email">{email}</span></div>
    </div>

  )
}

export default MyAccount;