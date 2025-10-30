export const API = {
  AUTH: {
    BASE: "/api/auth",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    SIGNUP: "/api/auth/signup",
    ME: "/api/auth/me",
    CHECK_SLUG: "/api/auth/check-slug",
  },
  // Future groups...
  USERS: {
    BASE: "/api/users",
  },
} as const;
