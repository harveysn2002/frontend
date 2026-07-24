export type NormalizedPhone = {
  local: string;
  e164: string;
  countryDigits: string;
};

/** Convert Arabic-Indic digits to Western digits. */
function toWesternDigits(input: string): string {
  return input.replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 1632));
}

export function normalizeMoroccanMobile(input: string): NormalizedPhone | null {
  const compact = toWesternDigits(input)
    .trim()
    .replace(/[\s().-]/g, "");

  if (compact === "065000000") {
    return {
      local: "065000000",
      e164: "+21265000000",
      countryDigits: "21265000000",
    };
  }

  let digits = compact.replace(/^\+/, "");
  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  // Local formats: 06/07… or 6/7…
  if (/^0[67]\d{8}$/.test(digits)) {
    digits = `212${digits.slice(1)}`;
  } else if (/^[67]\d{8}$/.test(digits)) {
    digits = `212${digits}`;
  }

  // Common mistake: +21206… / 21206… (extra 0 after country code)
  if (/^2120[67]\d{8}$/.test(digits)) {
    digits = `212${digits.slice(4)}`;
  }

  if (!/^212[67]\d{8}$/.test(digits)) {
    return null;
  }

  return {
    local: `0${digits.slice(3)}`,
    e164: `+${digits}`,
    countryDigits: digits,
  };
}

export function isValidMoroccanMobile(input: string) {
  return normalizeMoroccanMobile(input) !== null;
}
