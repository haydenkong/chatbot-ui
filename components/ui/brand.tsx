"use client"

import { ChatbotUIContext } from "@/context/context"
import Link from "next/link"
import { FC, useContext } from "react"
import { ChatbotUISVG } from "../icons/chatbotui-svg"

interface BrandProps {
  theme?: "dark" | "light"
  showPersonalGreeting?: boolean
  hideOnChatPage?: boolean
}

export const Brand: FC<BrandProps> = ({ 
  theme = "dark", 
  showPersonalGreeting = false,
  hideOnChatPage = false
}) => {
  const { profile, chatMessages } = useContext(ChatbotUIContext)
  
  // If we're on the chat page with no messages and hideOnChatPage is true, don't render
  if (hideOnChatPage && chatMessages.length === 0) return null;
  
  const displayName = profile?.display_name || ""
  const greeting = showPersonalGreeting && displayName ? `Hello, ${displayName}` : "PixelVerseAI Chats"

  return (
    <Link
      className="flex cursor-pointer flex-col items-center hover:opacity-95"
      href="#"
      rel="noopener noreferrer"
    >
      <div className="mb-2">
        <ChatbotUISVG theme={theme === "dark" ? "dark" : "light"} scale={0.3} />
      </div>

      <div className="text-4xl font-bold tracking-wide">{greeting}</div>
    </Link>
  )
}