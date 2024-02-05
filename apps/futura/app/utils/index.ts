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
