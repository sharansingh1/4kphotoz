import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { 
  getAllAlertSignups, 
  deactivateAlertSignup, 
  deleteAlertSignup,
  getAlertSignupsBySport,
  getAlertSignupsByGraduationYear 
} from "@/lib/admin-data";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sport = searchParams.get('sport');
    const graduationYear = searchParams.get('graduationYear');

    let signups;
    if (sport) {
      signups = getAlertSignupsBySport(sport);
    } else if (graduationYear) {
      signups = getAlertSignupsByGraduationYear(graduationYear);
    } else {
      signups = getAllAlertSignups();
    }

    return NextResponse.json({ signups });
  } catch (error) {
    console.error('Error fetching alert signups:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { signupId, action } = body;

    if (!signupId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let success = false;
    if (action === 'deactivate') {
      success = deactivateAlertSignup(signupId);
    } else if (action === 'delete') {
      success = deleteAlertSignup(signupId);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Signup not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error managing alert signup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
