import React from "react";

const images = [
  "https://picsum.photos/id/30/1024/768",
  "https://picsum.photos/id/31/768/1024",
  "https://picsum.photos/id/33/1024/768",
  "https://picsum.photos/id/34/768/1024",
  "https://picsum.photos/id/35/1024/768",
  "https://picsum.photos/id/36/768/1024",
];

const PostGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((src) => (
        <img src={src} alt="" key={src} />
      ))}
    </div>
  );
};

export default PostGrid;
