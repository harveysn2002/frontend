"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/collections", label: "المجموعة" },
  { href: "/products/hizam-dahr", label: "حزام الظهر" },
  { href: "/products/wisada-dahr", label: "وسادة الظهر" },
  { href: "/products/taqm-dahr", label: "طقم الظهر" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" className="lg:hidden" aria-label="فتح القائمة">
          <Menu className="h-5 w-5" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-ink/40" />
        <Dialog.Content className="fixed left-0 top-0 z-50 flex h-full w-full max-w-xs flex-col bg-white p-5 shadow-soft sm:max-w-sm sm:rounded-e-[2rem]">
          <div className="flex items-center justify-between border-b border-brand-primary/10 pb-4">
            <Dialog.Title className="text-xl font-black">القائمة</Dialog.Title>
            <Dialog.Close className="rounded-full p-2 hover:bg-brand-soft" aria-label="سد القائمة">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-bold text-brand-ink transition hover:bg-brand-soft/60 hover:text-brand-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
