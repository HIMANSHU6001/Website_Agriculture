"use client";
import { useEffect, useRef, useState } from "react";

const UploadWidget = ({ text, onUploadSuccess }) => {
  const widgetRef = useRef(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    const initWidget = () => {
      if (typeof window !== "undefined" && window.cloudinary) {
        widgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              if (onUploadSuccess) {
                onUploadSuccess(result.info);
              }
            }
          }
        );
        setWidgetLoaded(true);
      }
    };

    initWidget();
  }, [cloudName, uploadPreset, onUploadSuccess]);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return (
    <div>
      <button onClick={openWidget}>{text}</button>
    </div>
  );
};

export default UploadWidget;