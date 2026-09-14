const DEVICE_ID_KEY = "vorlay_did";
const DEVICE_BAN_KEY = "vorlay_banned";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 400;

function canUseBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function readCookie(name: string) {
  if (!canUseBrowser()) return "";
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1] || ""
  );
}

function writeCookie(name: string, value: string) {
  if (!canUseBrowser()) return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

function readStorage(key: string) {
  if (!canUseBrowser()) return "";
  try {
    return window.localStorage.getItem(key) || window.sessionStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function writeStorage(key: string, value: string) {
  if (!canUseBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
    window.sessionStorage.setItem(key, value);
  } catch {
    /* private mode */
  }
}

export function getDeviceId() {
  const existing = readStorage(DEVICE_ID_KEY) || decodeURIComponent(readCookie(DEVICE_ID_KEY) || "");
  if (existing) {
    writeStorage(DEVICE_ID_KEY, existing);
    writeCookie(DEVICE_ID_KEY, existing);
    return existing;
  }
  const created = crypto.randomUUID();
  writeStorage(DEVICE_ID_KEY, created);
  writeCookie(DEVICE_ID_KEY, created);
  return created;
}

export function getDeviceFingerprint() {
  if (!canUseBrowser()) return "";
  const parts = [
    navigator.userAgent,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`,
    String(navigator.hardwareConcurrency || ""),
    navigator.platform || "",
  ];
  return parts.join("|").slice(0, 240);
}

export function isDeviceBanned() {
  return readStorage(DEVICE_BAN_KEY) === "1" || decodeURIComponent(readCookie(DEVICE_BAN_KEY) || "") === "1";
}

export function markDeviceBanned() {
  writeStorage(DEVICE_BAN_KEY, "1");
  writeCookie(DEVICE_BAN_KEY, "1");
}

export function collectDevice() {
  return {
    id: getDeviceId(),
    fingerprint: getDeviceFingerprint(),
  };
}
