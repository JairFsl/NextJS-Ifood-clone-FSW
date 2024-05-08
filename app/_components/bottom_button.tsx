"use client";

import { Button } from "./ui/button";

interface BottomButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BottomButton = ({
  text = "Botão de baixo",
  onClick = () => {},
}: BottomButtonProps) => {
  return (
    <Button size={"lg"} className="w-full bg-primary" onClick={onClick}>
      <span className="text-white">{text}</span>
    </Button>
  );
};

export default BottomButton;
