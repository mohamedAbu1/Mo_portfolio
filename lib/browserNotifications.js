export async function requestBrowserNotifications() {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission === "default") await Notification.requestPermission();
  return Notification.permission === "granted";
}

export function notifyBrowser(title, options = {}) {
  if (typeof window === "undefined" || !("Notification" in window) || Notification.permission !== "granted") return;
  new Notification(title, { icon: "/images/mohamed-abu-logo.svg", ...options });
}
