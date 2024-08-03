import { ForwardedRef, forwardRef } from 'react';

type Props = {
  children: React.ReactNode;
};

const ForwardChatWrapper = (
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { children } = props;

  return (
    <div ref={ref} className="mb-5 ml-8 flex flex-col gap-[2px]">
      {children}
    </div>
  );
};

export const ChatWrapper = forwardRef(ForwardChatWrapper);
