export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  ttclid?: string;
  ScCid?: string;
  landing_page?: string;
  referrer?: string;
  user_agent?: string;
};

export type PixelCookies = {
  fbp?: string;
  fbc?: string;
  ttp?: string;
  scid?: string;
};

function readCookie(name: string) {
  if (typeof document === "undefined") return "";
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1] || ""
  );
}

export function collectAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    fbclid: params.get("fbclid") || "",
    ttclid: params.get("ttclid") || "",
    ScCid: params.get("ScCid") || params.get("sccid") || "",
    landing_page: window.location.href,
    referrer: document.referrer,
    user_agent: navigator.userAgent,
  };
}

export function collectPixelCookies(): PixelCookies {
  return {
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    ttp: readCookie("_ttp"),
    scid: readCookie("_scid"),
  };
}
