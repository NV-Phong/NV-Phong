"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StickyNote from "@/components/ui-engineer/sticky-note";

interface CheckpointNote {
   id: string;
   title: string;
   text: string;
   date: string;
   timeAgo: string;
   stackedNotes: {
      id: string;
      title: string;
      text: string;
      timeAgo: string;
   }[];
}

const checkpointNotes: CheckpointNote[] = [
   {
      id: "note-1",
      title: "Project Kickoff",
      text: "Team meeting scheduled for Monday. Need to discuss project scope and timeline with all stakeholders. Budget approved and ready to start.",
      date: "Jan 15",
      timeAgo: "2 weeks ago",
      stackedNotes: [
         {
            id: "note-1-stack-1",
            title: "Budget Planning",
            text: "Detailed budget breakdown completed. All departments have confirmed their resource requirements.",
            timeAgo: "2 weeks ago",
         },
         {
            id: "note-1-stack-2",
            title: "Team Assembly",
            text: "Core team members identified and onboarded. Roles and responsibilities clearly defined.",
            timeAgo: "2 weeks ago",
         },
      ],
   },
   {
      id: "note-2",
      title: "Design Phase",
      text: "Design mockups ready for review. The new UI looks promising and modern. User experience flow has been finalized.",
      date: "Jan 28",
      timeAgo: "1 week ago",
      stackedNotes: [
         {
            id: "note-2-stack-1",
            title: "User Research",
            text: "Completed user interviews and surveys. Key insights gathered about user preferences and pain points.",
            timeAgo: "1 week ago",
         },
         {
            id: "note-2-stack-2",
            title: "Wireframes",
            text: "Low-fidelity wireframes approved by stakeholders. Information architecture finalized.",
            timeAgo: "1 week ago",
         },
      ],
   },
   {
      id: "note-3",
      title: "Development Start",
      text: "API endpoints completed. Authentication system is working perfectly with JWT tokens. Database schema finalized.",
      date: "Feb 10",
      timeAgo: "5 days ago",
      stackedNotes: [
         {
            id: "note-3-stack-1",
            title: "Environment Setup",
            text: "Development, staging, and production environments configured. CI/CD pipeline established.",
            timeAgo: "5 days ago",
         },
         {
            id: "note-3-stack-2",
            title: "Code Standards",
            text: "Coding standards and best practices documented. Code review process implemented.",
            timeAgo: "5 days ago",
         },
      ],
   },
   {
      id: "note-4",
      title: "Frontend Build",
      text: "Frontend components built. React components are reusable and well-documented. Responsive design implemented.",
      date: "Feb 20",
      timeAgo: "3 days ago",
      stackedNotes: [
         {
            id: "note-4-stack-1",
            title: "Component Library",
            text: "Reusable component library created with Storybook documentation. Design system implemented.",
            timeAgo: "3 days ago",
         },
         {
            id: "note-4-stack-2",
            title: "State Management",
            text: "Redux store configured for global state management. API integration layer completed.",
            timeAgo: "3 days ago",
         },
      ],
   },
];

