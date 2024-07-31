import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const getPineconeClient = () => {
  return new Pinecone({
    // environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

// 1. Obtain the pdf -> downloads and reads from the file
export async function loadS3IntoPinecone(fileKey:string){
    console.log("Downloading s3 into file system!")
    const fileName = await downloadFromS3(fileKey);
    const loader = new PDFLoader(fileName)
    const pages = await loader.load()
    return pages;
}