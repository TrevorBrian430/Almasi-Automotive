"use client";

import { deleteVehicle } from "@/lib/actions";
import { Trash2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function DeleteVehicleButton({ id, name }: { id: string; name: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

        startTransition(async () => {
            const res = await deleteVehicle(id);
            if (!res.success) {
                alert(res.error);
            }
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 text-muted hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors disabled:opacity-50"
            title="Delete"
        >
            {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Trash2 className="w-4 h-4" />
            )}
        </button>
    );
}
