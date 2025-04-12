import { splitProps } from "solid-js"

import * as SkeletonPrimitive from "@kobalte/core/skeleton"

import { cn } from "~/lib/utils"

const Skeleton = props => {
  const [local, others] = splitProps(props, ["class"])
  return (
    (<SkeletonPrimitive.Root
      class={cn("bg-primary/10 data-[animate='true']:animate-pulse", local.class)}
      {...others} />)
  );
}

export { Skeleton }
