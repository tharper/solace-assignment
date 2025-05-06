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

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export function useAdvocates() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });

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
        setPagination(prev => ({ ...prev, totalItems: data.data.length }));
      } catch (error) {
        console.error('Error fetching advocates:', error);
      }
    };

    fetchAdvocates();
  }, []);

  const filterAdvocates = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredAdvocates(advocates);
      setPagination(prev => ({ ...prev, currentPage: 1, totalItems: advocates.length }));
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
    setPagination(prev => ({ ...prev, currentPage: 1, totalItems: filtered.length }));
  };

  const resetFilter = () => {
    setFilteredAdvocates(advocates);
    setPagination(prev => ({ ...prev, currentPage: 1, totalItems: advocates.length }));
  };

  const setCurrentPage = (page: number) => {
    if (page < 1 || page > Math.ceil(pagination.totalItems / pagination.itemsPerPage)) {
      return;
    }
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const getPaginatedAdvocates = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredAdvocates.slice(startIndex, endIndex);
  };

  return {
    advocates,
    filteredAdvocates: getPaginatedAdvocates(),
    filterAdvocates,
    resetFilter,
    pagination,
    setCurrentPage
  };
} 