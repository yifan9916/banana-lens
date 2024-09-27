export const deleteUrlParams = (
  searchParams: URLSearchParams,
  params: string[]
) => {
  const updatedParams = new URLSearchParams(searchParams.toString());

  params.forEach((p) => updatedParams.delete(p));

  return updatedParams;
};

// for shallow routing cases
// https://github.com/vercel/next.js/discussions/48110
// https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#using-the-native-history-api
export const deleteParamsFromUrl = (params: string[]) => {
  const url = new URL(window.location.href);

  params.forEach((p) => url.searchParams.delete(p));

  return url.toString();
};
