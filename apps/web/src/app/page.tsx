import Map from "@/components/Map";
import ParcelCard from "@/components/ParcelCard";

/**
 * Landing page — Map view with recent parcels.
 */
export default function Home() {
  // TODO: Fetch parcels from API
  const sampleParcels = [
    {
      id: "PC-0001",
      owner: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD28",
      area: "1,200 m²",
      location: "Sector 42, Gurugram, Haryana",
      status: "registered" as const,
    },
    {
      id: "PC-0002",
      owner: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
      area: "850 m²",
      location: "Koramangala, Bengaluru, Karnataka",
      status: "pending" as const,
    },
    {
      id: "PC-0003",
      owner: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
      area: "2,100 m²",
      location: "Bandra West, Mumbai, Maharashtra",
      status: "disputed" as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Plot-Chain
        </h1>
        <p className="mt-3 text-gray-400 text-lg max-w-2xl mx-auto">
          Every square centimeter of earth, immutably owned. Register, verify,
          and transfer land parcels on the blockchain.
        </p>
      </section>

      {/* Map */}
      <section>
        <Map />
      </section>

      {/* Recent Parcels */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">
          Recent Registrations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleParcels.map((parcel) => (
            <ParcelCard key={parcel.id} {...parcel} />
          ))}
        </div>
      </section>
    </div>
  );
}
