export const ADMIN_SESSION_KEY =
  "xfit-demo-admin-session";

const demoAdmin = {
  id: "admin-001",
  adminNumber: "ADMIN-001",
  pin: "9090",
  name: "XFIT Reception",
  role: "Admin",
} as const;

export function demoAdminLogin(
  adminNumber: string,
  pin: string
) {
  const valid =
    adminNumber.trim().toUpperCase() ===
      demoAdmin.adminNumber &&
    pin.trim() === demoAdmin.pin;

  if (!valid) {
    return null;
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      ADMIN_SESSION_KEY,
      demoAdmin.id
    );
  }

  return demoAdmin;
}

export function getCurrentDemoAdmin() {
  if (typeof window === "undefined") {
    return null;
  }

  const session = window.localStorage.getItem(
    ADMIN_SESSION_KEY
  );

  if (session !== demoAdmin.id) {
    return null;
  }

  return demoAdmin;
}

export function demoAdminLogout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(
      ADMIN_SESSION_KEY
    );
  }
}
