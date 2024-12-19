import { LLM } from "@/types"

const GOOGLE_PLATORM_LINK = "https://ai.google.dev/"

// Google Models (UPDATED 12/22/23) -----------------------------

// Gemini Flash (UPDATED 05/28/24)
const GEMINI_FLASH: LLM = {
  modelId: "gemini-1.5-flash-latest",
  modelName: "Gemini 1.5 Flash",
  provider: "google",
  hostedId: "	gemini-1.5-flash-latest",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true
}

// Gemini Pro (UPDATED 12/22/23)
const GEMINI_PRO: LLM = {
  modelId: "gemini-pro",
  modelName: "Gemini Pro",
  provider: "google",
  hostedId: "gemini-pro",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: false
}

// Gemini Pro 1.5 (UPDATED 12/22/23)
const GEMINI_PRO_15: LLM = {
  modelId: "gemini-1.5-pro-latest",
  modelName: "Gemini 1.5 Pro",
  provider: "google",
  hostedId: "gemini-1.5-pro-latest",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: false
}

// Gemini Pro Vision (UPDATED 12/22/23)
const GEMINI_PRO_VISION: LLM = {
  modelId: "gemini-pro-vision",
  modelName: "Gemini Pro Vision",
  provider: "google",
  hostedId: "gemini-pro-vision",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true
}

// Gemini 2 Flash
const GEMINI_2_FLASH: LLM = {
  modelId: "gemini-2.0-flash-exp",
  modelName: "Gemini 2 Flash",
  provider: "google",
  hostedId: "gemini-2.0-flash-exp",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true,
  badge: ["NEW"]
}

// Gemini 2.0 Flash Thinking Exp 1219
const GEMINI_2_FLASH_DEEPTHINK_EXP: LLM = {
  modelId: "gemini-2.0-flash-thinking-exp-1219",
  modelName: "Gemini 2 Flash Thinking",
  provider: "google",
  hostedId: "gemini-2.0-flash-thinking-exp-1219",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true,
  badge: ["BETA", "NEW"]
}

// Gemini Experimental 1206
const GEMINI_EXPERIMENTAL_1206: LLM = {
  modelId: "gemini-exp-1206",
  modelName: "Gemini Experimental 1206",
  provider: "google",
  hostedId: "gemini-exp-1206",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true,
  badge: ["BETA"]
}



export const GOOGLE_LLM_LIST: LLM[] = [GEMINI_PRO, GEMINI_PRO_VISION, GEMINI_FLASH, GEMINI_PRO_15, GEMINI_2_FLASH, GEMINI_2_FLASH_DEEPTHINK_EXP, GEMINI_EXPERIMENTAL_1206]
