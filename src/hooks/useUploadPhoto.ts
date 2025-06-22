import { useState } from "react";

const useUploadPhoto = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const uploadPhotoProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoto = e.target.files?.[0];

    if (newPhoto) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 400;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const dataUrl = canvas.toDataURL("image/jpeg", 0.5);
          setPhoto(dataUrl);
        };
      };
      reader.readAsDataURL(newPhoto);
    }
  };

  return { photo, uploadPhotoProfile };
};

export default useUploadPhoto;
