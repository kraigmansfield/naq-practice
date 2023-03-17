import React from 'react'
import { useRef, useState, useEffect } from 'react'
import userEvent from '@testing-library/user-event'
import axios from './api/axios'
import Login from './Login'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const REGISTER_URL = '/register'

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [matchPassword, setMatchPassword] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user))
  }, [user])

  useEffect(() => {
    setValidEmail((user))
  }, [user])

  useEffect(() => {
    setValidMatch(password === matchPassword)
  }, [user, password, matchPassword])

  useEffect(() => {
    setErrMsg('')
  }, [user, password, matchPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name:this.state.name

         }).then((response) => {
            if(response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            } else {
              console.log("no response");
            } 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            },
            ),
            
            setUser(''),
            setPassword(''),
            setMatchPassword(''))
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    return (
        <section>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
        >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          />
        <p
          id="uidnote"
          className={
              userFocus && user && !validName ? 'instructions' : 'offscreen'
            }
            >
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          />
        <br></br>
        <br></br>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          aria-describedby="pwdnote"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          />
        <p
          id="pwdnote"
          className={
              passwordFocus ? 'instructions' : 'offscreen'
            }
            >
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters: !@#$%
        </p>

        <label htmlFor="confirm_pwd">Confirm Password:</label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPassword(e.target.value)}
          value={matchPassword}
          required
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
          >
          Must match the first password input field.
        </p>
        <button>
          Sign Up
        </button>
      </form>
      <p>
        Already registered?
        <br />
        <span className="line">
          {/* {<Login />} */}
          <a href="#">Sign In</a>
        </span>
      </p>
    </section>
  )
  
}
  
  export default Register;
