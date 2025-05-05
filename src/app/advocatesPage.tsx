"use client";

import { useAdvocates } from "@/hooks/useAdvocates";
import { AdvocateSearch } from "@/components/AdvocateSearch";
import { AdvocateTable } from "@/components/AdvocateTable";

export default function Home() {
  const { filteredAdvocates, filterAdvocates, resetFilter } = useAdvocates();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Solace Advocates</h1>
      
      <AdvocateSearch 
        onSearch={filterAdvocates}
        onReset={resetFilter}
      />

      <AdvocateTable advocates={filteredAdvocates} />
    </main>
  );
} 