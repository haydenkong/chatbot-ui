import React, { FC } from "react"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { MessageCodeBlock } from "./message-codeblock"
import { MessageMarkdownMemoized } from "./message-markdown-memoized"
import { cn } from "@/lib/utils"
import "katex/dist/katex.min.css"

interface MessageMarkdownProps {
  content: string;
  role?: string;
  isGenerating?: boolean;
  isLastMessage?: boolean;
}

export const MessageMarkdown: FC<MessageMarkdownProps> = ({ 
  content, 
  role, 
  isGenerating = false,
  isLastMessage = false 
}) => {
  // Only animate when this is an assistant message that's currently being generated
  const shouldAnimate = role === "assistant" && isGenerating && isLastMessage;
  
  // Use CSS animations instead of React state for smoother transitions
  return (
    <div 
      className={cn(
        // Always make content immediately visible for normal messages
        !shouldAnimate ? "opacity-100" : "",
        // For generating messages, apply animation that makes text appear smoothly as it's typed
        shouldAnimate ? "animate-fade-in" : ""
      )}
    >
      <MessageMarkdownMemoized
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 min-w-full space-y-6 break-words"
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
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