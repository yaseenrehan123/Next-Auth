import { z } from "zod";

const editProfileSchema = z.object({
    username: z.string()
        .min(8, "User must contain minimum 8 characters")
        .max(15, "User must contain at most 15 characters"),
});

export default editProfileSchema;