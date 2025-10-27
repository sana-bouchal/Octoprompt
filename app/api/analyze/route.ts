import { NextRequest, NextResponse } from 'next/server';
import { analyzePrompt } from '@/lib/analyzer';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const analysis = analyzePrompt(prompt);
    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
