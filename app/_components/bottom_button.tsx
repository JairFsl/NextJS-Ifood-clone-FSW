"use client";

import { cn } from "../_lib/utils";
import { Button } from "./ui/button";

interface BottomButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const BottomButton = ({
  text = "Botão de baixo",
  onClick = () => {},
  className,
  disabled,
  children,
}: BottomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      size={"lg"}
      className={cn("w-full bg-primary text-white", className)}
      onClick={onClick}
    >
      {children}
      <span>{text}</span>
    </Button>
  );
};

export default BottomButton;
