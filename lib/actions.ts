"use server";

import { auth } from "@/auth";
import { parsey } from "@/lib/utils";
import slugify from "slugify";
import { WriteClient } from "@/sanity/lib/Write-client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session)
    return parsey({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await WriteClient.create({ _type: "startup", ...startup });

    return parsey({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parsey({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};