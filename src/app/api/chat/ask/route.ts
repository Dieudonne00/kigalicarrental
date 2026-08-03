import Groq from "groq-sdk";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const maxDuration = 30;

function buildFleetContext(
  cars: {
    name: string;
    category: string;
    brand: string;
    model: string;
    year: number;
    seats: number;
    transmission: string;
    dailyRate: number;
    weeklyRate: number | null;
    monthlyRate: number | null;
  }[]
) {
  if (cars.length === 0) return "No live fleet data available right now.";
  return cars
    .map((c) => {
      const weeklyDiscount = c.weeklyRate
        ? Math.round((1 - c.weeklyRate / (c.dailyRate * 7)) * 100)
        : null;
      const monthlyDiscount = c.monthlyRate
        ? Math.round((1 - c.monthlyRate / (c.dailyRate * 30)) * 100)
        : null;
      return `- ${c.name.trim()} (${c.brand} ${c.model}, ${c.year}, ${c.category}, ${c.seats} seats, ${c.transmission}): $${c.dailyRate}/day${
        c.weeklyRate ? `, $${c.weeklyRate}/week (${weeklyDiscount}% off daily rate)` : ""
      }${c.monthlyRate ? `, $${c.monthlyRate}/month (${monthlyDiscount}% off daily rate)` : ""}`;
    })
    .join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = (body.question as string)?.trim();
    const name = (body.name as string)?.trim() || null;
    const phone = (body.phone as string)?.trim() || null;
    const page = (body.page as string)?.trim() || null;

    if (!question || question.length < 2) {
      return Response.json({ error: "Question is required" }, { status: 400 });
    }
    if (question.length > 1000) {
      return Response.json({ error: "Question is too long" }, { status: 400 });
    }

    const cars = await prisma.car.findMany({
      where: { available: true },
      select: {
        name: true,
        category: true,
        brand: true,
        model: true,
        year: true,
        seats: true,
        transmission: true,
        dailyRate: true,
        weeklyRate: true,
        monthlyRate: true,
      },
      orderBy: { dailyRate: "asc" },
      take: 40,
    });

    const fleetContext = buildFleetContext(cars);

    const systemPrompt = `You are the friendly assistant for Kigali Car Rental (also known as Kigali Car Rental), Rwanda's trusted car rental company based in Kigali. Answer the visitor's question directly and helpfully in 2-4 short sentences.

CURRENT LIVE FLEET AND REAL PRICES (use these exact numbers when the visitor asks about a car type, price, or discount — weekly/monthly rates already include the discount, mention the % saved when relevant):
${fleetContext}

Other facts:
- Self-drive or chauffeur-driven rental available
- Free car delivery to any hotel/address in Kigali
- 24/7 airport pickup at Kigali International Airport
- Requirements: valid driving licence (international permit recommended for visitors), passport/national ID, refundable deposit
- Payment: MTN Mobile Money, Airtel Money, bank transfer, cash — no credit card required
- Cross-border rental available to Uganda, Tanzania, Kenya, Burundi, DRC
- Popular destinations served: Volcanoes National Park (gorilla trekking), Akagera National Park, Lake Kivu, Nyungwe Forest
- Contact: +250 787 619 387 (phone/WhatsApp), info@kigalicarrental.site
- Book online at kigalicarrental.site/book-now

Only quote prices from the live fleet list above — never invent a price. If a specific car type isn't in the list, say what's closest to what's available. If the question isn't about car rental in Rwanda, politely redirect to how you can help with car rental instead. Keep answers concise and friendly.`;

    const apiKey = process.env.GROQ_API_KEY;
    let answer = "Thanks for reaching out! Our team will get back to you shortly — feel free to continue on WhatsApp for an instant reply.";

    if (apiKey) {
      try {
        const groq = new Groq({ apiKey });
        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question },
          ],
          max_tokens: 350,
          temperature: 0.4,
        });
        answer = completion.choices[0]?.message?.content?.trim() || answer;
      } catch {
        // fall back to the default answer above if Groq fails
      }
    }

    const saved = await prisma.chatQuestion.create({
      data: { question, answer, name, phone, page },
    });

    return Response.json({ id: saved.id, answer });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
