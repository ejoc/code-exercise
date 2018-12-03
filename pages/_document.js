import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {
    return (
      <html lang="es">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
