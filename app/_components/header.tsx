"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { CheckCircle2Icon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent } from "./ui/sheet";
import { useState } from "react";
import Cart from "./cart";
import { Dialog, DialogContent } from "./ui/dialog";
import BottomButton from "./bottom_button";

import MenuPage from "./menu/page";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="flex justify-between px-5 pt-6">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="FSW IFood"
            height={30}
            width={140}
            quality={100}
          />
        </Link>

        <Button
          size="icon"
          variant="outline"
          className="border-none bg-transparent"
          onClick={() => setOpen(!open)}
        >
          <MenuIcon />
        </Button>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <MenuPage />
        </SheetContent>
      </Sheet>

      <Cart isOpen={openCart} setOpen={setOpenCart} />

      <Dialog open={openDialog}>
        <DialogContent className="flex h-80 w-3/4 flex-col items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2Icon
              size={72}
              className="rounded-full bg-primary text-white"
            />

            <h2 className="mt-3 text-center text-xl font-bold">
              Pedido realizado com sucesso!
            </h2>
            <div className="w-full rounded-md">
              <BottomButton
                className="text-md w-full bg-gray-300 font-semibold text-black hover:text-white"
                text="Confirmar"
                onClick={() => setOpenDialog(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
