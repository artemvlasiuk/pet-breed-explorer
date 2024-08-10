import Image from 'next/image';
import Link from 'next/link';

interface BreedCardProps {
  id: string;
  name: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
}

export function BreedCard({ id, name, image }: BreedCardProps) {
  return (
    <Link
      href={`${id}`}
      className='card bg-slate-100 rounded-lg p-4 hover:bg-slate-200'
    >
      <Image
        src={image.url}
        alt={name}
        width={image.width}
        height={image.height}
        className='rounded-md'
      />
      <div className='font-bold'>{name}</div>
    </Link>
  );
}
