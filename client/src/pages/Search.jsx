import React, { useEffect, useState } from "react";
import { searchListingReq } from "../apiCalls/listingCalls";
import ListingItem from '../components/listingItem';
import { Link, useNavigate } from "react-router-dom";

export default function Search() {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [filters, setFilters] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "createdAt",
        order: "desc",
    });

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)

        const searchTermFromUrl = urlParams.get("searchTerm");
        const typeFromUrl = urlParams.get("type");
        const parkingFromUrl = urlParams.get("parking");
        const furnishedFromUrl = urlParams.get("furnished");
        const offerFromUrl = urlParams.get("offer");
        const sortFromUrl = urlParams.get("sort");
        const orderFromUrl = urlParams.get("order");   
        
        //esto pasara asincronicamente, dsp q cargue la vista.
        if(
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl 
        ){
            setFilters({
                searchTerm: searchTermFromUrl || "",
                type: typeFromUrl || "all",
                parking: parkingFromUrl === "true"? true: false,
                furnished: furnishedFromUrl === "true"? true: false,
                offer: offerFromUrl === "true"? true: false,
                sort: sortFromUrl ||"createdAt",
                order:  orderFromUrl || "desc",  
            });
        }
        

        // aqui se hara la llamada al backend desde la url en el momento que carga la vista
        const fetchListings = async () => {
            setLoading(true);
      
            try {
              const searchQuery = urlParams.toString();
              const res = await searchListingReq(searchQuery);
              if (res.status === 200) {
                setLoading(false);
                setListings(res.listings)
                if(res.listings.length > 5){
                    setShowMore(true);
                }
              }
            } catch (error) {
              setLoading(false);
            }
          };

          fetchListings();
    
    
    },[location.search]);

    const showMoreClick = async()=>{
        const startIndex = listings.length;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("startIndex", startIndex);
        const searchQuery = urlParams.toString();
        try {
            const res = await searchListingReq(searchQuery)
            if(res.status === 200){
                console.log(res)
                if(res.listings.docs < 5){
                    
                    setShowMore(false);
                }
                setListings([...listings, ...res.listings])
            } 
        } catch (error) {
            console.log("Cannot get more listings." + error)
        }
    }

    


    // Función de actualización de objeto filters desde formulario frontend
    const handleFilterChange = (e) => {
        if (e.target.id) {
            setFilters({ ...filters, type: e.target.id });
        } 
        if(e.target.id === "searchTerm") {
            setFilters({ ...filters, searchTerm: e.target.value });
        }
        if(["parking", "furnished", "offer"].includes(e.target.id)) {
            setFilters({
                ...filters,
                [e.target.id]: e.target.checked || e.target.checked === "true"? true : false
            });
        }
        if (e.target.id === "sort_order") {
            const sort = e.target.value.split("_")[0] || "createdAt"
            const order = e.target.value.split("_")[1] || "desc";
            setFilters({ ...filters, sort, order});
        }
    };
    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams()
        urlParams.set("searchTerm", filters.searchTerm)
        urlParams.set("type", filters.type)
        urlParams.set("parking", filters.parking)
        urlParams.set("furnished", filters.furnished)
        urlParams.set("offer", filters.offer)
        urlParams.set("sort", filters.sort)
        urlParams.set("order", filters.order)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <input
                            type="text"
                            id="searchTerm"
                            placeholder="Search..."
                            className="border rounded-lg p-3 w-full"
                            value={filters.searchTerm}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Type:</label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="all"
                                className="w-5"
                                value="all"
                                onChange={handleFilterChange}
                                checked={filters.type === "all"}
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="rent"
                                className="w-5"
                                value="rent"
                                onChange={handleFilterChange}
                                checked={filters.type === "rent"}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="sale"
                                className="w-5"
                                value="sale"
                                onChange={handleFilterChange}
                                checked={filters.type === "sale"}
                            />
                            <span>Sale</span>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Amenities:</label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="parking"
                                className="w-5"
                                onChange={handleFilterChange}
                                checked={filters.parking}
                            />
                            <span>Parking lot</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5"
                                onChange={handleFilterChange}
                                checked={filters.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Offer:</label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="offer"
                                className="w-5"
                                onChange={handleFilterChange}
                                checked={filters.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select
                            id="sort_order"
                            className="border rounded-lg p-3"
                            onChange={handleFilterChange}
                            defaultValue={"createdAt_desc"}
                        >
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>

                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
                        Search
                    </button>
                </form>
            </div>

            {/* resultados de busqueda */}
            <div className="flex-1">
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Listing Results:</h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {loading ? (
                        <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
                    ) : listings.length === 0 ? (
                        <p className="text-xl text-slate-700">No listing found!</p>
                    ) : (
                        listings.map((listing) => (
                            <ListingItem key={listing._id} listing={listing} />
                        )) 
                    )}
                </div>
                {showMore && (
                        <button onClick={showMoreClick} className="text-green-700 hover:underline p-7 text-center w-full">Show more</button>
                    )}
            </div> 
        </div>
    );
}