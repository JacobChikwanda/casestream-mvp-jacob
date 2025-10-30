import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export interface NavLink {
  title: string;
  href: string;
}

interface SecondaryNavItemProps {
  title: string;
  links: NavLink[];
  triggerVariant?:
    | "outline"
    | "default"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  align?: "start" | "center" | "end";
  className?: string;
}

export function SecondaryNavItem({
  title,
  links,
  triggerVariant = "outline",
  align = "start",
  className,
}: SecondaryNavItemProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={triggerVariant} className={className}>
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        {links.map((link) => (
          <DropdownMenuItem key={link.title} asChild>
            <Link href={link.href} className="w-full">
              {link.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
