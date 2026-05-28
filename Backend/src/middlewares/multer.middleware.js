import multer from "multer";

// 1. Configure memory storage (buffer storage for Cloudinary processing)
const storage = multer.memoryStorage();

// 2. Define the upload configuration
const upload = multer({
    storage,
    limits: {
        fileSize: 25 * 1024 * 1024, // 25MB limit
        files: 20 // Max 20 files per request
    },
    fileFilter: (req, file, cb) => {
        const allowed = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid image type. Only JPEG, PNG, and WebP are allowed."));
        }
    }
});

export default upload;