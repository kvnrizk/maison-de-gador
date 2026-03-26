import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "signups.json");

async function getSignups(): Promise<{ email: string; date: string }[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const signups = await getSignups();

  if (signups.some((s) => s.email === email)) {
    return NextResponse.json({ message: "Already registered" });
  }

  signups.push({ email, date: new Date().toISOString() });

  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(signups, null, 2));

  return NextResponse.json({ message: "Signed up" });
}
