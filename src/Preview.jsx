import React from "react";

export default function Preview({ image, filesystem }) {
  const [imageSrc, setImageSrc] = React.useState(null);

  React.useEffect(async () => {
    const stills = await filesystem.getDirectoryHandle("stills");

    const handle = await stills.getFileHandle(`${image}.png`, {
      create: false,
    });

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(await handle.getFile());
  }, [image, filesystem]);

  return <img src={imageSrc} style={{ width: "100%", height: "100%" }} />;
}
