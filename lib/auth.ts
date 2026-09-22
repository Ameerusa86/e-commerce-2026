import { betterAuth } from "better-auth";
import { Pool } from "@neondatabase/serverless";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    database: new Pool({
        connectionString: process.env.DATABASE_URL
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            // In a real production application, you should send this URL via an email provider (like Resend, Nodemailer, SendGrid, etc.)
            // For now, we will log it to the console so students can easily test the flow locally.
            console.log(`[AUTH: Password Reset] Link for ${user.email}: ${url}`);
        }
    }
});
