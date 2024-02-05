import { Access } from "payload/config";

export const Permissions = {
  loggedIn: 1 << 0,
  notLoggedIn: 1 << 1,
  siteAccess: 1 << 2,
  admin: 1 << 3,
  editor: 1 << 4,
  subEditor: 1 << 5,
  published: 1 << 6,
  notLoggedInAndPublished: 1 << 7,
};

export const getPermission =
  (permissions: number, siteIDFieldName: string = "site"): Access =>
  ({ req: { user } }) => {
    if (permissions & Permissions.notLoggedInAndPublished && !user) {
      return {
        _status: {
          equals: "published",
        },
      };
    }
    if (permissions & Permissions.published) {
      return {
        _status: {
          equals: "published",
        },
      };
    }
    if (user) {
      if (permissions & Permissions.loggedIn) return true;
      if (permissions & Permissions.admin && user.roles.includes("admin"))
        return true;
      if (permissions & Permissions.editor && user.roles.includes("editor"))
        return true;
      if (
        permissions & Permissions.subEditor &&
        user.roles.includes("subEditor")
      )
        return true;
      if (
        user.roles.includes("editor") &&
        user.sites?.length > 0 &&
        permissions & Permissions.siteAccess
      ) {
        return {
          or: [
            {
              [siteIDFieldName]: {
                in: user.sites.map((item: any) => item?.id),
              },
            },
            {
              [siteIDFieldName]: {
                exists: false,
              },
            },
          ],
        };
      }
    } else {
      if (permissions & Permissions.notLoggedIn) return true;
    }
    return false;
  };
