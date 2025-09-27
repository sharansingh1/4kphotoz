import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAlertSignups, getAlertSignupsBySport, getAlertSignupsByGraduationYear } from "@/lib/admin-data";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      message, 
      galleryUrl, 
      eventName, 
      sport, 
      graduationYear,
      sendToAll = false 
    } = body;

    if (!message || !galleryUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get recipients based on filters
    let recipients;
    if (sendToAll) {
      recipients = getAlertSignups();
    } else if (sport) {
      recipients = getAlertSignupsBySport(sport);
    } else if (graduationYear) {
      recipients = getAlertSignupsByGraduationYear(graduationYear);
    } else {
      recipients = getAlertSignups();
    }

    if (recipients.length === 0) {
      return NextResponse.json({ error: 'No recipients found' }, { status: 400 });
    }

    // Send emails to all recipients
    const emailPromises = recipients.map(async (signup) => {
      const personalizedMessage = message
        .replace('{parentName}', signup.parentName)
        .replace('{athleteName}', signup.athleteName || 'your athlete')
        .replace('{sport}', signup.sport || 'the sport');

      return resend.emails.send({
        from: "4kphotoz Alerts <onboarding@resend.dev>",
        to: signup.email,
        subject: `New Gallery Available - ${eventName || 'Moreau Catholic Athletics'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Gallery Available!</h2>
            <p>Hi ${signup.parentName},</p>
            <p>${personalizedMessage}</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Event Details:</h3>
              <p><strong>Event:</strong> ${eventName || 'Moreau Catholic Athletics'}</p>
              ${signup.sport ? `<p><strong>Sport:</strong> ${signup.sport}</p>` : ''}
              ${signup.graduationYear ? `<p><strong>Graduation Year:</strong> ${signup.graduationYear}</p>` : ''}
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${galleryUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Gallery</a>
            </div>
            <p style="color: #6b7280; font-size: 14px;">
              This alert was sent because you signed up for notifications on the Moreau Catholic page. 
              If you no longer wish to receive these alerts, please contact us at support@4kphotoz.com.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #6b7280; font-size: 12px;">
              4kphotoz LLC<br>
              25509 Industrial Blvd, O10<br>
              Hayward, CA 94545<br>
              (510) 828-1061
            </p>
          </div>
        `
      });
    });

    const results = await Promise.allSettled(emailPromises);
    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    return NextResponse.json({ 
      success: true, 
      message: `Emails sent successfully`,
      stats: {
        total: recipients.length,
        successful,
        failed
      }
    });
  } catch (error) {
    console.error('Error sending alert emails:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

