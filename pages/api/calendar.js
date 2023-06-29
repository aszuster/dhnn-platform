import { google } from "googleapis"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"

export default async function handler(req, res) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions)
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "http://localhost:3000"
    )

    oauth2Client.setCredentials({
      access_token: session.accessToken,
      refresh_token: session.refresh_token,
    })

    const calendar = google.calendar({ version: "v3", auth: oauth2Client })

    const { data } = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    })

    const events = data.items
    res.status(200).send(events)
  } catch (error) {
    res.status(500).send(`Ocurrió un error inesperado. Error: ${error}`)
  }
}
