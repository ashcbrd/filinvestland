import { NextResponse } from "next/server";
import Request from "@/config/API";

export async function POST(req) {
    const body = await req.json();
    
    const urlencoded = new URLSearchParams({
        refresh_token: `${ process.env.ZOHO_REFRESH_TOKEN }`,
        client_id: `${ process.env.ZOHO_CLIENT_ID }`,
        client_secret: `${ process.env.ZOHO_CLIENT_SECRET }`,
        grant_type: `refresh_token`,
    });
  
    const token = await Request().post(`${ process.env.CMS_URL }/zoho-token?${ urlencoded.toString() }`, {});

    if( token ) {
        await Request().post(`${process.env.NEXT_PUBLIC_CMS_URL}/zoho-submit-form`, body, {
            headers: {
                Authorization: `Zoho-oauthtoken ${token.data.access_token}`,
                'Content-Type': 'application/json', 
            }
        })

        return NextResponse.json(true, { status: 200 })
    }

    return NextResponse.json(true, { status: 400 })
}