import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { WriteClient } from "./sanity/lib/Write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      // Ensure profile is not undefined
      if (!profile) {
        throw new Error("Profile is undefined");
      }

      const { id, login, bio } = profile; // Safely destructure profile now

      // Fetch existing user based on GitHub ID
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

      // If no existing user, create a new author in Sanity
      if (!existingUser) {
        await WriteClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "", // Fallback to an empty string if bio is undefined
        });
      }

      return true; // Allow sign-in
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
