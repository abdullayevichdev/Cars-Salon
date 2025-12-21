
export enum FuelType {
  Electric = 'Elektr',
  Petrol = 'Benzin',
  Diesel = 'Dizel',
  Hybrid = 'Gibrid',
}

export enum Transmission {
  Automatic = 'Avtomat',
  Manual = 'Mexanika',
}

export enum CarCategory {
  Luxury = 'Lyuks',
  EV = 'Elektromobil',
  SUV = 'Yo‘ltanlamas',
  Sport = 'Sport',
  Budget = 'Hamyonbop',
  Truck = 'Yuk mashinasi'
}

export enum Region {
  USA = 'AQSH',
  Europe = 'Yevropa',
  Asia = 'Osiyo',
  MiddleEast = 'Yaqin Sharq',
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  category: CarCategory;
  fuelType: FuelType;
  transmission: Transmission;
  region: Region;
  imageUrl: string;
  imageUrls?: string[];
  specs: {
    hp: number;
    acceleration: string;
    topSpeed: string;
    range?: string;
  };
  description: string;
  createdAt: string;
}

export interface UserAccount {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email?: string;
  provider?: 'google' | 'apple' | 'none';
  status: 'Faol' | 'Bloklangan';
  visitTimestamp: string;
  joinedDate: string;
  activity: string;
}

export interface SettingsState {
  theme: 'dark' | 'light';
  language: 'uz' | 'en';
  fontSize: 'sm' | 'base' | 'lg';
}

export interface AuthState {
  isLoggedIn: boolean;
  user: {
    email: string;
    provider: 'google' | 'apple';
  } | null;
}

export interface AppState {
  cars: Car[];
  users: UserAccount[];
  wishlist: string[];
  compareList: string[];
  settings: SettingsState;
  hasEnteredInfo: boolean;
  auth: AuthState;
}
