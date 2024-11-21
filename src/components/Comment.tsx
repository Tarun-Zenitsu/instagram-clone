import React from "react";
import Avatar from "./Avatar";
import { Profile } from "@prisma/client";
import { formatDate } from "date-fns";

const Comment = ({
  text,
  authorProfile,
  createdAt,
}: {
  text: string;
  authorProfile?: Profile;
  createdAt: Date;
}) => {
  return (
    <div className="flex gap-3 ">
      <Avatar
        src={authorProfile?.avatar || ""}
        alt={authorProfile?.name || ""}
      />
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-semibold">{authorProfile?.name}</h3>
        <h4 className="text-sm text-gray-500">@{authorProfile?.username}</h4>
        <p className="mt-4 p-4 bg-gray-100 rounded-md border border-gray-300 shadow-sm">
          {text}
        </p>
        <p className="text-end text-gray-500">
          {formatDate(createdAt, "yyyy-MM-dd")}
        </p>
      </div>
    </div>
  );
};

export default Comment;
