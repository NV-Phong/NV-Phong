import * as React from "react";
import Cookies from "js-cookie";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import Icon from "@/components/common/Icon";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from "@/components/ui/sidebar";
import { CreateLibraryPopover } from "@/components/form/create-library";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function LibrarySwitcher({
   libraries,
   isLoading,
   refetch,
}: {
   libraries: {
      name: string;
      logo: React.ElementType;
      description: string;
      idlibrary: string;
      url?: string;
   }[];
   isLoading?: boolean;
   refetch: () => void;
}) {
   const { isMobile, state } = useSidebar();
   const [activeLibrary, setActiveLibrary] = React.useState<{
      name: string;
      logo: React.ElementType;
      description: string;
      idlibrary: string;
      url?: string;
   } | null>(null);
   const menuItemRef = React.useRef<HTMLLIElement>(null);
   const [dropdownWidth, setDropdownWidth] = React.useState<string>("");

   // Khi component được mount, lấy thông tin library từ Cookies
   React.useEffect(() => {
      const storedLibraryId = Cookies.get("IDLibrary");
      if (storedLibraryId) {
         const storedLibrary = libraries.find(
            (library) => library.idlibrary === storedLibraryId,
         );
         if (storedLibrary) {
            setActiveLibrary(storedLibrary);
         }
      } else if (libraries.length > 0) {
         setActiveLibrary(libraries[0]);
      }
   }, [libraries]);

   // Đo width của parent và set cho dropdown
   const updateDropdownWidth = React.useCallback(() => {
      if (menuItemRef.current) {
         const width = menuItemRef.current.offsetWidth;
         setDropdownWidth(`${width}px`);
      }
   }, []);

   React.useEffect(() => {
      updateDropdownWidth();
      // Cập nhật lại width khi sidebar state thay đổi
      const timer = setTimeout(updateDropdownWidth, 100);
      return () => clearTimeout(timer);
   }, [state, updateDropdownWidth]);

   const handleLibrarySelect = (library: {
      name: string;
      logo: React.ElementType;
      description: string;
      idlibrary: string;
      url?: string;
   }) => {
      setActiveLibrary(library);
      // Lưu cookie
      Cookies.set("IDLibrary", library.idlibrary, {
         expires: 7,
         path: "/",
         secure: true,
         sameSite: "strict",
      });
      Cookies.set("LibraryName", library.name, {
         expires: 7,
         path: "/",
         secure: true,
         sameSite: "strict",
      });

      // Dispatch một custom event
      const libraryChangeEvent = new CustomEvent("libraryChange", {
         detail: { libraryId: library.idlibrary },
      });
      window.dispatchEvent(libraryChangeEvent);
   };

   if (isLoading) {
      return (
         <SidebarMenu>
            <SidebarMenuItem>
               <SidebarMenuButton size="lg" disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2">Libraries is loading...</span>
               </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      );
   }

   return (
      <SidebarMenu>
         <SidebarMenuItem ref={menuItemRef}>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                     size="lg"
                     className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                     <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground dark:text-card/75">
                        {activeLibrary?.logo ? (
                           <activeLibrary.logo className="size-4" />
                        ) : (
                           <div className="size-4"></div>
                        )}
                     </div>
                     <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                           {activeLibrary?.name || "You don't have any library"}
                        </span>
                        <span className="truncate text-xs">
                           {activeLibrary?.description ||
                              "Your library doesn't have any description"}
                        </span>
                     </div>
                     <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  className="rounded-lg bg-background"
                  style={{
                     width:
                        dropdownWidth ||
                        "var(--radix-dropdown-menu-trigger-width)",
                  }}
                  align="start"
                  side={isMobile ? "bottom" : "bottom"}
                  sideOffset={4}
               >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                     Libraries
                  </DropdownMenuLabel>
                  <ScrollArea className="h-[132px] [&_[data-slot=scroll-area-scrollbar]]:hidden">
                     {libraries.length === 0 ? (
                        <div className="p-2 text-sm text-muted-foreground">
                           You don&apos;t have any library
                        </div>
                     ) : (
                        libraries.map((library, index) => (
                           <DropdownMenuItem
                              key={library.idlibrary}
                              onClick={() => handleLibrarySelect(library)}
                              className="gap-2 p-2"
                           >
                              <div className="flex size-6 items-center justify-center rounded-sm border">
                                 <library.logo className="size-4 shrink-0" />
                              </div>
                              <span className="flex-1">{library.name}</span>
                              {library.url && (
                                 <a
                                    href={library.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                 >
                                    <Button
                                       variant="ghost"
                                       className="w-7.5 h-7.5"
                                    >
                                       <Icon
                                          styles="bulk"
                                          size={16}
                                          className="!bg-primary-foreground-darker/50 absolute"
                                          name="link-circle-bulk-rounded"
                                       />
                                    </Button>
                                 </a>
                              )}
                           </DropdownMenuItem>
                        ))
                     )}
                  </ScrollArea>
                  <DropdownMenuSeparator />

                  <div className="p-2">
                     <CreateLibraryPopover onLibraryCreated={refetch}>
                        <Button className="w-full">Create New Library</Button>
                     </CreateLibraryPopover>
                  </div>
               </DropdownMenuContent>
            </DropdownMenu>
         </SidebarMenuItem>
      </SidebarMenu>
   );
}
