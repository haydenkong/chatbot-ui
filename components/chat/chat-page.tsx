import { useChatHandler } from "@/components/chat/chat-hooks/use-chat-handler"
import { ChatHelp } from "@/components/chat/chat-help"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatSettings } from "@/components/chat/chat-settings"
import { ChatSuggestions } from "@/components/chat/chat-suggestions"
import { ChatUI } from "@/components/chat/chat-ui"
import { QuickSettings } from "@/components/chat/quick-settings"
import { Brand } from "@/components/ui/brand"
import { ChatbotUIContext } from "@/context/context"
import useHotkey from "@/lib/hooks/use-hotkey"
import { useTheme } from "next-themes"
import { useContext } from "react"

export default function ChatPage() {
  useHotkey("o", () => handleNewChat())
  useHotkey("l", () => {
    handleFocusChatInput()
  })

  const { chatMessages } = useContext(ChatbotUIContext)
  const { theme } = useTheme()

  const { handleNewChat, handleFocusChatInput } = useChatHandler()

  return (
    <>
      {chatMessages.length === 0 ? (
        <div className="relative flex h-full flex-col items-center justify-center">
          <div className="top-50% left-50% -translate-x-50% -translate-y-50% absolute mb-20">
            <Brand 
              theme={theme === "dark" ? "dark" : "light"} 
              showPersonalGreeting={true} 
              hideOnChatPage={true} 
            />
          </div>

          <div className="absolute left-2 top-2">
            <QuickSettings />
          </div>

          <div className="absolute right-2 top-2">
            <ChatSettings />
          </div>

          <div className="flex grow flex-col items-start justify-center w-full max-w-3xl px-4">
            <ChatSuggestions />
          </div>

          <div className="w-full min-w-[300px] items-end px-2 pb-3 pt-0 sm:w-[600px] sm:pb-8 sm:pt-5 md:w-[700px] lg:w-[700px] xl:w-[800px]">
            <ChatInput />
          </div>

          <div className="absolute bottom-2 right-2 hidden md:block lg:bottom-4 lg:right-4">
            <ChatHelp />
          </div>
        </div>
      ) : (
        <ChatUI />
      )}
    </>
  )
}