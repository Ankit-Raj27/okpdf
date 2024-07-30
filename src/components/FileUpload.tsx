"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";

const FileUpload = () => {
  const [pending, setPending] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      fileKey,
      fileName,
    }: {
      fileKey: string;
      fileName: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        fileKey,
        fileName,
      });
      return response.data
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb
        toast.error("Please upload a smaller file than 10MB!");
        return;
      }
      try {
        setPending(true);
        const data = await uploadToS3(file);
        if (!data?.fileKey || !data?.fileName) {
          toast.error("Failed to upload file");
          return;
        }
        mutate(data, {
          onSuccess: (data) => {
            console.log(data);
            toast.success(data.message);
          },
          onError: (err) => {
            console.log(err);
          },
        });
      } catch (error) {
        toast.error("Error creating chat");
      } finally {
        setPending(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer flex bg-gray-50 py-8 justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {pending || isPending ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">Spilling tea to GPT!</p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-gray-600" />
            <p className="mt-2 text-sm text-slate-400"> Drop PDF here!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
