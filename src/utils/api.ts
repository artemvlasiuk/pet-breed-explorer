import dotenv from 'dotenv';
dotenv.config();

const DOG_API_URL = 'https://api.thedogapi.com/v1/breeds';
const CAT_API_URL = 'https://api.thecatapi.com/v1/breeds';

export async function fetchDogBreeds() {
  const apiKey = process.env.NEXT_PUBLIC_DOG_API_KEY;
  if (!apiKey) {
    throw new Error('Dog API key is not defined');
  }

  const response = await fetch(DOG_API_URL, {
    headers: {
      'x-api-key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch dog breeds');
  }

  return response.json();
}

export async function fetchCatBreeds() {
  const apiKey = process.env.NEXT_PUBLIC_CAT_API_KEY;
  if (!apiKey) {
    throw new Error('Cat API key is not defined');
  }

  const response = await fetch(CAT_API_URL, {
    headers: {
      'x-api-key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cat breeds');
  }

  return response.json();
}

export async function fetchAllBreeds() {
  const catBreeds = await fetchCatBreeds();
  const dogBreeds = await fetchDogBreeds();

  return [...catBreeds, ...dogBreeds]
    .filter((breed) => breed.image)
    .sort((first, second) => {
      return first.name.localeCompare(second.name);
    });
}

export async function getBreedInfo(id: string) {
  const allBreeds = await fetchAllBreeds();

  const breed = allBreeds.find((breed) => breed.id === id);

  if (!breed) {
    return allBreeds.find((breed) => breed.id === parseInt(id, 10));
  }

  return breed;
}

export async function getBreedImages(
  breedId: string,
  animalType: 'cat' | 'dog'
) {
  const API_URL =
    animalType === 'cat'
      ? 'https://api.thecatapi.com/v1/images/search'
      : 'https://api.thedogapi.com/v1/images/search';

  const apiKey =
    animalType === 'cat'
      ? process.env.NEXT_PUBLIC_CAT_API_KEY
      : process.env.NEXT_PUBLIC_DOG_API_KEY;

  if (!apiKey) {
    throw new Error(
      `${
        animalType.charAt(0).toUpperCase() + animalType.slice(1)
      } API key is not defined`
    );
  }

  const response = await fetch(`${API_URL}?limit=5&breed_ids=${breedId}`, {
    headers: {
      'x-api-key': apiKey,
    } as HeadersInit,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch images for breed with id ${breedId}`);
  }

  const data = await response.json();
  return data;
}
