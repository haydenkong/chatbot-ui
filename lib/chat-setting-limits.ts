import { LLMID } from "@/types"

type ChatSettingLimits = {
  MIN_TEMPERATURE: number
  MAX_TEMPERATURE: number
  MAX_TOKEN_OUTPUT_LENGTH: number
  MAX_CONTEXT_LENGTH: number
  MESSAGE_LIMITS: Record<string, number>
}

export const CHAT_SETTING_LIMITS: Record<LLMID, ChatSettingLimits> = {
  // ANTHROPIC MODELS
  "claude-2.1": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 200000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "claude-instant-1.2": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 100000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "claude-3-haiku-20240307": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 200000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "claude-3-sonnet-20240229": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 20000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "claude-3-opus-20240229": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 50000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "claude-3-5-sonnet-20240620": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 100000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },

  // GOOGLE MODELS
  "gemini-1.5-flash-latest": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 8192,
    MAX_CONTEXT_LENGTH: 1048576,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "gemini-pro": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 2048,
    MAX_CONTEXT_LENGTH: 30720,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "gemini-1.5-pro-latest": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 8192,
    MAX_CONTEXT_LENGTH: 1048576,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "gemini-pro-vision": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 12288,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },

  // MISTRAL MODELS
  "mistral-tiny": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 2000,
    MAX_CONTEXT_LENGTH: 8000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "mistral-small": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 2000,
    MAX_CONTEXT_LENGTH: 32000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "mistral-medium": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 2000,
    MAX_CONTEXT_LENGTH: 32000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "mistral-large-2402": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 2000,
    MAX_CONTEXT_LENGTH: 32000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },

  // GROQ MODELS
  "llama3-8b-8192": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 8192,
    MAX_CONTEXT_LENGTH: 8192,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "llama3-70b-8192": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 8192,
    MAX_CONTEXT_LENGTH: 8192,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "llama-3.1-8b-instant": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 8192,
    MAX_CONTEXT_LENGTH: 128000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "llama-3.1-70b-versatile": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 8192,
    MAX_CONTEXT_LENGTH: 128000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "llama-3.2-3b-preview": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 8192,
    MAX_CONTEXT_LENGTH: 8192,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "llama-3.2-11b-vision-preview": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 8192,
    MAX_CONTEXT_LENGTH: 8192,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "llama-3.2-90b-text-preview": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 8192,
    MAX_CONTEXT_LENGTH: 8192,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "mixtral-8x7b-32768": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 32768,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "gemma-7b-it": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 2.0,
    MAX_TOKEN_OUTPUT_LENGTH: 8192,
    MAX_CONTEXT_LENGTH: 8192,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "gemma2-9b-it": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 2.0,
    MAX_TOKEN_OUTPUT_LENGTH: 8192,
    MAX_CONTEXT_LENGTH: 8192,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },

  // OPENAI MODELS
  "gpt-3.5-turbo": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 2.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 4096,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "gpt-4-turbo-preview": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 2.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 128000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "gpt-4-1106-vision-preview": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 2.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 250000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "gpt-4": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 2.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 8192,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "gpt-4o": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 2.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 128000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },

  // PERPLEXITY MODELS
  "pplx-7b-online": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.99,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 4096,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "pplx-70b-online": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.99,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 4096,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "pplx-7b-chat": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 8192,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "pplx-70b-chat": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 4096,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "mixtral-8x7b-instruct": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 16384,
    MAX_CONTEXT_LENGTH: 16384,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "mistral-7b-instruct": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 16384,
    MAX_CONTEXT_LENGTH: 16384,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "llama-2-70b-chat": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 2.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 4096,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "codellama-34b-instruct": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 4096,
    MAX_CONTEXT_LENGTH: 16384,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "codellama-70b-instruct": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 16384,
    MAX_CONTEXT_LENGTH: 16384,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "sonar-small-chat": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 16384,
    MAX_CONTEXT_LENGTH: 16384,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "sonar-small-online": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 12000,
    MAX_CONTEXT_LENGTH: 12000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "sonar-medium-chat": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 16384,
    MAX_CONTEXT_LENGTH: 16384,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  },
  "sonar-medium-online": {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 1.0,
    MAX_TOKEN_OUTPUT_LENGTH: 12000,
    MAX_CONTEXT_LENGTH: 12000,
    MESSAGE_LIMITS: {
      FREE: 10,
      BASIC: 50,
      PLUS: 100,
      MAX: 200
    }
  }
}
