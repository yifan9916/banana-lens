export const deleteUrlParams = (
  searchParams: URLSearchParams,
  params: string[]
) => {
  const updatedParams = new URLSearchParams(searchParams.toString());

  params.forEach((p) => updatedParams.delete(p));

  return updatedParams;
};
