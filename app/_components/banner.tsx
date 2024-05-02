import { Text } from "lucide-react";
import Image from "next/image";

interface imageProps {
  url: string;
  alt: string;
}

const Banner = (image: imageProps) => {
  return (
    <Image
      src={image.url}
      alt={image.alt}
      height={0}
      width={0}
      className="h-auto w-full object-contain"
      sizes="100vw"
      quality={100}
    />
  );
};

export default Banner;
