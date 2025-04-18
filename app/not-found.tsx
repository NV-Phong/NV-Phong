"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import StickyNote from "@/components/ui-engineer/sticky-note";
import { Button } from "@/components/ui/button";

const NotFound = () => {
   const router = useRouter();
   const [notes, setNotes] = useState([
      {
         id: 1,
         date: "404 • NOT FOUND",
         timeAgo: "1 month ago",
         x: 600,
         y: 200,
         rotation: -3,
         zIndex: 0,
         text: (
            <div className="flex flex-col h-full">
               <p className="overflow-y-auto">
                  Sorry, but we don&apos;t have this page 😭😭😭
               </p>
               <div className="mt-auto">
                  <Button
                     onClick={() => router.push("/")}
                     className="w-full mt-4 px-4 py-2 bg-[#FF9999] text-white hover:bg-[#ff8080] transition-colors duration-200"
                     variant="default"
                  >
                     Go Back Home
                  </Button>
               </div>
            </div>
         ),
      },
   ]);

   const handleDragStart = (id: number) => () => {
      const draggedNote = notes.find((note) => note.id === id);
      if (!draggedNote) return;

      const otherNotes = notes.filter((note) => note.id !== id);
      setNotes([...otherNotes, draggedNote]);
   };

   const handleDragEnd = (id: number) => (x: number, y: number) => {
      setNotes(
         notes.map((note) => (note.id === id ? { ...note, x, y } : note))
      );
   };

   return (
      <div className="absolute inset-0 overflow-hidden">
         {notes.map((note, index) => (
            <motion.div
               key={note.id}
               initial={{
                  opacity: 0,
                  y: 100,
                  scale: 0.8,
                  rotate: note.rotation,
               }}
               animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: note.rotation,
               }}
               transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
               }}
            >
               <StickyNote
                  date={note.date}
                  timeAgo={note.timeAgo}
                  text={note.text}
                  initialX={note.x}
                  initialY={note.y}
                  rotation={note.rotation}
                  zIndex={note.zIndex}
                  onDragStart={handleDragStart(note.id)}
                  onDragEnd={handleDragEnd(note.id)}
               />
            </motion.div>
         ))}
      </div>
   );
};

export default NotFound;
