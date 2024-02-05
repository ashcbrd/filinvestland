import { CollectionConfig } from "payload/types";
import { GlobalConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import {
    beforeValidateForDuplicate,
    beforeReadHook,
} from "../../utilities/hooks";
import { getPermission, Permissions } from "../../access/Permission";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";
import { isVisible } from "../../access/isAdminOrEditor";

export const PrestigeFeaturedVirtualTours: GlobalConfig = {
    slug: "prestige-featured-virtual-tours",

    admin: {
        group: "Prestige",
        hidden: ({ user }) => {
            return !isVisible("read", "projects", "63970ca74f38bc4992f1295d", user);
        },
    },
    label: "Featured Virtual Tours",
    versions: {
        drafts: true,
    },
    hooks: {
        beforeRead: [beforeReadHook],
    },
    access: {
        // Only admins or editors with site access can update
        update: isAdminOrEditor("update", "projects", "63970ca74f38bc4992f1295d"),
        // Admins or editors with site access can read,
        // otherwise users not logged in can only read published
        read: () => true,
        // Only admins can delete
    },
    fields: [
        {
            name: "FeaturedVirtualTours",
            type: "array",
            label: "Featured Virtual Tours",
            admin: {
                description: "The list will only display projects that have a valid virtual tour embed URL"
            },
            maxRows: 100,
            minRows: 1,
            fields: [
                {
                    name: "featuredVirtualTour",
                    label: "FeaturedVirtualTour",
                    type: "relationship",
                    required: true,
                    relationTo: "prestige-projects",
                    filterOptions() {
                        return {
                            isVirtualTour: {
                                equals: "true",
                            },
                        };
                    },
                },
            ],
        },
    ],
};
