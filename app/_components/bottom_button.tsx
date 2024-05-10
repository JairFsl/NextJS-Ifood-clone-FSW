"use client";

import { cn } from "../_lib/utils";
import { Button } from "./ui/button";

interface BottomButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

const BottomButton = ({
  text = "Botão de baixo",
  onClick = () => {},
  className,
  disabled,
}: BottomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      size={"lg"}
      className={cn("w-full bg-primary text-white", className)}
      onClick={onClick}
    >
      <span>{text}</span>
    </Button>
  );
};

export default BottomButton;
