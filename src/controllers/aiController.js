const OpenAI = require("openai");
const { toFile } = require("openai");
const fs = require("fs");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generatePrediction(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const { procedure } = req.body;

    if (!procedure) {
      return res.status(400).json({
        message: "Procedure is required",
      });
    }

    const prompt = `
Create a realistic cosmetic consultation visualization based on the uploaded person's face.

Selected procedure: ${procedure}

Preserve the person's identity, skin tone, hairstyle, lighting, background,
and general facial appearance.

Only make a subtle and realistic visual change related to the selected procedure.

This is only a cosmetic consultation visualization and does not represent
or guarantee a medical outcome.
`;

    const imageBuffer = fs.readFileSync(req.file.path);

    const imageFile = await toFile(
      imageBuffer,
      req.file.originalname,
      {
        type: req.file.mimetype,
      }
    );

    const result = await openai.images.edit({
      model: "gpt-image-2",
      image: imageFile,
      prompt: prompt,
      quality: "medium",
    });

    const imageBase64 = result.data[0].b64_json;

    res.status(200).json({
      message: "Prediction generated successfully",
      image: imageBase64,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI prediction failed",
      error: error.message,
    });
  }
}

module.exports = {
  generatePrediction,
};