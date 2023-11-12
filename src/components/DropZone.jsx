import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpFromLine, X, XCircle } from "lucide-react";
import { Button } from "./ui/button";

const Dropzone = ({ className, editor }) => {
  const [file, setFile] = useState("");

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFile(
        acceptedFiles.map((item) =>
          Object.assign(item, { preview: URL.createObjectURL(item) })
        )
      );
    }
    // if (rejectedFiles?.length) {
    //   setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    // }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
    multiple: false,
  });

  //   useEffect(() => {
  //     return () => file.forEach((file) => URL.revokeObjectURL(file.preview));
  //   }, [file]);

  const removeFile = (name) => {
    setFile((item) => item.filter((obj) => obj.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function () {
      editor.chain().focus().deleteRange({ from: 1, to: 12 }).setImage({ src: reader.result }).run();
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        {file.length > 0 ? (
          <div className="relative">
            <Image
              src={file[0].preview}
              alt={file[0].name}
              width={40}
              height={40}
              onLoad={() => {
                URL.revokeObjectURL(file[0].preview);
              }}
              className="h-full w-full object-contain rounded-md"
            />
            <button
              type="button"
              className="w-7 h-7 rounded-full flex justify-center items-center absolute -top-12 -right-12 bg-red-500 transition-color hover:scale-125 delay-150 duration-100"
              onClick={() => removeFile(file[0].name)}
            >
              <X className="w-5 h-5 text-white rounded-full bg-red-500 fill-red-500 hover:fill-red-600 transition-colors" />
            </button>
          </div>
        ) : (
          <>
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-4">
              <ArrowUpFromLine className="w-5 h-5 fill-current" />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag & drop files here, or click to select files</p>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex w-100 justify-end pt-4">
        <Button type="submit" variant="secondary">
          Upload
        </Button>
      </div>
    </form>
  );
};

export default Dropzone;
