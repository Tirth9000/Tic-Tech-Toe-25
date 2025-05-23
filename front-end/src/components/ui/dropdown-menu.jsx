import { splitProps } from "solid-js"

import * as DropdownMenuPrimitive from "@kobalte/core/dropdown-menu"

import { cn } from "~/lib/utils"

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenu = (props) => {
  return <DropdownMenuPrimitive.Root gutter={4} {...props} />;
}

const DropdownMenuContent = props => {
  const [, rest] = splitProps(props, ["class"])
  return (
    (<DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        class={cn(
          "z-50 min-w-32 origin-[var(--kb-menu-content-transform-origin)] animate-content-hide overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-content-show",
          props.class
        )}
        {...rest} />
    </DropdownMenuPrimitive.Portal>)
  );
}

const DropdownMenuItem = props => {
  const [, rest] = splitProps(props, ["class"])
  return (
    (<DropdownMenuPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        props.class
      )}
      {...rest} />)
  );
}

const DropdownMenuShortcut = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return (
    <span
      class={cn("ml-auto text-xs tracking-widest opacity-60", props.class)}
      {...rest} />
  );
}

const DropdownMenuLabel = (props) => {
  const [, rest] = splitProps(props, ["class", "inset"])
  return (
    (<div
      class={cn("px-2 py-1.5 text-sm font-semibold", props.inset && "pl-8", props.class)}
      {...rest} />)
  );
}

const DropdownMenuSeparator = props => {
  const [, rest] = splitProps(props, ["class"])
  return (<DropdownMenuPrimitive.Separator class={cn("-mx-1 my-1 h-px bg-muted", props.class)} {...rest} />);
}

const DropdownMenuSubTrigger = props => {
  const [, rest] = splitProps(props, ["class", "children"])
  return (
    (<DropdownMenuPrimitive.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        props.class
      )}
      {...rest}>
      {props.children}
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="ml-auto size-4">
        <path d="M9 6l6 6l-6 6" />
      </svg>
    </DropdownMenuPrimitive.SubTrigger>)
  );
}

const DropdownMenuSubContent = props => {
  const [, rest] = splitProps(props, ["class"])
  return (
    (<DropdownMenuPrimitive.SubContent
      class={cn(
        "z-50 min-w-32 origin-[var(--kb-menu-content-transform-origin)] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in",
        props.class
      )}
      {...rest} />)
  );
}

const DropdownMenuCheckboxItem = props => {
  const [, rest] = splitProps(props, ["class", "children"])
  return (
    (<DropdownMenuPrimitive.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        props.class
      )}
      {...rest}>
      <span class="absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4">
            <path d="M5 12l5 5l10 -10" />
          </svg>
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {props.children}
    </DropdownMenuPrimitive.CheckboxItem>)
  );
}

const DropdownMenuGroupLabel = props => {
  const [, rest] = splitProps(props, ["class"])
  return (<DropdownMenuPrimitive.GroupLabel class={cn("px-2 py-1.5 text-sm font-semibold", props.class)} {...rest} />);
}

const DropdownMenuRadioItem = props => {
  const [, rest] = splitProps(props, ["class", "children"])
  return (
    (<DropdownMenuPrimitive.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        props.class
      )}
      {...rest}>
      <span class="absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-2 fill-current">
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          </svg>
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {props.children}
    </DropdownMenuPrimitive.RadioItem>)
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
}
