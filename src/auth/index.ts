import { betterAuth } from "better-auth";
import { db } from "../db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  plugins: [
    magicLink({
      sendMagicLink: async (data: {
        email: string;
        token: string;
        url: string;
      }) => {
        // Here you should send email to the user. Since we
        // are in dev mode, we can log the email
        // to the console for now.
        console.log(`Magic link for ${data.email}: ${data.url}`);
      },
    }),
  ],
});
