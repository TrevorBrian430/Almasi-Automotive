import { NextResponse } from "next/server";
import path from "path";
import { readdir, unlink, stat } from "fs/promises";

// Helper to recursively get files
async function getFiles(dir: string): Promise<string[]> {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
        dirents.map((dirent) => {
            const res = path.resolve(dir, dirent.name);
            return dirent.isDirectory() ? getFiles(res) : res;
        })
    );
    return Array.prototype.concat(...files);
}

export async function GET() {
    try {
        const publicDir = path.join(process.cwd(), "public");
        const uploadsDir = path.join(publicDir, "uploads");
        const carsDir = path.join(publicDir, "cars");

        // Ensure directories exist or just ignore if they don't
        // specific implementation to list relevant images

        let allFiles: string[] = [];

        try {
            const uploadFiles = await getFiles(uploadsDir);
            allFiles = [...allFiles, ...uploadFiles];
        } catch (e) { }

        try {
            const carFiles = await getFiles(carsDir);
            allFiles = [...allFiles, ...carFiles];
        } catch (e) { }

        // Filter for images and map to URLs
        const images = allFiles
            .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
            .map(file => {
                const relativePath = path.relative(publicDir, file);
                // Convert backslashes to forward slashes for URLs
                return "/" + relativePath.split(path.sep).join("/");
            });

        return NextResponse.json({ images });
    } catch (error) {
        console.error("List images error:", error);
        return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get("url");

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Security check: ensure path is within public directory
        const publicDir = path.join(process.cwd(), "public");
        const requestedPath = path.join(publicDir, url); // url starts with / usually

        // Resolve absolute path
        const absolutePath = path.resolve(requestedPath);

        if (!absolutePath.startsWith(publicDir)) {
            return NextResponse.json({ error: "Invalid path" }, { status: 403 });
        }

        await unlink(absolutePath);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
    }
}
