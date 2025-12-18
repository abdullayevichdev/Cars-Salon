
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
  specs: {
    hp: number;
    acceleration: string;
    topSpeed: string;
    range?: string;
  };
  description: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  status: 'Faol' | 'Bloklangan';
  joinedDate: string;
  activity: string;
}

export interface FinanceRecord {
  id: string;
  date: string;
  amount: number;
  type: 'Daromad' | 'Xarajat';
  description: string;
}

export interface SettingsState {
  theme: 'dark' | 'light';
  language: 'uz' | 'en';
  fontSize: 'sm' | 'base' | 'lg';
}

export interface AppState {
  wishlist: string[];
  compareList: string[];
  settings: SettingsState;
}
