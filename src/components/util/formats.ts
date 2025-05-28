export const getURLParams = (obj: Record<string, unknown>): string => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (value == null) continue; // Abaikan nilai null atau undefined

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof Date) {
          params.append(`${key}[${index}]`, String(item).trim());
        } else if (typeof item === "object" && item !== null) {
          // Jika item adalah objek, tambahkan setiap properti dengan format data[index][key]=value
          Object.entries(item).forEach(([subKey, subValue]) => {
            params.append(
              `${key}[${index}][${subKey}]`,
              String(subValue).trim()
            );
          });
        } else {
          params.append(`${key}[${index}]`, String(item).trim());
        }
      });
    } else {
      params.append(key, String(value).trim()); // Jika bukan array, langsung tambahkan
    }
  }

  return params.toString();
};
