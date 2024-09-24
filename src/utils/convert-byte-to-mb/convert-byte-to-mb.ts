const MB_IN_BYTES = 1_048_576;

export const convertByteToMb = (byteCount: number) => {
  return (byteCount / MB_IN_BYTES).toFixed(2);
};
