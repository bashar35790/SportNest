"use client";
import React, { useState, useEffect } from 'react';
import { Search, Filter, LayoutGrid, List, ChevronDown } from 'lucide-react';
import { GetAllFacilities } from '@/api/GetApi';
import { FacilityCard, type FacilityCardData } from '@/components/FacilityCard';

interface Facility {
  _id: string;
  name: string;
  facility_type: string;
  image: string;
  location: string;
  price_per_hour: number;
  capacity: number;
  available_slots: string[];
  description: string;
  owner_email: string;
  booking_count: number;
  created_at?: string;
}


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
    : facilities.filter((fac: Facility) => fac.facility_type === selectedSport);

  const displayedFacilities = filteredFacilities.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-slate-900 pt-36 pb-20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* Search & Filter Bar */}
        <div className="mb-10 rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-sm border border-slate-100 dark:border-white/10 transition-colors duration-300">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-brand-primari transition-colors" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or location..."
                className="w-full rounded-xl bg-slate-50/80 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-400 dark:ring-white/10 py-3.5 pl-12 pr-4 text-slate-700 outline-none ring-1 ring-slate-200 transition focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-brand-primari/50 hover:ring-slate-300"
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
                className="w-full cursor-pointer appearance-none rounded-xl bg-white dark:bg-slate-700 dark:text-slate-200 dark:ring-white/10 py-3.5 pl-4 pr-10 text-slate-700 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-brand-primari/50 hover:ring-slate-300"
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
            <button className="flex items-center justify-center gap-2 rounded-xl bg-brand-primari px-6 py-3.5 font-medium text-white shadow-lg shadow-brand-secondary/20 transition hover:bg-brand-Cyan400 cursor-pointer active:translate-y-0">
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className='text-left'>
            <h1 className="text-4xl font-bold text-brand-secondary dark:text-white tracking-tight font-bebasNeue">
              Discover <span className='text-brand-primari'>Facilities</span>
            </h1>
            <p className="mt-1.5 text-[15px] text-brand-secondary dark:text-slate-400 font-medium">
              Found {loading ? '...' : filteredFacilities.length} venues near you
            </p>
          </div>

          {/* View Toggles */}
          <div className="flex gap-1.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition cursor-pointer ${viewMode === "grid"
                ? "bg-blue-50 dark:bg-brand-primari/20 text-brand-primari ring-1 ring-blue-100 dark:ring-brand-primari/30"
                : "text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-brand-primari"
                }`}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition cursor-pointer ${viewMode === "list"
                ? "bg-blue-50 dark:bg-brand-primari/20 text-brand-primari ring-1 ring-blue-100 dark:ring-brand-primari/30"
                : "text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-brand-primari"
                }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
          {displayedFacilities.map((facility: FacilityCardData) => (
            <FacilityCard key={facility._id} facility={facility} viewMode={viewMode} />
          ))}
        </div>

        {/* Loading State or No Results */}
        {loading && (
          <div className="flex justify-center my-10">
            <span className="h-8 w-8 rounded-full border-4 border-slate-200 border-t-brand-primari animate-spin"></span>
          </div>
        )}

        {!loading && filteredFacilities.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400 font-medium">
            No facilities found matching your search and filter criteria.
          </div>
        )}

        {/* Load More section */}
        {!loading && visibleCount < filteredFacilities.length && filteredFacilities.length > 0 && (
          <div className="mt-14 mb-8 flex flex-col items-center gap-5">
            <button
              onClick={loadMore}
              className="group flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 px-7 py-3 text-[15px] font-semibold text-slate-600 dark:text-slate-300 shadow-sm transition-all hover:border-brand-primari hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-primari cursor-pointer hover:shadow-md"
            >
              Load More Facilities
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <div className="flex flex-col items-center gap-3">
              <span className="text-[13px] font-medium text-slate-400 dark:text-slate-500">
                Showing {visibleCount} of {filteredFacilities.length} facilities
              </span>
              <div className="h-1.5 w-[280px] rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden shadow-inner">
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