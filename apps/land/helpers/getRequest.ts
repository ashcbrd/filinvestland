import { CACHE_REVALIDATE } from "./constants";
export async function getRequest(url: string, isSingle?: boolean) {
  const res = await fetch(`${process.env.CMS_URL}${url}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const jsonData = await res.json();
  return jsonData ? (isSingle ? jsonData.docs?.[0] : jsonData.docs) : null;
}

export async function getHeaderCover(url: string, isSingle?: boolean) {
  try {
    const res = await fetch(`${process.env.CMS_URL}${url}`, {
      cache: "no-store",
    });
    const jsonData = await res.json();
    return jsonData;
  } catch (err) {
    console.log(err)
  }

}
