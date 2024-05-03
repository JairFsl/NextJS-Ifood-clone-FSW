"use client";

import { Button } from "./ui/button";

interface BottomButtonProps {
  text: string;
}

const BottomButton = ({ text }: BottomButtonProps) => {
  return (
    <div className="fixed bottom-0 z-30 w-full rotate-180 transform rounded-b-3xl bg-white px-5 py-5 shadow-md">
      <Button size={"lg"} className="w-full rotate-180">
        <span className="text-white">{text}</span>
      </Button>
    </div>
  );
};

export default BottomButton;
