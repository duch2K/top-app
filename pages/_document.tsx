import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from ';


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