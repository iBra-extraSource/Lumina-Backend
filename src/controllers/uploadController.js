function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      filename: req.file.filename,
      path: req.file.path,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Image upload failed",
    });
  }
}

module.exports = {
  uploadImage,
};