import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import os from "os";

export async function downloadFromS3(fileKey: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: "eu-north-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: fileKey,
      };

      const obj = await s3.getObject(params);
      const tmpDir = os.tmpdir();
      const fileName = path.join(tmpDir, `elliott${Date.now().toString()}.pdf`);

      if (obj.Body instanceof require("stream").Readable) {
        const file = fs.createWriteStream(fileName);
        file.on("open", function (fd) {
          // @ts-ignore
          obj.Body?.pipe(file).on("finish", () => {
            return resolve(fileName);
          });
        });
        file.on("error", (error) => {
          reject(error);
        });
      } else {
        reject(new Error("Downloaded object Body is not a Readable stream"));
      }
    } catch (error) {
      console.error("Error in downloadFromS3:", error);
      reject(error);
    }
  });
}