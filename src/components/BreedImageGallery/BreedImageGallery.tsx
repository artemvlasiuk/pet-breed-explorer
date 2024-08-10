import Image from 'next/image';

interface BreedImageGalleryProps {
  images: { url: string }[];
  breedName: string;
}

export function BreedImageGallery({
  images,
  breedName,
}: BreedImageGalleryProps) {
  return (
    <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {images.map((image, index) => (
        <div
          key={index}
          className='bg-white shadow-md rounded-lg overflow-hidden'
        >
          <Image
            src={image.url}
            alt={`${breedName} ${index}`}
            width={400}
            height={200}
            className='w-full h-48 object-cover'
          />
        </div>
      ))}
    </div>
  );
}
