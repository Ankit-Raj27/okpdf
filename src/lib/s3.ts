import AWS from "aws-sdk";

export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      region: "eu-north-1", // Set the region here
    });

    const s3 = new AWS.S3();

    const fileKey = "uploads/" + Date.now().toString() + file.name.replace(" ", " ");
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: fileKey,
      Body: file,
    };

    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        if (evt.total) {
          console.log("Uploading to s3...", Math.round((evt.loaded * 100) / evt.total) + "%");
        }
      })
      .promise();

    await upload;

    console.log("Successfully uploaded to S3", fileKey);

    return {
      fileKey,
      fileName: file.name,
    };
  } catch (error) {
    console.error("Error uploading file to S3", error);
    throw new Error("Error uploading file to S3");
  }
}

export function getS3Url(fileKey: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${fileKey}`;
  return url;
}