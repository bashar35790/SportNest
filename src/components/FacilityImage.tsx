"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK = "/logo.png";

export function FacilityImage({
  src,
  alt,
  ...props
}: React.ComponentProps<typeof Image>) {
  const [current, setCurrent] = useState(src);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      onError={() => {
        if (current !== FALLBACK) setCurrent(FALLBACK);
      }}
    />
  );
}
