// api.ts
const KEY = import.meta.env.VITE_REACT_APP_API_KEY;
export const BASEURL =
  import.meta.env.VITE_REACT_APP_BASE_URL || "http://api.weatherstack.com";

export const api = {
  getWeather: (city: string) =>
    `${BASEURL}/current?access_key=${KEY}&query=${city}`,
};

export const makeGetRequest = async <T = never>(url: string) => {
  try {
    const response = await fetch(`${url}`);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};





const LOCAL_STORAGE_KEY = "your_data_key";

// Function to get data from local storage
const getLocalStorageData = (): Record<string, unknown> => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : {};
};

// Function to update data in local storage
const updateLocalStorageData = (updatedData: Record<string, unknown>): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
};

export const makePostRequestToLocal = <T = unknown>(data: unknown): T => {
  // Get existing data from local storage
  const localStorageData = getLocalStorageData();

  // Simulate server-generated ID for a new item (you might have a different strategy)
  const newItemId = Date.now().toString();

  // Update local storage with the new item
  localStorageData[newItemId] = data;
  updateLocalStorageData(localStorageData);

  // Return the newly added item or a confirmation
  return data as T;
};

export const makeDeleteRequestToLocal = <T = unknown>(itemId: string): T => {
  // Get existing data from local storage
  const localStorageData = getLocalStorageData();

  // Check if the item exists
  if (localStorageData[itemId]) {
    // Delete the item
    delete localStorageData[itemId];

    // Update local storage
    updateLocalStorageData(localStorageData);

    // Return a confirmation or additional data if needed
    return {} as T;
  } else {
    // Handle item not found
    throw new Error("Item not found in local storage");
  }
};

export const makeUpdateRequestToLocal = <T = unknown>(
  itemId: string,
  updatedData: Record<string, unknown>
): T => {
  // Get existing data from local storage
  const localStorageData = getLocalStorageData();

  // Check if the item exists
  if (localStorageData[itemId]) {
    // @ts-expect-error This error is intentionally ignored for specific error handling
    localStorageData[itemId] = { ...localStorageData[itemId], ...updatedData };

    // Update local storage
    updateLocalStorageData(localStorageData);

    // Return a confirmation or additional data if needed
    return updatedData as T;
  } else {
    // Handle item not found
    throw new Error("Item not found in local storage");
  }
};

// Function to get all items from local storage
export const getAllItemsFromLocalStorage = (): Record<string, unknown> => {
  return getLocalStorageData();
};
