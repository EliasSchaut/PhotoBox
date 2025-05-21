import cups from 'node-cups'

export async function printFile(filePath: string) {
  const config = useRuntimeConfig();

  try {
    await cups.printFile(filePath, {
      printer: config.cupsPrinterName || undefined,
      copies: 1,
      printerOptions: {
        'fit-to-page': 'true'
      }
    });
  } catch (printError) {
    console.error('print error: ', printError);
    return {
      success: false,
      error: 'Printing failed'
    };
  }
}