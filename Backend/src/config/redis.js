import { createClient } from 'redis';
import { authorizedUsers } from '../constants/authInfo.js';

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD, // Use environment variables!
    socket: {
        host: 'tub-name-cheese-17535.db.redis.io',
        port: 13282,
        tls: false,
        // The magic happens here:
        reconnectStrategy: (retries) => {
            // Stop retrying after 20 attempts
            if (retries > 20) {
                return new Error('Redis connection retries exhausted');
            }
            // Exponential backoff: retry after 50ms, 100ms, 150ms... up to 2 seconds
            return Math.min(retries * 50, 2000);
        }
    }
});

// 1. Critical: Catch errors so the server doesn't crash on connection loss
redisClient.on('error', (err) => {
    console.error(' Redis Error:', err.message);
});

// 2. This runs EVERY time Redis connects or reconnects
redisClient.on('ready', async () => {
    console.log(' Redis is connected and ready');
    
    // Sync auth data whenever we (re)connect
    if (authorizedUsers && authorizedUsers.length > 0) {
        try {
            const multi = redisClient.multi();
            for (const user of authorizedUsers) {
                multi.set(`auth:${user.adminCode}`, user.role);
            }
            await multi.exec();
            console.log(` ${authorizedUsers.length} Auth records synced to Redis`);
        } catch (err) {
            console.error(" Failed to sync Auth data:", err);
        }
    }
});

// 3. Keep the initial connect function
export const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
    } catch (err) {
        console.error(" Redis initial connection failed:", err.message);
    }
};

export default redisClient;