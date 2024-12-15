import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import getClient from "../../../db/db";

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Email', type: 'text', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials: any) {
                const username = credentials.username
                const password = credentials.password

                //database check logic
                //if credentials are right
                return {
                    id: "user1",
                    username: "mohit"
                    //return user credentials from database you want in the token
                };
                // else f
                // return null
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {

        async session({ session, token, user }: any) {
            console.log(session)
            if (session && session.user) {
                session.user.id = token.userId
            }
            return session
        },
        async signIn({ profile }: any) {
            // const client = await getClient();
            // console.log(profile)
            // console.log(client)
            // const userExist = await client.user.findUnique({
            //     where: {
            //         email: profile.email
            //     }
            // })
            // if (!userExist) {
            //     try {
            //         await client.user.create({
            //             data: {
            //                 email: profile.email,
            //                 name: profile.name,
            //             }
            //         })
            //     }
            //     catch(err){
            //         console.log("Error creating user",err);
            //     }
            // }
            return true
        }
    },
    pages: {
        signIn: "/signin"
    }
}