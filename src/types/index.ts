// Car types
export type CarCategory = 'coupe' | 'electric' | 'convertible' | 'luxury' | 'suv' | 'sedan';
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';
export type TransmissionType = 'automatic' | 'manual';

export interface Car {
  id: string;
  name: string;
  description?: string;
  category: CarCategory;
  brand: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  seats: number;
  mileage?: string;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate?: number;
  monthlyRate?: number;
  images: string[];
  available: boolean;
  featured: boolean;
  specifications?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Booking types
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  carId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate: Date;
  returnDate: Date;
  pickupLocation: string;
  returnLocation?: string;
  totalCost: number;
  status: BookingStatus;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Contact types
export type MessageStatus = 'new' | 'read' | 'replied';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: MessageStatus;
  createdAt: Date;
}

// Newsletter types
export interface NewsletterSubscriber {
  id: string;
  email: string;
  active: boolean;
  createdAt: Date;
}

// Form types
export interface BookingFormData {
  carType: string;
  pickupDate: string;
  pickupLocation: string;
  email: string;
  customerName?: string;
  customerPhone?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}
