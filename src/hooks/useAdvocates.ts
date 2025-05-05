'use client';

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
    const fetchAdvocates = async () => {
      try {
        const response = await fetch("/api/advocates");
        if (!response.ok) {
          throw new Error('Failed to fetch advocates');
        }
        const data = await response.json();
        setAdvocates(data.data);
        setFilteredAdvocates(data.data);
      } catch (error) {
        console.error('Error fetching advocates:', error);
      }
    };

    fetchAdvocates();
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