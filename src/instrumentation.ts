/**
 * Next.js Instrumentation Hook
 * Runs ONCE at server startup before any request handlers or module-level code.
 * Used here to override DNS resolution so MongoDB Atlas SRV records resolve correctly
 * on environments where the system DNS fails (ECONNREFUSED on querySrv).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const dns = require("node:dns");
    dns.setDefaultResultOrder("ipv4first");
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    console.log("[instrumentation] DNS override applied: using Google DNS (8.8.8.8)");
  }
}
