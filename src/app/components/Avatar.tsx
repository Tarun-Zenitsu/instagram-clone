import React from "react";

const Avatar = ({ src, alt }: { src: string; alt?: string }) => {
  return (
    <div className="size-16 aspect-square overflow-hidden rounded-full">
      <img src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
