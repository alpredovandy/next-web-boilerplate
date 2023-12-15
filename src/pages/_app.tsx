import { useState } from "react";

import { CacheProvider, type EmotionCache } from "@emotion/react";
import {
  QueryClient,
  type QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { ReyStyledProvider } from "rey-mix";

import { CommonLocale } from "@locales";

import { createEmotionCache } from "@helpers/cache";

const clientSideEmotionCache = createEmotionCache();

export type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const poppins = Poppins({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
};

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <CacheProvider value={emotionCache}>
      <ReyStyledProvider fontFamily={poppins.style.fontFamily}>
        <QueryClientProvider client={queryClient}>
          <CommonLocale.I18nProvider locale={pageProps.locale}>
            <Component {...pageProps} />
          </CommonLocale.I18nProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ReyStyledProvider>
    </CacheProvider>
  );
}
