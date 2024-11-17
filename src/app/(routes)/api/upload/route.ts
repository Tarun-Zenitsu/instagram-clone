import { pinata } from "@/config";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    // const info = await pinata.groups.create({
    //   name: "ig-photos",
    //   isPublic: true,
    // });
    // console.log({ info });
    const uploadData = await pinata.upload.file(file, {
      groupId: "019338e8-8203-7547-98b2-c7972f3f5466",
    });
    const fileUrl = `https:${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.cid}`;
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
