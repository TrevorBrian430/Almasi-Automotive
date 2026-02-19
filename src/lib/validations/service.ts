import { z } from "zod";

export const serviceBookingSchema = z.object({
    vehicleMakeModel: z
        .string()
        .min(2, "Vehicle make & model is required"),
    registrationNumber: z
        .string()
        .regex(
            /^K[A-Z]{2}\s?\d{3}[A-Z]$/,
            "Enter a valid Kenyan plate (e.g., KDK 123A)"
        ),
    ownerName: z
        .string()
        .min(2, "Owner name is required"),
    ownerPhone: z
        .string()
        .regex(
            /^(\+254|0)\d{9}$/,
            "Enter a valid phone number (e.g., 0712345678)"
        ),
    ownerEmail: z
        .string()
        .email("Enter a valid email address")
        .optional()
        .or(z.literal("")),
    serviceCategory: z.enum(
        ["Minor Service", "Major Service", "Diagnostics", "Detailing & Bodywork"],
        { message: "Please select a service type" }
    ),
    preferredDate: z
        .string()
        .min(1, "Please select a preferred date"),
    requiresConcierge: z.boolean(),
    description: z
        .string()
        .max(500, "Keep description under 500 characters")
        .optional(),
});

export type ServiceBookingFormValues = z.infer<typeof serviceBookingSchema>;
