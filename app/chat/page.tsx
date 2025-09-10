"use client";
import Particles from "@/components/magicui/particles";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Share2, Trash2, User, ZoomIn } from "lucide-react";
import Separator from "@/components/ui-engineer/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import Icon from "@/components/ui-engineer/Icon";

interface Message {
   id: number;
   text: string;
   sender: string;
   timestamp: string;
   isMe: boolean;
}

interface Conversation {
   id: number;
   name: string;
   avatar: string;
   lastMessage: string;
   timestamp: string;
   unreadCount: number;
   online: boolean;
}

type MessagesRecord = Record<number, Message[]>;

const mockConversations: Conversation[] = [
   {
      id: 1,
      name: "Nguyễn Văn Phong",
      avatar:
         "https://i.pinimg.com/736x/0b/2a/9f/0b2a9fc1102593dfa1c06d7223ac089b.jpg",
      lastMessage: "let's say hi ^_^",
      timestamp: "2 min ago",
      unreadCount: 1,
      online: true,
   },
];

const mockMessages: MessagesRecord = {
   1: [
      {
         id: 1,
         text: "Hey! How are you doing?",
         sender: "Alice Johnson",
         timestamp: "10:30 AM",
         isMe: false,
      },
      {
         id: 2,
         text: "I'm doing great! Thanks for asking. How about you?",
         sender: "Me",
         timestamp: "10:32 AM",
         isMe: true,
      },
      {
         id: 3,
         text: "I'm good too! Want to grab coffee later?",
         sender: "Alice Johnson",
         timestamp: "10:33 AM",
         isMe: false,
      },
   ],
};

