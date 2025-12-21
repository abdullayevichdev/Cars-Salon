
import { Car, CarCategory, FuelType, Region, Transmission, UserAccount } from './types';

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

const BRAND_IMAGES: Record<string, string[]> = {
  'Tesla': ['1617788138017-80ad40651399', '1560958089-b8a1929cea89', '1619767886558-f79b12fe0ad4', '1521127474489-d52943c20db0'],
  'BMW': ['1555215695-46e392133a27', '1607082348824-0a96f2a4b9da', '1556800572-1b8aeef2c54f', '1523983388277-336a66bf9bcd'],
  'Mercedes-Benz': ['1567818733-35407963165b', '1618843479313-40f8afb4b4d8', '1603584173870-7f23bb593e54', '1547679904-054097538053'],
  'Porsche': ['1503736334956-4c8f8e929391', '1614162692292-7ac56d7f7f1e', '1520050206274-a1ae44613e6d', '1580273916550-13f37ba9d399'],
  'Audi': ['1606148651877-c93d4086e3f4', '1605515298816-dd3f113d9f0a', '1618843479313-40f8afb4b4d8', '1533473359331-0135ef3c28da'],
  'Lamborghini': ['1544636331-e26879cd4d9b', '1583121274602-3e2820c69888', '1525609004358-2ee0bfb5121f', '1621131160583-d8d2175f8121'],
  'Ferrari': ['1592198084033-aade902d1aae', '1494976388531-d1058494cdd8', '1580274455191-19622146557b', '1594911771122-33104e35bc0a'],
  'BYD': ['1593941707882-a5bba14938c7', '1621932953913-a074c664a1ad', '1549399542-7ec8703f3fb8', '1633513361005-4c07802877a3'],
  'Chevrolet': ['1611651338412-8403df6a073a', '1552519507-da3b142c6e3d', '1626989422500-bbf53b8704d6', '1619405234977-f2732950920d'],
  'Toyota': ['1541443131-1e18f294b92d', '1631214503028-ae7191d87f7a', '1533473359331-0135ef3c28da', '1621362854497-7f9f381014b2']
};

export const generateMockCars = (count: number): Car[] => {
  const brands = Object.keys(BRANDS_MODELS);
  return Array.from({ length: count }).map((_, i) => {
    const brand = brands[i % brands.length];
    const modelPool = BRANDS_MODELS[brand];
    const model = modelPool[Math.floor(Math.random() * modelPool.length)];
    const year = 2022 + Math.floor(Math.random() * 3);
    const basePrice = 45000 + (Math.floor(Math.random() * 500) * 1000);
    
    // Rasm ID-lari
    const brandImagePool = BRAND_IMAGES[brand] || ['1503376780353-7e6692767b70'];
    const imageId = brandImagePool[i % brandImagePool.length];
    
    // Unikal sig= va h=, w= orqali har xil rakurslar
    const imageUrl = `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&q=90&w=1400&sig=car_${i}_${brand}_main`;

    // Har bir mashina uchun galereya
    const galleryImages = brandImagePool.map((id, idx) => 
      `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=85&w=1200&sig=gallery_${i}_${idx}`
    );

    return {
      id: (i + 1).toString(),
      brand,
      model,
      year,
      price: basePrice,
      currency: 'USD',
      category: i % 4 === 0 ? CarCategory.Luxury : (i % 3 === 0 ? CarCategory.EV : (i % 2 === 0 ? CarCategory.Sport : CarCategory.SUV)),
      fuelType: i % 4 === 0 ? FuelType.Electric : (i % 3 === 0 ? FuelType.Hybrid : FuelType.Petrol),
      transmission: Transmission.Automatic,
      region: i % 4 === 0 ? Region.USA : (i % 3 === 0 ? Region.Europe : Region.Asia),
      imageUrl,
      imageUrls: galleryImages,
      specs: {
        hp: 350 + (Math.floor(Math.random() * 650)),
        acceleration: `${(2.1 + Math.random() * 3.5).toFixed(1)}s`,
        topSpeed: `${250 + Math.floor(Math.random() * 100)} km/h`,
        range: i % 3 === 0 ? `${480 + Math.floor(Math.random() * 400)} km` : undefined
      },
      description: `${brand} ${model} - premium darajadagi zamonaviy avtomobil. Mukammal dizayn va yuqori texnologik yechimlar uyg'unligi.`,
      createdAt: new Date().toISOString()
    };
  });
};

export const MOCK_USERS: UserAccount[] = Array.from({ length: 15 }).map((_, i) => ({
  id: (i + 1).toString(),
  firstName: 'Mijoz',
  lastName: `${i + 1}`,
  age: 20 + Math.floor(Math.random() * 40),
  status: 'Faol',
  visitTimestamp: new Date().toLocaleString(),
  joinedDate: '2024-03-01',
  activity: 'Katalog ko\'rildi',
}));

export const MOCK_CARS = generateMockCars(1500);
export const CATEGORIES = Object.values(CarCategory);
export const REGIONS = Object.values(Region);
export const BRANDS = Object.keys(BRANDS_MODELS);
