export const getDomainRedirection = (host: string, url: string) => {
  if (
    url?.includes("facebook.com") ||
    url?.includes("youtube.com") ||
    url?.includes("twitter.com") ||
    url?.includes("instagram.com")
  ) {
    return url;
  }

  const betaMicrosites = [
    "prestigebyfilinvest",
    "aspirebyfilinvest",
    "futurabyfilinvest",
  ];

  const devMicrosites = ["prestige", "aspire", "futura"];

  try {
    if (url) {
      const { pathname } = new URL(url);

      if (host.includes("dev-") || host.includes("localhost")) {
        return `https://dev-${getDomain(
          devMicrosites,
          url,
          host
        )}.stagingurls.com${pathname}`;
      } else if (host.includes("fli-")) {
        return `https://fli-${getDomain(
          devMicrosites,
          url,
          host
        )}.stagingurls.com${pathname}`;
      } else if (host.includes("beta.")) {
        return `https://beta.${getDomain(
          betaMicrosites,
          url,
          host
        )}.com${pathname}`;
      } else {
        return `https://filinvestland.com${pathname}`;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const getDomain = (sites: any[], url: string, host: string) => {
  let domain = "land";

  if (
    !host.includes("dev-") &&
    !host.includes("fli-") &&
    !host.includes("localhost")
  ) {
    domain = "filinvestland";
  }

  const site = sites.find((site: string) => {
    if (url.includes(site)) {
      return site;
    }
  });
  if (site) {
    domain = site;
  }

  return domain;
};

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
