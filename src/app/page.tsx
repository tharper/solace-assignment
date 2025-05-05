"use client";

import { useAdvocates } from "@/hooks/useAdvocates";
import { AdvocateSearch } from "@/components/AdvocateSearch";
import { AdvocateTable } from "@/components/AdvocateTable";
import { Header } from "@/components/Header";

export default function Home() {
  const { filteredAdvocates, filterAdvocates, resetFilter } = useAdvocates();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        
        <AdvocateSearch 
          onSearch={filterAdvocates}
          onReset={resetFilter}
        />

        <AdvocateTable advocates={filteredAdvocates} />
      </main>
    </div>
  );
} 