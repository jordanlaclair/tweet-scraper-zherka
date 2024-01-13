import Image from "next/image";
import { cookies } from "next/headers";
import Balls from "./balls";

async function getData() {
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=1871f253a7524cce8c65a68960f516b5&pageSize=1&page=1",
    { next: { revalidate: 3600 } }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const cookieStore = cookies().getAll();
  console.log(data);
  console.log(cookieStore);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 font-lemon">
      <Balls />
    </main>
  );
}
