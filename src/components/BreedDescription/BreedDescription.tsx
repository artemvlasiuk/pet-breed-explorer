interface BreedDescriptionProps {
  name: string;
  temperament: string;
  description?: string;
}

export function BreedDescription({
  name,
  temperament,
  description,
}: BreedDescriptionProps) {
  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold mb-2'>{name}</h3>
      <p className='text-gray-700 mb-4'>{temperament}</p>
      {description ? (
        <p className='text-gray-600'>{description}</p>
      ) : (
        <p className='text-gray-600'>There is no description for this breed.</p>
      )}
    </div>
  );
}
