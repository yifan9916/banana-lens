export const deleteUrlParam = (searchParams: string, param: string) => {
  const updatedParams = new URLSearchParams(searchParams.toString());
  updatedParams.delete(param);

  return updatedParams;
};
