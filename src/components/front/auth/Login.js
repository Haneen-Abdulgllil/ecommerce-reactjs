import React , { useState } from 'react';
import Navbar from '../../../layouts/front/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [loginInput,setLogin] = useState({
    email: '',
    password: '',
    error_list: [],
  });

  const handelInput = (e) => {
    e.persist();
    setLogin({ ...loginInput , [e.target.name]: e.target.value});
  }

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }


    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/login` , data).then(res =>{
        if(res.data.status ===200)
        {
          localStorage.setItem('auth_token' , res.data.token);
          localStorage.setItem('auth_name' , res.data.username);
          swal("Success" , res.data.message , "success");
          navigate('/'); 
        }
        else if(res.data.status === 401)
        {
          swal("Warning" , res.data.message , "warning");
        }
        else
        {
          setLogin({...loginInput, error_list: res.data.validation_errors});
        }

      });

    });
 
  }
  return (
    <div>

      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4> Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="text"  name="email" onChange={handelInput} value={loginInput.email}  className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <span className="text-red text-2"> {loginInput.error_list.email} </span>
                  </div>
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Password</label>
                    
                    <input type="text"  name="password" onChange={handelInput} value={loginInput.password}  className="form-control" id="exampleFormControlInput1" />
                    <span className="text-red text-2"> {loginInput.error_list.password} </span>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary"> Login </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
)
}

export default Login
