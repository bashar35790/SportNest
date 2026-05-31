/**
 * This file is required BEFORE Next.js starts via the --require flag in package.json.
 * It patches Node.js DNS to use Google DNS (8.8.8.8) which properly resolves
 * MongoDB Atlas SRV records (_mongodb._tcp.*.mongodb.net) that fail on some
 * Windows network configurations.
 */
const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
console.log("[DNS Bootstrap] Google DNS applied (8.8.8.8 / 8.8.4.4) — MongoDB Atlas SRV fix active");
