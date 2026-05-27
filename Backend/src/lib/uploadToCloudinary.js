import cloudinary from "./cloudinary.js";

import streamifier
    from "streamifier";

export const uploadBuffer =
    (fileBuffer) => {

        return new Promise(
            (
                resolve,
                reject
            ) => {

                const stream =
                    cloudinary.uploader.upload_stream(

                        {
                            folder:
                                "sr-group/projects",

                            resource_type:
                                "image",

                            quality:
                                "auto",

                            fetch_format:
                                "auto"
                        },

                        (
                            error,
                            result
                        ) => {

                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );

                streamifier
                    .createReadStream(fileBuffer)
                    .pipe(stream);
            });
    };