import { useState, useEffect } from "react";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

export function useAdvocates() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const filterAdvocates = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredAdvocates(advocates);
      return;
    }

    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (searchTerm && !isNaN(Number(searchTerm)) && advocate.yearsOfExperience === Number(searchTerm))
      );
    });

    setFilteredAdvocates(filtered);
  };

  const resetFilter = () => {
    setFilteredAdvocates(advocates);
  };

  return {
    advocates,
    filteredAdvocates,
    filterAdvocates,
    resetFilter
  };
} 