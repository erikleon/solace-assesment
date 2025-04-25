"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { Advocate } from "./types";
import { debounce } from "lodash";

export default function Home() {
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetAdvocates = async () => {
    const params = new URLSearchParams();
    params.append("search", searchTerm);
    try {
      console.log(searchTerm);
      const response = await fetch(`/api/advocates?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFilteredAdvocates(data.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    debounce(handleGetAdvocates, 500)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const renderAdvocates = () => {
    if (!isLoading && filteredAdvocates.length > 0) {
      return filteredAdvocates.map((advocate: Advocate) => (
        <tr key={advocate.id} className="px-3 py-2 whitespace-nowrap">
          <td className="px-3 py-2 whitespace-nowrap">{advocate.firstName}</td>
          <td className="px-3 py-2 whitespace-nowrap">{advocate.lastName}</td>
          <td className="px-3 py-2 whitespace-nowrap">{advocate.city}</td>
          <td className="px-3 py-2 whitespace-nowrap">{advocate.degree}</td>
          <td className="px-3 py-2 whitespace-nowrap space-y-2 max-w-lg text-balance">
            {advocate.specialties.map((s: string, index: number) => (
              <span key={index} className="specialty-chip inline-block mx-1">
                {s}
              </span>
            ))}
          </td>
          <td className="px-3 py-2 whitespace-nowrap">
            {advocate.yearsOfExperience}
          </td>
          <td className="px-3 py-2 whitespace-nowrap">
            {advocate.phoneNumber}
          </td>
        </tr>
      ));
    } else if (isLoading) {
      return (
        <tr>
          <td colSpan={7} className="text-center py-4">
            Loading...
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan={7} className="text-center py-4">
          No advocates found
          {searchTerm.length > 0 && (
            <p className="text-xs text-gray-700 mt-2">
              Searching for: <span id="search-term">{searchTerm}</span>{" "}
            </p>
          )}
        </td>
      </tr>
    );
  };

  return (
    <main className="min-h-screen p-24 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="advocate-name">Solace Advocates</h1>
      </div>
      <div className="flex gap-4 justify-between items-center">
        <label htmlFor="Search">
          <p className="text-base text-gray-700">
            Search
            {searchTerm.length > 0 && (
              <span className="ml-4 text-xs text-gray-700 mt-2">
                Searching for: <span id="search-term">{searchTerm}</span>{" "}
              </span>
            )}
          </p>

          <input
            type="text"
            id="Search"
            onChange={handleSearch}
            className="mt-0.5 w-full rounded border-black border-2 px-5 py-3 max-w-sm shadow-sm sm:text-sm"
            value={searchTerm}
          />
        </label>

        <button
          className={`reset-search-button flex px-8 py-3 mt-8 align-center justify-center max-w-xs transition-all ease-in ${
            searchTerm.length > 0 && !isLoading ? "visible" : "hidden"
          }`}
          onClick={handleReset}
        >
          Reset Search
        </button>
      </div>

      <div className="overflow-x-auto shadow-sm rounded-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white px-3 py-2 shadow-sm">
          <thead className="text-left">
            <tr>
              <th className="px-3 py-2 whitespace-nowrap">First Name</th>
              <th className="px-3 py-2 whitespace-nowrap">Last Name</th>
              <th className="px-3 py-2 whitespace-nowrap">City</th>
              <th className="px-3 py-2 whitespace-nowrap">Degree</th>
              <th className="px-3 py-2 whitespace-nowrap max-w-md">
                Specialties
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                Years of Experience
              </th>
              <th className="px-3 py-2 whitespace-nowrap">Phone Number</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {renderAdvocates()}
          </tbody>
        </table>
      </div>
    </main>
  );
}
