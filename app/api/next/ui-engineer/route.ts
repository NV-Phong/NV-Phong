import fs from "fs";
import path from "path";

function collect(dir: string, base = ""): string[] {
   return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      if (!e.isDirectory()) return [];
      const sub = path.join(dir, e.name);
      const route = base ? `${base}/${e.name}` : e.name;
      const hasPage = fs.existsSync(path.join(sub, "page.tsx"));
      return [...(hasPage ? [route] : []), ...collect(sub, route)];
   });
}

export async function GET() {
   const root = path.join(process.cwd(), "app/ui-engineer");
   return Response.json(collect(root));
}