export default function MyWork() {
   const [notePositions, setNotePositions] = useState<
      Record<string, { x: number; y: number }>
   >({});
   const [screenWidth, setScreenWidth] = useState(0);

   useEffect(() => {
      setScreenWidth(window.innerWidth);
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const handleNoteDragEnd = (noteId: string, x: number, y: number) => {
      setNotePositions((prev) => ({
         ...prev,
         [noteId]: { x, y },
      }));
   };

   const getInitialNotePosition = (index: number) => {
      const isLeft = index % 2 === 0;
      const centerX = screenWidth / 2;
      const baseX = isLeft ? centerX - 450 : centerX + 150;
      const baseY = 120 + index * 280;
      return { x: baseX, y: baseY };
   };

   const getNoteRotation = (index: number, stackIndex: number = -1) => {
      const rotations = [
         [-3, 2, -5], // Group 1: main, stack1, stack2
         [4, -2, 6], // Group 2
         [-2, 5, -4], // Group 3
         [3, -6, 1], // Group 4
         [-4, 3, -1], // Group 5
         [2, -3, 4], // Group 6
      ];

      const groupRotations = rotations[index % rotations.length];
      return stackIndex === -1
         ? groupRotations[0]
         : groupRotations[stackIndex + 1];
   };

   const timelineHeight = checkpointNotes.length * 280 + 300;
   const centerX = screenWidth / 2;

   if (screenWidth === 0) return null;

   return (
      <div className="relative" style={{ minHeight: `${timelineHeight}px` }}>
         {/* Central Timeline Line */}
         <div
            className="absolute w-0.5 bg-gray-300"
            style={{
               left: `${centerX}px`,
               transform: "translateX(-50%)",
               top: "80px",
               height: `${timelineHeight - 160}px`,
            }}
         />

         {/* Timeline Checkpoints */}
         {checkpointNotes.map((note, index) => {
            const isLeft = index % 2 === 0;
            const topPosition = 120 + index * 280;
            const dotCenterY = topPosition + 80; // Vị trí trung tâm của dot

            return (
               <div key={`checkpoint-${index}`}>
                  {/* Horizontal Connection Line - căn chỉnh chính xác với dot */}
                  <div
                     className="absolute h-px bg-gray-200 z-10"
                     style={{
                        left: `${centerX - 100}px`,
                        width: "200px",
                        top: `${dotCenterY}px`, // Sử dụng cùng vị trí với dot
                     }}
                  />

                  {/* Timeline Dot - căn chỉnh hoàn hảo */}
                  <motion.div
                     className="absolute w-4 h-4 bg-white border-2 border-gray-400 rounded-full shadow-sm z-20"
                     style={{
                        left: `${centerX - 8}px`, // centerX - (width/2) = centerX - 8px
                        top: `${dotCenterY - 8}px`, // dotCenterY - (height/2) = dotCenterY - 8px
                     }}
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ delay: index * 0.1 }}
                  />

                  {/* Date Card */}
                  <motion.div
                     className="absolute bg-white rounded-lg shadow-sm border border-gray-200 z-30 p-3 min-w-[80px]"
                     style={{
                        left: isLeft
                           ? `${centerX - 120}px`
                           : `${centerX + 40}px`,
                        top: `${dotCenterY + 20}px`, // Đặt date card dưới dot
                     }}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.1 + 0.2 }}
                  >
                     <div className="text-center">
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                           {new Date(note.date + ", 2024").toLocaleDateString(
                              "en",
                              { weekday: "short" }
                           )}
                        </div>
                        <div className="text-gray-700 text-lg font-semibold mt-1">
                           {note.date.split(" ")[1]}
                        </div>
                     </div>
                  </motion.div>
               </div>
            );
         })}

         {/* Checkpoint Notes */}
         <div className="relative">
            {checkpointNotes.map((note, index) => {
               const initialPos = getInitialNotePosition(index);
               const isLeft = index % 2 === 0;

               return (
                  <div key={`checkpoint-group-${index}`}>
                     {/* Main Note */}
                     <motion.div
                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.4 }}
                     >
                        <StickyNote
                           text={
                              <div>
                                 <h3 className="font-semibold text-base mb-2 text-gray-800">
                                    {note.title}
                                 </h3>
                                 <p className="text-gray-600 text-sm leading-relaxed">
                                    {note.text}
                                 </p>
                              </div>
                           }
                           date=""
                           timeAgo={note.timeAgo}
                           initialX={notePositions[note.id]?.x || initialPos.x}
                           initialY={notePositions[note.id]?.y || initialPos.y}
                           rotation={getNoteRotation(index)}
                           zIndex={30 + index * 3}
                           onDragEnd={(x, y) =>
                              handleNoteDragEnd(note.id, x, y)
                           }
                           animation="none"
                        />
                     </motion.div>

                     {/* Stacked Notes */}
                     {note.stackedNotes.map((stackedNote, stackIndex) => {
                        const stackedPos = {
                           x:
                              (notePositions[stackedNote.id]?.x ||
                                 initialPos.x) +
                              (stackIndex + 1) * 8,
                           y:
                              (notePositions[stackedNote.id]?.y ||
                                 initialPos.y) -
                              (stackIndex + 1) * 6,
                        };

                        return (
                           <motion.div
                              key={stackedNote.id}
                              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                 delay: index * 0.2 + (stackIndex + 1) * 0.1,
                                 duration: 0.4,
                              }}
                           >
                              <StickyNote
                                 text={
                                    <div>
                                       <h3 className="font-semibold text-base mb-2 text-gray-800">
                                          {stackedNote.title}
                                       </h3>
                                       <p className="text-gray-600 text-sm leading-relaxed">
                                          {stackedNote.text}
                                       </p>
                                    </div>
                                 }
                                 date=""
                                 timeAgo={stackedNote.timeAgo}
                                 initialX={stackedPos.x}
                                 initialY={stackedPos.y}
                                 rotation={getNoteRotation(index, stackIndex)}
                                 zIndex={30 + index * 3 - (stackIndex + 1)}
                                 onDragEnd={(x, y) =>
                                    handleNoteDragEnd(stackedNote.id, x, y)
                                 }
                                 animation="none"
                              />
                           </motion.div>
                        );
                     })}
                  </div>
               );
            })}
         </div>
      </div>
   );
}
