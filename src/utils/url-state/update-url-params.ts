export const updateUrlParams = (
  searchParams: URLSearchParams,
  params: {
    key: string;
    value: string;
  }[]
) => {
  const paramList = new URLSearchParams(Array.from(searchParams.entries()));

  params.forEach(({ key, value }) => paramList.set(key, value));

  return paramList;
};
