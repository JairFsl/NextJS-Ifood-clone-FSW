"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
  const handleSignOutClick = () => signOut();
  return (
    <>
      <div className="mt-2 border border-solid"></div>
      <div className="my-5 flex flex-col gap-4 p-3">
        <Button
          variant={"outline"}
          className="flex w-full scale-100 items-center justify-start gap-4 rounded-full border-none transition-transform hover:scale-105 hover:transform hover:transition-transform"
          onClick={handleSignOutClick}
        >
          <LogOutIcon size={16} />
          Sair da conta
        </Button>
      </div>
    </>
  );
};

export default LogOutButton;
