import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "/models/user";
import connectMongoDB from "/lib/mongodb";
import bcrypt from 'bcrypt'; // Utilisation de bcrypt pour le hachage des mots de passe

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) { // Ajout de req pour obtenir l'URL de base
                const { email, password } = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user || !await bcrypt.compare(password, user.password)) {
                        throw new Error("Invalid credentials"); // Erreur spécifique pour les identifiants invalides
                    }

                    return user;
                } catch (error) {
                    console.error("Error during authentication:", error);
                    throw new Error("Authentication failed"); // Erreur générique pour les autres problèmes
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // Secret important pour la sécurité
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "google") {
                try {
                    await connectMongoDB();
                    const userExists = await User.findOne({ email });

                    if (userExists) {
                        user.id = userExists._id;
                        user.role = userExists.role;
                        return true; // Connexion réussie pour un utilisateur existant
                    }

                    const newUser = new User({
                        name: profile.name,
                        email: email,
                        isGoogleAccount: true,
                        isActive: true,
                    });

                    await newUser.save();
                    return true; // Connexion réussie pour un nouvel utilisateur
                } catch (error) {
                    console.error("Error during Google sign-in:", error);
                    return false; // Échec de la connexion
                }
            }
            return true; // Autoriser la connexion pour d'autres fournisseurs
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role;
            session.user.id = token.id;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
