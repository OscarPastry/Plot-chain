/**
 * Displays summary information about a registered land parcel.
 *
 * TODO:
 * - Fetch parcel data from the backend API
 * - Show ownership history timeline
 * - Show GeoHash cell count and area
 */

interface ParcelCardProps {
    id: string;
    owner: string;
    area: string; // e.g. "1,200 m²"
    location: string;
    status: "registered" | "pending" | "disputed";
}

const statusColors = {
    registered: "bg-emerald-500/20 text-emerald-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    disputed: "bg-red-500/20 text-red-400",
};

export default function ParcelCard({
    id,
    owner,
    area,
    location,
    status,
}: ParcelCardProps) {
    return (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-gray-700 transition-colors">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs text-gray-500 font-mono">#{id}</p>
                    <h3 className="text-white font-semibold mt-1">{location}</h3>
                </div>
                <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[status]}`}
                >
                    {status}
                </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                    <p className="text-gray-500">Owner</p>
                    <p className="text-gray-300 font-mono text-xs truncate">{owner}</p>
                </div>
                <div>
                    <p className="text-gray-500">Area</p>
                    <p className="text-gray-300">{area}</p>
                </div>
            </div>
        </div>
    );
}
