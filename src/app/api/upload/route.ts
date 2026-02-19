import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), "public/uploads");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Ignore error if directory already exists
        }

        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            url: `/uploads/${filename}`,
            filename
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
    }
}
