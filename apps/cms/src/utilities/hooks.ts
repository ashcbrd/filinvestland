import {
  CollectionBeforeOperationHook,
  CollectionBeforeValidateHook,
  CollectionBeforeChangeHook,
  CollectionBeforeReadHook,
  PayloadRequest,
} from "payload/types";
import { SubLocationCategory } from "payload/generated-types";
import { HookOperationType } from "payload/dist/collections/config/types";
import moment from "moment";
import payload from "payload";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import s3Client from "./s3Client";

export const beforeValidateForDuplicate = (
  collectionName: any
): CollectionBeforeValidateHook => {
  const callback: any = async ({
    data,
    operation,
  }: {
    data: { slug: string };
    operation: Extract<HookOperationType, "create" | "update">;
    req: PayloadRequest;
  }) => {
    if (operation == "create" && data.slug && data.slug.length) {
      const exist = await payload.find({
        collection: collectionName,
        where: {
          slug: {
            equals: data.slug,
          },
        },
      });
      if (exist.docs && exist.docs.length) {
        const dateString = moment().format("YYYY-MM-DD-hh-mm-ss-SSS");
        const exp =
          /-([0-2][0-9]{3})-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])-([0-1][0-9]|2[0-3])-([0-5][0-9])-([0-5][0-9])-([0-9]{3})$/;
        if (exp.test(data.slug)) {
          data.slug = data.slug.replace(exp, `-${dateString}`);
        } else data.slug = `${data.slug}-${dateString}`;
      }
    }
    return data;
  };
  return callback;
};

export const beforeOperationForProjectSubLocation: CollectionBeforeOperationHook =
  async ({ operation, args }) => {
    if (
      operation == "read" &&
      args.req.baseUrl == "/api/sub-location-categories"
    ) {
      if (
        args?.req?.headers?.["referer"]?.indexOf("admin/collections/projects") >
          -1 ||
        args?.req?.headers?.["referer"]?.indexOf(
          "admin/collections/aspire-projects"
        ) > -1 ||
        args?.req?.headers?.["referer"]?.indexOf(
          "admin/collections/futura-projects"
        ) > -1 ||
        args?.req?.headers?.["referer"]?.indexOf(
          "admin/collections/prestige-projects"
        ) > -1
      ) {
        let locationId = args?.req?.query?.where?.and?.[0]?.location?.equals;
        if (!locationId) {
          locationId = args?.req?.query?.where?.and?.[1]?.location?.equals;
          if (locationId) {
            args.req.query.where.and[1] = {};
          }
        }
        if (!locationId) {
          locationId = args?.req?.query?.where?.location?.equals;
          if (locationId) {
            args.req.query.where = {
              and: [0],
            };
          }
        }
        if (locationId) {
          const result = await payload.find({
            collection: "location-categories",
            where: {
              _id: {
                equals: locationId,
              },
            },
          });
          if (result?.docs?.[0]?.subLocation instanceof Array) {
            args.req.query.where.and[0] = {
              _id: {
                in: result.docs[0].subLocation.map((item: any) => item.id),
              },
            };
          } else {
            args.req.query.where.and[0] = {};
          }
        }
      }
    }
    return args;
  };

export const uploadFilesOnS3Bucket: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {
  try {
    const { name, data: file } = req?.files?.file;
    await uploadFileToS3(name, file);

    data.filename = name;
    return data;
  } catch (error) {
    console.log(error);
  }
};

async function uploadFileToS3(key: string, fileBuffer: Buffer): Promise<void> {
  const params: PutObjectCommandInput = {
    Bucket: process.env.PAYLOAD_PUBLIC_S3_BUCKET,
    Key: key,
    Body: fileBuffer,
    ACL: "public-read",
  };

  await s3Client.send(new PutObjectCommand(params));
}

export const beforeReadHook: CollectionBeforeReadHook = async ({
  doc, // full document data
  req, // full express request
  query, // JSON formatted query
}) => {
  return doc;
};
