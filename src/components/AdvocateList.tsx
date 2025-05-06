import { AdvocateTable } from "./AdvocateTable";
import { AdvocateCard } from "./AdvocateCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

interface AdvocateListProps {
  advocates: Advocate[];
}

export function AdvocateList({ advocates }: AdvocateListProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {advocates.map((advocate) => (
          <AdvocateCard key={`${advocate.firstName}-${advocate.lastName}`} advocate={advocate} />
        ))}
      </div>
    );
  }

  return <AdvocateTable advocates={advocates} />;
} 