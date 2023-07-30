import { db } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const q = url.searchParams.get("q"); // gets the search param 'q' from the searchBar

  if (!q) return new Response("Invalid query", { status: 400 });

  const results = await db.subreddit.findMany({
    where: {
      name: {
        startsWith: q,
      },
    },
    include: {
      _count: true, // show more / paginate
    },
    take: 5,
  });

  return new Response(JSON.stringify(results));
}
