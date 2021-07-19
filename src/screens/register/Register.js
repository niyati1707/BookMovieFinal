import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Register.css';


const Register = (props) => {


    const [errors, setErrorValue] = useState({firstName:'', lastName:'', email:'', password:'', contact:'', noError:''});


    function onClickRegister(event) {
        event.preventDefault();
        const data = new FormData(event.target);

  


        if(data.get('firstName') && data.get('lastName') && data.get('email') && data.get('password') && data.get('contact')){
    

            let formdataUpdated = JSON.stringify({
                "email_address": data.get('email'),
                "first_name": data.get('firstName') ,
                "last_name": data.get('lastName') ,
                "mobile_number":  data.get('contact'),
                "password": data.get('password')
          });

            fetch('http://localhost:8085/api/v1/signup', {
                method: "POST",
                headers: {
                    
                    "Content-Type": "application/json",
                    "Accept": "application/json;charset=UTF-8",
                    "Cache-Control": "no-cache",
                    "Access-Control-Allow-Origin": "*"                        
                },
                body: formdataUpdated,
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("data on registration", data);
                    setErrorValue(prevState => ({
                        ...prevState,
                        ['noError']: 'noError'
                    }));
                },
                (error)=>{
                    console.log("error", error);
    
                });
        }

        else{

            if (data.get('firstName') ===  '') {
                setErrorValue(prevState => ({
                    ...prevState,
                    ['firstName']: 'error'
                }));
            }
            else{
                setErrorValue(prevState => ({
                    ...prevState,
                    ['firstName']: ''
                }));

            }
            if (data.get('lastName') ===  '') {
                setErrorValue(prevState => ({
                    ...prevState,
                    ['lastName']: 'error'
                }));
    
            }
            else{
                setErrorValue(prevState => ({
                    ...prevState,
                    ['lastName']: ''
                }));
            }
            if (data.get('email') ===  '') {
                setErrorValue(prevState => ({
                    ...prevState,
                    ['email']: 'error'
                }));
    
            }
            else{
                setErrorValue(prevState => ({
                    ...prevState,
                    ['email']: ''
                }))

            }
            if (data.get('password') === '') {
                setErrorValue(prevState => ({
                    ...prevState,
                    ['password']: 'error'
                }));
            }
            else{
                setErrorValue(prevState => ({
                    ...prevState,
                    ['password']: ''
                }));

            }
            if (data.get('contact') ===  '') {
                setErrorValue(prevState => ({
                    ...prevState,
                    ['contact']: 'error'
                }));
            }

            else{
                setErrorValue(prevState => ({
                    ...prevState,
                    ['contact']: ''
                }));

            }

        }
    }


    return (

        <React.Fragment>
            <form className="register-form" noValidate autoComplete="off" onSubmit={onClickRegister}>
            <TextField name="firstName" id="firstname-basic" label="FirstName" required />
                {errors.firstName === 'error' && errors.noError!=='noError' && <div className='register-error'>Required</div>}
                <TextField name="lastName" id="lastname-basic" label="LastName" required />
                {errors.lastName === 'error' && errors.noError!=='noError' && <div className='register-error'>Required</div>}
                <TextField name="email" id="email-basic" label="Email" required />
                {errors.email === 'error' && errors.noError!=='noError'&& <div className='register-error'>Required</div>}
                <TextField name="password" id="password-basic" label="Password" required />
                {errors.password === 'error' && errors.noError!=='noError' && <div className='register-error'>Required</div>}
                <TextField name="contact" id="contact-basic" label="Contact" required />
                {errors.contact === 'error' && errors.noError!=='noError' && <div className='register-error'>Required</div>}
                <div><Button type="submit" className='register-button' variant="contained" >Register</Button></div>
            </form>
            {errors.noError === 'noError' && <div className='register-success'>Registration Successful! Please login</div>}
        </React.Fragment>
    );

};


export default Register;
