import { LLM } from "@/types"

const GROQ_PLATORM_LINK = "https://groq.com/"

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

const MIXTRAL_8X7B: LLM = {
  modelId: "mixtral-8x7b-32768",
  modelName: "Mixtral-8x7b-Instruct-v0.1",
  provider: "groq",
  hostedId: "mixtral-8x7b-32768",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false
}

export const GROQ_LLM_LIST: LLM[] = [LLaMA3_70B, LLaMA3_8B, MIXTRAL_8X7B]
// export const GROQ_LLM_LIST: LLM[] = [LLaMA2_70B, LLaMA3_70B, MIXTRAL_8X7B]
