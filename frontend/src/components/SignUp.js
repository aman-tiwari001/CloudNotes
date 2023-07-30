import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const SignUp = (props) => {

  useEffect(() => {
    props.setProgress(20);
    setTimeout(() => {
      props.setProgress(100);
    }, 200);
    props.setProgress(60);
    // eslint-disable-next-line
  }, [])

    const [details, setDetails] = useState({name : "" , email : "", password : ""});
    const navigate = useNavigate();
    const host = "http://localhost:5000";
  
    const handleSignUp = async (e) => {
        e.preventDefault();
      if(document.getElementById('password').value!==document.getElementById('cnf-password').value) {
            props.showAlert("Confirm password doesn't match.", "danger");
            return;
       }
      const url = `${host}/api/auth/createuser`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name : details.name, email : details.email, password : details.password}),
      });
  
      const json = await response.json();
      console.log(json);
      
      if(json.success) {
        // save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('user-name', details.name);
        navigate("/");
        props.showAlert("Account created and logged in successfully!", "success");
      }
  
      else {
        props.showAlert("Invalid credentials!", "danger");
      }
    }
    
    const onChange = (e) => {
      setDetails({...details, [e.target.name]: e.target.value});
    }

  return (
    <div className='container my-4'>
        <h3 className='text-center'>CloudNotes - Sign Up</h3>
        <form onSubmit={handleSignUp}>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1"><b>Name</b></label>
          <input style={{"border" : "2px solid green"}} value={details.name} onChange={onChange} name="name"  type="text" className="form-control inp-fsize"  id="name" placeholder="Enter name"/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1"><b>Email address</b></label>
          <input style={{"border" : "2px solid green"}} value={details.email} onChange={onChange} name="email"  type="email" className="form-control inp-fsize"id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1"><b>Create a password</b></label>
          <input style={{"border" : "2px solid green"}} value={details.password} onChange={onChange} name="password"  type="password" className="form-control inp-fsize"  id="password" placeholder="Password"/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1"><b>Confirm password</b></label>
          <input style={{"border" : "2px solid green"}} name="cnf-password"  type="text" className="form-control inp-fsize"  id="cnf-password" placeholder="Confirm password"/>
        </div>
        <button type="submit" className="btn btn-success my-1" >Sign Up</button>
        <p className='my-2'><Link to="/login">Click here</Link> to login if you already have an account.</p>
      </form>
    </div>
  )
}

export default SignUp;