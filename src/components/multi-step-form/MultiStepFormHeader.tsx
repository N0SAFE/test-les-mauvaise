import { Slot, Slottable } from "@radix-ui/react-slot";
import React, { HTMLProps } from "react";

export const MultiStepFormHeader = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    {
      asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
  >
>(function MultiStepFormHeader({ children, asChild, ...props }, ref) {
  const Cmp = asChild ? Slot : 'div';
 
  return (
    <Cmp ref={ref} {...props}>
      <Slottable>{children}</Slottable>
    </Cmp>
  );
});