import React, { useEffect, useState } from 'react';

const MyAccount = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  props.setProgress(20);

  useEffect(() => {
    const fetchAccount = async () => {
      const url = `https://cloudnotes-server.onrender.com/api/auth/getuser`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setName(json.name);
      setEmail(json.email);
      props.setProgress(100);
    }

    fetchAccount();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='Container my-4'>
      <h3 className='mb-4'>My Account Details</h3>
      <div style={{ "fontSize": "1.1rem" }}>
        <strong>Name: </strong><span>{name}</span>
      </div>
      <div style={{ "fontSize": "1.1rem" }}>
        <strong>Email: </strong><span>{email}</span>
      </div>
    </div>
  )
}

export default MyAccount;
