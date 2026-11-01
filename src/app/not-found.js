import Link from "next/link";
import { Clapperboard } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="relative mb-8 w-full max-w-md">
          <svg
            viewBox="0 0 520 320"
            className="h-auto w-full"
            role="img"
            aria-labelledby="not-found-title not-found-description"
          >
            <title id="not-found-title">Scene not found</title>
            <desc id="not-found-description">
              A studio clapperboard showing the number 404.
            </desc>

            {/* Clapper arm */}
            <g
              className="fill-secondary stroke-foreground"
              strokeWidth="5"
              strokeLinejoin="round"
            >
              <path d="M90 78L115 42L455 115L430 151L90 78Z" />
              <path d="M122 47L148 55L126 91L100 83L122 47Z" />
              <path d="M205 65L231 71L209 107L183 101L205 65Z" />
              <path d="M288 83L314 89L292 125L266 119L288 83Z" />
              <path d="M371 101L397 107L375 143L349 137L371 101Z" />
            </g>

            {/* Board */}
            <rect
              x="90"
              y="115"
              width="340"
              height="150"
              rx="12"
              className="fill-card stroke-foreground"
              strokeWidth="5"
            />

            {/* Board lines */}
            <path
              d="M118 160H402M118 193H402M118 226H250"
              className="stroke-border"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* 404 */}
            <text
              x="260"
              y="215"
              textAnchor="middle"
              className="fill-primary font-heading text-6xl font-bold"
            >
              404
            </text>

            {/* Scene not found label */}
            <text
              x="335"
              y="250"
              textAnchor="middle"
              className="fill-muted-foreground text-sm"
            >
              SCENE NOT FOUND
            </text>
          </svg>

          <div
            className="absolute -right-2 top-6 flex size-10 items-center justify-center rounded-full bg-gel text-gel-foreground shadow-sm"
            aria-hidden="true"
          >
            <Clapperboard className="size-5" />
          </div>
        </div>

        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          This scene didn&apos;t make the cut
        </h1>

        <p className="mt-4 max-w-lg text-muted-foreground">
          Looks like this studio scene is missing. Let&apos;s get you back to
          a place where the creative work can begin.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Return to Home
          </Link>

          <Link
            href="/studios"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Explore studios
          </Link>
        </div>
      </div>
    </main>
  );
}