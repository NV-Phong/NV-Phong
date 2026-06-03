import { ImageResponse } from "next/og";

export const alt = "NV-Phong";
export const size = {
   width: 1200,
   height: 630,
};

export const contentType = "image/png";

export default async function Image() {
   return new ImageResponse(
      <img
         src="https://nv-phong.id.vn/graphics/opengraph-image.png"
         width={size.width}
         height={size.height}
      />,
   );
}
