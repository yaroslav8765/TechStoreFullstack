import { useCallback } from 'react';

const STORAGE_KEY = 'viewedProducts';
const MAX_ITEMS = 10;

export default function useRecentlyViewed() {
  const getViewed = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }, []);

  const addViewed = useCallback((product) => {
    const current = getViewed();

    const filtered = current.filter((p) => p.id !== product.id);

    const updated = [product, ...filtered];

    if (updated.length > MAX_ITEMS) {
      updated.length = MAX_ITEMS;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [getViewed]);

  return { getViewed, addViewed };
}
