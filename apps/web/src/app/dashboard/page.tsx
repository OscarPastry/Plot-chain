/**
 * Government Dashboard — Approve/reject registrations, view analytics.
 *
 * TODO:
 * - Fetch pending registrations from backend
 * - Implement approve/reject actions (multi-sig on-chain)
 * - Show analytics: total parcels, disputes, recent transfers
 * - Add satellite overlay comparison view
 */
export default function DashboardPage() {
    // Sample stats
    const stats = [
        { label: "Total Parcels", value: "12,847", icon: "📦" },
        { label: "Pending Approvals", value: "34", icon: "⏳" },
        { label: "Active Disputes", value: "7", icon: "⚠️" },
        { label: "Transfers Today", value: "18", icon: "🔄" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Government Dashboard
                </h1>
                <p className="text-gray-400 mt-2">
                    Monitor, approve, and manage land registrations across all districts.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-gray-800 bg-gray-900 p-5"
                    >
                        <div className="text-2xl">{stat.icon}</div>
                        <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Pending Approvals Table */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800">
                    <h2 className="text-lg font-semibold text-white">
                        Pending Approvals
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-800/50">
                            <tr>
                                <th className="text-left px-6 py-3 text-gray-400 font-medium">
                                    Parcel ID
                                </th>
                                <th className="text-left px-6 py-3 text-gray-400 font-medium">
                                    Location
                                </th>
                                <th className="text-left px-6 py-3 text-gray-400 font-medium">
                                    Owner
                                </th>
                                <th className="text-left px-6 py-3 text-gray-400 font-medium">
                                    Area
                                </th>
                                <th className="text-left px-6 py-3 text-gray-400 font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            <tr className="hover:bg-gray-800/30 transition-colors">
                                <td className="px-6 py-4 text-gray-300 font-mono">PC-0042</td>
                                <td className="px-6 py-4 text-gray-300">
                                    Sector 15, Noida
                                </td>
                                <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                                    0x742d...2bD28
                                </td>
                                <td className="px-6 py-4 text-gray-300">450 m²</td>
                                <td className="px-6 py-4 space-x-2">
                                    <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs transition-colors">
                                        Approve
                                    </button>
                                    <button className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs transition-colors">
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
