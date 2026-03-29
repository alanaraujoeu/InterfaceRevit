import { NextResponse } from 'next/server';
import { getCourseDataFromSheets } from '@/lib/google-sheets';

export async function GET() {
  try {
    console.log('Fetching course data...');
    const courseData = await getCourseDataFromSheets();
    console.log('Course data fetched:', courseData);
    if (!courseData) {
      console.log('No data found, returning 404');
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }
    console.log('Returning course data');
    return NextResponse.json(courseData);
  } catch (error) {
    console.error('API Error fetching course data:', error);
    return NextResponse.json({ error: 'Failed to fetch course data', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
