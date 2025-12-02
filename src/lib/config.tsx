function defaultIfEmpty<T>(value: string | undefined, defaultValue: T): T {
  if (value == null || value === '') return defaultValue;
  return value as unknown as T;
}

const gaId: string | undefined = defaultIfEmpty(
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  undefined,
);
const mdxDetailsAbout: string | undefined = defaultIfEmpty(
  process.env.NEXT_PUBLIC_MDX_DETAILS_ABOUT,
  undefined,
);
const nrOfLines: string = defaultIfEmpty(
  process.env.NEXT_PUBLIC_NUMBER_OF_LINES,
  'No data available',
);

export const config = {
  gaId,
  mdxDetailsAbout,
  nrOfLines,
};
