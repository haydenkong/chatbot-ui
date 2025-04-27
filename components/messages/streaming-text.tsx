import React, { FC, useEffect, useState, useRef } from 'react'
import { cn } from "@/lib/utils"

interface StreamingTextProps {
  text: string;
  isGenerating: boolean;
}

export const StreamingText: FC<StreamingTextProps> = ({ 
  text, 
  isGenerating 
}) => {
  const [visibleText, setVisibleText] = useState("");
  const [newChunk, setNewChunk] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const previousTextRef = useRef("");

  useEffect(() => {
    if (isGenerating) {
      // Check if we have new text
      if (text.length > previousTextRef.current.length) {
        // Extract just the new part
        const newPart = text.slice(previousTextRef.current.length);
        
        // Update visible text to what we've already shown
        setVisibleText(previousTextRef.current);
        
        // Set the new chunk that needs to animate in
        setNewChunk(newPart);
        
        // Trigger the animation
        setIsAnimating(true);
        
        // After animation completes, add this text to the visible portion
        const timer = setTimeout(() => {
          setVisibleText(text);
          setNewChunk("");
          setIsAnimating(false);
          previousTextRef.current = text;
        }, 400); // Slightly longer than animation duration
        
        return () => clearTimeout(timer);
      }
    } else {
      // If not generating, show everything immediately
      setVisibleText(text);
      setNewChunk("");
      previousTextRef.current = text;
    }
  }, [text, isGenerating]);

  return (
    <>
      <span>{visibleText}</span>
      {newChunk && (
        <span className="animate-fade-in">
          {newChunk}
        </span>
      )}
    </>
  );
};