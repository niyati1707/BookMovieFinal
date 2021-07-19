import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import './login.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import { TabPanel } from '@material-ui/lab';
import TabContext from '@material-ui/lab/TabContext';
import Register from './../register/Register';


const Login = (props) => {

    const [tabValue, setTabValue] = useState("1");


    function handleChange (){
        if(tabValue === "1"){
            setTabValue("2");
        }
        else{
            setTabValue("1");
        }
    }


    function onClickLogin(){
        props.sendModalData(false);
        props.sendLoggedInData(true);

        fetch('http://localhost:8085/api/v1/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Authorization: "Bearer " + sessionStorage.getItem("access-token"),                     
            },
          })
            .then((response) => response.json())
            .then((data) => {
                console.log("data on login", data);
                props.sendModalData(false);
                props.sendLoggedInData(true);
        
            },
            (error)=>{
                props.sendModalData(false);
                props.sendLoggedInData(true);

            });
    }

    return (

        <React.Fragment>
            <div className="modal">
            <TabContext value={tabValue}>
        
                <AppBar position="static">
                    <Tabs onChange={handleChange} aria-label="simple tabs example" value={Number(tabValue)-1}>
                        <Tab label="Login" />
                        <Tab label="Register"/>
                    </Tabs>
                </AppBar>

                <TabPanel value="1" index={1}>
                <FormControl className="modal-FormControl">
                    <InputLabel className="modal-input" htmlFor="my-input">Username</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                </FormControl>


                <FormControl className="modal-FormControl">
                    <InputLabel className="modal-input" htmlFor="my-password">Password</InputLabel>
                    <Input id="my-password" aria-describedby="my-helper-text" />
                </FormControl>

                <div><Button className='login-button' variant="contained" onClick={onClickLogin}>Login</Button></div>


                </TabPanel>


                <TabPanel value="2" index={2}>
                    <Register/>
                </TabPanel>
                </TabContext>




            </div>
        </React.Fragment>
    );

};


export default Login;
