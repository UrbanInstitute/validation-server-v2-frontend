import classNames from "classnames";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  label?: string;
  id?: string;
  handleFileUpload?: (file: File) => void;
}

export const FileUpload = ({
  label,
  id,
  handleFileUpload,
}: FileUploadProps) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone();

  useEffect(() => {
    acceptedFiles.forEach((file) => {
      if (handleFileUpload) {
        handleFileUpload(file);
      }
      // const reader = new FileReader()
      // reader.onload = () => {
      //   console.log(reader.result)
      // }
      // reader.readAsDataURL(file)
    });
  }, [acceptedFiles, handleFileUpload]);
  return (
    <div className="flex flex-col gap-y-3">
      {label && (
        <label className="text-[#343A40] text-base leading-5" htmlFor={id}>
          {label}
        </label>
      )}
      <div
        {...getRootProps({
          className: classNames(
            "bg-[#F2F4FC] flex flex-col py-8 text-center text-lg rounded-md cursor-pointer transistion-all duration-200",
            isFocused
              ? "border-darkGrayBorder border-solid border"
              : isDragAccept
              ? "border-success border-4"
              : isDragReject
              ? "border-error border-4"
              : "border-darkGrayBorder border-dashed border"
          ),
        })}
      >
        <input {...getInputProps({ id: id || "file-upload-input" })} />
        <p>Drag and drop a file here or browse</p>
      </div>
    </div>
  );
};
