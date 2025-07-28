"use client";

import { useState } from "react";
import StickyNote from "./sticky-note";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const StickyNotes = () => {
   const router = useRouter();
   const [notes, setNotes] = useState([
      {
         id: 1,
         date: "Jun 12",
         timeAgo: "1 month ago",
         x: 100,
         y: 200,
         rotation: -5,
         zIndex: 0,
         text: "Hôm nay tôi bắt đầu học React và Next.js. Tôi thấy rất thú vị với những khái niệm mới như Server Components và App Router. Hy vọng sẽ sớm làm chủ được framework này.",
      },
      {
         id: 2,
         date: "Today",
         timeAgo: "just now",
         x: 200,
         y: 350,
         rotation: 3,
         zIndex: 1,
         text: "Cần hoàn thành dự án portfolio trong tuần này. Tasks:\n- Thiết kế UI/UX\n- Implement các components\n- Tối ưu performance\n- Deploy lên Vercel",
      },
      {
         id: 3,
         date: "Avatar",
         timeAgo: "2 weeks ago",
         x: 1070,
         y: 200,
         rotation: -2,
         zIndex: 2,
         text: "Đã học được cách sử dụng Framer Motion để tạo animations. Thư viện này rất powerful và dễ sử dụng. Có thể áp dụng vào nhiều dự án trong tương lai.",
      },
      {
         id: 4,
         date: "About Me",
         timeAgo: "1 week ago",
         x: 1200,
         y: 300,
         rotation: 4,
         zIndex: 3,
         text: (
            <div className="flex flex-col h-full">
               <p className="overflow-y-auto !scroll-bar-thin">
                  I&apos;m on a journey to become a software engineer who
                  builds thoughtful, scalable digital experiences. I&apos;m
                  drawn to both the elegance of user interfaces and the logic
                  behind backend systems and I find joy in connecting the
                  two. Beyond the stack, I&apos;m also exploring how AI and
                  automation can streamline development and enhance the way
                  we build and use software.
               </p>
               <div className="mt-auto">
                  <Button
                     onClick={() => router.push("/resume")}
                     className="w-full mt-4 px-4 py-2 bg-primary transition-colors duration-200"
                     variant="default"
                  >
                     View Resume
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
         notes.map((note) => (note.id === id ? { ...note, x, y } : note)),
      );
   };

   return (
      <div className="absolute inset-0 overflow-hidden hidden md:block">
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

export default StickyNotes;
