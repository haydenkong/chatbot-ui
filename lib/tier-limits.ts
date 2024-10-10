export const TIERS = {
  FREE: "FREE",
  BASIC: "BASIC",
  PLUS: "PLUS",
  MAX: "MAX"
};

export const MESSAGE_LIMITS = {
  "claude-2.1": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "claude-instant-1.2": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "claude-3-haiku-20240307": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "claude-3-sonnet-20240229": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "claude-3-opus-20240229": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "claude-3-5-sonnet-20240620": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "gemini-1.5-flash-latest": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "gemini-pro": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "gemini-1.5-pro-latest": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "gemini-pro-vision": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "mistral-tiny": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "mistral-small": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "mistral-medium": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "mistral-large-2402": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "llama3-8b-8192": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "llama3-70b-8192": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "llama-3.1-8b-instant": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "llama-3.1-70b-versatile": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "llama-3.2-3b-preview": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "llama-3.2-11b-vision-preview": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "llama-3.2-90b-text-preview": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "mixtral-8x7b-32768": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "gemma-7b-it": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "gemma2-9b-it": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "gpt-3.5-turbo": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "gpt-4-turbo-preview": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "gpt-4-1106-vision-preview": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "gpt-4": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "gpt-4o": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "pplx-7b-online": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "pplx-70b-online": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "pplx-7b-chat": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "pplx-70b-chat": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "mixtral-8x7b-instruct": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "mistral-7b-instruct": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "llama-2-70b-chat": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "codellama-34b-instruct": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "codellama-70b-instruct": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "sonar-small-chat": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "sonar-small-online": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "sonar-medium-chat": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  },
  "sonar-medium-online": {
    [TIERS.FREE]: 10,
    [TIERS.BASIC]: 50,
    [TIERS.PLUS]: 100,
    [TIERS.MAX]: 200
  }
};
