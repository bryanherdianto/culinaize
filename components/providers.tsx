"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";

/**
 * Single client boundary for app-wide context providers.
 *
 * Material Tailwind's ThemeProvider is a client component, so it cannot be
 * mounted directly in the server root layout. Previously every page mounted
 * its own copy; this hoists it to one.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default Providers;
