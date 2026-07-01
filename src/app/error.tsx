"use client";

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-semibold">We could not load this page.</h1>
        <p className="mt-4 text-sm leading-7 text-white/60">
          Please try again. If the issue keeps happening, the backend API may be unavailable temporarily.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          Retry
        </button>
        {error.digest ? <p className="mt-4 text-xs text-white/30">Error ID: {error.digest}</p> : null}
      </div>
    </main>
  );
}
