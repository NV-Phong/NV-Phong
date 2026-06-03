import { format, addDays, differenceInDays } from "date-fns";
import type { DateRange } from "react-day-picker";

type DateSelection = Date | DateRange | undefined;

/**
 * Flatten dateSelections (single dates + ranges) to sorted unique YYYY-MM-DD strings.
 * Used to feed the matrix-style commit API.
 */
export function flattenDateSelectionsToYYYYMMDD(
   dateSelections: DateSelection[],
): string[] {
   const set = new Set<string>();

   for (const selection of dateSelections) {
      if (!selection) continue;
      if (selection instanceof Date) {
         set.add(format(selection, "yyyy-MM-dd"));
         continue;
      }
      const range = selection as DateRange;
      if (!range.from) continue;
      const from = range.from;
      const to = range.to ?? range.from;
      const days = differenceInDays(to, from) + 1;
      for (let i = 0; i < days; i++) {
         set.add(format(addDays(from, i), "yyyy-MM-dd"));
      }
   }

   return Array.from(set).sort();
}
