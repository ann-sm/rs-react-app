'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CloseButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const search = searchParams?.get('search') || '';

  const closeModal = () => {
    const params = new URLSearchParams();

    if (search) {
      params.set('search', search);
    }
    if (page) {
      params.set('page', page);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <button
      onClick={closeModal}
      className="absolute top-4 right-6 text-2xl text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:cursor-pointer"
    >
      ×
    </button>
  );
};

export default CloseButton;
