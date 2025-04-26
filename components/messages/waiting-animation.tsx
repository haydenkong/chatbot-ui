import { FC, useEffect, useState } from "react"
import { IconCircleFilled } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export const WaitingAnimation: FC = () => {
  const [messageIndex, setMessageIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  const thinkingMessages = [
    "Working on it",
    "Thinking about the best response",
    "Processing your request",
    "Analyzing data",
    "Generating content"
  ]

  useEffect(() => {
    // Fade out
    const fadeOutTimer = setInterval(() => {
      setVisible(false)
    }, 2000)

    // Change message and fade in
    const changeMessageTimer = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % thinkingMessages.length)
      setVisible(true)
    }, 2500)

    return () => {
      clearInterval(fadeOutTimer)
      clearInterval(changeMessageTimer)
    }
  }, [])

  return (
    <div className="flex items-center space-x-2">
      <IconCircleFilled className="animate-pulse" size={20} />
      <div 
        className={cn(
          "transition-opacity duration-500",
          visible ? "opacity-100" : "opacity-30"
        )}
      >
        {thinkingMessages[messageIndex]}
      </div>
    </div>
  )
}