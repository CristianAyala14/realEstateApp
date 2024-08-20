import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAuthContext } from '../contexts/authContext';
import { appFB } from '../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Corregido el nombre de la función importada

export default function Profile() {
  const user = useSelector((state) => state.user);
  const { logOut } = useAuthContext();
  const fileRef = useRef(null);

  // Estado para manejar la imagen, el progreso de subida y la URL de descarga
  const [img, setImg] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [URL, setURL] = useState(''); // Cambiado a string ya que solo se necesita una URL

  const uploadFile = (file) => {
    const storage = getStorage(appFB);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "profileImages/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused.");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload", error);
            break;
          case "storage/unknown":
            console.log("Unknown error occurred", error);
            break;
          default:
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("DownloadURL - ", downloadURL);
          setURL(downloadURL); // Cambiado para solo almacenar la URL como una cadena
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

        <label htmlFor="img">Imagen:</label> {imgPerc > 0 && "Uploading: " + imgPerc + "%"}
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
            src={user.user.profileImage}
            alt="profile"
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          />
        )}

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