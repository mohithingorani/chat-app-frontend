import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any) {
        const username = credentials.username;
        const password = credentials.password;

        //database check logic
        //if credentials are right
        return {
          id: "user1",
          username: "mohit",
          //return user credentials from database you want in the token
        };
        // else f
        // return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }: any) {
      console.log(session);
      if (session && session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
    async signIn({ profile }: any) {
      console.log(123);
      const email = profile.email;
      const name = profile.name;
      const picture = profile.picture;
      console.log(234);
      try {
        const userExists = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user?email=${email}`
        );
        console.log(1234);
        if (!userExists.data) {
          try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/createUser`, {
              email: email,
              name: name,
              picture: picture,
            });
            if(userExists.data.status === 500){
              return false;
            }
          } catch (err) {
            console.log("Error creating user", err);
            return false;
          }
        }
      } catch (err) {
        console.log("Error checking user", err);
        return false;
      }

      return true;
    },

    pages: {
      signIn: "/signin",
    },
  },
};