export default function Chat() {
   const { resolvedTheme } = useTheme();
   const [color, setColor] = useState("#ffffff");
   const [showParticles, setShowParticles] = useState(true);
   const [currentTab, setCurrentTab] = useState("chats");

   const [selectedConversation, setSelectedConversation] = useState<
      number | null
   >(null);
   const [newMessage, setNewMessage] = useState("");
   const [messages, setMessages] = useState<MessagesRecord>(mockMessages);
   const messagesEndRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
      setShowParticles(resolvedTheme === "dark");
   }, [resolvedTheme]);

   function handleConversationClick(conversationId: number) {
      setSelectedConversation(conversationId);
      setCurrentTab("messages");
   }

   function handleSendMessage() {
      if (!newMessage.trim() || !selectedConversation) return;
      const newMsg: Message = {
         id: Date.now(),
         text: newMessage.trim(),
         sender: "Me",
         timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
         }),
         isMe: true,
      };

      setMessages((prev) => ({
         ...prev,
         [selectedConversation]: [
            ...(prev[selectedConversation] || []),
            newMsg,
         ],
      }));

      setTimeout(() => {
         setNewMessage("");
      }, 500);
   }

   const tabOrder = ["chats", "messages"];

   function handleBack() {
      const idx = tabOrder.indexOf(currentTab);
      if (idx > 0) {
         setCurrentTab(tabOrder[idx - 1]);
         if (currentTab === "messages") {
            setSelectedConversation(null);
         }
      }
   }

   const selectedConversationData = selectedConversation
      ? mockConversations.find((c) => c.id === selectedConversation)
      : null;

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages, selectedConversation]);

   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         {showParticles && (
            <Particles
               className="absolute inset-0 z-0"
               quantity={100}
               ease={80}
               color={color}
               refresh
            />
         )}
         <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            <div className="flex flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="chats" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-8 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0 -mt-2.5">
                        <CardTitle className="flex flex-col">
                           <p className="text-2xl uppercase">Chats</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           I&apos;m just one hi away - don&apos;t be shy!
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="w-100 p-0 flex flex-col justify-center space-y-3">
                        <ScrollArea className="h-20">
                           <div className="space-y-2">
                              {mockConversations.map((conversation) => (
                                 <div
                                    key={conversation.id}
                                    className="flex items-center border border-primary/15 bg-primary/5 space-x-3 p-3 rounded-lg hover:bg-primary/15 cursor-pointer transition-colors"
                                    onClick={() =>
                                       handleConversationClick(conversation.id)
                                    }
                                 >
                                    <div className="relative">
                                       <Avatar className="h-12 w-12">
                                          <AvatarImage
                                             src={
                                                conversation.avatar ||
                                                "/placeholder.svg"
                                             }
                                             alt={conversation.name}
                                          />
                                          <AvatarFallback>
                                             {conversation.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                          </AvatarFallback>
                                       </Avatar>
                                       {conversation.online && (
                                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                                       )}
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                       <div className="flex justify-between items-center">
                                          <p className="text-sm font-medium truncate">
                                             {conversation.name}
                                          </p>
                                          <span className="text-xs text-muted-foreground">
                                             {conversation.timestamp}
                                          </span>
                                       </div>
                                       <div className="flex items-center justify-between">
                                          <p className="text-sm text-muted-foreground truncate">
                                             {conversation.lastMessage}
                                          </p>
                                          {conversation.unreadCount > 0 && (
                                             <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                                                <Icon
                                                   size={15}
                                                   styles="bulk"
                                                   className="!bg-primary-foreground-darker"
                                                   name="notification"
                                                />
                                                {conversation.unreadCount}
                                             </Badge>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </ScrollArea>
                     </CardContent>

                     <Separator>Quick Action</Separator>
                     <CardFooter className="flex flex-col p-0">
                        <ToggleGroup variant="outline" type="multiple">
                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <ToggleGroupItem
                                    value="profile"
                                    aria-label="profile image"
                                    className="border border-primary/30 data-[state=on]:bg-transparent hover:!bg-accent"
                                 >
                                    <User className="h-4 w-4 text-primary-foreground-darker" />
                                 </ToggleGroupItem>
                              </TooltipTrigger>
                              <TooltipContent className="py-2">
                                 Profile
                              </TooltipContent>
                           </Tooltip>

                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <ToggleGroupItem
                                    value="zoom"
                                    aria-label="Zoom image"
                                    className="border border-primary/30 data-[state=on]:bg-transparent hover:!bg-accent"
                                 >
                                    <ZoomIn className="h-4 w-4 text-primary-foreground-darker" />
                                 </ToggleGroupItem>
                              </TooltipTrigger>
                              <TooltipContent className="py-2">
                                 Zoom
                              </TooltipContent>
                           </Tooltip>

                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <ToggleGroupItem
                                    value="share"
                                    aria-label="Share image"
                                    className="border border-primary/30 data-[state=on]:bg-transparent hover:!bg-accent"
                                 >
                                    <Share2 className="h-4 w-4 text-primary-foreground-darker" />
                                 </ToggleGroupItem>
                              </TooltipTrigger>
                              <TooltipContent className="py-2">
                                 Copy Link
                              </TooltipContent>
                           </Tooltip>

                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <ToggleGroupItem
                                    value="delete"
                                    aria-label="Delete image"
                                    className="border border-primary/30 data-[state=on]:bg-transparent hover:!bg-accent"
                                 >
                                    <Trash2 className="h-4 w-4 text-primary-foreground-darker" />
                                 </ToggleGroupItem>
                              </TooltipTrigger>
                              <TooltipContent className="py-2">
                                 Delete
                              </TooltipContent>
                           </Tooltip>
                        </ToggleGroup>
                     </CardFooter>
                  </Card>
               </TabsContent>

               <TabsContent value="messages" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-8 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0 -mt-2.5">
                        <CardTitle className="flex flex-col">
                           <p className="text-2xl uppercase">Messages</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Tell me about something fun
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="w-100 p-0 flex flex-col justify-center space-y-3">
                        {selectedConversationData && (
                           <div className="flex items-center justify-between border border-primary/15 bg-primary/5 space-x-2 rounded-lg cursor-pointer transition-colors">
                              <div className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors">
                                 <Avatar className="h-8 w-8">
                                    <AvatarImage
                                       src={
                                          selectedConversationData.avatar ||
                                          "/placeholder.svg"
                                       }
                                       alt={selectedConversationData.name}
                                    />
                                    <AvatarFallback>
                                       {selectedConversationData.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                    </AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <p className="text-sm font-medium">
                                       {selectedConversationData.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                       {selectedConversationData.online
                                          ? "Online"
                                          : "Offline"}
                                    </p>
                                 </div>
                              </div>
                              <ToggleGroup
                                 variant="outline"
                                 type="multiple"
                                 className="mr-2"
                              >
                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                       <ToggleGroupItem
                                          value="back"
                                          aria-label="Back image"
                                          onClick={handleBack}
                                          className="border border-primary/30 data-[state=on]:bg-transparent hover:!bg-accent"
                                       >
                                          <Icon
                                             styles="stroke"
                                             className="!bg-primary-foreground-1"
                                             name="link-backward"
                                          />
                                       </ToggleGroupItem>
                                    </TooltipTrigger>
                                    <TooltipContent className="py-2">
                                       Back
                                    </TooltipContent>
                                 </Tooltip>
                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                       <ToggleGroupItem
                                          value="profile"
                                          aria-label="profile image"
                                          className="border border-primary/30 data-[state=on]:bg-transparent hover:!bg-accent"
                                       >
                                          <User className="h-4 w-4 text-primary-foreground-1" />
                                       </ToggleGroupItem>
                                    </TooltipTrigger>
                                    <TooltipContent className="py-2">
                                       Profile
                                    </TooltipContent>
                                 </Tooltip>

                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                       <ToggleGroupItem
                                          value="share"
                                          aria-label="Share image"
                                          className="border border-primary/30 data-[state=on]:bg-transparent hover:!bg-accent"
                                       >
                                          <Share2 className="h-4 w-4 text-primary-foreground-1" />
                                       </ToggleGroupItem>
                                    </TooltipTrigger>
                                    <TooltipContent className="py-2">
                                       Copy Link
                                    </TooltipContent>
                                 </Tooltip>
                              </ToggleGroup>
                           </div>
                        )}

                        <ScrollArea className="w-[103%] h-60 p-3">
                           <div className="space-y-3">
                              {selectedConversation &&
                                 messages[selectedConversation]?.map(
                                    (message: Message) => (
                                       <div
                                          key={message.id}
                                          className={`flex ${
                                             message.isMe
                                                ? "justify-end"
                                                : "justify-start"
                                          }`}
                                       >
                                          <div
                                             className={`max-w-xs px-3 py-2 rounded-lg break-words ${
                                                message.isMe
                                                   ? "bg-primary text-primary-foreground"
                                                   : "bg-primary/7 border border-primary/15"
                                             }`}
                                          >
                                             <p className="text-sm break-words whitespace-pre-wrap">
                                                {message.text}
                                             </p>
                                             <p className="text-xs opacity-70 mt-1">
                                                {message.timestamp}
                                             </p>
                                          </div>

                                          <div ref={messagesEndRef} />
                                       </div>
                                    )
                                 )}
                           </div>
                        </ScrollArea>
                     </CardContent>

                     <CardFooter className="flex flex-col items-start w-100 gap-1 p-1 pt-1 border border-primary/15 bg-primary/10 rounded-lg">
                        <Badge className="uppercase font-normal text-[10px] text-primary-foreground-darker bg-transparent h-5 rounded-sm border-none">
                           Press enter to send
                        </Badge>

                        {/* <Textarea
                           className="w-full border-none max-h-30 bg-card resize-none"
                           value={newMessage}
                           onChange={(e) => setNewMessage(e.target.value)}
                           placeholder="Let's say hi ^_^"
                           onKeyPress={(e) =>
                              e.key === "Enter" && handleSendMessage()
                           }
                        /> */}
                        <Input
                           className="w-full border-none max-h-30 bg-card resize-none"
                           value={newMessage}
                           onChange={(e) => setNewMessage(e.target.value)}
                           placeholder="Let's say hi ^_^"
                           onKeyPress={(e) =>
                              e.key === "Enter" && handleSendMessage()
                           }
                        />
                     </CardFooter>
                  </Card>
               </TabsContent>
            </div>
         </Tabs>
         <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
         <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
         <div className="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
         <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
      </div>
   );
}
