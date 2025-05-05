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
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">City</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Degree</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Specialties</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Years</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Phone</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {advocates.map((advocate) => (
                <tr key={`${advocate.firstName}-${advocate.lastName}`} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{advocate.firstName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{advocate.lastName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">{advocate.city}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">{advocate.degree}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 hidden lg:table-cell">
                    {advocate.specialties.map((specialty) => (
                      <div key={specialty} className="mb-1">{specialty}</div>
                    ))}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{advocate.yearsOfExperience}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                    <a href={`tel:${advocate.phoneNumber}`} className="text-blue-600 hover:text-blue-800">
                      {formatPhoneNumber(advocate.phoneNumber)}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 