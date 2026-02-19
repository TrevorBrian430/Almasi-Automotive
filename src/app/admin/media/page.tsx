import MediaManager from "@/components/admin/media-manager";

export const metadata = {
    title: "Media Manager | Admin Dashboard",
};

export default function AdminMediaPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1
                    className="text-2xl sm:text-3xl text-platinum tracking-wider mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Media Manager
                </h1>
                <p className="text-muted text-sm max-w-2xl">
                    Upload and manage high-quality vehicle imagery. Copy URLs to use in vehicle details.
                </p>
            </div>

            <MediaManager />
        </div>
    );
}
