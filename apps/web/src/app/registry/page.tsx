/**
 * Land Registry page — Register new parcels by drawing polygons on the map.
 *
 * TODO:
 * - Enable polygon drawing mode on map
 * - Convert drawn polygon to GeoHash-12 cells
 * - Submit registration to backend → mint NFT on-chain
 * - Show registration form with owner details
 */
export default function RegistryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Land Registry</h1>
                <p className="text-gray-400 mt-2">
                    Register a new land parcel by drawing its boundaries on the map.
                </p>
            </div>

            {/* Registration Form Placeholder */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    New Registration
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Owner Wallet Address
                        </label>
                        <input
                            type="text"
                            placeholder="0x..."
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Location Description
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Sector 42, Gurugram"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>

                <div className="mt-6 p-12 border-2 border-dashed border-gray-700 rounded-xl text-center text-gray-500">
                    <p className="text-lg">🗺️ Draw parcel boundaries on map</p>
                    <p className="text-sm mt-1">
                        Use the drawing tool to define the land parcel polygon
                    </p>
                </div>

                <button className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors">
                    Register Parcel
                </button>
            </div>
        </div>
    );
}
