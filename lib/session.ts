import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// Simple session interface
export interface Session {
  userId: string;
  email: string;
  role?: string;
}

// Simple encryption/decryption (in production, use a proper library like iron-session or jose)
const SECRET_KEY = process.env.SESSION_SECRET || "your-secret-key";

export function encrypt(data: Session): string {
  // In production, use proper encryption
  return Buffer.from(JSON.stringify(data)).toString("base64");
}

export function decrypt(encryptedData: string | undefined): Session | null {
  if (!encryptedData) return null;
  
  try {
    // In production, use proper decryption
    const decoded = Buffer.from(encryptedData, "base64").toString();
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  
  if (!sessionCookie?.value) {
    return null;
  }
  
  return decrypt(sessionCookie.value);
}

export async function getSessionFromRequest(req: NextRequest): Promise<Session | null> {
  const sessionCookie = req.cookies.get("session");
  
  if (!sessionCookie?.value) {
    return null;
  }
  
  return decrypt(sessionCookie.value);
}

export function createSession(sessionData: Session): string {
  return encrypt(sessionData);
}
