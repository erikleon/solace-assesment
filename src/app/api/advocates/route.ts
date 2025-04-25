import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or, eq } from "drizzle-orm";
import { Advocate } from "@/app/types";

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams.get("search") || "";
  const data: Advocate[] = await db
    .select()
    .from(advocates)
    // TODO fix type never[] error with drizzle schema?
    .where(
      or(
        ilike(advocates.firstName, `%${searchTerm}%`),
        ilike(advocates.lastName, `%${searchTerm}%`),
        ilike(advocates.city, `%${searchTerm}%`),
        ilike(advocates.degree, `%${searchTerm}%`),
        ilike(advocates.phoneNumber, `%${searchTerm}%`),
        !isNaN(parseInt(searchTerm, 10))
          ? eq(advocates.yearsOfExperience, parseInt(searchTerm, 10))
          : undefined
      )
    );

  return Response.json({ data });
}
