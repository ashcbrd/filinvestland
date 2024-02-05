export const useZoho = () => {
  async function getToken() {
    try {
      const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

      const res = await fetch(
        `${process.env.CMS_URL}/zoho-token?grant_type=refresh_token`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            Authorization: `${refreshToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to post data");
      }
      const jsonData = await res.json();
      return jsonData.access_token;
    } catch (err) {
      console.log(err);
    }
  }

  async function submitInquiry(payload: any) {
    try {
      const token = await getToken();
      if (token) {
        const res: any = await fetch(
          `${process.env.CMS_URL}/zoho-submit-form`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              Authorization: `Zoho-oauthtoken ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = await res.json();
        return data.length > 0;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return { submitInquiry };
};
