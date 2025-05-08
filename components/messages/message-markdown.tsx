import React, { FC, ReactNode } from "react"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { MessageCodeBlock } from "./message-codeblock"
import { MessageMarkdownMemoized } from "./message-markdown-memoized"
import { StreamingText } from "./streaming-text"

interface MessageMarkdownProps {
  content: string;
  role?: string;
  isGenerating?: boolean;
  isLastMessage?: boolean;
}

// Add proper type for component props
interface ComponentProps {
  children: ReactNode;
  node?: any;
  className?: string;
  [key: string]: any; // For any other props
}

export const MessageMarkdown: FC<MessageMarkdownProps> = ({ 
  content, 
  role, 
  isGenerating = false,
  isLastMessage = false 
}) => {
  // Only use streaming text animation for AI responses being actively generated
  const shouldAnimate = role === "assistant" && isGenerating && isLastMessage;

  // Custom component for code blocks in the Markdown
  const components = {
    p({ children }: ComponentProps) {
      return (
        <p className="mb-2 last:mb-0">
          {shouldAnimate ? (
            <StreamingText text={String(children)} isGenerating={true} />
          ) : (
            children
          )}
        </p>
      );
    },
    img({ node, ...props }: ComponentProps) {
      return <img className="max-w-[67%]" {...props} />;
    },
    code({ node, className, children, ...props }: ComponentProps) {
      const childArray = React.Children.toArray(children);
      const firstChild = childArray[0] as React.ReactElement;
      const firstChildAsString = React.isValidElement(firstChild)
        ? (firstChild as React.ReactElement).props.children
        : firstChild;

      if (firstChildAsString === "▍") {
        return <span className="mt-1 animate-pulse cursor-default">▍</span>;
      }

      if (typeof firstChildAsString === "string") {
        childArray[0] = firstChildAsString.replace("`▍`", "▍");
      }

      const match = /language-(\w+)/.exec(className || "");

      if (
        typeof firstChildAsString === "string" &&
        !firstChildAsString.includes("\n")
      ) {
        return (
          <code className={className} {...props}>
            {shouldAnimate ? (
              <StreamingText text={String(childArray)} isGenerating={true} />
            ) : (
              childArray
            )}
          </code>
        );
      }

      return (
        <MessageCodeBlock
          key={Math.random()}
          language={(match && match[1]) || ""}
          value={String(childArray).replace(/\n$/, "")}
          {...props}
        />
      );
    }
  };

  return (
    <MessageMarkdownMemoized
      className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 min-w-full space-y-6 break-words"
      remarkPlugins={[remarkGfm, remarkMath]}
      components={components}
    >
      {content}
    </MessageMarkdownMemoized>
  );
};