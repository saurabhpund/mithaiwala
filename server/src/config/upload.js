const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mithaiwala",
    allowed_formats: ["jpg", "png", "jpeg"],
    resource_type: "image",
    public_id: (req, file) => `product_${Date.now()}`
  },
});


const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 }, });

module.exports = upload;