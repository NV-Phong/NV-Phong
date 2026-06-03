import simpleGit from "simple-git";
import { addMinutes, parseISO } from "date-fns";
import { writeFile } from "fs/promises";
import path from "path";

const git = simpleGit(process.cwd());
const dataFilePath = path.join(process.cwd(), "data/fake-commit.json");

async function markCommit(date: string): Promise<void> {
   try {
      await writeFile(dataFilePath, JSON.stringify({ date }, null, 2));
      await git.add(dataFilePath);
      await git.commit(date, ["--date", date]);
   } catch (err) {
      console.error(`Lỗi commit ${date}:`, err);
      throw err;
   }
}

/**
 * Build sorted list of commit ISO timestamps from date list and commitsPerDay.
 * Same logic as feature/matrix.js: for each date, spread commitsPerDay across the day.
 */
export function buildCommitTimestamps(
   dates: string[],
   commitsPerDay: number,
): string[] {
   const commits: string[] = [];
   const minutesPerCommit = (24 * 60) / commitsPerDay;

   for (const dateStr of dates) {
      const dayStart = parseISO(`${dateStr}T00:00:00.000Z`);
      for (let i = 0; i < commitsPerDay; i++) {
         const commitTime = addMinutes(dayStart, i * minutesPerCommit);
         commits.push(commitTime.toISOString());
      }
   }

   commits.sort();
   return commits;
}

export async function runMakeCommits(
   dates: string[],
   commitsPerDay: number,
   onProgress?: (message: string) => void,
): Promise<{ ok: boolean; error?: string }> {
   if (dates.length === 0 || commitsPerDay <= 0) {
      return { ok: false, error: "No dates or commits per day is 0" };
   }

   const timestamps = buildCommitTimestamps(dates, commitsPerDay);
   let count = 0;

   try {
      for (const date of timestamps) {
         await markCommit(date);
         count++;
         onProgress?.(`Commit ${count}/${timestamps.length} • ${date}`);
      }
      onProgress?.("Push...");
      await git.push();
      onProgress?.("Done.");
      return { ok: true };
   } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      onProgress?.(`Error: ${message}`);
      return { ok: false, error: message };
   }
}
