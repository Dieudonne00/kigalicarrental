
const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY || 'gupQeyjjX8VY34kIY33PhR3EdIpOAdF5';
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET || 'o9akCJWG6r3KkzGFcKdWtpoA9Jo=';
const PESAPAL_IPN_ID = process.env.PESAPAL_IPN_ID || '1d3b318b-ce0e-4cab-9e2f-daafafd53fb2';
const PESAPAL_ENV = process.env.PESAPAL_ENV || 'live'; // 'live' or 'sandbox'

const BASE_URL = PESAPAL_ENV === 'live' 
    ? 'https://pay.pesapal.com/v3' 
    : 'https://cybqa.pesapal.com/pesapalv3';

export interface PesaPalOrder {
    order_id: string;
    amount: number;
    description: string;
    email: string;
    phone?: string;
    first_name: string;
    last_name: string;
}

/**
 * Gets the Auth Token from PesaPal
 */
export async function getPesaPalToken() {
    try {
        const response = await fetch(`${BASE_URL}/api/Auth/RequestToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                consumer_key: PESAPAL_CONSUMER_KEY,
                consumer_secret: PESAPAL_CONSUMER_SECRET,
            }),
        });

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('PesaPal Auth Error:', error);
        return null;
    }
}

/**
 * Submits an order and returns the redirect URL
 */
export async function submitPesaPalOrder(token: string, order: PesaPalOrder, customCallbackUrl?: string) {
    try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://kigalicarrental.site';
        const callback_url = customCallbackUrl || `${siteUrl}/pay/callback`;
        
        const response = await fetch(`${BASE_URL}/api/Transactions/SubmitOrderRequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                id: order.order_id,
                currency: 'USD',
                amount: order.amount,
                description: order.description,
                callback_url: callback_url,
                notification_id: PESAPAL_IPN_ID,
                billing_address: {
                    email_address: order.email,
                    phone_number: order.phone?.trim() || undefined,
                    first_name: order.first_name,
                    last_name: order.last_name,
                    country_code: 'RW',
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('PesaPal API Error:', errorText);
            try {
                return JSON.parse(errorText);
            } catch {
                return { message: errorText };
            }
        }

        const data = await response.json();
        console.log('PesaPal Order Response:', data);
        return data; 
    } catch (error) {
        console.error('PesaPal Order Error:', error);
        return null;
    }
}

/**
 * Checks transaction status
 */
export async function getTransactionStatus(token: string, trackingId: string) {
    try {
        const response = await fetch(`${BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${trackingId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('PesaPal Status Error:', error);
        return null;
    }
}
