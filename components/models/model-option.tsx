import { LLM } from "@/types"
import { FC } from "react"
import { ModelIcon } from "./model-icon"

interface ModelOptionProps {
  model: LLM
  onSelect: () => void 
}

export const ModelOption: FC<ModelOptionProps> = ({ model, onSelect }) => {
  return (
    <div
      className="hover:bg-accent flex w-full cursor-pointer justify-start space-x-3 truncate rounded p-2 hover:opacity-50"
      onClick={onSelect}
    >
      <div className="flex items-center space-x-2">
        <ModelIcon provider={model.provider} width={28} height={28} />

        <div className="flex items-center space-x-2">
          <div className="text-sm font-semibold">{model.modelName}</div>
          
          {model.badge && (
            <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${
              model.badge === "NEW" ? "bg-green-500/20 text-green-500" :
              model.badge === "PLUS" ? "bg-blue-500/20 text-blue-500" :
              "bg-yellow-500/20 text-yellow-500" // BETA
            }`}>
              {model.badge}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}