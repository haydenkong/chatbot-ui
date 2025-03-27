import { cn } from "@/lib/utils"
import google from "@/public/providers/google.png"
import { FC } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

interface GoogleSVGProps {
  height?: number
  width?: number
  className?: string
}

export const GoogleSVG: FC<GoogleSVGProps> = ({
  height = 40,
  width = 40,
  className
}) => {
  const { theme } = useTheme()

  return (
    <Image
      className={cn(
        "rounded-sm p-1",
        theme === "dark" ? "bg-white" : "",
        className
      )}
      src={google.src}
      alt="Google"
      width={width}
      height={height}
    />
  )
}