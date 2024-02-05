export const getManatalToken = async (jobHash: string) => {
  const response = await fetch(
    `https://www.careers-page.com/${process.env.MANATAL_CLIENT_ID}/job/${jobHash}/apply`
  );
  let token = "";
  let cookies = "";
  response.headers.forEach((value, key) => {
    if (key.toLocaleLowerCase() == "set-cookie") cookies = value;
  });
  const arrs = cookies.split("; ");
  arrs.map((item) => {
    const arr = item.split("=");
    if (arr.length == 2) {
      if (arr[0].toLocaleLowerCase() == "csrftoken") token = arr[1];
    }
  });
  return token;
};
