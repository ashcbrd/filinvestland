import {
  useAllFormFields,
  useField,
  useFormFields,
} from "payload/components/forms";
import { FieldType } from "payload/dist/admin/components/forms/useField/types";
import React, { useState } from "react";

type Props = { path: string; name: string; paths: string[] };

const textField: React.FC<Props> = ({ name }) => {
  let uName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <p
      style={{
        margin: "0px",
        marginBottom: "32px",
        marginTop: name === "news" ? "38px" : "0px",
      }}
      className="field-label"
    >
      {uName}
    </p>
  );
};

export default textField;
