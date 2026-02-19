import AdminContentForm from "@/components/admin/content/admin-content-form";
import { getContent } from "@/lib/actions";

export const metadata = {
    title: "Content Editor | Admin Dashboard",
};

export default async function AdminContentPage() {
    const { data: content } = await getContent();

    return (
        <div className="space-y-8">
            <div>
                <h1
                    className="text-2xl sm:text-3xl text-platinum tracking-wider mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Content Editor
                </h1>
                <p className="text-muted text-sm">
                    Manage website content and copy.
                </p>
            </div>

            <AdminContentForm initialContent={content} />
        </div>
    );
}
