import { NextResponse } from "next/server";

const GITHUB_CONTRIBUTIONS_QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: Request) {
   const apiUrl = process.env.GITHUB_API ?? "https://api.github.com/graphql";
   const token = process.env.PERSONAL_ACCESS_TOKENS;

   const { searchParams } = new URL(request.url);
   const yearParam = searchParams.get("year");
   const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();
   const from = `${year}-01-01T00:00:00Z`;
   const to = `${year}-12-31T23:59:59Z`;

   if (!token) {
      return NextResponse.json(
         { error: "Thiếu PERSONAL_ACCESS_TOKENS trong biến môi trường" },
         { status: 500 },
      );
   }

   try {
      const res = await fetch(apiUrl, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
            query: GITHUB_CONTRIBUTIONS_QUERY,
            variables: { login: "NV-Phong", from, to },
         }),
      });

      if (!res.ok) {
         const text = await res.text();
         return NextResponse.json(
            { error: `GitHub API lỗi: ${res.status}`, detail: text },
            { status: res.status },
         );
      }

      const data = await res.json();

      if (data.errors) {
         return NextResponse.json(
            { error: "GraphQL errors", errors: data.errors },
            { status: 400 },
         );
      }

      return NextResponse.json(data);
   } catch (err) {
      const message = err instanceof Error ? err.message : "Lỗi không xác định";
      return NextResponse.json(
         { error: "Gọi API thất bại", detail: message },
         { status: 500 },
      );
   }
}
