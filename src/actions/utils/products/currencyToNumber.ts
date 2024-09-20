const formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export const currencyToNumber = (_currency: string): number =>
  _currency
    ? Number(
        _currency.trim().replace("$", "").replaceAll(".", "").replace(",", ".")
      )
    : 0;

export const NumberToCurrency = (_currency: any): string =>
  formatter.format(_currency);
