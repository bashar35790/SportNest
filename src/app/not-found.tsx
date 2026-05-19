import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#071120] px-4">
      <div className="text-center">
        {/* Big 404 */}
        <h1 className="text-7xl font-extrabold text-cyan-400">404</h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-bold text-white">Page Not Found</h2>

        <p className="mt-2 text-sm text-slate-400">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-105"
        >
          Go Back Home
        </Link>

        {/* Decorative glow */}
        <div className="mt-10 flex justify-center">
          <div className="h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
