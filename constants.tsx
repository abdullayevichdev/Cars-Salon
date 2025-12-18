
import { Car, CarCategory, FuelType, Region, Transmission, UserAccount, FinanceRecord } from './types';

const BRANDS_MODELS: Record<string, string[]> = {
  'Tesla': ['Model S Plaid', 'Model 3 Performance', 'Model X Ludicrous', 'Model Y Long Range', 'Cybertruck'],
  'BMW': ['M5 Competition', 'M8 Gran Coupe', 'i7 M70', 'X7 M60i', 'XM Label Red'],
  'Mercedes-Benz': ['AMG GT 63 S', 'S-Class S680', 'G63 AMG', 'EQS 580', 'SL 63 AMG'],
  'Porsche': ['911 GT3 RS', 'Taycan Turbo S', 'Cayenne Turbo GT', 'Panamera Turbo S', '718 Cayman GT4'],
  'Audi': ['RS6 Avant', 'RS7 Performance', 'R8 V10 Performance', 'e-tron GT', 'RS Q8'],
  'Lamborghini': ['Revuelto', 'Huracan Sterrato', 'Urus Performante'],
  'Ferrari': ['SF90 Stradale', 'Purosangue', '296 GTB', '812 Competizione'],
  'BYD': ['Han EV', 'Tang SUV', 'Seal', 'Yangwang U9'],
  'Chevrolet': ['Corvette Z06', 'Tahoe High Country', 'Silverado EV', 'Camaro ZL1'],
  'Toyota': ['Land Cruiser 300', 'Supra MK5', 'Crown Sport', 'Sequoia Capstone']
};

const IMAGE_POOLS = [
  'https://images.unsplash.com/photo-1617788138017-80ad40651399',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
  'https://images.unsplash.com/photo-1606148651877-c93d4086e3f4',
  'https://images.unsplash.com/photo-1695660897369-e090534226d7',
  'https://images.unsplash.com/photo-1594502184342-2e12f877aa73',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d'
];

export const generateMockCars = (count: number): Car[] => {
  const brands = Object.keys(BRANDS_MODELS);
  return Array.from({ length: count }).map((_, i) => {
    const brand = brands[i % brands.length];
    const modelPool = BRANDS_MODELS[brand];
    const model = modelPool[Math.floor(Math.random() * modelPool.length)];
    const year = 2020 + (i % 5);
    const basePrice = 50000 + (Math.floor(Math.random() * 200) * 1000);
    
    const baseImg = IMAGE_POOLS[i % IMAGE_POOLS.length];
    const imageUrl = `${baseImg}?auto=format&fit=crop&q=80&w=800&sig=${i}`;

    return {
      id: (i + 1).toString(),
      brand,
      model,
      year,
      price: basePrice,
      currency: 'USD',
      category: i % 3 === 0 ? CarCategory.Luxury : (i % 2 === 0 ? CarCategory.EV : CarCategory.Sport),
      fuelType: i % 4 === 0 ? FuelType.Electric : (i % 3 === 0 ? FuelType.Hybrid : FuelType.Petrol),
      transmission: i % 2 === 0 ? Transmission.Automatic : Transmission.Manual,
      region: i % 4 === 0 ? Region.USA : (i % 2 === 0 ? Region.Europe : Region.Asia),
      imageUrl,
      specs: {
        hp: 400 + (Math.floor(Math.random() * 600)),
        acceleration: `${(2.0 + Math.random() * 4).toFixed(1)}s 0-100`,
        topSpeed: `${250 + Math.floor(Math.random() * 100)} km/soat`,
        range: i % 4 === 0 ? `${400 + Math.floor(Math.random() * 300)} km` : undefined
      },
      description: `${brand} ${model} - bu o'zining unikal dizayni va mukammal texnik xususiyatlari bilan ajralib turuvchi zamonaviy avtomobil.`
    };
  });
};

// Fix: Update MOCK_USERS mapping to match the UserAccount interface (firstName, lastName, age)
export const MOCK_USERS: UserAccount[] = Array.from({ length: 50 }).map((_, i) => ({
  id: (i + 1).toString(),
  firstName: 'Foydalanuvchi',
  lastName: `${i + 1}`,
  age: 20 + (i % 40),
  status: i % 5 === 0 ? 'Bloklangan' : 'Faol',
  joinedDate: '2023-10-12',
  activity: i % 3 === 0 ? 'Avtomobil ko\'rdi' : 'Izoh qoldirdi',
}));

export const MOCK_FINANCE: FinanceRecord[] = Array.from({ length: 20 }).map((_, i) => ({
  id: (i + 1).toString(),
  date: '2024-03-01',
  amount: 1500 + Math.random() * 5000,
  type: i % 3 === 0 ? 'Xarajat' : 'Daromad',
  description: i % 3 === 0 ? 'Logistika to\'lovi' : 'Avtomobil sotuvi komissiyasi',
}));

export const MOCK_CARS = generateMockCars(2000);
export const CATEGORIES = Object.values(CarCategory);
export const REGIONS = Object.values(Region);
export const BRANDS = Object.keys(BRANDS_MODELS);
