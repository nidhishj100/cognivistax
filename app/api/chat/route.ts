import { NextResponse, type NextRequest } from "next/server"
import { generateText } from "ai"

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  const prompt = `You are the helpful assistant for Cognivista, an AI-powered personalized learning path generator.
Answer concisely in 2-4 sentences for students and judges. If asked about how it works, mention weak-point selection and learning-style customization producing multiple path options. 
User: ${message}`
  const { text } = await generateText({
    model: "openai/gpt-5-mini",
    prompt,
  })
  return NextResponse.json({ text })
}
