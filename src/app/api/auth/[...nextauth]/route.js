import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/server/models/userModel";
import connectDB from "@/server/database/mongodb";
import bcrypt from "bcryptjs";
import { register } from "@/server/controllers/authCtrl";
import { findOneUserByEmailAndProvider } from "@/server/helpers/user";

connectDB();

export const authOptions = {
  session: {
    jwt: true,
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, //7days
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;

        try {
          const user = await User.findOne({
            username,
            provider: "credentials",
          });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }
          return user._doc;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        // const response = await findOneUserByEmailAndProvider({ provider: "google", email: profile.email })
        // console.log(response);
        return {
          // _id: response.user._id,
          id: profile.sub,
          username: profile.given_name,
          fullName: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
          emailVerified: profile.email_verified,
          provider: "google",
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          username: profile.login,
          fullName: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          role: profile.role ?? "user",
          emailVerified: true,
          provider: "github",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const req = {
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        provider: account.provider,
        image: user.image,
        emailVerified: user.emailVerified,
        provider: "github",
      };
      if (account.provider === "google" || account.provider === "github") {
        register(req);
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.id = user._id;
      }
      if (trigger === "update") {
        token = session;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      const response = await findOneUserByEmailAndProvider({ provider: token.provider, email: token.email })
      session.user = response.user;

      // if (!token.id) {
      //   session.user.id = token.sub;
      // }
      if (session.user) return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
