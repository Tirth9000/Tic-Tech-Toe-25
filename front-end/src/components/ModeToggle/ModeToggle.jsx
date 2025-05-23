import { useColorMode } from "@kobalte/core"
import { IconLaptop, IconMoon, IconSun } from "~/components/icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
 
export function ModeToggle() {
  const { setColorMode } = useColorMode()
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger variant="ghost" size="sm" class="w-9 px-0">
        <IconSun class="absolute translate-y-[-50%] size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <IconMoon class="absolute size-6 translate-y-[-50%] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setColorMode("light")}>
          <IconSun class="mr-2 size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode("dark")}>
          <IconMoon class="mr-2 size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode("system")}>
          <IconLaptop class="mr-2 size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}