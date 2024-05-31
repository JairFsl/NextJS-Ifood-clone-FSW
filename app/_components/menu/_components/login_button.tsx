import { LogInIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";

const LogInButton = () => {
  const handleSignInClick = () => signIn();
  return (
    <Button
      onClick={handleSignInClick}
      variant={"ghost"}
      className="rounded-full px-3 duration-300 ease-in-out hover:scale-105 hover:transform hover:transition-transform"
    >
      <div className="flex w-full flex-row items-center justify-between px-3">
        <span className="text-base font-semibold">Olá, Faça seu Login!</span>
        <LogInIcon />
      </div>
    </Button>
  );
};

export default LogInButton;
