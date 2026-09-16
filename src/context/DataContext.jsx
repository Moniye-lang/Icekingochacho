import { createContext, useContext, useState } from 'react';
import { upcomingShows as defaultShows } from '../data/tour.js';
import { merchItems as defaultMerch } from '../data/merch.js';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  TOUR_AVAILABLE: 'iceking_tour_available',
  SHOWS: 'iceking_shows_data',
  MERCH_AVAILABLE: 'iceking_merch_available',
  MERCH_ITEMS: 'iceking_merch_data',
};

export function DataProvider({ children }) {
  // Tour availability (default: false = "Not Available Right Now")
  const [tourAvailable, setTourAvailableState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TOUR_AVAILABLE);
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Tour shows
  const [shows, setShowsState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SHOWS);
    return saved !== null ? JSON.parse(saved) : defaultShows;
  });

  // Merch availability (default: false = "Not Available Right Now")
  const [merchAvailable, setMerchAvailableState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MERCH_AVAILABLE);
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Merch items
  const [merchItems, setMerchItemsState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MERCH_ITEMS);
    return saved !== null ? JSON.parse(saved) : defaultMerch;
  });

  // Helper sync functions
  const setTourAvailable = (val) => {
    setTourAvailableState(val);
    localStorage.setItem(STORAGE_KEYS.TOUR_AVAILABLE, JSON.stringify(val));
  };

  const setShows = (newShows) => {
    setShowsState(newShows);
    localStorage.setItem(STORAGE_KEYS.SHOWS, JSON.stringify(newShows));
  };

  const addShow = (show) => {
    const newShow = {
      id: `show-${Date.now()}`,
      ticketLink: '#book-show',
      ticketLabel: 'Get Passes',
      ...show,
    };
    setShows([...shows, newShow]);
  };

  const updateShow = (id, fields) => {
    setShows(shows.map(s => (s.id === id ? { ...s, ...fields } : s)));
  };

  const deleteShow = (id) => {
    setShows(shows.filter(s => s.id !== id));
  };

  const setMerchAvailable = (val) => {
    setMerchAvailableState(val);
    localStorage.setItem(STORAGE_KEYS.MERCH_AVAILABLE, JSON.stringify(val));
  };

  const setMerchItems = (newItems) => {
    setMerchItemsState(newItems);
    localStorage.setItem(STORAGE_KEYS.MERCH_ITEMS, JSON.stringify(newItems));
  };

  const addMerchItem = (item) => {
    const newItem = {
      id: `merch-${Date.now()}`,
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL'],
      image: '/assets/merch_hoodie.jpg',
      ...item,
    };
    setMerchItems([...merchItems, newItem]);
  };

  const updateMerchItem = (id, fields) => {
    setMerchItems(merchItems.map(m => (m.id === id ? { ...m, ...fields } : m)));
  };

  const deleteMerchItem = (id) => {
    setMerchItems(merchItems.filter(m => m.id !== id));
  };

  const resetToDefaults = () => {
    setTourAvailable(false);
    setShows(defaultShows);
    setMerchAvailable(false);
    setMerchItems(defaultMerch);
  };

  return (
    <DataContext.Provider
      value={{
        tourAvailable,
        setTourAvailable,
        shows,
        addShow,
        updateShow,
        deleteShow,
        merchAvailable,
        setMerchAvailable,
        merchItems,
        addMerchItem,
        updateMerchItem,
        deleteMerchItem,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
