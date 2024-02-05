import {
  useAllFormFields,
  useField,
  useFormFields,
} from "payload/components/forms";
import { FieldType } from "payload/dist/admin/components/forms/useField/types";
import React, { useState, useEffect } from "react";

type Props = {
  path: string;
  name: string;
  paths: string[];
  user: any;
  site: string;
  readPath: string;
};

const CustomTextField: React.FC<Props> = ({
  name,
  path,
  paths,
  site,
  readPath,
}) => {
  const [fields, dispatchFields] = useAllFormFields() as any;
  const { value, setValue }: FieldType<Props | any> = useField<Props>({ path });

  const onClick = () => {
    setValue(!value);

    if (path !== readPath && readPath) {
      dispatchFields({
        type: "UPDATE",
        value: true,
        path: readPath,
      });
    }

    if (value && paths) {
      paths.forEach((path) => {
        dispatchFields({
          type: "UPDATE",
          value: false,
          path: path,
        });
      });
    }
  };

  return (
    <div className={`field-type checkbox${value ? " checkbox--checked" : ""}`}>
      <div
        className={`custom-checkbox${value ? " custom-checkbox--checked" : ""}`}
      >
        <div
          style={{
            background: fields?.sites?.value?.includes(site)
              ? "rgb(0 31 85)"
              : "rgb(81 122 193)",
          }}
          className="custom-checkbox__input"
        >
          <input
            type="checkbox"
            disabled={!fields?.sites?.value?.includes(site)}
            // onClick={onClick}
            // style={{
            //   paddingBottom: "32px",
            //   margin: "0px",
            //   marginTop: name === "projects" ? "37px" : "0px",
            // }}
            onClick={onClick}
            name={name}
          />
          <span className="custom-checkbox__icon check">
            <svg
              className="icon icon--check"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
            >
              <path
                d="M10.6092 16.0192L17.6477 8.98076"
                className="stroke"
                strokeLinecap="square"
                strokeLinejoin="bevel"
              ></path>
              <path
                d="M7.35229 12.7623L10.6092 16.0192"
                className="stroke"
                strokeLinecap="square"
                strokeLinejoin="bevel"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomTextField;
