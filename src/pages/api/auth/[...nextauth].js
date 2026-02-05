import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            // Add user id and avatar to session
            if (session.user) {
                session.user.id = token.sub;
                session.user.avatar = token.picture;
            }
            return session;
        },
        async jwt({ token, profile }) {
            if (profile) {
                token.picture = profile.avatar_url;
            }
            return token;
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
