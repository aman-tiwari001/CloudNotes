import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

const Login = (props) => {

  useEffect(() => {
    props.setProgress(20);
    setTimeout(() => {
      props.setProgress(100);
    }, 200);
    props.setProgress(60);
    // eslint-disable-next-line
  }, [])

  const [auth, setAuth] = useState({email : "", password : ""});
  const navigate = useNavigate();
  const host = "https://cloudnotes-server.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email : auth.email, password : auth.password}),
    });

    const json = await response.json();
    
    if(json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Logged in succesfully!", "success");
    }

    else {
      props.showAlert("Invalid credentials!", "danger");
    }
  }
  
  const onChange = (e) => {
    setAuth({...auth, [e.target.name]: e.target.value});
  }

  return (
    <div className='container my-4'>
      <h3 className='text-center'>Login to CloudNotes</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1"><b>Email address</b></label>
          <input style={{"border" : "2px solid green"}} name="email" onChange={onChange} value={auth.email} type="email" className="form-control inp-fsize"id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1"><b>Password</b></label>
          <input style={{"border" : "2px solid green"}} name="password" onChange={onChange} value={auth.password} type="password" className="form-control inp-fsize"  id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-success my-1" >Login</button>
      </form>
      <p className='my-2'>New to CloudNotes! <Link to="/signup">Click here</Link> to create an account.</p>
    </div>
  )
}

export default Login;