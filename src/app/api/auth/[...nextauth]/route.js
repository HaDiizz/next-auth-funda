import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/server/models/userModel";
import connectDB from "@/server/database/mongodb";
import bcrypt from "bcryptjs";

connectDB();

export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const user = await User.findOne({ email });

          if (!user) {
            // throw new Error('Invalid User!!!')
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
          emailVerified: profile.email_verified,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        console.log("ProfileReal",profile);
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          role: profile.role ?? "user",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("hello", user);
      console.log("hello2", account);
      console.log("hello3", profile);
      return true;
    },
    async jwt({ token, user, trigger, session, profile }) {
      console.log("token", token);
      console.log("user", user);
      console.log("trigger", trigger);
      console.log("session", session);
      console.log("profile", profile);
      if (user) {
        token.role = user.role;
        token.id = user._id;
      }
      if (trigger === "update") {
        token = session;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session2", session);
      console.log("token2", token);
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id || token.sub;
      }
      // Git 114381896
      // Google 104907043666211616008
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.MONGODB_URI,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
