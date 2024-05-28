import { forwardRef } from 'react';

type Props = {
  children: React.ReactNode;
};

export const ChatWrapper = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children } = props;

  return (
    <div ref={ref} className="mb-5 ml-8 flex flex-col gap-[2px]">
      {children}
    </div>
  );
});
