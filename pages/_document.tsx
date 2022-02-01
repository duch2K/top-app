import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initilProps = await Document.getInitialProps(ctx);
    return { ...initilProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}