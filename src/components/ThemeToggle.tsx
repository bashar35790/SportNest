"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="tertiary" isIconOnly className="rounded-full">
        <div className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="tertiary"
      isIconOnly
      onPress={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full text-brand-primari hover:bg-brand-primari/10 dark:text-brand-primari dark:hover:bg-white/10 transition-all cursor-pointer"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
