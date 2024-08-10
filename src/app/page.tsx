import { BreedCard } from '@/components/BreedCard';
import { fetchAllBreeds } from '@/utils/api';

export default async function Home() {
  const allBreeds = await fetchAllBreeds();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Pet Breed Explorer</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {allBreeds.map((breed) => (
          <BreedCard
            key={breed.id}
            id={breed.id}
            name={breed.name}
            image={breed.image}
          />
        ))}
      </div>
    </div>
  );
}
