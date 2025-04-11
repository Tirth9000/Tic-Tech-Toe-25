import { splitProps } from "solid-js"

import * as ToggleButtonPrimitive from "@kobalte/core/toggle-button"
import { cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-sm"
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

const Toggle = props => {
  const [local, others] = splitProps(props, ["class", "variant", "size"])
  return (
    (<ToggleButtonPrimitive.Root
      class={cn(toggleVariants({ variant: local.variant, size: local.size }), local.class)}
      {...others} />)
  );
}

export { toggleVariants, Toggle }
