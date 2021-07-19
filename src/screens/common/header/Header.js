import React, { useState } from "react";
import './Header.css';
import logo from './../../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Login from './../../login/Login';
import {
    Link
} from 'react-router-dom';



const Header = (props) => {

    const [openModal, setOpenModal] = useState(false);
    const [isUserLoggedIn, setisUserLoggedIn] = useState(false);

    let isBookShowAvailable = props.isBookShowAvailable;

    function getOpenModalValue(value) {
        setOpenModal(value);
    }

    function getIsUserLoggedInValue(value) {
        setisUserLoggedIn(value);
    }
    return (

        <React.Fragment>
            <div className='header'>
                <img className='header-icon' src={logo} alt="Logo" />
                {!isUserLoggedIn && <Button className='header-button' variant="contained" onClick={() => setOpenModal(true)}>Login</Button>}
                {isUserLoggedIn && <Button className='header-button' variant="contained" onClick={() => setisUserLoggedIn(false)}>Logout</Button>}
                {isBookShowAvailable &&
                    <Link to={{ pathname: "/bookShow",
                    state: {
                        baseUrl: 'http://localhost:8085/api/v1/',
                        id:props.id,
                        item:props.item
                    },
                    
                    }}>
                        <Button className='header-button' color="primary" variant="contained">BookShow</Button>
                    </Link>}

                <Modal
                    disableEnforceFocus
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    open={openModal}>
                    <Login sendModalData={getOpenModalValue} sendLoggedInData={getIsUserLoggedInValue} />
                </Modal>
            </div>
        </React.Fragment>
    );

};


export default Header;
