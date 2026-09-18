export async function requestBrowserNotifications() {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  const BrowserNotification = window.Notification;
  if (BrowserNotification.permission === "default") await BrowserNotification.requestPermission();
  return BrowserNotification.permission === "granted";
}

export function notifyBrowser(title, options = {}) {
  if (typeof window === "undefined" || !("Notification" in window) || window.Notification.permission !== "granted") return;
  new window.Notification(title, { icon: "/images/mohamed-abu-logo.png", ...options });
}
