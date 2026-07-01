import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">404</p>
        <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-white/60">
          The page you&apos;re looking for does not exist, or it may have moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
