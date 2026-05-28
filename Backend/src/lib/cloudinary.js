import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

// 1. Setup path resolution for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Load env variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// 3. Destructure and validate configuration
const name = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_CLOUD_API_KEY;
const apiSecret = process.env.CLOUDINARY_CLOUD_API_SECRET;

if (!name || !apiKey || !apiSecret) {
    console.error("Cloudinary Error: Missing environment variables.");
    process.exit(1); // Exit if config is invalid
}

// 4. Configure Cloudinary
cloudinary.config({
    cloud_name: name,
    api_key: apiKey,
    api_secret: apiSecret
});

export default cloudinary;