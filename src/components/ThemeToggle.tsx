import { Lightbulb, LightbulbOff } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTranslation } from "react-i18next";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("theme.toggle", "Promeni temu")}>
          <Lightbulb className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-12 dark:scale-0" />
          <LightbulbOff className="absolute h-5 w-5 rotate-12 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t("theme.toggle", "Promeni temu")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Lightbulb className="mr-2 h-4 w-4" />
          <span>{t("theme.light", "Svetla")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <LightbulbOff className="mr-2 h-4 w-4" />
          <span>{t("theme.dark", "Tamna")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <span className="mr-2">💻</span>
          <span>{t("theme.system", "Sistem")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
