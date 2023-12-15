import React from "react";

import createEmotionServer from "@emotion/server/create-instance";
import type { AppType } from "next/app";
import Document, { Head, Html, Main, NextScript } from "next/document";

import { createEmotionCache } from "@helpers/cache";

import type { MyAppProps } from "./_app";

const newrelic = require("newrelic");

export default class MyDocument extends Document<{
  browserTimingHeader: string;
  emotionStyleTags?: React.ReactElement[];
}> {
  render(): React.ReactElement {
    return (
      <Html className="notranslate" translate="no">
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: this.props.browserTimingHeader,
            }}
          />
          {this.props.emotionStyleTags}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>,
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
  });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
    browserTimingHeader,
  };
};
