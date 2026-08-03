
import { NextRequest, NextResponse } from 'next/server';
import { getPesaPalToken, submitPesaPalOrder } from '@/lib/pesapal';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log('Payment Init Request:', body);
        
        const { amount, email, phone, first_name, last_name, car } = body;

        if (!amount || !email || !first_name) {
            const missing = [];
            if (!amount) missing.push('amount');
            if (!email) missing.push('email');
            if (!first_name) missing.push('first_name');
            return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 });
        }

        // 1. Get Token
        const token = await getPesaPalToken();
        if (!token) {
            return NextResponse.json({ error: 'Authentication with Payment Gateway failed' }, { status: 500 });
        }

        // 2. Generate unique order ID
        const order_id = `CRK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

        // 3. Determine callback URL dynamically
        const protocol = req.headers.get('x-forwarded-proto') || (req.headers.get('host')?.includes('192.168') || req.headers.get('host')?.includes('localhost') ? 'http' : 'https');
        const host = req.headers.get('host');
        const callbackUrl = host ? `${protocol}://${host}/pay/callback` : undefined;
        
        console.log('🔗 Dynamic Callback URL set for PesaPal:', callbackUrl);

        // 4. Submit Order
        const result = await submitPesaPalOrder(token, {
            order_id,
            amount: parseFloat(amount),
            description: `Car Rental: ${car || 'Vehicle'}`,
            email,
            phone,
            first_name,
            last_name,
        }, callbackUrl);

        if (!result || !result.redirect_url) {
            console.error('PesaPal Submission Failed:', result);
            return NextResponse.json({ 
                error: 'Failed to generate payment link', 
                detail: result?.error?.message || result?.message || 'Unknown PesaPal error' 
            }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            redirectUrl: result.redirect_url,
            orderTrackingId: result.order_tracking_id,
            orderId: order_id 
        });

    } catch (error) {
        console.error('Payment Init Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
