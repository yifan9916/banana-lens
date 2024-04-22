type Props = {
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const { className, icon } = props;

  return (
    <button
      {...props}
      className={['w-8 h-8 flex items-center justify-center ', className].join(
        ' '
      )}
    >
      {icon}
    </button>
  );
};
