import { LLM } from "@/types"

const GROQ_PLATORM_LINK = "https://groq.com/"

// Llama 3 models
const LLaMA3_8B: LLM = {
  modelId: "llama3-8b-8192",
  modelName: "Meta Llama 3 (8B)",
  provider: "groq",
  hostedId: "llama3-8b-8192",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false
}

const LLaMA3_70B: LLM = {
  modelId: "llama3-70b-8192",
  modelName: "Meta Llama 3 (70B)",
  provider: "groq",
  hostedId: "llama3-70b-8192",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
}

// Llama 3.1 models
const LLaMA31_8B: LLM = {
  modelId: "llama-3.1-8b-instant",
  modelName: "Meta Llama 3.1 (8B)",
  provider: "groq",
  hostedId: "llama-3.1-8b-instant",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
}

const LLaMA31_70B: LLM = {
  modelId: "llama-3.1-70b-versatile",
  modelName: "Meta Llama 3.1 (70B)",
  provider: "groq",
  hostedId: "llama-3.1-70b-versatile",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
}

// Llama 3.2 models
const LLaMA32_3B: LLM = {
  modelId: "llama-3.2-3b-preview",
  modelName: "Meta Llama 3.2 (3B)",
  provider: "groq",
  hostedId: "llama-3.2-3b-preview",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
}

const LLaMA32_11B: LLM = {
  modelId: "llama-3.2-11b-vision-preview",
  modelName: "Meta Llama 3.2 (11B)",
  provider: "groq",
  hostedId: "llama-3.2-11b-vision-preview",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
}

const LLaMA32_90B: LLM = {
  modelId: "llama-3.2-90b-vision-preview",
  modelName: "Meta Llama 3.2 (90B)",
  provider: "groq",
  hostedId: "llama-3.2-90b-vision-preview",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: true,
}

// Mixtral models
const MIXTRAL_8X7B: LLM = {
  modelId: "mixtral-8x7b-32768",
  modelName: "Mixtral-8x7b-Instruct-v0.1",
  provider: "groq",
  hostedId: "mixtral-8x7b-32768",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false
}

// Gemma models
const GEMMA_7B_IT: LLM = {
  modelId: "gemma-7b-it",
  modelName: "Google Gemma (7B)",
  provider: "groq",
  hostedId: "gemma-7b-it",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
}

const GEMMA2_7B_IT: LLM = {
  modelId: "gemma2-9b-it",
  modelName: "Google Gemma 2 (9b)",
  provider: "groq",
  hostedId: "gemma2-9b-it",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
}

export const GROQ_LLM_LIST: LLM[] = [
  LLaMA3_8B,
  LLaMA3_70B,
  LLaMA31_8B,
  LLaMA31_70B,
  LLaMA32_3B,
  LLaMA32_11B,
  LLaMA32_90B,
  MIXTRAL_8X7B,
  GEMMA_7B_IT,
  GEMMA2_7B_IT
]
