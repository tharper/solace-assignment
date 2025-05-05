import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

interface AdvocateTableProps {
  advocates: Advocate[];
}

export function AdvocateTable({ advocates }: AdvocateTableProps) {
  return (
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
          {advocates.map((advocate) => (
            <tr key={`${advocate.firstName}-${advocate.lastName}`} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{advocate.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{advocate.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{advocate.city}</td>
              <td className="px-6 py-4 whitespace-nowrap">{advocate.degree}</td>
              <td className="px-6 py-4">
                {advocate.specialties.map((specialty) => (
                  <div key={specialty} className="mb-1">{specialty}</div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{advocate.yearsOfExperience}</td>
              <td className="px-6 py-4 whitespace-nowrap"><a href={`tel:${advocate.phoneNumber}`}>{formatPhoneNumber(advocate.phoneNumber)}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 