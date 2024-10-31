import React , { useState } from 'react';
import Navbar from '../../../layouts/front/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [registerInput,setResister] = useState({
    name: '',
    email: '',
    password: '',
    error_list: [],
  });

  const handelInput = (e) => {
    e.persist();
    setResister({ ...registerInput , [e.target.name]: e.target.value});
  }

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    }


    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/register` , data).then(res =>{
        if(res.data.status ===200)
        {
          localStorage.setItem('auth_token' , res.data.token);
          localStorage.setItem('auth_name' , res.data.username);
          swal("Success" , res.data.message , "success");
          navigate('/'); 
        }
        else
        {
          setResister({...registerInput, error_list: res.data.validation_errors});
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
                <h4> Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                      <label for="exampleFormControlInput1" className="form-label">Full Name</label>
                      <input type="text" name="name" onChange={handelInput} value={registerInput.name} className="form-control" id="exampleFormControlInput1" />
                      <span className="text-red text-2"> {registerInput.error_list.name} </span>
                  </div>
                  <div className="form-group mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="text"  name="email" onChange={handelInput} value={registerInput.email}  className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <span className="text-red text-2"> {registerInput.error_list.email} </span>
                  </div>
                  <div className="form-group mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="text"  name="password" onChange={handelInput} value={registerInput.password}  className="form-control" id="exampleFormControlInput1" />
                    <span className="text-red text-2"> {registerInput.error_list.password} </span>
                  </div>
                  {/* <div className="form-group mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Confirm Password</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" />
                  </div> */}
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary"> Register </button>
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

export default Register
