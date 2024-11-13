import React, { useEffect, useState } from "react";
import { searchListingReq } from "../apiCalls/listingCalls";
import ListingItem from '../components/listingItem';
import {Link, useNavigate, } from "react-router-dom"


export default function Search(){
    const navigate = useNavigate()
    const [listings, setListings] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "createdAt",
        order: "desc",
        limit: 15,
        page: 1
    });


    const fetchListings = async () => {
        setLoading(true);
        const searchQuery = new URLSearchParams(filters).toString();
        try {
            const res = await searchListingReq(searchQuery);
            if (res.status === 200) {
                console.log(res)
            } else {
                console.error("Error fetching listings", res.status);
            }
        } catch (error) {
            console.error("Error fetching listings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
      if (e.target.id === "all" || e.target.id === "rent" || e.target.id === "sale") {
        setFilters({ ...filters, type: e.target.id });
      }
  
      if (e.target.id === "searchTerm") {
        setFilters({ ...filters, searchTerm: e.target.value });
      }
  
      if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
        setFilters({
          ...filters,
          [e.target.id]: e.target.checked || e.target.checked === "true" ? true : false
        });
      }
  
      if (e.target.id === "sort_order") {
        const [sort, order] = e.target.value.split("_");
        setFilters({ ...filters, sort: sort || "createdAt", order: order || "desc" });
      }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        const typeFromUrl = urlParams.get("type");
        const parkingFromUrl = urlParams.get("parking");
        const furnishedFromUrl = urlParams.get("furnished");
        const offerFromUrl = urlParams.get("offer");
        const sortFromUrl = urlParams.get("sort");
        const orderFromUrl = urlParams.get("order");
    
        setFilters(prevData => ({
          ...prevData,
          searchTerm: searchTermFromUrl || "",
          type: typeFromUrl || "all",
          parking: parkingFromUrl === "true"? true : false,
          furnished: furnishedFromUrl === "true" ? true : false,
          offer: offerFromUrl === "true" ? true : false,
          sort: sortFromUrl || "createdAt",  
          order: orderFromUrl || "desc",
          limit: parseInt(urlParams.get("limit")) || 9,
          page: parseInt(urlParams.get("page")) || 1
        }));
    
        fetchListings();
      }, [location.search]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("searchTerm", filters.searchTerm);
        urlParams.set("type", filters.type);
        urlParams.set("parking", filters.parking);
        urlParams.set("furnished", filters.furnished);
        urlParams.set("offer", filters.offer);
        urlParams.set("sort", filters.sort);
        urlParams.set("order", filters.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {/* Search Term */}
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

                    {/* Type Filters */}
                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Type:</label>
                        <div className="flex gap-2">
                            <input
                                type="radio"
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
                                type="radio"
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
                                type="radio"
                                id="sale"
                                className="w-5"
                                value="sale"
                                onChange={handleFilterChange}
                                checked={filters.type === "sale"}
                            />
                            <span>Sale</span>
                        </div>
                    </div>

                    {/* Amenities Filters */}
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

                    {/* Sort and Order */}
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

                {/* Pagination */}
                {/* <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-slate-500 text-white p-2 rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-lg font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-slate-500 text-white p-2 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div> */}
            </div>
        </div>
    );
};

