export const InputErrors = ({ errors }: { errors: any[] }) => {
  return (
    <>
      {errors.map((e) => (
        <p key={e} className="text-red-500 text-sm">
          {e}
        </p>
      ))}
    </>
  );
};
