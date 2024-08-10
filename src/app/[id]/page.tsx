'use client';

import React, { useEffect, useState } from 'react';
import { getBreedImages, getBreedInfo } from '@/utils/api';
import { useParams } from 'next/navigation';
import { CatData, DogData } from '@/types';
import { Loader } from '@/components/Loader';
import { BreedImage } from '@/components/BreedImage';
import { BreedDescription } from '@/components/BreedDescription';
import { BreedImageGallery } from '@/components/BreedImageGallery';

type BreedData = DogData | CatData;

export default function BreedData() {
  const { id } = useParams();
  const [breedData, setBreedData] = useState<BreedData | null>(null);
  const [breedImages, setBreedImages] = useState<{ url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const breedId = Array.isArray(id) ? id[0] : id;
  const animalType = isNaN(Number(id)) ? 'cat' : 'dog';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBreedInfo(breedId);
        setBreedData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, [breedId]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getBreedImages(breedId, animalType);
        setBreedImages(images);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchImages();
  }, [breedId, animalType]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!breedData) {
    return <Loader />;
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='bg-white shadow-md rounded-lg overflow-hidden'>
        <BreedImage
          url={breedData.image.url}
          alt={breedData.name}
          width={500}
          height={300}
          className='w-full h-64 object-cover'
        />
        <BreedDescription
          name={breedData.name}
          temperament={breedData.temperament}
          description={
            'description' in breedData ? breedData.description : undefined
          }
        />
      </div>
      <BreedImageGallery images={breedImages} breedName={breedData.name} />
    </div>
  );
}
