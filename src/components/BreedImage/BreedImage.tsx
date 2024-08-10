import Image from 'next/image';

interface BreedImageProps {
  url: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function BreedImage({
  url,
  alt,
  width,
  height,
  className,
}: BreedImageProps) {
  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
