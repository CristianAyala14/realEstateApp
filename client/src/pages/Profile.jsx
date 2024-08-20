import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuthContext } from '../contexts/authContext';
import { useRef } from 'react';
//uploading files with firebase.
import { appFirebase } from '../firebaseConfig';
import {getStorage, ref, uploadByTesResumable, getDownloadURL} from 'firebase/storage';


export default function Profile() {
  const user = useSelector((state)=>state.user)
  const {logOut} = useAuthContext()
  const fileRef = useRef(null)

  //upload profile image
  const [img, setImg] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);

  const uploadFile = (file)=>{
    const storage = getStorage(appFirebase);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "images/" + fileName)
    const uploadTask = uploadByTesResumable(storageRef, file)
    //looking for state changes, errors, and completion of the uplad.
    uploadTask.on("state_changed",(snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImgPerc(Math.round(progress))
      switch(snapshot.state){
        case "paused": console.log("Upload is paused.")
          break;
        case "running": console.log("Upload is running")
          break;
        default:
          break;
      }
    })


  }





  useEffect(()=>{
    img && uploadFile(img, "imgUrl")
  }, [img])


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>

        <input type="file" ref={fileRef} hidden accept="image/*" onClick={(e)=> setImg((prev)=>e.target.files[0])} />
        <img onClick={()=>fileRef.current.click()} src={user.user.profileImage} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>

        <input type='text' placeholder='username' id='username' className="border p-3 rounded-lg" />

        <input type='email' placeholder='email' id='email' className="border p-3 rounded-lg" />

        <input type='password' placeholder='password' id='password' className="border p-3 rounded-lg" />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disable:opacity-80'>Update</button>

      </form>

      <div className='flex justify-between mt-5'>
      <button> <span className='text-red-700 cursor-pointer'>Delete account</span></button>
      <button onClick={()=>logOut()}> <span className='text-red-700 cursor-pointer'>Sign out</span></button>
    
      </div>


    
    
    </div>
  )
}
