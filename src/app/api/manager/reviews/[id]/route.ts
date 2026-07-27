import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { published } = await request.json();

    if (typeof published !== "boolean") {
      return NextResponse.json({ error: "published (boolean) is required" }, { status: 400 });
    }

    const review = await prisma.review.update({
      where: { id },
      data: { published },
    });

    // The homepage and each car's own page show real reviews and an
    // AggregateRating built from them - without this, an approval sits
    // invisible on both for up to an hour (see the same fix on the car
    // mutation routes).
    revalidatePath("/", "layout");

    return NextResponse.json({ message: "Review updated", review }, { status: 200 });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.review.delete({ where: { id } });
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Review deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
