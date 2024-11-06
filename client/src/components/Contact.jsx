import React, { useState , useEffect} from 'react'
import { getUserReq } from '../apiCalls/userCalls'
import { Link } from 'react-router-dom'
export default function Contact({listing}) {
  const [landlord, setLandlord] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")

  const onChange = (e)=>{
    setMessage(e.target.value)
  }

  useEffect(()=>{
    const fetchUser = async()=>{
      const landlorId = listing.userRef;
      try {
        setLoading(true)
        const res = await getUserReq(landlorId)
        if(res.status===200){
          const landlord = res.user
          setLandlord(landlord)
          setLoading(false)
          setError(false)

        }
      } catch (error) {
        setError(true)
      }
    }
    fetchUser();
  }, [listing.userRef])

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>Contact <span className='font-semibold'>{landlord.userName}</span> for <span className='font-semibold'>{listing.name}</span></p>
          <textarea 
            name='message' 
            id='message' 
            rows="2" 
            value={message} 
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg '
          ></textarea>
          <Link className='bg-slate-700 text-white border text-center p-3 uppercase rounded-lg hover:opacity-95' to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>Send Message</Link>
        </div>
      )}
    </>
  )
}
