import multer from "multer";

const storage =
    multer.memoryStorage();

const upload = multer({

    storage,

    limits: {
        fileSize: 25 * 1024 * 1024,
        files: 20
    },

    fileFilter: (
        req,
        file,
        cb
    ) => {

        const allowed =
            [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];

        if (
            allowed.includes(file.mimetype)
        ) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Invalid image type"
                )
            );
        }
    }
});

export default upload;