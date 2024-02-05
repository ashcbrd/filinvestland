// import * as React from "react";
// import { styled, alpha, Box } from "@mui/system";
// import { Slider as BaseSlider, sliderClasses } from "@mui/base/Slider";
// import { useAllFormFields, useField } from "payload/components/forms";
// import { FieldType } from "payload/dist/admin/components/forms/useField/types";

// type Props = {
//   path: string;
//   name: string;
//   paths: string[];
//   user: any;
//   site: string;
//   readPath: string;
// };

// export default function LabeledValuesSlider({ name, path }: any) {
//   const { value, setValue }: FieldType<Props | any> = useField<Props>({ path });
//   const [fields, dispatchFields] = useAllFormFields() as any;
//   let uName = name.charAt(0).toUpperCase() + name.slice(1);

//   const defaultValue = fields[path].initialValue;
//   return (
//     <Box sx={{ width: 300 }}>
//       <p className="field-label" style={{ margin: "0px" }}>
//         {uName}: {value}
//       </p>
//       <Slider
//         onChange={(e: any) => {
//           setValue(e.target.value);
//         }}
//         defaultValue={defaultValue}
//         slots={{ valueLabel: SliderValueLabel }}
//       />
//     </Box>
//   );
// }

// interface SliderValueLabelProps {
//   children: React.ReactElement;
// }

// function SliderValueLabel({ children }: SliderValueLabelProps) {
//   return (
//     <span className="label-slider">
//       <div className="value-slider">{children}</div>
//     </span>
//   );
// }

// const blue = {
//   100: "#DAECFF",
//   200: "#99CCF3",
//   400: "#3399FF",
//   300: "#66B2FF",
//   500: "#007FFF",
//   600: "#0072E5",
//   900: "#003A75",
// };

// const grey = {
//   50: "#f6f8fa",
//   100: "#eaeef2",
//   200: "#d0d7de",
//   300: "#afb8c1",
//   400: "#8c959f",
//   500: "#6e7781",
//   600: "#57606a",
//   700: "#424a53",
//   800: "#32383f",
//   900: "#24292f",
// };

// const Slider = styled(BaseSlider)(
//   ({ theme }) => `
//   color: ${theme.palette.mode === "light" ? blue[500] : blue[400]};
//   height: 6px;
//   width: 100%;
//   padding: 16px 0;
//   display: inline-block;
//   position: relative;
//   cursor: pointer;
//   touch-action: none;
//   -webkit-tap-highlight-color: transparent;
//   font-family: "Suisse Intl", system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
//   &:hover {
//     opacity: 1;
//   }
//   &.${sliderClasses.disabled} {
//     pointer-events: none;
//     cursor: default;
//     color: ${theme.palette.mode === "light" ? grey[300] : grey[600]};
//     opacity: 0.5;
//   }
//   & .${sliderClasses.rail} {
//     display: block;
//     position: absolute;
//     width: 100%;
//     height: 4px;
//     border-radius: 2px;
//     background-color: ${theme.palette.mode === "light" ? blue[200] : blue[900]};
//   }
//   & .${sliderClasses.track} {
//     display: block;
//     position: absolute;
//     height: 4px;
//     border-radius: 2px;
//     background-color: currentColor;
//   }
//   & .${sliderClasses.thumb} {
//     position: absolute;
//     width: 16px;
//     height: 16px;
//     margin-left: -6px;
//     margin-top: -6px;
//     box-sizing: border-box;
//     border-radius: 50%;
//     outline: 0;
//     border: 3px solid currentColor;
//     background-color: #fff;
//     :hover,
//     &.${sliderClasses.focusVisible} {
//       box-shadow: 0 0 0 0.25rem ${alpha(
//         theme.palette.mode === "light" ? blue[400] : blue[300],
//         0.15
//       )};
//     }
//     & .label-slider {
//         font-family: IBM Plex Sans;
//         font-weight: 600;
//         font-size: 14px;
//         background: unset;
//         background-color: ${
//           theme.palette.mode === "light" ? blue[500] : blue[300]
//         };
//         width: 32px;
//         height: 32px;
//         padding: 0px;
//         visibility: hidden;
//         color: #fff;
//         border-radius: 50% 50% 50% 0;
//         position: absolute;
//         transform: translate(-35%, -140%) rotate(-45deg) scale(0);
//         transition: transform 0.3s ease;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//     }
//     :hover .label-slider {
//         visibility: visible;
//         transform: translate(-35%, -140%) rotate(-45deg) scale(1);
//     }
//     :hover .value-slider {
//         transform: rotate(45deg);
//         text-align: center;
//     }
//     &.${sliderClasses.active} {
//       box-shadow: 0 0 0 0.25rem ${alpha(
//         theme.palette.mode === "light" ? blue[200] : blue[300],
//         0.3
//       )};
//     }
//   }
// `
// );