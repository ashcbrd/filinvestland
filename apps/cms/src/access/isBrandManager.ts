import { Access, FieldAccess } from "payload/types";
import { User } from "../payload-types";

export const isEditor: Access<any, User> = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes("admin"));
};

export const isEditorFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({
  req: { user },
}) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes("editor"));
};
export const readOnly: FieldAccess<any, User> = () => {
  // Return true or false based on if the user has an admin role
  return false;
};
