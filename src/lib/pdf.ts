import PDFParser from "pdf2json";

export function parsePdf(
  buffer: Buffer
): Promise<string> {
  return new Promise(
    (resolve, reject) => {
      const pdfParser =
        new PDFParser();

      pdfParser.on(
        "pdfParser_dataError",
        (err) =>
          reject(err)
      );

      pdfParser.on(
        "pdfParser_dataReady",
        (pdfData: any) => {
          let text = "";

          pdfData.Pages.forEach(
            (page: any) => {
              page.Texts.forEach(
                (item: any) => {
                  text +=
                    decodeURIComponent(
                      item.R[0].T
                    ) + " ";
                }
              );
            }
          );

          resolve(text);
        }
      );

      pdfParser.parseBuffer(
        buffer
      );
    }
  );
}