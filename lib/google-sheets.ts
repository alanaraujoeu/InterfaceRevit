import { google } from 'googleapis';
import { Module, Lesson } from './data';

export async function getCourseDataFromSheets(): Promise<Module[] | null> {
  let credentials;
  const creds = process.env.GOOGLE_SHEETS_CREDENTIALS?.trim();
  try {
    credentials = JSON.parse(creds || '{}');
  } catch (e) {
    console.error('Error parsing GOOGLE_SHEETS_CREDENTIALS:', e);
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.SPREADSHEET_ID || '1pXHAjSWQ3VtNsc441SFoTAo2D6xxgxGkkIVe4mXulJc';

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Revit!A2:D', // Fetch up to column D
    });

    const values = response.data.values;
    if (!values || values.length === 0) return null;

    const modules: Module[] = [];
    const moduleMap = new Map<string, Module>();

    values.forEach((row, index) => {
      console.log(`Row ${index}:`, row);
      // Mapping: A=moduleTitle, B=lessonTitle, C=duration, D=videoId
      const [moduleTitle, lessonTitle, duration, videoId] = row;
      
      if (!moduleTitle || !lessonTitle) return;

      let mod = moduleMap.get(moduleTitle);
      if (!mod) {
        mod = {
          id: `m${moduleMap.size + 1}`,
          title: moduleTitle,
          lessons: []
        };
        moduleMap.set(moduleTitle, mod);
        modules.push(mod);
      }

      const lesson: Lesson = {
        id: `l${index + 1}`,
        title: lessonTitle,
        videoId: videoId || '',
        duration: duration || '0:00'
      };

      mod.lessons.push(lesson);
    });

    return modules;
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return null;
  }
}
