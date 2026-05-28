import cloudinary from "./cloudinary.js";
import streamifier from "streamifier";

export const uploadBuffer = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "sr-group/projects",
                resource_type: "image",
                quality: "auto",
                fetch_format: "auto",
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );

        // Convert the buffer to a readable stream and pipe it to Cloudinary
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};