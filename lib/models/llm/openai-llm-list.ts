import { LLM } from "@/types"

const OPENAI_PLATORM_LINK = "https://platform.openai.com/docs/overview"


// OpenAI o4 Models
const o4Mini: LLM = {
  modelId: "o4-mini-2025-04-16",
  modelName: "o4 Mini",
  provider: "openai",
  hostedId: "o4-mini-2025-04-16",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  badge: ["NEW", "PLUS"]
}


// OpenAI o3 Models
const o3Mini: LLM = {
  modelId: "o3-mini",
  modelName: "o3 Mini",
  provider: "openai",
  hostedId: "o3-mini",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false,
}

// OpenAI o1 Models
const o1Mini: LLM = {
  modelId: "o1-mini",
  modelName: "o1 Mini",
  provider: "openai",
  hostedId: "o1-mini",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false,
  badge: ["PLUS"]
}

const o1preview: LLM = {
  modelId: "o1-preview",
  modelName: "o1 Preview",
  provider: "openai",
  hostedId: "o1-preview",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false,
  badge: ["PLUS"]
}


// OpenAI Models (UPDATED 1/25/24) -----------------------------
const GPT4_1: LLM = {
  modelId: "gpt-4.1-2025-04-14",
  modelName: "GPT-4.1",
  provider: "openai",
  hostedId: "gpt-4.1-2025-04-14",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  badge: ["NEW", "PLUS"]
}

const GPT4_1_mini: LLM = {
  modelId: "gpt-4.1-mini-2025-04-14",
  modelName: "GPT-4.1 Mini",
  provider: "openai",
  hostedId: "gpt-4.1-mini-2025-04-14",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  badge: ["NEW"]
}

const GPT4_1_nano: LLM = {
  modelId: "gpt-4.1-nano-2025-04-14",
  modelName: "GPT-4.1 Nano",
  provider: "openai",
  hostedId: "gpt-4.1-nano-2025-04-14",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  badge: ["NEW"]
}


const GPT4oMini: LLM = {
  modelId: "gpt-4o-mini",
  modelName: "GPT-4o Mini",
  provider: "openai",
  hostedId: "gpt-4o-mini",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
}


const GPT4o: LLM = {
  modelId: "gpt-4o",
  modelName: "GPT-4o",
  provider: "openai",
  hostedId: "gpt-4o",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
}

// GPT-4 Turbo (UPDATED 1/25/24)
const GPT4Turbo: LLM = {
  modelId: "gpt-4-turbo-preview",
  modelName: "GPT-4 Turbo",
  provider: "openai",
  hostedId: "gpt-4-turbo-preview",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true
}

// GPT-4 Vision (UPDATED 12/18/23)
const GPT4Vision: LLM = {
  modelId: "gpt-4-1106-vision-preview",
  modelName: "GPT-4 Vision",
  provider: "openai",
  hostedId: "gpt-4-1106-vision-preview",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true
}

// GPT-4 (UPDATED 1/29/24)
const GPT4: LLM = {
  modelId: "gpt-4",
  modelName: "GPT-4",
  provider: "openai",
  hostedId: "gpt-4",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false
}

// GPT-3.5 Turbo (UPDATED 1/25/24)
const GPT3_5Turbo: LLM = {
  modelId: "gpt-3.5-turbo",
  modelName: "GPT-3.5 Turbo",
  provider: "openai",
  hostedId: "gpt-3.5-turbo",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false
}

export const OPENAI_LLM_LIST: LLM[] = [
  o4Mini,
  GPT4_1,
  GPT4_1_mini,
  GPT4_1_nano,
  o3Mini,
  o1Mini,
  o1preview,
  GPT4oMini,
  GPT4o,
  GPT4Turbo,
  GPT4Vision,
  GPT4,
  GPT3_5Turbo
]
