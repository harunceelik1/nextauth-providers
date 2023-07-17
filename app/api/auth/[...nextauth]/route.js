import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "smith" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        //check to see if email and password is valid
        if (!credentials.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        // check to see if password matchs
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!passwordsMatch) {
          return null;
        }

        //return user object if everything is valid
        return user;
      },
    }),
    GithubProvider({
      name: "github",
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      console.log("jwt callback", { token, user, session });

      if (
        trigger === "update" &&
        session?.name &&
        session?.email &&
        session?.address
      ) {
        token.name = session.name;
        token.email = session.email;
        token.address = session.address;
      }

      //pass in user id and address to token
      if (user) {
        return {
          ...token,
          id: user.id,
          address: user.address,
        };
      }
      //update the user in the db

      const newUser = await prisma.user.update({
        where: {
          id: token.id,
        },
        data: {
          name: token.name,
          email: token.email,
          address: token.address,
        },
      });
      console.log("newUser", newUser);
      return token;
    },

    async session({ session, token, user }) {
      console.log("session callback", { token, user, session });
      // pass in user id and address to session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          address: token.address,
          name: token.name,
        },
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
