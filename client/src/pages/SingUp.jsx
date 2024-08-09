import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

//validation regex in front
const userNameRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,16}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SingUp() {

  const {singUp, error, loading} = useAuthContext()


  //validation user experience
  const userNameRef = useRef();

  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [frontErrorMessage, setFrontErrorMessage] = useState("");

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = userNameRegex.test(userName);
    setValidUserName(result);
  }, [userName]);

  useEffect(() => {
    const result = emailRegex.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = passwordRegex.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setFrontErrorMessage("");
  }, [userName, password, matchPassword]);




  //api call
  const handleSubmit = async (e) => {
    e.preventDefault();
    //re verification (Fron error message solo aparecera en si por alguna razon nos hakean y habilitan el boton "sing up" por mas que no alla pasado por las validaciones, aca se hace otra validacion)
    const userVerification = userNameRegex.test(userName);
    const emailVerification = emailRegex.test(email);
    const passwordVerification = passwordRegex.test(password);

    if (!userVerification || !emailVerification || !passwordVerification) {
      setFrontErrorMessage("Invalid entry.");
      return;
    }

    const formData = {
      userName, email, password
    };
    singUp(formData)
    
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
      

      <h1 className='text-3xl text-center font-bold my-7'>Sing Up</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* username */}
        <label htmlFor="username" className='flex items-center gap-2'>
          Username:
          <span className={validUserName ? "text-green-500" : "hidden"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={!validUserName && userName ? "text-red-500" : "hidden"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input 
          type="text"
          id="username" 
          ref={userNameRef} 
          autoComplete='off'
          className='border p-3 rounded-lg'
          onChange={(e) => setUserName(e.target.value)} 
          value={userName}
          required
          aria-invalid={validUserName ? "false" : "true"}
          aria-describedby='uidnote'
          onFocus={() => setUserNameFocus(true)}
          onBlur={() => setUserNameFocus(false)}
        />
        <p id='uidnote' className={userNameFocus && userName && !validUserName ? "text-red-500" : "hidden"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        {/* email */}
        <label htmlFor="email" className='flex items-center gap-2'>
          Email:
          <span className={validEmail ? "text-green-500" : "hidden"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={!validEmail && email ? "text-red-500" : "hidden"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input 
          type="email"
          id="email" 
          className='border p-3 rounded-lg'
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby='emailNote'
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p id='emailNote' className={emailFocus && !validEmail ? "text-red-500" : "hidden"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Please enter a valid email address. <br />
        </p>

        {/* password */}
        <label htmlFor="password" className='flex items-center gap-2'>
          Password:
          <span className={validPassword ? "text-green-500" : "hidden"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={!validPassword && password ? "text-red-500" : "hidden"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input 
          type="password"
          id="password" 
          className='border p-3 rounded-lg'
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={validPassword ? "false" : "true"}
          aria-describedby='passwordNote'
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p id='passwordNote' className={passwordFocus && !validPassword ? "text-red-500" : "hidden"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 16 characters. <br />
          Must include uppercase and lowercase letters, a number, and a special character. <br />
          Allowed special characters: !@#$%
        </p>

        {/* confirm password */}
        <label htmlFor="confirm_password" className='flex items-center gap-2'>
          Confirm Password:
          <span className={validMatch && matchPassword ? "text-green-500" : "hidden"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={!validMatch && matchPassword ? "text-red-500" : "hidden"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input 
          type="password"
          id="confirm_password" 
          className='border p-3 rounded-lg'
          onChange={(e) => setMatchPassword(e.target.value)}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby='matchNote'
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p id='matchNote' className={matchFocus && !validMatch ? "text-red-500" : "hidden"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input.
        </p>

      
        {/* submit */}
          <button 
            className={`p-3 rounded-lg uppercase text-white ${!validUserName || !validEmail || !validPassword || !validMatch ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'} disabled:opacity-80`} 
            disabled={!validUserName || !validEmail || !validPassword || !validMatch }
          >{loading ? "Loading..." : "Sing In"}
          </button>
      </form>
      
      {error? <p className='text-red-500 mt-5'>{error}</p> : ""}
        {frontErrorMessage? <p className='text-red-500 mt-5'>{frontErrorMessage}</p> : ""}
      <p className='text-center'>
        <br />
        Already registered? <Link to="/sing-in"><span className='text-blue-700'>Sign In</span></Link>
      </p>
    </div>
  );
}