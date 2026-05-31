import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./auth.model.js";
import redisClient from "../../config/redis.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'https://api.srgroupandbuilders.com/api/auth/google/callback'||'https://sr-group-promoter-builders.onrender.com/api/auth/google/callback'||'http://localhost:3000/api/auth/google/callback', // Yahan hardcode karein
            passReqToCallback: true,
            proxy: true 
        },

        
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value?.toLowerCase();
                if (!email) return done(null, false, { message: "Email not found" });

                // 1. Existing User Check (Lean for performance)
                const existingUser = await User.findOne({ email });
                if (existingUser) return done(null, existingUser);

                // 2. New Registration: Validate AdminCode
                // Vite frontend se state JSON.stringify hokar aata hai
                const state = req.query.state ? JSON.parse(req.query.state) : null;
                const adminCode = state?.adminCode;

                if (!adminCode) {
                    return done(null, false, { message: "Admin Code required." });
                }

                // 3. Redis Validation
                const isAuthorized = await redisClient.exists(`auth:${adminCode}`);
                if (!isAuthorized) {
                    return done(null, false, { message: "Admin Code invalid or expired." });
                }

                // 4. Create New Admin User
                const newUser = await User.create({
                    fullName: profile.displayName,
                    email,
                    adminCode,
                    profilePic: profile.photos?.[0]?.value,
                    role: "admin", // SRGroup requirement
                    isGoogleUser: true
                });

                // Consume code to prevent reuse
                await redisClient.del(`auth:${adminCode}`);
                
                return done(null, newUser);

            } catch (error) {
                console.error("Google Strategy Error:", error);
                return done(error, null);
            }
        }
    )
);

export default passport;