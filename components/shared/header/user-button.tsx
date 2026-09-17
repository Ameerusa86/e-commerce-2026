"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function UserButton() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="w-10 h-10 rounded-full bg-muted animate-pulse"></div>
    );
  }

  if (!session) {
    return (
      <Link href="/sign-in" className={buttonVariants()}>
        <User className="mr-2 h-4 w-4" /> Sign In
      </Link>
    );
  }

  const user = session.user;
  const initials = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative h-10 w-10 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
            className="text-red-600 cursor-pointer"
            onClick={async () => {
                await signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.push("/");
                            router.refresh();
                        },
                    },
                });
            }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
