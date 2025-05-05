"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        (searchTerm && !isNaN(Number(searchTerm)) && advocate.yearsOfExperience === Number(searchTerm))
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Solace Advocates</h1>
      
      <div className="mb-8">
        <p className="text-lg font-semibold mb-2">Search</p>
        <p className="mb-2">
          Searching for: <span id="search-term" className="font-medium"></span>
        </p>
        <div className="flex gap-4">
          <input 
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            onChange={onChange} 
            placeholder="Search advocates..."
          />
          <button 
            onClick={onClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Reset Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialties</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Years of Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAdvocates.map((advocate) => {
              return (
                <tr key={`${advocate.firstName}-${advocate.lastName}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{advocate.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{advocate.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{advocate.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{advocate.degree}</td>
                  <td className="px-6 py-4">
                    {advocate.specialties.map((s) => (
                      <div key={s} className="mb-1">{s}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{advocate.yearsOfExperience}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{advocate.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
