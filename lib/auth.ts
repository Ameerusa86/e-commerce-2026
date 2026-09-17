import { betterAuth } from "better-auth";
import { Pool } from "@neondatabase/serverless";

export const auth = betterAuth({
    baseURL:process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    database: new Pool({
        connectionString: process.env.DATABASE_URL
    }),
    emailAndPassword:{
        enabled:true
    }
});
