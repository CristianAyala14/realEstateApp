import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getListingReq } from '../apiCalls/listingCalls';
import {FaBed, FaBath, FaMapMarkedAlt, FaParking, FaChair} from "react-icons/fa"
import { useSelector } from 'react-redux';

//slider . npm i swiper
import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
import {Navigation} from "swiper/modules"
import "swiper/css/bundle";

export default function UserListings() { 
    //slider
    SwiperCore.use([Navigation]);
    const user = useSelector((state) => state.user);
    const params = useParams();
    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listing, setListing] = useState(false)
    const [error, SetError] = useState(false)

    useEffect(()=>{
        const fetchListing = async()=>{
            const listingId = params.id;
            try {
                setLoading(true)
                const res = await getListingReq(listingId);
                if(res.status===200){
                const objListing = res.listing
                setListing(objListing)
                setLoading(false)
                SetError(false)

                }
                console.log(listing)
            } catch (error) {
                setLoading(false)
                SetError(true)

            }
        }
        fetchListing();
    },[params.id])        


    return (
        <div>
            {loading && <p className='text-center my-7 text-2x1'>Loading... </p>}
            {error && <p className='text-center my-7 text-2x1'>Something went wrong! </p>}
            {listing && !loading && !error && (
                <>
                <Swiper navigation>
                    {listing.imageUrls.map((url)=>(
                        <SwiperSlide key={url}>
                            <div className='h-[550px]' style={{background:`url(${url}) center no-repeat`, backgroundSize: "cover"}}></div>   
                        </SwiperSlide>
                    ))} 
                </Swiper>
                <h1 className='m-3 font-semibold uppercase'>{listing.name}{listing.offer? ` $${listing.discountPrice}` : `$${listing.regularPrice}` } {listing.type === "rent" && " /month"}</h1>
                <p className='text-green-700 m-3 flex gap-1'><FaMapMarkedAlt/>{listing.address}</p>
                <div className='flex gap-4'> 
                    <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 m-3 rounded-md'>
                        {listing.type==="rent"? "For rent":"For sale"}
                    </p>
                    {listing.offer && (
                        <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 m-3 rounded-md'>${listing.regularPrice - listing.discountPrice} Less Offer</p>
                    )}
                </div>

                <p className='text-slate-800 p-1 m-3'><span className='font-semibold text-black '>Description - </span> {listing.description}</p>
                
                <ul className='text-green-900 font-semibold text-sm flex m-3 items-center gap-4 sm:gap-6 flex-wrap'>
                    <li className='flex items-center m-5 whitespace-nowrap gap-1 '><FaBed/>
                        {listing.bedrooms > 1 ?  `${listing.bedrooms} beds` :  `${listing.bedrooms} bed` }
                    </li>
                    <li className='flex items-center m-5 whitespace-nowrap gap-1 '> <FaBath/>
                        {listing.bathrooms > 1 ?  `${listing.bathrooms} bathrooms` :  `${listing.bathrooms} bathroom` }
                    </li>
                    <li className='flex items-center m-5 whitespace-nowrap gap-1'> <FaParking/>
                        {listing.parking === true ?  `Parking spot` :  `No parking` }
                    </li>
                    <li className='flex items-center m-5 whitespace-nowrap gap-1'> <FaChair/>
                        {listing.furnished === true ?  `Furnished` :  `Unfurnished` }
                    </li>
                </ul>
                    {/* verifica que si yo soy usuario y quiero contactarme con otor, q no este contactandome conmigo mismo */}
                {user.user && listing.userRef !== user.user.id && ( //tengo q pasar id por backend por q no lo tengo aca. 
                    <h1>hola</h1>
                )}
                <button className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95'>Contact landlord</button>


                    
                </>
            )}

        </div>
    )
}
