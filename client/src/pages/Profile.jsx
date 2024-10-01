import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure, setAccessToken, deleteUserStart,
  deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useAuthContext } from '../contexts/authContext';
import { app } from '../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateUserReq, deleteUserReq } from '../apiCalls/userCalls';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// Regex validation rules
const userNameRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,16}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Profile() {
  const user = useSelector((state) => state.user);
  const { logOut, loading, error } = useAuthContext();
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const [updateUser, setUpdateUser] = useState({});
  const [img, setImg] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Validation states
  const [validUserName, setValidUserName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // File upload logic
  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "profileImages/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUpdateUser({ ...updateUser, profileImage: downloadURL });
          console.log(updateUser)
        });
      }
    );
  };

  useEffect(() => {
    if (img) {
      setFileUploadError(false);
      uploadFile(img);
      setImg(null);
    }
  }, [img]);

  // Validation logic for each field
  useEffect(() => {
    const result = userNameRegex.test(updateUser.userName || user.user.userName);
    setValidUserName(result);
  }, [updateUser.userName]);

  useEffect(() => {
    const result = emailRegex.test(updateUser.email || user.user.email);
    setValidEmail(result);
  }, [updateUser.email]);

  useEffect(() => {
    const result = passwordRegex.test(updateUser.password);
    setValidPassword(result);
  }, [updateUser.password]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      dispatch(updateUserStart());
      const res = await updateUserReq(user.user.id, updateUser);
      if (res.status === 200) {
        dispatch(updateUserSuccess(res.user));
        dispatch(setAccessToken(res.accessToken));
        setUpdateSuccess(true);
      } else {
        dispatch(updateUserFailure(res.data));
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const deleteUser= async()=>{
    try {
      dispatch(deleteUserStart());
      const res = await deleteUserReq(user.user.id);
      if(res.status ===200){
        dispatch(deleteUserSuccess(res.data))
      }
    } catch (error) {
        dispatch(deleteUserFailure(error.message));
    }
    
  }



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type="file"
          id='img'
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={updateUser.profileImage || user.user.profileImage}
          alt="profile"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p>
          {fileUploadError ? (
            <span className='text-red-700'>Error uploading image. Image must be less than 2 mb</span>
          ) : imgPerc > 0 && imgPerc < 100 ? (
            <span className='text-green-700'>Uploading:{imgPerc}%</span>
          ) : imgPerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : ""}
        </p>

        {/* Username */}
        <label htmlFor="userName" className='flex items-center gap-2'>
          Username:
          <span className={validUserName ? "text-green-500" : "hidden"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={!validUserName && updateUser.userName ? "text-red-500" : "hidden"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type='text'
          id='userName'
          className="border p-3 rounded-lg"
          defaultValue={user.user.userName}
          onChange={(e) => setUpdateUser({ ...updateUser, userName: e.target.value })}
          onFocus={() => setUserNameFocus(true)}
          onBlur={() => setUserNameFocus(false)}
        />
        <p className={userNameFocus && updateUser.userName && !validUserName ? "text-red-500" : "hidden"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
        </p>

        {/* Email */}
        <label htmlFor="email" className='flex items-center gap-2'>
          Email:
          <span className={validEmail ? "text-green-500" : "hidden"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={!validEmail && updateUser.email ? "text-red-500" : "hidden"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type='email'
          id='email'
          className="border p-3 rounded-lg"
          defaultValue={user.user.email}
          onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p className={emailFocus && updateUser.email && !validEmail ? "text-red-500" : "hidden"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Please enter a valid email address.
        </p>

        {/* Password */}
        <label htmlFor="password" className='flex items-center gap-2'>
          Password:
          <span className={validPassword ? "text-green-500" : "hidden"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={!validPassword && updateUser.password ? "text-red-500" : "hidden"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type='password'
          id='password'
          className="border p-3 rounded-lg"
          onChange={(e) => setUpdateUser({ ...updateUser, password: e.target.value })}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p className={passwordFocus && updateUser.password && !validPassword ? "text-red-500" : "hidden"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 16 characters. Must include uppercase and lowercase letters, a number, and a special character.
        </p>

        {error && (
          <span className='text-red-500'>{error}</span>
        )}
         {updateSuccess && (
          <span className='text-green-500'>User is updated successfully!</span>
        )}

        <button
          type="submit"
          className='bg-teal-400 text-white font-bold p-3 mt-3 rounded-lg'>
          {loading ? "Loading..." : "Save"}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <button onClick={() => deleteUser()}><span className='text-red-700 cursor-pointer'>Delete account</span></button>
        <button onClick={() => logOut()}><span className='text-red-700 cursor-pointer'>Sign out</span></button>
      </div>
    </div>
  );
}