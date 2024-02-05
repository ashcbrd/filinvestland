"use server";

export default async function verifyCaptcha(token: string | null) {
  const secretKey =
    process.env.GOOGLE_RECAPTCHA_SECRET_KEY ??
    "6LdR3xwpAAAAAAMauMPSoHEG92SOEB74XitU5vqC";
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.json();
}
