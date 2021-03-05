export const isProduction = (): boolean =>
  process.env.NODE_ENV === 'production';

export const isDevelopment = (): boolean =>
  process.env.NODE_ENV === 'development';

export const sleep = (time: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, time));

export const randomValuesFromArray = <T>(array: T[], count: number): T[] => {
  if (count >= array.length) {
    return array;
  }
  const copy = [...array];
  return [...Array(count)].map(
    () => copy.splice(Math.floor(Math.random() * copy.length), 1)[0],
  );
};
