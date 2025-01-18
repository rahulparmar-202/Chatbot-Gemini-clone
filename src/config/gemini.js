// old apiKey:  "AIzaSyCMRfYzDRI-v3ysruD3GYj1FssGnshuCRg";
// new apikey = "AIzaSyBcIIRoWRlfMAloqHI-4Vee6susuiZvoa4"

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyBcIIRoWRlfMAloqHI-4Vee6susuiZvoa4";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();

  async function generateContentWithRetry(model, request) {
    let retries = 0;
    const maxRetries = 5; // Set your desired maximum retries
    let delay = 1000; // Initial delay in milliseconds

    while (retries < maxRetries) {
      try {
        const result = await model.generateContent(request);
        return result; // Success!
      } catch (error) {
        if (
          error.message.includes("429") ||
          error.message.includes("RATE_LIMIT_EXCEEDED")
        ) {
          retries++;
          console.warn(
            `Rate limit exceeded. Retry ${retries}/${maxRetries}. Waiting ${
              delay / 1000
            } seconds.`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        } else {
          // Other errors, handle them accordingly
          console.error("An unexpected error occurred", error);
          throw error;
        }
      }
    }
    throw new Error("Max retries exceeded for generating content.");
  }

  // Example usage (assuming you have the model and request defined)
  // const model = ...
  // const request = ...
  generateContentWithRetry(model, request)
    .then((response) => {
      console.log("Content generated successfully:", response);
    })
    .catch((error) => {
      console.error("Failed to generate content:", error);
    });
}

export default run;
