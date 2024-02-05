import MainHeader from "@/components/header/MainHeader";
import { HEADER_INFO } from "@/components/pages/contact-us/constants";
import { getPageContent } from "../../page";

export async function generateMetadata() {
  return {
    title: "Contact Us",
    description: "Contact Us",
  };
}

async function getToken() {
 try{
  const urlencoded = new URLSearchParams({
    refresh_token: `${process.env.ZOHO_REFRESH_TOKEN}`,
    client_id: `${process.env.ZOHO_CLIENT_ID}`,
    client_secret: `${process.env.ZOHO_CLIENT_SECRET}`,
    grant_type: `refresh_token`,
  });
  const res = await fetch(
    `${process.env.ZOHO_REFRESH_TOKEN_URL}?${urlencoded.toString()}`,
    {
      method: "POST",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to post data");
  }
  const jsonData = await res.json();
  return jsonData;
 }catch(err){
   console.log(err)
 }
}

async function submitContact(token: any, contactData: any) {
  try {
    if (token && contactData) {
      const data = {
        data: [
          {
            First_Name: contactData.firstName,
            Last_Name: contactData.lastName,
            Email: contactData.email,
            Phone: contactData.contact,
            Notes: contactData.notes,
          },
        ],
        trigger: ["approval", "workflow", "blueprint"],
      };
      console.log('test')
      const res = await fetch(`${process.env.ZOHO_LEADS_URL}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Zoho-oauthtoken ${token.access_token}`,
        },
      });
      console.log(res)
      if (!res.ok) {
        throw new Error("Failed to post data");
      }
      const jsonData = await res.json();
      console.log(jsonData)
      return jsonData;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error)
  }
}

const ContactUsSubmitPage = async ({ searchParams }: any) => {
  

 return <>
 </>
};

export default ContactUsSubmitPage;
