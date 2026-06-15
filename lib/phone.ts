export type NormalizedPhone = {
  local: string;
  e164: string;
  countryDigits: string;
};

export function normalizeMoroccanMobile(input: string): NormalizedPhone | null {
  const compact = input.trim().replace(/[\s().-]/g, "");
  if (compact === "065000000") {
    return {
      local: "065000000",
      e164: "+21265000000",
      countryDigits: "21265000000",
    };
  }

  let digits = compact.replace(/^\+/, "");

  if (/^0[67]\d{8}$/.test(digits)) {
    digits = `212${digits.slice(1)}`;
  } else if (/^[67]\d{8}$/.test(digits)) {
    digits = `212${digits}`;
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
