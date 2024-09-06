import '@/styles/globals.css';

import { TRPCReactProvider } from '@/libs/trpc/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <html>
      <body>
        <TRPCReactProvider>
          {children}

          <ReactQueryDevtools />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
