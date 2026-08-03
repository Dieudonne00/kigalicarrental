
import { NextRequest, NextResponse } from 'next/server';
import { getPesaPalToken, getTransactionStatus } from '@/lib/pesapal';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const trackingId = searchParams.get('orderTrackingId');

        if (!trackingId) {
            return NextResponse.json({ error: 'Tracking ID is required' }, { status: 400 });
        }

        const token = await getPesaPalToken();
        if (!token) {
            return NextResponse.json({ error: 'Failed to authenticate with payment gateway' }, { status: 500 });
        }

        const status = await getTransactionStatus(token, trackingId);
        
        return NextResponse.json(status);

    } catch (error) {
        console.error('Status Check Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
