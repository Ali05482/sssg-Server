const CREDENTIALS = {
    "type": "service_account",
    "project_id": "fitwell-406713",
    "private_key_id": "4217c5ef5bfc2a44c0ffc2459892f77150d29a46",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCd2SFMV/xnQ7rp\nMW6htp8ZZsO6pXTUv70E6JxTdKtOWPsIfJZQILSBgN72LyGCL9RRBDL+NBDNXg6C\nrI5tMk19R0KK4nW3N8GamP1924E3dtKpUERCC2Vhc+9ObZxm7EEUfaiwrLxZDpDK\na5oHOR8zYpgMrvdgP7SAaUoNczs9Mm2F9GmjpBtRzsNWsRDvkEYNwBmMr0EmjwKK\ntz6hrWqLt6mEBJ1lI8/r80vPLFmO5jtzh90KOVj5qHTO7jaCTzJlDY5YjN+ifS5r\n7miPlkiq+nWdCKnQQpPMS4m1fjVA9tUMZ4Z5imrsPvDPDGYrBb8SWLAo9cba5siA\nPnEH95qZAgMBAAECggEAJ3P4ZykMvNDIfHWvBbtsC8DMRjAJwg1ElOABBrkAAj6q\nTAY72b46762CzPydvvjuc+t9RV1FH9eU/+NaW/+5L4lqn+UXcBp/CQGZRmZhZzgL\nUmduECXiCpgcJbmu4GjHoXQBAFvEXewOk5GOd6S24DSR9YWb7hIuLvRiHneBRHub\n48Bg7YFZSq59ZdYPXYBTZIrnlC+Zc/ebnKSMA00MWfwCs6+pwYQyaCFHvM+wwLl/\nbfO6CkQAsNIxFu17imcFNtKknv3/BT36m1yJUri9TCIGzRagYzM846e21zn64kuj\nrnI73BpnDbyEI3Ij8qCtKlJhJVTis0qlVIZ2xKn5ywKBgQDZ/bis5vKQhUo5pLCe\nHZMOVMkldLnIiQxFSUQukJ5CbZnPCcsJl5770LbgLOb3/N6QDLArr8PBVsgBGOZF\nE8K6CwFa6GBBkxceQHn7Q/CMAl1Wo6GYYEypXYBlcYxb9fbqidsZyo8zm1M0R1lW\nD7eBSjmpsXpCOvq0G/FV8jU2/wKBgQC5XtxmznVoUoK9R4TLQJSAa3eGo5xlMC6E\nVVWD0/+Sp8/veJYHFxsKoOj7mcc0aeZ4+EkFlRiguhQw5eZFt5442zPV1IOixLP7\nCO/3UCm7zRPRurft9LasnddM8mgbUYItueHKIL5jXMYa+QQk91/HkaneMG+B1w+1\n2nJj8zuGZwKBgQCgxR0Ed7eBmqwpYyrXEhy4vxMySqoSGfEw0F42sXXmrAp5xVE3\nG9mnAkE9iCA32QkT2Ce9sH2BA82x8XkyjOZaa29ual9DPYYZS5grFeo8eCn6kefG\nB4/CgTEGn/3SfM7EHzO2C8wdVXrB3bUnYaQG+IUaf8gZPIJVfx44Ms/IZQKBgCMX\n0VPpLBL24+dffcVY0YRKVBN6L+Z8K6JD4W+Wl+C0wknMo2JuPmFRuym+oBbNIaOv\nJWvYIRR0hdQIAgMa0upinTqTA+Sxpn0U4REJ7Qyvs1vWJHH5DQg6zYK0tX7OfH2Z\nniQ89K4s5xg+Ikm5Rzmp2uXEd6e2BjRgSZ2gc5lrAoGADNUkmcmwdiatBwDRMo1a\n2eDmUdNsFKzx8L0EISEWvNbwm+qZyaWgl4Uz/j0vMphQDdu9leTlnCSdjMzblb1N\n9tBZHm/7VmhtXBPkfuWFWZ8jPg2K57AEvHDDEc6NCzIgtVG1DnMcjD39HUWYVv49\nxvKAlbOFmNw5R+iCmEGf/B8=\n-----END PRIVATE KEY-----\n",
    "client_email": "fitwell@fitwell-406713.iam.gserviceaccount.com",
    "client_id": "104972188009828518346",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/fitwell%40fitwell-406713.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
const calendarId = process.env.GOOGLE_CALENDAR_ID;
const { google } = require('googleapis');
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });
const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);


const insertEvent = async (event) => {
    try {
        // Insert the event into the calendar
        const response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event,
        });
        if (response.status === 200 && response.statusText === 'OK') {
            // const meetLink = await generateMeetLink(auth, response.data.id);
            
            console.log("response====?", response.data)
            // Update the event with the Meet link
            // if (meetLink) {
            //     await updateEventMeetLink(auth, calendarId, response.data.id, meetLink);
            // }

            // return meetLink;
        } else {
            return 0;
        }
    } catch (error) {
        
        console.log(`Error at insertEvent --> ${error.message}`);
        return 0;
    }
};

const generateMeetLink = async (auth, eventId) => {
    try {
        console.log("eventId", eventId)
        // Use the Google Calendar API to get the event details
        const eventDetails = await calendar.events.patch({
            auth: auth,
            calendarId: calendarId,
            eventId: eventId,
            requestBody: {
                conferenceData: {
                    createRequest: {
                        conferenceSolutionKey: {
                            type: "hangoutsMeet"
                        }, 
                      
                    },
                },
            },

            conferenceDataVersion: 1,
        });
        console.log("response.data.hangoutLink", eventDetails.data.hangoutLink);
        // Generate the Google Meet link
        const meetLink = `https://meet.google.com/${eventDetails.data.hangoutLink}`;
        return meetLink;
    } catch (error) {
        console.log(`Error at generateMeetLink --> ${error.message}`);
        return null;
    }
};

const updateEventMeetLink = async (auth, calendarId, eventId, meetLink) => {
    try {
        await calendar.events.patch({
            auth: auth,
            calendarId: calendarId,
            eventId: eventId,
            resource: {
                conferenceData: {
                    createRequest: {
                        requestId: 'meet-link-request',
                        conferenceSolutionKey: {
                            type: 'hangoutsMeet'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.log(`Error at updateEventMeetLink --> ${error}`);
    }
};


module.exports = {insertEvent}