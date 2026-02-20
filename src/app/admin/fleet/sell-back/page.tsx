import Link from "next/link";
import { CheckCircle2, ChevronLeft, Clock, Search, XCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata = {
    title: "Sell Back Requests | Admin Dashboard",
};

// Mock data to demonstrate the administrative interface for processing incoming sell-back requests
const mockRequests = [
    {
        id: "REQ-001",
        customer: { name: "David K.", email: "david.k@example.com", phone: "+254 712 345 678" },
        vehicle: { make: "Mercedes-Benz", model: "G63 AMG", year: 2023, image: "/images/inventory/g63-amg.jpg" },
        currentValuation: 38500000,
        requestedPrice: 39000000,
        status: "Pending Evaluation",
        date: "2026-02-18",
    },
    {
        id: "REQ-002",
        customer: { name: "Sarah M.", email: "sarah@example.com", phone: "+254 722 987 654" },
        vehicle: { make: "Porsche", model: "911 GT3 RS", year: 2024, image: "/images/inventory/gt3-rs.jpg" },
        currentValuation: 45000000,
        requestedPrice: 45000000,
        status: "Offer Sent",
        date: "2026-02-15",
    },
    {
        id: "REQ-003",
        customer: { name: "James W.", email: "james.w@example.com", phone: "+254 733 456 123" },
        vehicle: { make: "Land Rover", model: "Range Rover SV", year: 2022, image: "/images/inventory/range-rover-sv.jpg" },
        currentValuation: 32000000,
        requestedPrice: 35000000,
        status: "Declined",
        date: "2026-02-10",
    }
];

export default function SellBackRequestsPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link href="/admin/fleet" className="text-muted hover:text-white transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <h1
                            className="text-2xl sm:text-3xl text-platinum tracking-wider"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Sell-Back Requests
                        </h1>
                    </div>
                    <p className="text-muted text-sm ml-8">
                        Process buy-back valuations requested from customer digital gloveboxes.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search requests by ID, customer name, or vehicle..."
                        className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-sm py-2.5 pl-10 pr-4 text-sm text-platinum placeholder:text-muted focus:outline-none focus:border-gold/30 transition-colors"
                    />
                </div>
                <select className="bg-[#0A0A0A] border border-white/[0.08] rounded-sm px-4 py-2.5 text-sm text-platinum focus:outline-none focus:border-gold/30 transition-colors">
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending Evaluation</option>
                    <option value="offer_sent">Offer Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                </select>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
                {mockRequests.map((req) => (
                    <div key={req.id} className="bg-[#0A0A0A] border border-white/[0.08] rounded-sm p-4 sm:p-6 flex flex-col lg:flex-row gap-6 hover:border-white/20 transition-colors group">

                        {/* Status & ID (Mobile Top / Desktop Left) */}
                        <div className="flex lg:flex-col justify-between lg:w-48 shrink-0 border-b border-white/[0.06] lg:border-b-0 lg:border-r pb-4 lg:pb-0 lg:pr-6 gap-2">
                            <div>
                                <p className="text-[10px] text-muted tracking-widest uppercase mb-1">Request ID</p>
                                <p className="text-sm font-mono text-platinum/80">{req.id}</p>
                            </div>
                            <div className="text-right lg:text-left">
                                <p className="text-[10px] text-muted tracking-widest uppercase mb-1">{req.date}</p>
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-medium ${req.status === 'Pending Evaluation' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                        req.status === 'Offer Sent' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                            req.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                                'bg-red-500/10 text-red-500 border border-red-500/20'
                                    }`}>
                                    {req.status === 'Pending Evaluation' && <Clock className="w-3 h-3" />}
                                    {req.status === 'Declined' && <XCircle className="w-3 h-3" />}
                                    {(req.status === 'Offer Sent' || req.status === 'Accepted') && <CheckCircle2 className="w-3 h-3" />}
                                    {req.status}
                                </div>
                            </div>
                        </div>

                        {/* Customer & Vehicle Info */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            {/* Customer */}
                            <div>
                                <p className="text-[10px] text-muted tracking-widest uppercase mb-2">Customer Profile</p>
                                <div className="space-y-1">
                                    <p className="text-platinum text-sm font-medium">{req.customer.name}</p>
                                    <p className="text-muted text-xs">{req.customer.email}</p>
                                    <p className="text-muted text-xs">{req.customer.phone}</p>
                                </div>
                            </div>

                            {/* Vehicle */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-12 bg-card rounded-sm overflow-hidden shrink-0 border border-white/5">
                                    <div className="absolute inset-0 flex items-center justify-center text-muted text-xs bg-white/5">
                                        No Img
                                    </div>
                                    {/* Using next/image requires absolute paths if src is un-configured, keeping simple */}
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted tracking-widest uppercase mb-1">Asset for Return</p>
                                    <p className="text-platinum text-sm font-medium">{req.vehicle.year} {req.vehicle.make} {req.vehicle.model}</p>
                                </div>
                            </div>
                        </div>

                        {/* Financials & Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col justify-between lg:w-48 shrink-0 border-t border-white/[0.06] lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6 gap-4">
                            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                                <div>
                                    <p className="text-[10px] text-muted tracking-widest uppercase mb-1" title="Current AI Estimated Value based on market trends">AI Valuation</p>
                                    <p className="text-platinum text-sm">KES {req.currentValuation.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted tracking-widest uppercase mb-1">Requested By User</p>
                                    <p className="text-gold text-sm">KES {req.requestedPrice.toLocaleString()}</p>
                                </div>
                            </div>
                            <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-xs tracking-wide text-platinum hover:text-gold hover:border-gold/30 transition-all">
                                Process Request <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            <div className="text-center p-8 bg-black/20 border border-dashed border-white/10 rounded-sm mt-8">
                <p className="text-muted text-sm">Real-time sell-back requests are synced directly from the customer's Digital Glovebox application.</p>
            </div>
        </div>
    );
}
