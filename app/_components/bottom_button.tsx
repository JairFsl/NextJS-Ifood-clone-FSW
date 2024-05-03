"use client";

import { Button } from "./ui/button";

interface BottomButtonProps {
  text: string;
  handler?: () => void;
}

const BottomButton = ({
  text = "Botão de baixo",
  handler,
}: BottomButtonProps) => {
  return (
    <Button size={"lg"} className="w-full bg-primary" onClick={handler}>
      <span className="text-white">{text}</span>
    </Button>
  );
};

export default BottomButton;
