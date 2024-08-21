import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAuthContext } from '../contexts/authContext';
import { app } from '../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Corregido el nombre de la función importada

//firebase storage rules
      // allow read;
			// allow write: if 
			// request.resource.size < 2* 1024 * 1024 && 
			// request.resource.contentType.matches("image/.*")




export default function Profile() {
  const user = useSelector((state) => state.user);
  const { logOut } = useAuthContext();
  const fileRef = useRef(null);

  // Estado para manejar la imagen, el progreso de subida y la URL de descarga
  const [img, setImg] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
          setFormData({...formData, profileImage: downloadURL}); // Cambiado para solo almacenar la URL como una cadena
        });
      }
    );
  };

  useEffect(() => {
    if (img) {
      uploadFile(img); // Eliminar el segundo parámetro innecesario
      setImg(null)
    }
  }, [img]);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        
        <input
          type="file"
          id='img'
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])} // Cambiado onClick por onChange
        />
        {user.user?.profileImage && ( // Comprobación de que profileImage existe
          <img
            onClick={() => fileRef.current.click()}
            src={ formData.profileImage || user.user.profileImage}
            alt="profile"
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          />
        )}
  
        <p>
          { fileUploadError ? (
              <span className='text-red-700'>Error uploading image. Image must be less than 2 mb</span>
            ) : imgPerc > 0 && imgPerc < 100 ? (
              <span className='text-green-700'>`Uploading ${imgPerc}%`</span>
            ) : imgPerc === 100 ? (
              <span className='text-green-700'>Image successfully uploaded!</span>
            ) : (
              ""
            )
          }
         </p>

        <input type='text' placeholder='username' id='username' className="border p-3 rounded-lg" />

        <input type='email' placeholder='email' id='email' className="border p-3 rounded-lg" />

        <input type='password' placeholder='password' id='password' className="border p-3 rounded-lg" />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>

      </form>

      <div className='flex justify-between mt-5'>
        <button><span className='text-red-700 cursor-pointer'>Delete account</span></button>
        <button onClick={() => logOut()}><span className='text-red-700 cursor-pointer'>Sign out</span></button>
      </div>
    </div>
  );
}