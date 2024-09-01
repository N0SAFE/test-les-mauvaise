import { Slot, Slottable } from "@radix-ui/react-slot";
import React, { HTMLProps } from "react";

export const MultiStepFormFooter = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    {
      asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
  >
>(function MultiStepFormFooter({ children, asChild, ...props }, ref) {
  const Cmp = asChild ? Slot : 'div';
 
  return (
    <Cmp ref={ref} {...props}>
      <Slottable>{children}</Slottable>
    </Cmp>
  );
});