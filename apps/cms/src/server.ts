require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? "../../../.env" : "../../.env",
});

import express from "express";
import payload from "payload";
import path from "path";
import nodemailerSendgrid from "nodemailer-sendgrid";
import cors from "cors";
import { updateStockHistory } from "./collections/StockHistories";
import { getJobsFromManatal } from "./collections/ManatalCareers";
import querystring from "querystring";
import { importDisclosure } from "./collections/Disclosure";
import { importPressRelease } from "./collections/PressRelease";
import multer from "multer";
import s3Client from "./utilities/s3Client";
import fs from "fs";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
  SESClient,
  SendEmailCommand,
  SendRawEmailCommand,
  SendRawEmailCommandInput,
} from "@aws-sdk/client-ses";
import { promises as fsPromises } from "fs";
import downloadFile from "./utilities/downloader";

const sesClient = new SESClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const upload = multer({ dest: "uploads/" });

const app = express();
app.use("/assets", express.static(path.resolve(__dirname, "../assets")));

app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

app.post("/zoho-token", async (req, res) => {
  try {
    const refreshToken = req.header("Authorization");
    const queries = {
      ...req.query,
      client_id: `${process.env.ZOHO_CLIENT_ID}`,
      client_secret: `${process.env.ZOHO_CLIENT_SECRET}`,
      refresh_token: refreshToken,
    };
    const stringified = querystring.stringify(queries);

    const rawData = await fetch(
      `${process.env.ZOHO_REFRESH_TOKEN_URL}?${stringified}`,
      {
        method: "POST",
        cache: "no-store",
      }
    );

    if (!rawData.ok) {
      throw new Error(`Fetch failed with status: ${rawData.status}`);
    }

    const data = await rawData.json();

    res.header("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/zoho-submit-form", async (req, res) => {
  try {
    const accessToken = req.header("Authorization");

    const rawData = await fetch(`${process.env.ZOHO_LEADS_URL}`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });

    const data = await rawData.json();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { file } = req;
  const bucketName = process.env.S3_BUCKET;
  const objectKey = `uploads/${file.originalname}`;

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Key: objectKey,
    Body: fileStream,
  };

  try {
    // Upload the file to S3
    const data = await s3Client.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${bucketName}.s3.${process.env.REGION}.amazonaws.com/${objectKey}`;

    res.json({ url: fileUrl });
  } catch (err) {
    console.error("Error uploading file to S3:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    fs.unlinkSync(file.path);
  }
});

app.post("/api/filinvest-smtp", upload.single("file"), async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { firstName, lastName, contact, email, coverLetter, file } = req.body;

  if (!firstName || !lastName || !contact || !email || !coverLetter || !file) {
    return res
      .status(400)
      .json({ message: "Required parameters cannot be empty." });
  }

  try {
    const downloadedFile = await downloadFile(file);
    const fileName = decodeURIComponent(
      new URL(file).pathname.split("/").pop()
    ).replace(/%/g, "");

    const boundary = "unique_boundary_string";

    const emailContent = `From: bigdata@filinvestland.com\nTo: werecruittalent@filinvestland.com\nSubject: FLI Careers\nMIME-Version: 1.0\nContent-Type: multipart/mixed; boundary="${boundary}"\n\n--${boundary}\nContent-Type: text/plain; charset="UTF-8"\n\n${firstName} ${lastName}\n${email}\n${contact}\n\n${coverLetter}\n\n--${boundary}\nContent-Type: application/octet-stream;\nContent-Disposition: attachment; filename="${fileName}"\nContent-Transfer-Encoding: base64\n\n${downloadedFile}\n--${boundary}--`;

    const emailContentUint8Array = new TextEncoder().encode(emailContent);

    const rawEmailParams = {
      RawMessage: {
        Data: emailContentUint8Array,
      },
    };

    const command = new SendRawEmailCommand(rawEmailParams);
    await sesClient.send(command);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error });
  } finally {
    if (file && file.path) {
      fsPromises
        .unlink(file.path)
        .catch((err) => console.error("Error deleting file:", err));
    }
  }
});

const start = async () => {
  await payload.init({
    secret: process.env.CMS_SECRET,
    mongoURL: process.env.MONGODB_URL,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      setInterval(updateStockHistory, 1 * 60 * 60 * 1000);
      updateStockHistory();
      setInterval(updateStockHistory, 5 * 60 * 60 * 1000);
      getJobsFromManatal();
      // importDisclosure();
      // importPressRelease();
    },
    // ...(sendGridAPIKey
    //   ? {
    //     email: {
    //       transportOptions: nodemailerSendgrid({
    //         apiKey: sendGridAPIKey,
    //       }),
    //       fromName: "Filinvest CMS Forgot Password",
    //       fromAddress: "jepoyyy0225@gmail.com",
    //     },
    //   }
    //   : {}),
  });

  app.listen(9000);
};

start();
