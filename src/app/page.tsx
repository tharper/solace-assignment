"use client";

import { useAdvocates } from "@/hooks/useAdvocates";
import { AdvocateSearch } from "@/components/AdvocateSearch";
import { AdvocateList } from "@/components/AdvocateList";
import { Pagination } from "@/components/Pagination";
import { Header } from "@/components/Header";

export default function Home() {
  const { filteredAdvocates, filterAdvocates, resetFilter, pagination, setCurrentPage } = useAdvocates();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Advocate Search</h1>
          <AdvocateSearch 
            onSearch={filterAdvocates}
            onReset={resetFilter}
          />
          <div className="mt-6 sm:mt-8">
            <AdvocateList advocates={filteredAdvocates} />
            <Pagination
              currentPage={pagination.currentPage}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
} 