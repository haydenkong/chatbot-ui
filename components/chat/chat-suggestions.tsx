import { ChatbotUIContext } from "@/context/context"
import { cn } from "@/lib/utils"
import { IconCode, IconGraduationCap, IconPencil, IconSparkles } from "@tabler/icons-react"
import { useContext, useState } from "react"
import { Button } from "../ui/button"

interface SuggestionCategory {
  id: string
  name: string
  icon: React.ReactNode
  questions: string[]
}

export const ChatSuggestions = () => {
  const { profile, setUserInput, handleSendMessage, chatMessages } = useContext(ChatbotUIContext)
  const [activeCategory, setActiveCategory] = useState<string>("create")

  const categories: SuggestionCategory[] = [
    {
      id: "create",
      name: "Create",
      icon: <IconSparkles size={20} />,
      questions: [
        "Write a short story about a robot discovering emotions",
        "Create a character profile for a complex villain with sympathetic motives",
        "Design a logo for a tech startup focused on sustainability",
        "Generate a business plan for an eco-friendly coffee shop"
      ]
    },
    {
      id: "explore",
      name: "Explore",
      icon: <IconPencil size={20} />,
      questions: [
        "Give me 5 creative writing prompts for flash fiction",
        "What are the most interesting discoveries in astronomy this year?",
        "Explain the cultural significance of tea ceremonies around the world",
        "Tell me about emerging technologies in renewable energy"
      ]
    },
    {
      id: "code",
      name: "Code",
      icon: <IconCode size={20} />,
      questions: [
        "Help me outline a sci-fi novel set in a post-apocalyptic world",
        "Write a React component for a responsive image gallery",
        "Create a Python script to analyze sentiment in Twitter data",
        "Explain how to implement authentication in a Node.js application"
      ]
    },
    {
      id: "learn",
      name: "Learn",
      icon: <IconGraduationCap size={20} />,
      questions: [
        "Explain quantum computing in simple terms",
        "What are the key principles of effective leadership?",
        "How does machine learning work?",
        "Teach me about the history of jazz music"
      ]
    }
  ]

  const handleQuestionClick = (question: string) => {
    setUserInput(question)
    handleSendMessage(question, chatMessages, false)
  }

  // Only show if there are no messages
  if (chatMessages.length > 0) return null

  const displayName = profile?.display_name || ""
  const greeting = displayName ? `How can I help you, ${displayName}?` : "How can I help you today?"

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-8 text-4xl font-bold">{greeting}</h1>
      
      <div className="mb-8 flex space-x-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className="flex items-center space-x-2 px-6"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon}
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      <div className="grid w-full max-w-3xl gap-3">
        {categories
          .find(category => category.id === activeCategory)
          ?.questions.map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "justify-start border border-transparent px-4 py-6 text-left hover:border-primary/20 hover:bg-primary/5"
              )}
              onClick={() => handleQuestionClick(question)}
            >
              {question}
            </Button>
          ))}
      </div>
    </div>
  )
}