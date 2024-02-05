import { Block } from "payload/types";
// import LabeledValuesSlider from "../../components/sliderValue";

const NewsCover: Block = {
  slug: "filinvest-header-cover",
  fields: [
    {
      name: "coverImage", // required
      label: " ",
      type: "upload", // required
      relationTo: "files", // required
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    // {
    //   type: "number",
    //   name: "brightness",
    //   label: "Brightness",
    //   required: false,
    //   admin: {
    //     components: {
    //       Field: LabeledValuesSlider,
    //     },
    //   },
    //   defaultValue: 100,
    // },
  ],
};

export default NewsCover;
