import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdminOrSelf";
import CustomTextField from "../components/textField";
import customField from "../components/customField";
import crudField from "../components/crudFIeld";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    // This property controls how deeply "populated"
    // relationship docs are that are stored in the req.user.
    // It should be kept to as low as possible, which
    // keeps performance fast.
  },
  admin: {
    useAsTitle: "email",
    group: "Admin",
    disableDuplicate: true,
    hidden: ({ user }: any) => {
      return !Boolean(user?.roles?.includes("admin"));
    },
  },
  access: {
    // Only admins can create users
    create: isAdmin,
    // Admins can read all, but any other logged in user can only read themselves
    read: () => true,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrSelf,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          type: "text",
          required: true,
        },
        {
          name: "lastName",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "roles",
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: "select",
      hasMany: true,
      required: true,
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: "Administrator",
          value: "admin",
        },
        {
          label: "Brand Manager",
          value: "editor",
        },
        {
          label: "Project Manager",
          value: "subEditor",
        },
      ],
    },
    {
      name: "sites",
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: "relationship",
      relationTo: "sites",
      hasMany: true,
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        condition: ({ roles }) => roles && !roles.includes("admin"),
        description:
          "This field sets which sites that this user has access to.",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          name: "Filinvest",
          fields: [
            {
              type: "row",

              fields: [
                {
                  name: "filinvestPermissions",
                  type: "group",
                  label: " ",
                  saveToJWT: true,
                  access: {
                    create: isAdminFieldLevel,
                    update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "40%",
                  },
                  fields: [
                    {
                      name: "news",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "projects",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "pages",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },

                    {
                      name: "stockHistories",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "manatalCareers",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "propertySearch",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "navigation",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "footer",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                  ],
                },
                {
                  name: "readFilinvest",
                  label: "read",
                  type: "group",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                    style: { fontSize: "10px !important" },
                  },
                  fields: [
                    {
                      name: "readFilinvestNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63db1aca51fa9424f93f6591",
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestNews",
                              paths: [
                                "Filinvest.updateFilinvest.updateFilinvestNews",
                                "Filinvest.createFilinvest.createFilinvestNews",
                                "Filinvest.deleteFilinvest.deleteFilinvestNews",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFilinvestProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63db1aca51fa9424f93f6591",
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestProjects",
                              paths: [
                                "Filinvest.updateFilinvest.updateFilinvestProjects",
                                "Filinvest.createFilinvest.createFilinvestProjects",
                                "Filinvest.deleteFilinvest.deleteFilinvestProjects",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFilinvestPages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63db1aca51fa9424f93f6591",
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestPages",
                              paths: [
                                "Filinvest.updateFilinvest.updateFilinvestPages",
                                "Filinvest.createFilinvest.createFilinvestPages",
                                "Filinvest.deleteFilinvest.deleteFilinvestPages",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFilinvestStockHistories",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63db1aca51fa9424f93f6591",
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestStockHistories",
                              paths: [
                                "Filinvest.updateFilinvest.updateFilinvestStockHistories",
                                "Filinvest.createFilinvest.createFilinvestStockHistories",
                                "Filinvest.deleteFilinvest.deleteFilinvestStockHistories",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFilinvestManatalCareers",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63db1aca51fa9424f93f6591",
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestManatalCareers",
                              paths: [
                                "Filinvest.updateFilinvest.updateFilinvestManatalCareers",
                                "Filinvest.createFilinvest.createFilinvestManatalCareers",
                                "Filinvest.deleteFilinvest.deleteFilinvestManatalCareers",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFilinvestPropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63db1aca51fa9424f93f6591",
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestPropertySearch",
                              paths: [
                                "Filinvest.updateFilinvest.updateFilinvestPropertySearch",
                                "Filinvest.createFilinvest.createFilinvestPropertySearch",
                                "Filinvest.deleteFilinvest.deleteFilinvestPropertySearch",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFilinvestNavigation",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63db1aca51fa9424f93f6591",
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestNavigation",
                              paths: [
                                "Filinvest.updateFilinvest.updateFilinvestNavigation",
                                "Filinvest.createFilinvest.createFilinvestNavigation",
                                "Filinvest.deleteFilinvest.deleteFilinvestNavigation",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFilinvestFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63db1aca51fa9424f93f6591",
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestFooter",
                              paths: [
                                "Filinvest.updateFilinvest.updateFilinvestFooter",
                                "Filinvest.createFilinvest.createFilinvestFooter",
                                "Filinvest.deleteFilinvest.deleteFilinvestFooter",
                              ],
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "updateFilinvest",
                  type: "group",
                  label: "update",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "updateFilinvestNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestNews",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateFilinvestProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestProjects",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateFilinvestPages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestPages",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },

                    {
                      name: "updateFilinvestStockHistories",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestStockHistories",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateFilinvestManatalCareers",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestManatalCareers",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateFilinvestPropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestPropertySearch",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateFilinvestNavigation",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestNavigation",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateFilinvestFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestFooter",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "createFilinvest",
                  type: "group",
                  label: "create",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "createFilinvestNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestNews",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "createFilinvestProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestProjects",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "createFilinvestPages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestPages",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },

                    {
                      name: "createFilinvestStockHistories",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestStockHistories",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "createFilinvestManatalCareers",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestManatalCareers",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "createFilinvestPropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestPropertySearch",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "createFilinvestNavigation",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestNavigation",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "createFilinvestFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestFooter",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "deleteFilinvest",
                  type: "group",
                  label: "delete",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "deleteFilinvestNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestNews",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteFilinvestProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestProjects",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteFilinvestPages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestPages",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },

                    {
                      name: "deleteFilinvestStockHistories",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestStockHistories",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteFilinvestManatalCareers",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestManatalCareers",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteFilinvestPropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestPropertySearch",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteFilinvestNavigation",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestNavigation",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteFilinvestFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Filinvest.readFilinvest.readFilinvestFooter",
                              site: "63db1aca51fa9424f93f6591",
                            }),
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
          admin: {
            style: {
              marginTop: "100px",
            },
          },
          access: {
            create: isAdminFieldLevel,
            update: isAdminFieldLevel,
          },
        },
        {
          name: "Aspire",

          fields: [
            {
              type: "row",

              fields: [
                {
                  name: "aspirePermissions",
                  type: "group",
                  label: " ",
                  saveToJWT: true,
                  access: {
                    create: isAdminFieldLevel,
                    update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "40%",
                  },
                  fields: [
                    {
                      name: "news",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "projects",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },

                    {
                      name: "pages",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "propertySearch",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "menu",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "footer",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                  ],
                },
                {
                  name: "readAspire",
                  label: "read",
                  type: "group",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                    style: { fontSize: "10px !important" },
                  },
                  fields: [
                    {
                      name: "readAspireNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              paths: [
                                "Aspire.updateAspire.updateAspireNews",
                                "Aspire.createAspire.createAspireNews",
                                "Aspire.deleteAspire.deleteAspireNews",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readAspireProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              paths: [
                                "Aspire.updateAspire.updateAspireProjects",
                                "Aspire.createAspire.createAspireProjects",
                                "Aspire.deleteAspire.deleteAspireProjects",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readAspirePages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              paths: [
                                "Aspire.updateAspire.updateAspirePages",
                                "Aspire.createAspire.createAspirePages",
                                "Aspire.deleteAspire.deleteAspirePages",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readAspirePropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              paths: [
                                "Aspire.updateAspire.updateAspirePropertySearch",
                                "Aspire.createAspire.createAspirePropertySearch",
                                "Aspire.deleteAspire.deleteAspirePropertySearch",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readAspireMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              paths: [
                                "Aspire.updateAspire.updateAspireMenu",
                                "Aspire.createAspire.createAspireMenu",
                                "Aspire.deleteAspire.deleteAspireMenu",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readAspireFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              paths: [
                                "Aspire.updateAspire.updateAspireFooter",
                                "Aspire.createAspire.createAspireFooter",
                                "Aspire.deleteAspire.deleteAspireFooter",
                              ],
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "updateAspire",
                  type: "group",
                  label: "update",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "updateAspireNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireNews",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateAspireProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireProjects",
                            }),
                        },
                      },
                    },

                    {
                      name: "updateAspirePages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspirePages",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateAspirePropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath:
                                "Aspire.readAspire.readAspirePropertySearch",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateAspireMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireMenu",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateAspireFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireFooter",
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "createAspire",
                  type: "group",
                  label: "create",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "createAspireNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireNews",
                            }),
                        },
                      },
                    },
                    {
                      name: "createAspireProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireProjects",
                            }),
                        },
                      },
                    },

                    {
                      name: "createAspirePages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspirePages",
                            }),
                        },
                      },
                    },
                    {
                      name: "createAspirePropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath:
                                "Aspire.readAspire.readAspirePropertySearch",
                            }),
                        },
                      },
                    },
                    {
                      name: "createAspireMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireMenu",
                            }),
                        },
                      },
                    },
                    {
                      name: "createAspireFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireFooter",
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "deleteAspire",
                  type: "group",
                  label: "delete",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "deleteAspireNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireNews",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteAspireProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireProjects",
                            }),
                        },
                      },
                    },

                    {
                      name: "deleteAspirePages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspirePages",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteAspirePropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath:
                                "Aspire.readAspire.readAspirePropertySearch",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteAspireMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireMenu",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteAspireFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63cb9d9a313bab61401c9b2a",
                              readPath: "Aspire.readAspire.readAspireFooter",
                            }),
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
          admin: {
            style: {
              marginTop: "100px",
            },
          },
          access: {
            create: isAdminFieldLevel,
            update: isAdminFieldLevel,
          },
        },
        {
          name: "Prestige",

          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "prestigePermissions",
                  type: "group",
                  label: " ",
                  saveToJWT: true,
                  access: {
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "40%",
                  },
                  fields: [
                    {
                      name: "news",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "projects",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },

                    {
                      name: "pages",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "propertySearch",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "menu",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "footer",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                  ],
                },
                {
                  name: "readPrestige",
                  label: "read",
                  type: "group",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "readPrestigeNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63970ca74f38bc4992f1295d",
                              paths: [
                                "Prestige.updatePrestige.updatePrestigeNews",
                                "Prestige.createPrestige.createPrestigeNews",
                                "Prestige.deletePrestige.deletePrestigeNews",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readPrestigeProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63970ca74f38bc4992f1295d",
                              paths: [
                                "Prestige.updatePrestige.updatePrestigeProjects",
                                "Prestige.createPrestige.createPrestigeProjects",
                                "Prestige.deletePrestige.deletePrestigeProjects",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readPrestigePages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63970ca74f38bc4992f1295d",
                              paths: [
                                "Prestige.updatePrestige.updatePrestigePages",
                                "Prestige.createPrestige.createPrestigePages",
                                "Prestige.deletePrestige.deletePrestigePages",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readPrestigePropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63970ca74f38bc4992f1295d",
                              paths: [
                                "Prestige.updatePrestige.updatePrestigePropertySearch",
                                "Prestige.createPrestige.createPrestigePropertySearch",
                                "Prestige.deletePrestige.deletePrestigePropertySearch",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readPrestigeMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63970ca74f38bc4992f1295d",
                              paths: [
                                "Prestige.updatePrestige.updatePrestigeMenu",
                                "Prestige.createPrestige.createPrestigeMenu",
                                "Prestige.deletePrestige.deletePrestigeMenu",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readPrestigeFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "63970ca74f38bc4992f1295d",
                              paths: [
                                "Prestige.updatePrestige.updatePrestigeFooter",
                                "Prestige.createPrestige.createPrestigeFooter",
                                "Prestige.deletePrestige.deletePrestigeFooter",
                              ],
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "updatePrestige",
                  type: "group",
                  label: "update",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "updatePrestigeNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeNews",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "updatePrestigeProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeProjects",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },

                    {
                      name: "updatePrestigePages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigePages",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "updatePrestigePropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigePropertySearch",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "updatePrestigeMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeMenu",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "updatePrestigeFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeFooter",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "createPrestige",
                  type: "group",
                  label: "create",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "createPrestigeNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeNews",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "createPrestigeProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeProjects",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },

                    {
                      name: "createPrestigePages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigePages",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "createPrestigePropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigePropertySearch",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "createPrestigeMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeMenu",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "createPrestigeFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeFooter",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "deletePrestige",
                  type: "group",
                  label: "delete",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "deletePrestigeNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeNews",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "deletePrestigeProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeProjects",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },

                    {
                      name: "deletePrestigePages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigePages",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "deletePrestigePropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigePropertySearch",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "deletePrestigeMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeMenu",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                    {
                      name: "deletePrestigeFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              readPath:
                                "Prestige.readPrestige.readPrestigeFooter",
                              site: "63970ca74f38bc4992f1295d",
                            }),
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
          access: {
            create: isAdminFieldLevel,
            update: isAdminFieldLevel,
          },
        },
        {
          name: "Futura",

          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "futuraPermissions",
                  type: "group",
                  label: " ",
                  saveToJWT: true,
                  access: {
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "40%",
                  },
                  fields: [
                    {
                      name: "news",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "projects",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },

                    {
                      name: "pages",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "propertySearch",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "menu",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                    {
                      name: "footer",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: CustomTextField,
                        },
                      },
                    },
                  ],
                },
                {
                  name: "readFutura",
                  type: "group",
                  label: "read",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                    style: { fontSize: "10px !important" },
                  },
                  fields: [
                    {
                      name: "readFuturaNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              paths: [
                                "Futura.updateFutura.updateFuturaNews",
                                "Futura.createFutura.createFuturaNews",
                                "Futura.deleteFutura.deleteFuturaNews",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFuturaProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              paths: [
                                "Futura.updateFutura.updateFuturaProjects",
                                "Futura.createFutura.createFuturaProjects",
                                "Futura.deleteFutura.deleteFuturaProjects",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFuturaPages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              paths: [
                                "Futura.updateFutura.updateFuturaPages",
                                "Futura.createFutura.createFuturaPages",
                                "Futura.deleteFutura.deleteFuturaPages",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFuturaPropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              paths: [
                                "Futura.updateFutura.updateFuturaPropertySearch",
                                "Futura.createFutura.createFuturaPropertySearch",
                                "Futura.deleteFutura.deleteFuturaPropertySearch",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFuturaMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              paths: [
                                "Futura.updateFutura.updateFuturaMenu",
                                "Futura.createFutura.createFuturaMenu",
                                "Futura.deleteFutura.deleteFuturaMenu",
                              ],
                            }),
                        },
                      },
                    },
                    {
                      name: "readFuturaFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              paths: [
                                "Futura.updateFutura.updateFuturaFooter",
                                "Futura.createFutura.createFuturaFooter",
                                "Futura.deleteFutura.deleteFuturaFooter",
                              ],
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "updateFutura",
                  type: "group",
                  label: "update",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "updateFuturaNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath: "Futura.updateFutura.updateFuturaNews",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateFuturaProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath:
                                "Futura.updateFutura.updateFuturaProjects",
                            }),
                        },
                      },
                    },

                    {
                      name: "updateFuturaPages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath: "Futura.updateFutura.updateFuturaPages",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateFuturaPropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath:
                                "Futura.updateFutura.updateFuturaPropertySearch",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateFuturaMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath: "Futura.updateFutura.updateFuturaMenu",
                            }),
                        },
                      },
                    },
                    {
                      name: "updateFuturaFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath:
                                "Futura.updateFutura.updateFuturaFooter",
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "createFutura",
                  type: "group",
                  label: "create",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "createFuturaNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath: "Futura.updateFutura.updateFuturaNews",
                            }),
                        },
                      },
                    },
                    {
                      name: "createFuturaProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath:
                                "Futura.updateFutura.updateFuturaProjects",
                            }),
                        },
                      },
                    },

                    {
                      name: "createFuturaPages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath: "Futura.updateFutura.updateFuturaPages",
                            }),
                        },
                      },
                    },
                    {
                      name: "createFuturaPropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath:
                                "Futura.updateFutura.updateFuturaPropertySearch",
                            }),
                        },
                      },
                    },
                    {
                      name: "createFuturaMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath: "Futura.updateFutura.updateFuturaMenu",
                            }),
                        },
                      },
                    },
                    {
                      name: "createFuturaFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath:
                                "Futura.updateFutura.updateFuturaFooter",
                            }),
                        },
                      },
                    },
                  ],
                },
                {
                  name: "deleteFutura",
                  type: "group",
                  label: "delete",
                  access: {
                    // Only admins can create or update a value for this field
                    // create: isAdminFieldLevel,
                    // update: isAdminFieldLevel,
                  },
                  admin: {
                    width: "15%",
                  },
                  fields: [
                    {
                      name: "deleteFuturaNews",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath: "Futura.updateFutura.updateFuturaNews",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteFuturaProjects",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath:
                                "Futura.updateFutura.updateFuturaProjects",
                            }),
                        },
                      },
                    },

                    {
                      name: "deleteFuturaPages",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath: "Futura.updateFutura.updateFuturaPages",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteFuturaPropertySearch",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath:
                                "Futura.updateFutura.updateFuturaPropertySearch",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteFuturaMenu",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath: "Futura.updateFutura.updateFuturaMenu",
                            }),
                        },
                      },
                    },
                    {
                      name: "deleteFuturaFooter",
                      label: " ",
                      type: "checkbox",
                      defaultValue: true,
                      admin: {
                        components: {
                          Field: (props) =>
                            customField({
                              ...props,
                              site: "6396fc1d4f38bc4992f127a9",
                              readPath:
                                "Futura.updateFutura.updateFuturaFooter",
                            }),
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
          access: {
            create: isAdminFieldLevel,
            update: isAdminFieldLevel,
          },
        },
      ],
    },
  ],
};
