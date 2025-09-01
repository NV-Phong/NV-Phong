import fs from "fs";
import path from "path";

function collectApi(dir: string, base = ""): string[] {
   return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const sub = path.join(dir, e.name);
      const route = base ? `${base}/${e.name}` : e.name;

      if (e.isDirectory()) {
         const hasRoute = fs.existsSync(path.join(sub, "route.ts"));
         return [
            ...(hasRoute ? [`api/${route}`] : []),
            ...collectApi(sub, route),
         ];
      }

      return [];
   });
}

export async function GET() {
   const root = path.join(process.cwd(), "app/api");
   return Response.json(collectApi(root));
}
