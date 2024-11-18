// lib/tier-limits.ts
export type TierName = "FREE" | "EXPLORE" | "PLUS" | "MAX"

export const TIER_LIMITS: Record<TierName, {
  [key: string]: number
  messages_per_day: number
}> = {
    FREE: {
      "gpt-4o-mini": 5,
      "gpt-4o": 0,
      "gpt-4-turbo-preview": 0,
      "gpt-4-1106-vision-preview": 0,
      "gpt-4": 0,
      "gpt-3.5-turbo": 0,
      "gemini-pro": 20,
      "gemini-pro-vision": 5,
      "gemini-1.5-flash-latest": 5,
      "gemini-1.5-pro-latest": 5,
      "claude-2.1": 0,
      "claude-instant-1.2": 0,
      "claude-3-haiku-20240307": 2,
      "claude-3-sonnet-20240229": 0,
      "claude-3-opus-20240229": 0,
      "claude-3-5-sonnet-20240620": 0,
      "mistral-tiny": 0,
      "mistral-small": 0,
      "mistral-medium": 0,
      "mistral-large-2402": 0,
      "llama3-8b-8192": 10,
      "llama3-70b-8192": 10,
      "llama-3.1-8b-instant": 10,
      "llama-3.1-70b-versatile": 10,
      "llama-3.2-3b-preview": 10,
      "llama-3.2-11b-vision-preview": 10,
      "llama-3.2-90b-text-preview": 10,
      "mixtral-8x7b-32768": 10,
      "gemma-7b-it": 0,
      "gemma2-9b-it": 0,
      "pplx-7b-online": 0,
      "pplx-70b-online": 0,
      "pplx-7b-chat": 0,
      "pplx-70b-chat": 0,
      "mixtral-8x7b-instruct": 0,
      "mistral-7b-instruct": 0,
      "llama-2-70b-chat": 0,
      "codellama-34b-instruct": 0,
      "codellama-70b-instruct": 0,
      "sonar-small-chat": 0,
      "sonar-small-online": 0,
      "sonar-medium-chat": 0,
      "sonar-medium-online": 0,
      messages_per_day: 20
    },
    EXPLORE: {
      "gpt-4o-mini": 25,
      "gpt-4o": 5,
      "gpt-4-turbo-preview": 5,
      "gpt-4-1106-vision-preview": 5,
      "gpt-4": 3,
      "gpt-3.5-turbo": 25,
      "gemini-pro": 25,
      "gemini-pro-vision": 25,
      "gemini-1.5-flash-latest": 25,
      "gemini-1.5-pro-latest": 10,
      "claude-2.1": 10,
      "claude-instant-1.2": 10,
      "claude-3-haiku-20240307": 10,
      "claude-3-sonnet-20240229": 3,
      "claude-3-opus-20240229": 0,
      "claude-3-5-sonnet-20240620": 3,
      "mistral-tiny": 25,
      "mistral-small": 25,
      "mistral-medium": 25,
      "mistral-large-2402": 10,
      "llama3-8b-8192": 25,
      "llama3-70b-8192": 25,
      "llama-3.1-8b-instant": 25,
      "llama-3.1-70b-versatile": 25,
      "llama-3.2-3b-preview": 25,
      "llama-3.2-11b-vision-preview": 25,
      "llama-3.2-90b-text-preview": 25,
      "mixtral-8x7b-32768": 25,
      "gemma-7b-it": 25,
      "gemma2-9b-it": 25,
      "pplx-7b-online": 25,
      "pplx-70b-online": 25,
      "pplx-7b-chat": 25,
      "pplx-70b-chat": 25,
      "mixtral-8x7b-instruct": 25,
      "mistral-7b-instruct": 25,
      "llama-2-70b-chat": 25,
      "codellama-34b-instruct": 25,
      "codellama-70b-instruct": 25,
      "sonar-small-chat": 25,
      "sonar-small-online": 25,
      "sonar-medium-chat": 25,
      "sonar-medium-online": 25,
      messages_per_day: 50
    },
    PLUS: {
      "gpt-4o-mini": 50,
      "gpt-4o": 20,
      "gpt-4-turbo-preview": 10,
      "gpt-4-1106-vision-preview": 10,
      "gpt-4": 10,
      "gpt-3.5-turbo": 50,
      "gemini-pro": 50,
      "gemini-pro-vision": 50,
      "gemini-1.5-flash-latest": 50,
      "gemini-1.5-pro-latest": 30,
      "claude-2.1": 25,
      "claude-instant-1.2": 25,
      "claude-3-haiku-20240307": 20,
      "claude-3-sonnet-20240229": 12,
      "claude-3-opus-20240229": 5,
      "claude-3-5-sonnet-20240620": 12,
      "mistral-tiny": 25,
      "mistral-small": 25,
      "mistral-medium": 25,
      "mistral-large-2402": 25,
      "llama3-8b-8192": 50,
      "llama3-70b-8192": 50,
      "llama-3.1-8b-instant": 50,
      "llama-3.1-70b-versatile": 50,
      "llama-3.2-3b-preview": 50,
      "llama-3.2-11b-vision-preview": 50,
      "llama-3.2-90b-text-preview": 50,
      "mixtral-8x7b-32768": 50,
      "gemma-7b-it": 50,
      "gemma2-9b-it": 50,
      "pplx-7b-online": 25,
      "pplx-70b-online": 25,
      "pplx-7b-chat": 25,
      "pplx-70b-chat": 25,
      "mixtral-8x7b-instruct": 25,
      "mistral-7b-instruct": 25,
      "llama-2-70b-chat": 25,
      "codellama-34b-instruct": 25,
      "codellama-70b-instruct": 25,
      "sonar-small-chat": 25,
      "sonar-small-online": 25,
      "sonar-medium-chat": 25,
      "sonar-medium-online": 25,
      messages_per_day: 50
    },
    MAX: {
      "gpt-4o-mini": 50,
      "gpt-4o": 20,
      "gpt-4-turbo-preview": 20,
      "gpt-4-1106-vision-preview": 20,
      "gpt-4": 20,
      "gpt-3.5-turbo": 50,
      "gemini-pro": 50,
      "gemini-pro-vision": 50,
      "gemini-1.5-flash-latest": 50,
      "gemini-1.5-pro-latest": 50,
      "claude-2.1": 50,
      "claude-instant-1.2": 25,
      "claude-3-haiku-20240307": 25,
      "claude-3-sonnet-20240229": 20,
      "claude-3-opus-20240229": 10,
      "claude-3-5-sonnet-20240620": 20,
      "mistral-tiny": 25,
      "mistral-small": 25,
      "mistral-medium": 25,
      "mistral-large-2402": 25,
      "llama3-8b-8192": 50,
      "llama3-70b-8192": 50,
      "llama-3.1-8b-instant": 50,
      "llama-3.1-70b-versatile": 50,
      "llama-3.2-3b-preview": 50,
      "llama-3.2-11b-vision-preview": 50,
      "llama-3.2-90b-text-preview": 50,
      "mixtral-8x7b-32768": 50,
      "gemma-7b-it": 25,
      "gemma2-9b-it": 25,
      "pplx-7b-online": 25,
      "pplx-70b-online": 25,
      "pplx-7b-chat": 25,
      "pplx-70b-chat": 25,
      "mixtral-8x7b-instruct": 25,
      "mistral-7b-instruct": 25,
      "llama-2-70b-chat": 25,
      "codellama-34b-instruct": 25,
      "codellama-70b-instruct": 25,
      "sonar-small-chat": 25,
      "sonar-small-online": 25,
      "sonar-medium-chat": 25,
      "sonar-medium-online": 25,
      messages_per_day: 80
    }
}

// -1 means unlimited


