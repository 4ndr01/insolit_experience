import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import User from "/models/user";
import connectMongoDB from "/lib/mongodb";

const bcrypt = require('bcrypt');



const authOptions = {
    secret: 'root',
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,

        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;



                try {
                    await connectMongoDB();
                    let user = null;
                    const client = await User.findOne({ email });

                    if (client) {
                        user = client;
                    }

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/", // Chemin de la page de connexion
    },

    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                const { name, email } = user;
                try {
                    await connectMongoDB();
                    const userExists = await User.findOne({ email });
                    if (userExists) {
                        user.id = userExists._id;
                        user.role = userExists.role;
                        return userExists;
                    }
                    const newUser = new User({
                        name: name,
                        email: email,
                        isGoogleAccount: true,
                        isActive: true,
                    });

                    const res = await newUser.save();
                    if (res.status === 200 || res.status === 201) {
                        return user;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            return user;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.userId = token.sub;
            }
            return session;
        },
    },
};




const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export default NextAuth(authOptions);