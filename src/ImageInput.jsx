import React from "react";

export default function ImageInput({ data, onChange }) {
  const [image, setImage] = React.useState(data?.image);

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result);
            onChange(reader.result);
          };
          reader.readAsDataURL(file);
        }}
      />
      {image && <img src={image} style={{ maxWidth: "100%" }} />}
    </div>
  );
}
