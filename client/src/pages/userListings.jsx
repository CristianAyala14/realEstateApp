import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getListingReq } from '../apiCalls/listingCalls';
//slider . npm i swiper
import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
import {Navigation} from "swiper/modules"
import "swiper/css/bundle";

export default function UserListings() { 
    //slider
    SwiperCore.use({Navigation});

    const params = useParams();
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
                const listing = res.listing
                setListing(listing)
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
                <Swiper navigation>
                    {listing.imageUrls.map((url)=>(
                        <SwiperSlide key={url}>
                            <div className='h-[550px]' style={{background:`url(${url}) center no-repeat`, backgroundSize: "cover"}}></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}
