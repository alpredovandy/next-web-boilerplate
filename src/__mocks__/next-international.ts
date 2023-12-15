const generateLocal =
  (scoope?: string) => (key: string, args: Record<string, string>) => {
    let value = key;

    if (scoope) value = `${scoope}.${value}`;

    if (args) value += `.${JSON.stringify(args)}`;

    return value;
  };

export const mockUseCurrentLocale = jest.fn().mockReturnValue("id");

const mockCreateI18n = () => {
  return {
    useI18n: generateLocal,
    useScopedI18n: generateLocal,
    useCurrentLocale: mockUseCurrentLocale,
  };
};

export { mockCreateI18n as createI18n };
