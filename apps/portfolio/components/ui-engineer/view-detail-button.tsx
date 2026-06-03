"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useScrollContext } from "@/context/scroll-context";

interface ViewDetailButtonProps {
   slug: string;
   className?: string;
}

export function ViewDetailButton({ slug, className = "w-full" }: ViewDetailButtonProps) {
   const router = useRouter();
   const { setScrollPosition } = useScrollContext();

   const handleClick = () => {
      // Save scroll position before navigating
      const position = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      setScrollPosition(position);
      router.push(`/my-work/${slug}`);
   };

   return (
      <Button onClick={handleClick} className={className}>
         View Detail
      </Button>
   );
}
