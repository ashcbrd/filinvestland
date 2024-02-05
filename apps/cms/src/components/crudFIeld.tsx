import {
  useAllFormFields,
  useField,
  useFormFields,
} from "payload/components/forms";
import React from "react";

type Props = {
  path: string;
  name: string;
  paths: string[];
  parentPath: string;
};

const crudField: React.FC<Props> = ({ name, path, paths, parentPath }) => {
  const [fields, dispatchFields] = useAllFormFields();
  const { value, setValue } = useField<Props>({ path });

  const onClick = (e: any) => {
    setValue(!value);

    const arrayValue: any = paths.map((eachPath: string) => {
      return eachPath === path ? !value : fields[eachPath].value;
    });

    const isTrue = arrayValue.some((value: boolean) => value === true);

    if (isTrue) {
      dispatchFields({ type: "UPDATE", path: parentPath, value: true });
    } else {
      dispatchFields({ type: "UPDATE", path: parentPath, value: false });
    }
  };

  return (
    <div className={`field-type checkbox${value ? " checkbox--checked" : ""}`}>
      <div
        className={`custom-checkbox${value ? " custom-checkbox--checked" : ""}`}
      >
        <div className="custom-checkbox__input">
          <input
            type="checkbox"
            onClick={onClick}
            // style={{
            //   paddingBottom: "32px",
            //   margin: "0px",
            //   marginTop: name === "projects" ? "37px" : "0px",
            // }}
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

export default crudField;
