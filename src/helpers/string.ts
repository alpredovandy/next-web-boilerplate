export const separateFullName = (name: string) => {
  const fullName = name || "";
  const result = {
    firstName: "",
    lastName: "",
    secondLastName: "",
  };

  if (fullName.length > 0) {
    const nameTokens =
      fullName.match(
        /[A-ZÁ-ÚÑÜ][a-zá-úñü]+|([aeodlsz]+\s+)+[A-ZÁ-ÚÑÜ][a-zá-úñü]+/g,
      ) || [];

    if (nameTokens.length > 3) {
      result.firstName = nameTokens.slice(0, 2).join(" ");
    } else {
      result.firstName = nameTokens.slice(0, 1).join(" ");
    }

    if (nameTokens.length > 2) {
      result.lastName = nameTokens.slice(-2, -1).join(" ");
      result.secondLastName = nameTokens.slice(-1).join(" ");
    } else {
      result.lastName = nameTokens.slice(-1).join(" ");
      result.secondLastName = "";
    }
  }

  return result;
};
