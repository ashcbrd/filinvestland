import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrHasSiteAccess } from "../access/isAdminOrHasSiteAccess";
import { isLoggedIn } from "../access/isLoggedIn";
import { slugField } from "../fields/slug";
import { beforeValidateForDuplicate } from "../utilities/hooks";
import { Permissions, getPermission } from "../access/Permission";
import { isAdminOrEditor, isVisible } from "../access/isAdminOrEditor";
import payload from "payload";
import { allPressRelease } from "./allData";

function removeExtension(inputString:any, extensionToRemove:any) {
    const extensionIndex = inputString.lastIndexOf(extensionToRemove);
    return extensionIndex !== -1
      ? inputString.slice(0, extensionIndex)
      : inputString;
  }
  

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

export const importPressRelease = async () => {


    const exist = await payload.find({
        collection: "press-release",
        where: {},
        limit: 0,
    });

    const docs = exist.docs.map((item) => item.title);

    const newData = allPressRelease.filter((obj) => !docs.includes(obj.Title))
    console.log(`total documents to upload: ${newData.length}`)
    let completedDisclosureNames = []

    // const uniqueCategories = Array.from(new Set(allData.map(item => item.CATEGORY)));

    // console.log(uniqueCategories)
    try {

        if (newData.length) {
            for (let index = 0; index < newData.length; index++) {
                const obj = newData[index];

                if(completedDisclosureNames.includes(obj.Title)){
                    console.log(`duplicated entry has been found... title:${obj.Title}`)
                    continue
                }

                const alt = obj["Link"].toLocaleLowerCase().endsWith('.pdf') ? decodeURIComponent(new URL(obj["Link"]).pathname.split('/').pop()).replace(/%/g, '') : '';

                let downloadedFile;

                if (alt) {
                    downloadedFile = await downloadFile(newData[index]["Link"]);
                }

                const file = {
                    data: downloadedFile,
                    mimetype: "application/pdf",
                    name: alt ? removeExtension(alt, '.pdf') + ' file.pdf': obj.Title + " file.pdf",
                    size: downloadedFile ? Buffer.byteLength(downloadedFile) : 0
                }        

                const filesToAdd = {
                    alt: alt ? removeExtension(alt,'.pdf') + ' file' : obj.Title + " file",
                    site: '63db1aca51fa9424f93f6591',
                    filesize: downloadedFile ? Buffer.byteLength(downloadedFile) : 0,
                    mimeType: 'application/pdf',
                    filename: alt ? removeExtension(alt,'.pdf') + ' file.pdf' : obj.Title +  ' file.pdf'
                }

                const uploadedFile = await payload.create({
                    collection: 'files',
                    data: filesToAdd,
                    file

                });

                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const monthIndex = monthNames.findIndex(month => obj.Date.includes(month)) + 1;
                console.log(`${obj.Year}-${monthIndex}-${obj.Date.split(' ')[1]}T00:00:00.000Z`)
                const formattedDate = new Date(`${obj.Year}-${monthIndex}-${obj.Date.split(' ')[1]}`);
                const pressReleaseToAdd = {
                    title: obj.Title,
                    publishedDate: formattedDate,
                    file: uploadedFile.id,                 
                };

                const createdPressRelease = await payload.create({
                    collection: 'press-release',
                    data: pressReleaseToAdd as any
                });

                console.log(`uploading files on PressRelease... ${index + 1}/${newData.length}`)
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


export const PressRelease: CollectionConfig = {
    slug: "press-release",
    versions: {
        drafts: true,
    },
    hooks: {
        beforeValidate: [beforeValidateForDuplicate("news")],
    },
    access: {
        // Anyone logged in can create
        create: isAdminOrEditor("create", "news", "63db1aca51fa9424f93f6591"),
        // Only admins or editors with site access can update
        update: isAdminOrEditor("update", "news", "63db1aca51fa9424f93f6591"),
        // Admins or editors with site access can read,
        // otherwise users not logged in can only read published
        read: () => true,
        // Only admins can delete
        delete: isAdminOrEditor("delete", "news", "63db1aca51fa9424f93f6591"),
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
            name: "publishedDate",
            type: "date",
            required: true,
        },

    ],
    admin: {
        useAsTitle: "title",
        group: "Filinvest",
        hidden: ({ user }) => {
            return !isVisible("read", "news", "63db1aca51fa9424f93f6591", user);
        },
    },
};
