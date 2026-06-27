import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const imageUrl = body?.imageUrl;
    if (!imageUrl) {
      return NextResponse.json({ error: "Missing image URL" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
    }

    // Fetch the image from Cloudinary URL and convert it to base64 for Gemini
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json({ error: "Failed to retrieve image from host" }, { status: 400 });
    }
    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = imageResponse.headers.get("content-type") || "image/jpeg";

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            name: { type: SchemaType.STRING, description: "Descriptive name of the overall meal." },
            mealType: { type: SchemaType.STRING, description: "Predicted category (Breakfast, Lunch, Dinner, Snack)." },
            calories: { type: SchemaType.INTEGER, description: "Estimated total calories in kcal." },
            protein: { type: SchemaType.INTEGER, description: "Estimated total protein in grams." },
            carbs: { type: SchemaType.INTEGER, description: "Estimated total carbohydrates in grams." },
            fats: { type: SchemaType.INTEGER, description: "Estimated total fats in grams." },
            confidence: { type: SchemaType.NUMBER, description: "Confidence rating for overall estimation from 0.0 to 1.0." },
            detectedItems: {
              type: SchemaType.ARRAY,
              description: "List of individual food components identified in the image.",
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  name: { type: SchemaType.STRING, description: "Name of the food item." },
                  portion: { type: SchemaType.STRING, description: "Estimated portion details (e.g., '1 cup', '100g', '1 piece')." },
                  calories: { type: SchemaType.INTEGER, description: "Calories in kcal." },
                  protein: { type: SchemaType.INTEGER, description: "Protein in grams." },
                  carbs: { type: SchemaType.INTEGER, description: "Carbs in grams." },
                  fats: { type: SchemaType.INTEGER, description: "Fats in grams." },
                  confidence: { type: SchemaType.NUMBER, description: "Item classification confidence from 0.0 to 1.0." },
                  icon: { type: SchemaType.STRING, description: "Material symbols icon identifier (e.g., 'egg', 'set_meal', 'rice_bowl', 'eco', 'dinner_dining')." }
                },
                required: ["name", "portion", "calories", "protein", "carbs", "fats", "confidence", "icon"]
              }
            }
          },
          required: ["name", "mealType", "calories", "protein", "carbs", "fats", "confidence", "detectedItems"]
        }
      }
    });

    const prompt = `Analyze the provided image of a meal. Identify the food items, estimate their portion sizes, and calculate the nutritional metrics (calories in kcal, and protein, carbs, and fats in grams). Assign classification confidence scores (0.0 to 1.0) to the overall meal and each detected item. Provide a generic material symbols icon name for each item based on its type.`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      },
      prompt
    ]);

    const responseText = result.response.text();
    const jsonOutput = JSON.parse(responseText);

    return NextResponse.json(jsonOutput);
  } catch (error: any) {
    console.error("Gemini analysis API error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze meal image" }, { status: 500 });
  }
}
