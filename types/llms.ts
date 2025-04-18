import { ModelProvider } from "."

export type LLMID =
  | OpenAILLMID
  | GoogleLLMID
  | AnthropicLLMID
  | MistralLLMID
  | GroqLLMID
  | PerplexityLLMID

// OpenAI Models (UPDATED 5/13/24)
export type OpenAILLMID =
  | "gpt-4.1-2025-04-14" // GPT-4.1
  | "gpt-4.1-mini-2025-04-14" // GPT-4.1 Mini
  | "gpt-4.1-nano-2025-04-14" // GPT-4.1 Nano
  | "gpt-4.5-preview" // GPT-4.5 Preview
  | "o3-mini" // o3 Mini
  | "o1-preview" // o1 Preview
  | "o1-mini" // o1 Mini
  | "gpt-4o-mini" // GPT-4o Mini
  | "gpt-4o" // GPT-4o
  | "gpt-4-turbo-preview" // GPT-4 Turbo
  | "gpt-4-1106-vision-preview" // GPT-4 Vision
  | "gpt-4" // GPT-4
  | "gpt-3.5-turbo" // Updated GPT-3.5 Turbo

// Google Models
export type GoogleLLMID =
  | "gemini-1.5-flash-latest"
  | "gemini-1.5-pro-latest"
  | "gemini-2.0-flash"
  | "gemini-2.0-flash-lite" // Gemini 2 Flash Lite
  | "gemini-2.0-flash-thinking-exp-01-21" // Gemini 2 Flash Thinking Exp
  | "gemini-2.5-pro-exp-03-25" // Gemini 2.5 Pro Exp

// Anthropic Models
export type AnthropicLLMID =
  | "claude-2.1" // Claude 2
  | "claude-instant-1.2" // Claude Instant
  | "claude-3-haiku-20240307" // Claude 3 Haiku
  | "claude-3-sonnet-20240229" // Claude 3 Sonnet
  | "claude-3-opus-20240229" // Claude 3 Opus
  | "claude-3-5-sonnet-20240620" // Claude 3.5 Sonnet


// Mistral Models
export type MistralLLMID =
  | "mistral-tiny" // Mistral Tiny
  | "mistral-small" // Mistral Small
  | "mistral-medium" // Mistral Medium
  | "mistral-large-2402" // Mistral Large

export type GroqLLMID =
  | "llama3-8b-8192" // LLaMA3-8b
  | "llama3-70b-8192" // LLaMA3-70b
  | "llama-3.1-8b-instant" // LLaMA3.1-8b
  | "llama-3.1-70b-versatile" // LLaMA3.1-70b
  | "llama-3.2-3b-preview" // LLaMA3.2-3b
  | "llama-3.2-11b-vision-preview" // LLaMA3.2-11b
  | "llama-3.2-90b-vision-preview" // LLaMA3.2-90b
  | "llama-3.3-70b-versatile" // LLaMA3.3-70b
  | "mixtral-8x7b-32768" // Mixtral-8x7b
  | "gemma-7b-it" // Gemma-7b IT
  | "gemma2-9b-it" // Gemma2-70b IT
  | "deepseek-r1-distill-llama-70b" // DeepSeek R1 Distill LLaMA-70b

// Perplexity Models (UPDATED 1/31/24)
export type PerplexityLLMID =
  | "pplx-7b-online" // Perplexity Online 7B
  | "pplx-70b-online" // Perplexity Online 70B
  | "pplx-7b-chat" // Perplexity Chat 7B
  | "pplx-70b-chat" // Perplexity Chat 70B
  | "mixtral-8x7b-instruct" // Mixtral 8x7B Instruct
  | "mistral-7b-instruct" // Mistral 7B Instruct
  | "llama-2-70b-chat" // Llama2 70B Chat
  | "codellama-34b-instruct" // CodeLlama 34B Instruct
  | "codellama-70b-instruct" // CodeLlama 70B Instruct
  | "sonar-small-chat" // Sonar Small Chat
  | "sonar-small-online" // Sonar Small Online
  | "sonar-medium-chat" // Sonar Medium Chat
  | "sonar-medium-online" // Sonar Medium Online

export interface LLM {
  modelId: LLMID
  modelName: string
  provider: ModelProvider
  hostedId: string
  platformLink: string
  imageInput: boolean
  badge?: Array<"NEW" | "PLUS" | "BETA"> // Changed from badge to badges array
}

export interface OpenRouterLLM extends LLM {
  maxContext: number
}