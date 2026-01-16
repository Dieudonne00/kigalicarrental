export interface Car {
  id: string;
  name: string;
  description: string | null;
  category: string;
  brand: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  seats: number;
  mileage: string | null;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number | null;
  monthlyRate: number | null;
  images: string[];
  available: boolean;
  featured: boolean;
  gameDrive: boolean;
  specifications: Record<string, unknown> | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CarFormData {
  name: string;
  description?: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  seats: number;
  mileage?: string;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate?: number;
  monthlyRate?: number;
  images: string[];
  available: boolean;
  featured: boolean;
  gameDrive?: boolean;
  specifications?: Record<string, unknown>;
}
