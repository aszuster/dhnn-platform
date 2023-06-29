import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import User from "models/User"
import dbConnect from "lib/dbConnect"

export const authOptions = {
  strategy: "jwt",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      await dbConnect()
      if (account.provider === "google") {
        const { email, picture, name, family_name } = profile
        try {
          const userBD = await User.findOne({ email: email })
          if (userBD.state === "Activo") {
            user.id = userBD.id
            user.role = userBD.role
            user.picture = userBD.picture
            user.area = userBD.area
            return true
          }
        } catch (err) {
          if (profile.email_verified && profile.email.endsWith("@dhnn.com")) {
            try {
              const newUser = await User.create({
                email: email,
                name: name,
                role: "Miembro",
                picture: {
                  public_id: "",
                  secure_url: picture,
                },
                state: "Activo",
                occupation: "",
              })
              user.id = newUser.id
              user.picture = picture
              user.role = "Miembro"
              return true
            } catch (error) {
              return false
            }
          }
          return false
        }
      }
      return true
    },
    jwt: async ({ token, user, account }) => {
      if (account) {
        // console.log(account)
        // Save the access token and refresh token in the JWT on the initial login
        if (user) {
          return {
            id: user.id,
            user: {
              name: user.name,
              email: user.email,
              picture: user.picture,
              role: user.role,
              area: user.area,
            },
            access_token: account.access_token,
            expires_at: Math.floor(Date.now() / 1000 + account.expires_at),
            refresh_token: account.refresh_token,
          }
        } else {
          return {
            access_token: account.access_token,
            expires_at: Math.floor(Date.now() / 1000 + account.expires_at),
            refresh_token: account.refresh_token,
          }
        }
      } else if (Date.now() < token.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token
      } else {
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_ID,
              client_secret: process.env.GOOGLE_SECRET,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token,
            }),
            method: "POST",
          })

          const tokens = await response.json()

          if (!response.ok) throw tokens

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }
        } catch (error) {
          console.error("Error refreshing access token", error)
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" }
        }
      }
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id
        session.user = {
          name: token.user.name,
          email: token.user.email,
          picture: token.user.picture,
          role: token.user.role,
          area: token.user.area,
        }
        session.accessToken = token.access_token
        session.refresh_token = token.refresh_token
        session.error = token.error
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SIGNIN_PRIVATE_KEY,
    encryption: true,
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login-error", // Error code passed in query string as ?error=
  },
}

export default NextAuth(authOptions)
