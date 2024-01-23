// import { getPlaiceholder } from "plaiceholder";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const imageUrl = searchParams.get("imageUrl");

//   if (!imageUrl) {
//     return new Response("Missing imageUrl", {
//       status: 400,
//     });
//   }

//   const buffer = await fetch(imageUrl).then(async (res) =>
//     Buffer.from(await res.arrayBuffer())
//   );

//   const { base64 } = await getPlaiceholder(buffer);

//   //console.log(base64);

//   return new Response(JSON.stringify({ data: base64 }), {
//     headers: {
//       "content-type": "application/json",
//     },
//   });
// }
