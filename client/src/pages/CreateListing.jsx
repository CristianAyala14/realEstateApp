import React from 'react'
import { useState } from 'react'
import { app } from '../firebaseConfig'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
export default function CreateListing() {
  const [files, setFiles] =useState([])
  const [formData, setFormData] =useState({
    imageUrls: [],

  })
  const [uploading, setUploading] = useState(false)
  console.log(formData)
  const [imageUploadError, setimageUploadError] = useState(false)
  const uploadImages = async(file)=>{
    return new Promise((resolve,reject)=>{
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, "newListingImages/" + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed",
        (snapshot)=>{const progress=(snapshot.bytesTransferred /snapshot.totalBytes)*100; console.log(progress)}
        ,(error)=>{reject(error)},()=>{getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{resolve(downloadURL)})})
    })
  }


  const handleImageSubmit = (e)=>{
    if(files.length > 0 && files.length + formData.imageUrls.length < 7){
      setUploading(true);
      setimageUploadError(false);
      //in this case we are gonna upload more than just an image. So there will be more tham one asyncroned behavior. One by one images should be uploaded to the firebase store. So we catch that in this array.
      const promises = [];
      for(let i=0; i<files.length; i++){
        promises.push(uploadImages(files[i]));
      }
      Promise.all(promises).then((urls)=>{
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)})
        setimageUploadError(false);
        setUploading(false);
      }).catch((err)=>{
        setimageUploadError("Image upload failed (2mb max per image)."); 
        setUploading(false);
      })
    }else{
      setimageUploadError("You can only upload 6 images per listing. ");
      setUploading(false);

    }
  }

  const handleRemoveImage = (index)=>{
    setFormData({
      //we save the urls that dont match with the index we are trying to delete.
      ...formData, imageUrls: formData.imageUrls.filter((_, i)=>i!==index)
    })
  }


  return (
    <div className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
          {/* left side */}
          <div className="flex flex-col flex-1 gap-4 ">

            <input type="text" placeholder='Name' className='border p-3 rounded-lg' id="name" maxLength="62" minLength="10" required />
            <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id="Description" required />
            <input type="text" placeholder='Address' className='border p-3 rounded-lg' id="Address" required />
            
            <div className='flex gap-6 flex-wrap'>
              <div className='flex gap-2'>
                <input type="checkbox" id="sale" className='w-5' />
                <span>Sell</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id="rent" className='w-5' />
                <span>Rent</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id="parking" className='w-5' />
                <span>Parking Spot</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id="furnished" className='w-5' />
                <span>Furnished</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id="offer" className='w-5' />
                <span>Offer</span>
              </div>
            </div>

            <div className='flex flex-wrap gap-6'>

              <div className='flex items-center gap-2'>
                <input type="number" id='bedrooms' min="1" max="10" required className='p-3 border border-gray-300 rounded-lg'/>
                <p>Beds</p>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number" id='bathrooms' min="1" max="10" required className='p-3 border border-gray-300 rounded-lg'/>
                <p>Baths</p>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number" id='regularPrice' min="1" max="10" required className='p-3 border border-gray-300 rounded-lg'/>
                <div className='flex flex-col items-center'>
                  <p>Regular Price</p>
                  <span className='text-xs'>($ / month)</span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number" id='discountPrice' min="1" max="10" required className='p-3 border border-gray-300 rounded-lg'/>
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>
                  <span className='text-xs'>($ / month)</span>
                </div>
              </div>
            </div>

          </div>
          {/* right side */}
          <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'>Images:</p>
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
            <div className='flex gap-4'>
              <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
              <button type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading? "Uploading...": "Upload"}</button>
            </div>
            {imageUploadError && (
            <span className='text-red-500 text-sm'>{imageUploadError}</span>
            )}
            {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index)=>(
              <div key={url} className='flex justify-between p-3 border items-center'>
                <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                <button type='button' onClick={()=>handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
              </div>
            ))}
            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
          </div>
        </form>
    </div>
  )
}