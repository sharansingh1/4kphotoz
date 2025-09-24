import { NextRequest, NextResponse } from "next/server";
import { addAlertSignup } from "@/lib/admin-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { parentName, email, phone, athleteName, sport, graduationYear } = body;

    // Validate required fields
    if (!parentName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Add the signup
    const signup = addAlertSignup({
      parentName,
      email,
      phone,
      athleteName: athleteName || undefined,
      sport: sport || undefined,
      graduationYear: graduationYear || undefined,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully signed up for alerts!',
      signupId: signup.id 
    });
  } catch (error) {
    console.error('Error adding alert signup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
