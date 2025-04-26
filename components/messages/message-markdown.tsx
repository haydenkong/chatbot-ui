import React, { FC, useEffect, useState } from "react"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { MessageCodeBlock } from "./message-codeblock"
import { MessageMarkdownMemoized } from "./message-markdown-memoized"
import { cn } from "@/lib/utils"

interface MessageMarkdownProps {
  content: string;
  role?: string;
  isGenerating?: boolean; // New prop to check if message is currently being generated
  isLastMessage?: boolean; // New prop to check if this is the last message in the conversation
}

export const MessageMarkdown: FC<MessageMarkdownProps> = ({ 
  content, 
  role, 
  isGenerating = false,
  isLastMessage = false 
}) => {
  const [visible, setVisible] = useState(false);
  
  // Only animate when this is an assistant message that's currently being generated
  const shouldAnimate = role === "assistant" && isGenerating && isLastMessage;

  useEffect(() => {
    if (shouldAnimate) {
      // For messages being generated, start with opacity 0
      setVisible(false);
      // Set a short timeout before starting the fade-in animation
      const timer = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      // For existing messages or non-assistant messages, show immediately
      setVisible(true);
    }
  }, [shouldAnimate, content]); // Re-trigger effect when content changes (for streaming)

  return (
    <div 
      className={cn(
        shouldAnimate ? "transition-opacity duration-700 ease-in" : "", 
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <MessageMarkdownMemoized
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 min-w-full space-y-6 break-words"
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>
          },
          img({ node, ...props }) {
            return <img className="max-w-[67%]" {...props} />
          },
          code({ node, className, children, ...props }) {
            const childArray = React.Children.toArray(children)
            const firstChild = childArray[0] as React.ReactElement
            const firstChildAsString = React.isValidElement(firstChild)
              ? (firstChild as React.ReactElement).props.children
              : firstChild

            if (firstChildAsString === "▍") {
              return <span className="mt-1 animate-pulse cursor-default">▍</span>
            }

            if (typeof firstChildAsString === "string") {
              childArray[0] = firstChildAsString.replace("`▍`", "▍")
            }

            const match = /language-(\w+)/.exec(className || "")

            if (
              typeof firstChildAsString === "string" &&
              !firstChildAsString.includes("\n")
            ) {
              return (
                <code className={className} {...props}>
                  {childArray}
                </code>
              )
            }

            return (
              <MessageCodeBlock
                key={Math.random()}
                language={(match && match[1]) || ""}
                value={String(childArray).replace(/\n$/, "")}
                {...props}
              />
            )
          }
        }}
      >
        {content}
      </MessageMarkdownMemoized>
    </div>
  )
}