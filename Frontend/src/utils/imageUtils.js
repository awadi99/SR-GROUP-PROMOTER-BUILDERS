import imageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
    const options = {
        maxSizeMB: 0.5, // Target size 0.5MB (500KB) - adjust as needed
        maxWidthOrHeight: 1200, // Keeps image at a reasonable display resolution
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.error("Compression failed:", error);
        return file; // Return original if compression fails
    }
};