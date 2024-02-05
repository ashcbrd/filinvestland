import { Validate } from "payload/types";

export const navigationFeaturedSlugValidation: Validate<any, any, any, any> = (
  _val,
  { data }
) => {
  const oneSlugs = ["Our Businesses", "Residences", "Investor Relations"];
  let status: boolean | string = true;
  if (data.mainMenu instanceof Array) {
    data.mainMenu.map((item: any) => {
      if (status === true && item?.secondFeaturedSlug) {
        const index = oneSlugs.indexOf(item?.link?.label);
        if (index > -1) {
          status = `${oneSlugs[index]} menu have only one featured slug`;
        }
      }
    });
  }
  return status;
};
