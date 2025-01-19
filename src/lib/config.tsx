function undefinedIfEmpty(value: string | undefined) {
  if (value == null) return undefined;
  else if (value === '') return undefined;
  return value;
}

const gaId = undefinedIfEmpty(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);

export const config = {
  gaId,
};
