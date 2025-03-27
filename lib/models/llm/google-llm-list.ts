import { LLM } from "@/types"

const GOOGLE_PLATORM_LINK = "https://ai.google.dev/"

// Google Models (UPDATED 12/22/23) -----------------------------

// Gemini 1.5 Flash (UPDATED 05/28/24)
const GEMINI_1_5_FLASH: LLM = {
  modelId: "gemini-1.5-flash-latest",
  modelName: "Gemini 1.5 Flash",
  provider: "google",
  hostedId: "	gemini-1.5-flash-latest",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true
}


// Gemini Pro 1.5 (UPDATED 12/22/23)
const GEMINI_1_5_PRO: LLM = {
  modelId: "gemini-1.5-pro-latest",
  modelName: "Gemini 1.5 Pro",
  provider: "google",
  hostedId: "gemini-1.5-pro-latest",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: false
}

// Gemini 2 Flash
const GEMINI_2_FLASH: LLM = {
  modelId: "gemini-2.0-flash",
  modelName: "Gemini 2 Flash",
  provider: "google",
  hostedId: "gemini-2.0-flash",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true
}

// Gemini 2.0 Flash Lite
const GEMINI_2_FLASH_LITE: LLM = {
  modelId: "gemini-2.0-flash-lite",
  modelName: "Gemini 2 Flash Lite",
  provider: "google",
  hostedId: "gemini-2.0-flash-lite",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true
}

// Gemini 2.0 Flash Thinking Exp 
const GEMINI_2_FLASH_THINK_EXP: LLM = {
  modelId: "gemini-2.0-flash-thinking-exp-01-21",
  modelName: "Gemini 2 Flash Thinking",
  provider: "google",
  hostedId: "gemini-2.0-flash-thinking-exp-01-21",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true,
  badge: ["BETA"]
}

// Gemini 2.5 Pro
const GEMINI_2_5_PRO: LLM = {
  modelId: "gemini-2.5-pro-exp-03-25",
  modelName: "Gemini 2.5 Pro",
  provider: "google",
  hostedId: "gemini-2.5-pro-exp-03-25",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true,
  badge: ["BETA", "NEW"]
}


export const GOOGLE_LLM_LIST: LLM[] = [
  GEMINI_1_5_FLASH,
  GEMINI_1_5_PRO,
  GEMINI_2_FLASH,
  GEMINI_2_FLASH_LITE,
  GEMINI_2_FLASH_THINK_EXP,
  GEMINI_2_5_PRO
]
