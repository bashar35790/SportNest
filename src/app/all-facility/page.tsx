"use client";
import React, { useState, useEffect } from 'react';
import { Search, Filter, LayoutGrid, List, MapPin, ChevronDown, X, Star, Calendar, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import { GetAllFacilities } from '@/api/GetApi';

export default function AllFacilityPage() {
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        const data = await GetAllFacilities(searchTerm);
        setFacilities(data);
        setVisibleCount(6); // reset on search
      } catch (error) {
        console.error("Error fetching facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchFacilities();
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadMore = () => {
    setVisibleCount(facilities.length);
  };

  const filteredFacilities = selectedSport === "All Sports"
    ? facilities
    : facilities.filter((fac: any) => fac.facility_type === selectedSport);

  const displayedFacilities = filteredFacilities.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-[#f8fafc] pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* Search & Filter Bar */}
        <div className="mb-10 rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-brand-primari transition-colors" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or location..."
                className="w-full rounded-xl bg-slate-50/80 py-3.5 pl-12 pr-4 text-slate-700 outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 focus:ring-brand-primari/50 hover:ring-slate-300"
              />
            </div>

            {/* Select Sport */}
            <div className="relative w-full md:w-56 group">
              <select
                value={selectedSport}
                onChange={(e) => {
                  setSelectedSport(e.target.value);
                  setVisibleCount(6);
                }}
                className="w-full cursor-pointer appearance-none rounded-xl bg-white py-3.5 pl-4 pr-10 text-slate-700 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-brand-primari/50 hover:ring-slate-300"
              >
                <option value="All Sports">All Sports</option>
                <option value="Football">Football</option>
                <option value="Tennis">Tennis</option>
                <option value="Basketball">Basketball</option>
                <option value="Swimming">Swimming</option>
                <option value="Gym">Gym</option>
                <option value="Badminton">Badminton</option>
                <option value="Cricket">Cricket</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none group-focus-within:text-brand-primari transition-colors" />
            </div>

            {/* Filter Button */}
            <button className="flex items-center justify-center gap-2 rounded-xl bg-brand-secoundry px-6 py-3.5 font-medium text-white shadow-lg shadow-brand-secoundry/20 transition hover:bg-slate-800 cursor-pointer active:translate-y-0">
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className='text-left'>
            <h1 className="text-4xl font-bold text-brand-secoundry tracking-tight font-bebasNeue">
              Discover <span className='text-brand-primari'>Facilities</span>
            </h1>
            <p className="mt-1.5 text-[15px] text-brand-secoundry font-medium">
              Found {loading ? '...' : filteredFacilities.length} venues near you
            </p>
          </div>

          {/* View Toggles */}
          <div className="flex gap-1.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition cursor-pointer ${viewMode === "grid"
                  ? "bg-blue-50 text-brand-primari ring-1 ring-blue-100"
                  : "text-slate-400 hover:bg-slate-100 hover:text-brand-primari"
                }`}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition cursor-pointer ${viewMode === "list"
                  ? "bg-blue-50 text-brand-primari ring-1 ring-blue-100"
                  : "text-slate-400 hover:bg-slate-100 hover:text-brand-primari"
                }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
          {displayedFacilities.map((facility: any) => (
            <div
              key={facility._id}
              className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 flex group hover:-translate-y-1 hover:shadow-[0_8px_25px_-8px_rgba(0,0,0,0.15)] hover:ring-1 hover:ring-brand-primari/20 ${viewMode === 'grid' ? 'flex-col' : 'flex-col md:flex-row'}`}
            >
              {/* Image Box */}
              <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'h-64 w-full' : 'w-full md:w-2/5 min-h-[220px]'}`}>
                <Image
                  src={facility.image}
                  alt={facility.name}
                  height={400}
                  width={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute top-4 right-4 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 tracking-wide ${facility.facility_type === "Cricket" ? "bg-green-500" : facility.facility_type === "Football" ? "bg-green-500" : facility.facility_type === "Badminton" ? "bg-green-500" : facility.facility_type === "Basketball" ? "bg-green-500" : facility.facility_type === "Swimming" ? "bg-brand-Cyan400" : "bg-brand-secoundry"}`}>
                  {facility.facility_type}
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 flex flex-col flex-grow ${viewMode === 'list' ? 'justify-center' : ''}`}>
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="text-xl font-bold text-brand-secoundry leading-tight">
                    {facility.name}
                  </h3>
                  <div className="text-right whitespace-nowrap">
                    <span className="text-lg font-bold text-brand-primari">
                      $ {facility.price_per_hour}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      /hr
                    </span>
                  </div>
                </div>

                <div className={`flex flex-col gap-2 ${viewMode === 'list' ? 'my-4' : 'mb-5'}`}>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-1.5 shrink-0 text-brand-primari" />
                    <span className="truncate">Up to {facility.capacity} people</span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1.5 shrink-0 text-brand-primari" />
                    <span className="truncate">{facility.location}</span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1.5 shrink-0 text-brand-primari" />
                    <span className="truncate ">
                      {facility.available_slots ? facility.available_slots.length : 0} slots available
                    </span>
                  </div>
                </div>

                <div className={`mt-auto ${viewMode === 'list' ? 'max-w-[200px]' : ''}`}>
                  <button className="w-full flex items-center justify-center gap-2 bg-brand-primari cursor-pointer hover:bg-brand-Cyan400 text-brand-secoundry font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                    Book Now <Calendar className="h-4 w-4 ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading State or No Results */}
        {loading && (
          <div className="flex justify-center my-10">
            <span className="h-8 w-8 rounded-full border-4 border-slate-200 border-t-brand-primari animate-spin"></span>
          </div>
        )}

        {!loading && filteredFacilities.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-medium">
            No facilities found matching your search and filter criteria.
          </div>
        )}

        {/* Load More section */}
        {!loading && visibleCount < filteredFacilities.length && filteredFacilities.length > 0 && (
          <div className="mt-14 mb-8 flex flex-col items-center gap-5">
            <button
              onClick={loadMore}
              className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-[15px] font-semibold text-slate-600 shadow-sm transition-all hover:border-brand-primari hover:bg-slate-50 hover:text-brand-primari cursor-pointer hover:shadow-md"
            >
              Load More Facilities
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <div className="flex flex-col items-center gap-3">
              <span className="text-[13px] font-medium text-slate-400">
                Showing {visibleCount} of {filteredFacilities.length} facilities
              </span>
              <div className="h-1.5 w-[280px] rounded-full bg-slate-100 overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full bg-[#065f46] transition-all duration-500"
                  style={{ width: `${(visibleCount / filteredFacilities.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}