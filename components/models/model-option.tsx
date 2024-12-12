import { LLM } from "@/types"
import { FC } from "react"
import { ModelIcon } from "./model-icon"
import { cn } from "@/lib/utils"

interface ModelOptionProps {
  model: LLM
  onSelect: () => void
}

export const ModelOption: FC<ModelOptionProps> = ({ model, onSelect }) => {
  return (
    <div
      className="hover:bg-accent flex w-full cursor-pointer justify-between items-center truncate rounded p-2 hover:opacity-50"
      onClick={onSelect}
    >
      <div className="flex items-center space-x-2">
        <ModelIcon provider={model.provider} width={28} height={28} />
        <div className="text-sm font-semibold">{model.modelName}</div>
      </div>
      
      {model.badges && model.badges.length > 0 && (
        <div className="flex gap-1">
          {model.badges.map((badge) => (
            <span
              key={badge}
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                {
                  "bg-blue-500/10 text-blue-500": badge === "NEW",
                  "bg-purple-500/10 text-purple-500": badge === "PLUS",
                  "bg-orange-500/10 text-orange-500": badge === "PREVIEW",
                  "bg-green-500/10 text-green-500": badge === "BETA"
                }
              )}
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}