import { CollectionConfig } from "payload/types";
import { Permissions, getPermission } from "../access/Permission";
import { isVisible } from "../access/isAdminOrEditor";
import payload from "payload";
import { v4 as uuidv4 } from 'uuid';
import { allData } from "./allData";

async function downloadFile(url: any) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(new Uint8Array(arrayBuffer));

        // Now, the file contents are in the `buffer` variable as a Node.js Buffer
        return buffer;
    } catch (error) {
        console.error("Error downloading the file:", error);
        return null;
    }
}

const data = [
    {
        "STATUS": "",
        "URL": "https://filinvestland.com/disclosures?filing_type=All&year=178&page=0",
        "DATE": "10/20/2023",
        "NAME": "Amended GIS 2023 of October 19, 2023",
        "CATEGORY": "Other Disclosures",
        "LINK": "Amended GIS 2023 as of October 19, 2023",
        "LINK-HREF": ""
    },
    {
        "STATUS": "",
        "URL": "https://filinvestland.com/disclosures?filing_type=All&year=178&page=1",
        "DATE": "3/31/2023",
        "NAME": "Quarterly Rept (17Q) as of March 31, 2023",
        "CATEGORY": "17Q Quarterly Reports",
        "LINK": "Quarterly Report (17Q) as of March 31, 2023",
        "LINK-HREF": "https://filinvestland.com/sites/default/files/pdf_files/FLI_QUARTERLY%20REPORT%20%2817Q%29%20AS%20OF%20MARCH%2031%2C%202023.pdf"
    },
    {

        "STATUS": "",
        "URL": "https://filinvestland.com/disclosures?filing_type=All&year=178&page=1",
        "DATE": "3/31/2023",
        "NAME": "Quarterly Rept (17Q) as of March 31, 2023",
        "CATEGORY": "17Q Quarterly Reports",
        "LINK": "Quarterly Report (17Q) as of March 31, 2023",
        "LINK-HREF": "https://filinvestland.com/sites/default/files/pdf_files/FLI_QUARTERLY%20REPORT%20%2817Q%29%20AS%20OF%20MARCH%2031%2C%202023.pdf"
    },
]

function removeExtension(inputString: any, extensionToRemove: any) {
    const extensionIndex = inputString.lastIndexOf(extensionToRemove);
    return extensionIndex !== -1
        ? inputString.slice(0, extensionIndex)
        : inputString;
}


export const importDisclosure = async () => {


    const exist = await payload.find({
        collection: "disclosure",
        where: {},
        limit: 0,
    });

    const disclosureCategories = await payload.find({
        collection: "disclosure-categories",
        where: {},
        limit: 0,
    })


    const docs = exist.docs.map((item) => item.title);
    const newData = allData.filter((obj) => !docs.includes(obj.NAME))
    console.log(`total documents to upload: ${newData.length}`)

    // const uniqueCategories = Array.from(new Set(allData.map(item => item.CATEGORY)));

    // console.log(uniqueCategories)
    let completedDisclosureNames = [];
    try {

        if (newData.length) {
            for (let index = 0; index < newData.length; index++) {

                const obj = newData[index];

                if (completedDisclosureNames.includes(obj.NAME)) {
                    console.log(`duplicated entry has been found... title:${obj.NAME}`)
                    continue
                }


                const alt = obj["LINK-HREF"].toLocaleLowerCase().endsWith('.pdf') ? decodeURIComponent(new URL(obj["LINK-HREF"]).pathname.split('/').pop()).replace(/%/g, '') : '';

                let downloadedFile;


                if (alt) {
                    downloadedFile = await downloadFile(newData[index]["LINK-HREF"]);
                }

                const file = {
                    data: downloadedFile,
                    mimetype: "application/pdf",
                    name: alt ? removeExtension(alt, '.pdf') + ' file.pdf' : obj.NAME + " file.pdf",
                    size: downloadedFile ? Buffer.byteLength(downloadedFile) : 0
                }

                const assignedCategory = disclosureCategories.docs.filter((item) => {
                    return obj.CATEGORY === item.title
                })

                const filesToAdd = {
                    alt: alt ? removeExtension(alt, '.pdf') + ' file' : obj.NAME + " file",
                    site: '63db1aca51fa9424f93f6591',
                    filesize: downloadedFile ? Buffer.byteLength(downloadedFile) : 0,
                    mimeType: 'application/pdf',
                    filename: alt ? removeExtension(alt, '.pdf') + ' file.pdf' : obj.NAME + ' file.pdf'
                }

                const uploadedFile = await payload.create({
                    collection: 'files',
                    data: filesToAdd,
                    file

                });

                const discosureToAdd = {
                    title: obj.NAME,
                    publishedDate: new Date(obj.DATE).toISOString(),
                    file: uploadedFile.id,
                    category: assignedCategory.length ? assignedCategory[0].id : '',
                };

                const createdDisclosure = await payload.create({
                    collection: 'disclosure',
                    data: discosureToAdd
                });

                console.log(`uploading files on disclosures... ${index + 1}/${newData.length}`)
                completedDisclosureNames.push(obj.NAME)
            }
        }
        else {
            console.log('file are updated')
        }


        // const items: any = data.map((obj, index) => {

        //     return {
        //         title: obj.NAME,
        //         publishedDate: new Date(obj.DATE).toISOString(),
        //         file: {
        //             id: taaaa.id,
        //             alt: decodeURIComponent(new URL(obj["LINK-HREF"]).pathname.split('/').pop()).replace(/%/g, ''),
        //             site: {
        //                 id: "63db1aca51fa9424f93f6591",
        //                 title: "Filinvest",
        //                 createdAt: "2023-02-02T02:07:06.172Z",
        //                 updatedAt: "2023-08-01T10:20:21.937Z"
        //             },
        //             filename: decodeURIComponent(new URL(obj["LINK-HREF"]).pathname.split('/').pop()).replace(/%/g, ''),
        //             mimeType: "application/pdf",
        //             filesize: 123456,
        //             createdAt: "2023-10-26T03:01:53.040Z",
        //             updatedAt: "2023-10-26T03:01:53.040Z",
        //             url: `https://filinvest-bucket-stg.s3.amazonaws.com/${decodeURIComponent(new URL(obj["LINK-HREF"]).pathname.split('/').pop()).replace(/%/g, '')}`,
        //         },

        //     }
        // })




        // console.log(`success ${jobs.length} / ${i + 1}`);
    } catch (error) {
        console.log(error)
        // console.log(`error ${i + 1}`, job, error);
    }

};

export const Disclosure: CollectionConfig = {
    slug: "disclosure",
    versions: {
        drafts: true,
    },

    access: {
        create: getPermission(Permissions.admin | Permissions.editor),
        update: getPermission(Permissions.admin | Permissions.editor),
        read: () => true,
        delete: getPermission(Permissions.admin | Permissions.editor),
    },
    fields: [
        {
            name: "title",
            type: 'text'
        },
        {
            name: "file", // required
            type: "upload", // required
            relationTo: "files", // required
            access: {
                read: () => true,
            }
        },
        {
            name: "category",
            type: "relationship",
            relationTo: 'disclosure-categories'
        },
        {
            name: "publishedDate",
            type: "date",
            required: false,
        },

    ],
    admin: {
        useAsTitle: "title",
        group: "Filinvest",
        hidden: ({ user }) => {
            return !isVisible("read", "pages", "63db1aca51fa9424f93f6591", user);
        },
    },
};
