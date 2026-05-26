import { createClient } from 'redis';
import { authorizedUsers } from '../constants/authInfo.js';

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD || 'ar6glYnjKDbbJKmOuQjIiswp6i4cNRf3',
    socket: {
        host: 'tub-name-cheese-17535.db.redis.io',
        port: 13282,
        // TLS false rakhna zaroori hai kyunki aapka tested code isi pe kaam kar raha hai
        tls: false 
    }
});

redisClient.on('error', err => console.error('Redis Client Error:', err));

export const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
        console.log("✅ Connected to Redis successfully");

        // Auth data load logic
        if (authorizedUsers && authorizedUsers.length > 0) {
            const multi = redisClient.multi();
            for (const user of authorizedUsers) {
                multi.set(`auth:${user.adminCode}`, user.role);
            }
            await multi.exec();
            console.log(`🚀 ${authorizedUsers.length} Auth records loaded into Redis`);
        }
    } catch (err) {
        console.error("❌ Redis connection failed:", err.message);
    }
};

export default redisClient;