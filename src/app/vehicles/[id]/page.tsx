import { redirect } from "next/navigation";

export default async function VehicleRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/cars/${id}`);
}
