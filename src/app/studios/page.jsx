
import { Suspense } from "react";
import ExploreStudios from "@/components/explore-studios/ExploreStudios";
import ExploreStudiosSkeleton from "@/components/explore-studios/ExploreStudiosSkeleton";

async function StudiosContent({ searchParams }) {
  const params = await searchParams;
  const category = params.category || "";

  let studios = [];

  try {
    const url = category
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/studios?category=${category}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/studios`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch studios");
    }

    studios = await response.json();
  } catch (error) {
    console.error("Explore studios error:", error);
  }

  return (
    <ExploreStudios
      studios={studios}
      selectedCategory={category}
    />
  );
}

export default function StudiosPage({ searchParams }) {
  return (
    <Suspense fallback={<ExploreStudiosSkeleton />}>
      <StudiosContent searchParams={searchParams} />
    </Suspense>
  );
}
