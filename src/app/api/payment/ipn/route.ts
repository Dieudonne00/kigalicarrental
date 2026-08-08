
import { NextRequest, NextResponse } from 'next/server';
import { getPesaPalToken, getTransactionStatus } from '@/lib/pesapal';
import { prisma } from "@/lib/prisma";


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const trackingId = searchParams.get('OrderTrackingId');
        const merchantRef = searchParams.get('OrderMerchantReference');
        const notificationType = searchParams.get('OrderNotificationType');

        if (!trackingId) return NextResponse.json({ error: 'No tracking ID' }, { status: 400 });

        // 1. Get Token
        const token = await getPesaPalToken();
        if (!token) return NextResponse.json({ error: 'Auth failed' }, { status: 500 });

        // 2. Fetch Status from PesaPal
        const status = await getTransactionStatus(token, trackingId);
        
        console.log(`IPN Received: ${merchantRef} - Status: ${status.payment_status_description}`);

        // 3. Update Database (Optional, if you have a payments/bookings table)
        // Example:
        // await prisma.booking.updateMany({
        //     where: { orderId: merchantRef },
        //     data: { paymentStatus: status.payment_status_description }
        // });

        // PesaPal requires a specific response format for IPNs
        return NextResponse.json({
            orderNotificationType: notificationType,
            orderTrackingId: trackingId,
            orderMerchantReference: merchantRef,
            status: 200
        });

    } catch (error) {
        console.error('IPN Error:', error);
        return NextResponse.json({ error: 'IPN Processing failed' }, { status: 500 });
    }
}
