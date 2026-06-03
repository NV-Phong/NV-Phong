"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useContributionGraphContext } from "@/context/cg-context";
import { flattenDateSelectionsToYYYYMMDD } from "@/lib/flatten-dates";

export function CommitChanges() {
   const [open, setOpen] = React.useState(false);
   const [log, setLog] = React.useState<string[]>([]);
   const [running, setRunning] = React.useState(false);
   const [done, setDone] = React.useState<{
      ok: boolean;
      error?: string;
   } | null>(null);
   const { totalDays, commitsPerDay, dateSelections } =
      useContributionGraphContext();

   const dates = React.useMemo(
      () => flattenDateSelectionsToYYYYMMDD(dateSelections),
      [dateSelections],
   );
   const totalCommits = totalDays * (commitsPerDay ?? 0);

   const handleStartProcess = React.useCallback(async () => {
      const perDay = commitsPerDay ?? 0;
      if (dates.length === 0 || perDay <= 0) {
         setDone({
            ok: false,
            error: "Chọn ít nhất một ngày và Commits per day > 0.",
         });
         return;
      }
      setRunning(true);
      setDone(null);
      setLog([]);

      try {
         const res = await fetch("/api/make-commits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dates, commitsPerDay: perDay }),
         });
         if (!res.ok || !res.body) {
            setDone({ ok: false, error: res.statusText || "Request failed" });
            setRunning(false);
            return;
         }
         const reader = res.body.getReader();
         const decoder = new TextDecoder();
         let buffer = "";
         while (true) {
            const { value, done: streamDone } = await reader.read();
            if (streamDone) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
               if (!line.trim()) continue;
               try {
                  const parsed = JSON.parse(line) as {
                     done?: boolean;
                     ok?: boolean;
                     error?: string;
                  };
                  if (parsed.done === true) {
                     setDone({ ok: parsed.ok ?? false, error: parsed.error });
                     setRunning(false);
                     return;
                  }
               } catch {
                  setLog((prev) => [...prev, line]);
               }
            }
         }
         if (buffer.trim()) {
            try {
               const parsed = JSON.parse(buffer) as {
                  done?: boolean;
                  ok?: boolean;
                  error?: string;
               };
               if (parsed.done === true) {
                  setDone({ ok: parsed.ok ?? false, error: parsed.error });
               } else {
                  setLog((prev) => [...prev, buffer]);
               }
            } catch {
               setLog((prev) => [...prev, buffer]);
            }
         }
         setRunning(false);
      } catch (err) {
         const message = err instanceof Error ? err.message : String(err);
         setDone({ ok: false, error: message });
         setRunning(false);
      }
   }, [dates, commitsPerDay]);

   const handleOpenChange = React.useCallback(
      (next: boolean) => {
         if (!next && !running) {
            setLog([]);
            setDone(null);
         }
         setOpen(next);
      },
      [running],
   );

   return (
      <>
         <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
               <Button className="w-2/5" type="button">
                  Commit Changes
               </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] shadow-2xl shadow-primary/15 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <DialogHeader>
                  <DialogTitle>COMMIT CHANGES</DialogTitle>
                  <DialogDescription>
                     Auto save recent changes to the repository (matrix-style
                     commits).
                  </DialogDescription>
               </DialogHeader>
               <div className="space-y-3">
                  <div className="space-y-1">
                     <div className="text-center p-2 bg-primary/15 border border-primary/20 rounded-md text-sm font-medium text-primary-foreground-darker">
                        Total Commit • {totalCommits}
                     </div>
                  </div>
                  <div className="space-y-1">
                     <Label htmlFor="description" className="pb-1">
                        Process
                     </Label>
                     <div className="h-30 min-h-[120px] max-h-[200px] overflow-y-auto text-left p-2 bg-primary/15 border border-primary/20 rounded-md text-xs font-mono text-primary-foreground-darker whitespace-pre-wrap">
                        {log.length === 0 && !done && !running && (
                           <p className="text-muted-foreground">
                              The process will run here.
                           </p>
                        )}
                        {log.map((line, i) => (
                           <div key={i}>{line}</div>
                        ))}
                        {done && (
                           <div
                              className={
                                 done.ok
                                    ? "text-emerald-600"
                                    : "text-destructive"
                              }
                           >
                              {done.ok ? "Done." : (done.error ?? "Error")}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <DialogFooter className="!justify-between">
                  <Button
                     type="button"
                     variant="outline"
                     className="w-2/5"
                     onClick={() => setOpen(false)}
                     disabled={running}
                  >
                     Cancel
                  </Button>
                  <Button
                     type="button"
                     className="w-2/5"
                     onClick={handleStartProcess}
                     disabled={running || totalCommits === 0}
                  >
                     {running ? "Running…" : "Start Process"}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
}
