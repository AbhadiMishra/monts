/**
 * Simulates async network delay for mock API calls
 */
export const delay = (ms = 250): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
