import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios;'


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

import React from 'react'
import userEvent from "@testing-library/user-event";


const Register = () => {
    const userRef = userRef();
    const errRef = userRef();

    const [user,setUser] = useState('');
    const [validName,setValidName] = useState(false);
    const [userFocus,setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=> {
        userRef.current.focus();
    }, [])

    useEffect(()=> {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(()=> {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd===matchPwd);
    }, [user, pwd, matchPwd])

    useEffect(()=> {
        setErrMsg('');
    }, [user, pwd, matchPwd])



  return (
    <section>
        
    </section>
  )
}







export default Register