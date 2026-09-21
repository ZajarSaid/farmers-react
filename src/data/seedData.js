import { hashPassword } from '../utils/auth.js'

const REGION_DISTRICTS = {
  Arusha: ['Arumeru', 'Karatu', 'Longido', 'Meru', 'Monduli', 'Ngorongoro'],
  'Dar es Salaam': ['Ilala', 'Kinondoni', 'Kigamboni', 'Temeke', 'Ubungo'],
  Dodoma: ['Bahi', 'Chamwino', 'Kondoa', 'Kongwa', 'Mpwapwa'],
  Iringa: ['Iringa', 'Kilolo', 'Mafinga', 'Mufindi'],
  Kilimanjaro: ['Hai', 'Moshi', 'Mwanga', 'Rombo', 'Same', 'Siha'],
  Mbeya: ['Busokelo', 'Chunya', 'Kyela', 'Mbarali', 'Mbozi', 'Rungwe'],
  Morogoro: ['Gairo', 'Kilombero', 'Kilosa', 'Mvomero', 'Ulanga'],
  Mwanza: ['Ilemela', 'Magu', 'Misungwi', 'Nyamagana', 'Sengerema', 'Ukerewe'],
  Tanga: ['Handeni', 'Kilindi', 'Korogwe', 'Lushoto', 'Muheza', 'Pangani'],
}

const CROPS = [
  { name: 'Maize', cropType: 'Food' },
  { name: 'Rice', cropType: 'Food' },
  { name: 'Sorghum', cropType: 'Food' },
  { name: 'Wheat', cropType: 'Food' },
  { name: 'Beans', cropType: 'Food' },
  { name: 'Cassava', cropType: 'Food' },
  { name: 'Sweet Potatoes', cropType: 'Food' },
  { name: 'Potatoes', cropType: 'Food' },
  { name: 'Bananas', cropType: 'Food' },
  { name: 'Tomatoes', cropType: 'Food' },
  { name: 'Onions', cropType: 'Food' },
  { name: 'Cabbages', cropType: 'Food' },
  { name: 'Pineapples', cropType: 'Food' },
  { name: 'Coffee', cropType: 'Cash' },
  { name: 'Cotton', cropType: 'Cash' },
  { name: 'Tea', cropType: 'Cash' },
  { name: 'Tobacco', cropType: 'Cash' },
  { name: 'Cashew Nuts', cropType: 'Cash' },
  { name: 'Sunflower', cropType: 'Cash' },
]

const FARMERS = [
  { id: 'farmer-juma', username: 'juma.mwakyusa', firstName: 'Juma', lastName: 'Mwakyusa', email: 'juma.mwakyusa@example.com', phone: '+255 755 301 204', address: 'Moshi Rural, Kilimanjaro', status: 'Advancedfarmer', dateJoined: '2024-02-10' },
  { id: 'farmer-neema', username: 'neema.massawe', firstName: 'Neema', lastName: 'Massawe', email: 'neema.massawe@example.com', phone: '+255 762 448 915', address: 'Meru, Arusha', status: 'MediumFarmer', dateJoined: '2024-03-22' },
  { id: 'farmer-baraka', username: 'baraka.shayo', firstName: 'Baraka', lastName: 'Shayo', email: 'baraka.shayo@example.com', phone: '+255 713 209 634', address: 'Kyela, Mbeya', status: 'Advancedfarmer', dateJoined: '2024-01-05' },
  { id: 'farmer-zawadi', username: 'zawadi.kimaro', firstName: 'Zawadi', lastName: 'Kimaro', email: 'zawadi.kimaro@example.com', phone: '+255 788 512 271', address: 'Kilosa, Morogoro', status: 'MediumFarmer', dateJoined: '2024-05-14' },
  { id: 'farmer-emmanuel', username: 'emmanuel.mtenga', firstName: 'Emmanuel', lastName: 'Mtenga', email: 'emmanuel.mtenga@example.com', phone: '+255 769 284 447', address: 'Iringa, Iringa', status: 'Advancedfarmer', dateJoined: '2024-07-18' },
  { id: 'farmer-admin-zakaria', username: 'Admin', firstName: 'Zakaria', lastName: 'Administrator', email: 'admin@gmail.com', phone: '+255 700 000 000', address: 'Dar es Salaam, Tanzania', status: 'Advancedfarmer', dateJoined: '2024-01-01', isAdmin: true },
]

const FARMS = [
  { id: 'farm-01', name: 'Maziwa Estate', size: 3.5, cropName: 'Coffee', regionName: 'Kilimanjaro', districtName: 'Moshi Rural', ownerId: 'farmer-juma', cultivationStartDate: '2024-09-01', totalOutput: 4820, createdAt: '2024-09-10' },
  { id: 'farm-02', name: 'Kilimo Bora Shamba', size: 6.0, cropName: 'Maize', regionName: 'Arusha', districtName: 'Meru', ownerId: 'farmer-neema', cultivationStartDate: '2024-11-15', totalOutput: 12400, createdAt: '2024-11-20' },
  { id: 'farm-03', name: 'Ushindi Farm', size: 4.2, cropName: 'Rice', regionName: 'Mbeya', districtName: 'Kyela', ownerId: 'farmer-baraka', cultivationStartDate: '2024-10-01', totalOutput: 18600, createdAt: '2024-10-08' },
  { id: 'farm-04', name: 'Green Valley Gardens', size: 2.8, cropName: 'Tomatoes', regionName: 'Morogoro', districtName: 'Kilosa', ownerId: 'farmer-zawadi', cultivationStartDate: '2025-01-12', totalOutput: 9800, createdAt: '2025-01-15' },
  { id: 'farm-07', name: 'Mtenga Highlands', size: 5.5, cropName: 'Potatoes', regionName: 'Iringa', districtName: 'Iringa', ownerId: 'farmer-emmanuel', cultivationStartDate: '2024-10-20', totalOutput: 15700, createdAt: '2024-10-25' },
]

const PRICE_REGIONS = ['Arusha', 'Dodoma', 'Kilimanjaro', 'Iringa', 'Mbeya', 'Morogoro']
const PRICE_CROP_MIN = { Coffee: 6500, Cotton: 2800, Tea: 3200, Rice: 2200, Maize: 900, Beans: 2500, Potatoes: 1500, 'Sweet Potatoes': 800, Cassava: 500, Bananas: 600, Tomatoes: 1200, Onions: 1800, Cabbages: 700, Sunflower: 1600 }

function buildSeedData() {
  const regions = Object.keys(REGION_DISTRICTS).map((name) => ({
    id: `region-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
  }))

  const districts = []
  Object.entries(REGION_DISTRICTS).forEach(([regionName, districtNames]) => {
    const region = regions.find((r) => r.name === regionName)
    districtNames.forEach((name) => {
      districts.push({
        id: `district-${regionName.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/\s+/g, '-')}`,
        name,
        regionId: region.id,
      })
    })
  })

  const crops = CROPS.map((crop) => ({
    id: `crop-${crop.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: crop.name,
    cropType: crop.cropType,
    createdAt: '2024-01-15',
  }))

  const farmers = FARMERS.map((farmer) => {
    const salt = `seed-${farmer.id}`
    return {
      ...farmer,
      image: null,
      isAdmin: Boolean(farmer.isAdmin),
      passwordSalt: salt,
      passwordHash: hashPassword(farmer.isAdmin ? 'admin123' : 'farmer123', salt),
    }
  })

  const idBy = (name) => name.toLowerCase().replace(/\s+/g, '-')
  const farms = FARMS.map((farm) => ({
    id: farm.id,
    name: farm.name,
    size: farm.size,
    cropId: `crop-${idBy(farm.cropName)}`,
    regionId: `region-${idBy(farm.regionName)}`,
    districtId: `district-${idBy(farm.regionName)}-${idBy(farm.districtName)}`,
    ownerId: farm.ownerId,
    cultivationStartDate: farm.cultivationStartDate,
    totalOutput: farm.totalOutput,
    createdAt: farm.createdAt,
  }))

  const regionalPrices = []
  let priceCounter = 1
  PRICE_REGIONS.forEach((regionName) => {
    CROPS.forEach((crop) => {
      const base = PRICE_CROP_MIN[crop.name] ?? 1200
      const variation = Math.round(base * (0.4 + Math.random() * 0.9))
      const price = Number((base + variation).toFixed(2))
      regionalPrices.push({
        id: `price-${String(priceCounter++).padStart(3, '0')}`,
        regionId: `region-${idBy(regionName)}`,
        cropId: `crop-${idBy(crop.name)}`,
        price,
      })
    })
  })

  const outputVerifications = [
    {
      id: 'verification-01',
      ownerId: 'farmer-neema',
      farmName: 'Kilimo Bora Shamba',
      farmOutput: 12400,
      verificationMessage: 'Your farm has been filled with an output of 12400. Click VERIFY to accept or DENY to ignore.',
      pendingMessage: 'Your farm has been denied by you as an unacceptable output. Verify again or contact admin buttons.',
      status: 'pending',
      createdAt: '2026-08-30',
    },
    {
      id: 'verification-02',
      ownerId: 'farmer-baraka',
      farmName: 'Ushindi Farm',
      farmOutput: 18600,
      verificationMessage: 'Your farm has been filled with an output of 18600. Click VERIFY to accept or DENY to ignore.',
      pendingMessage: 'Your farm has been denied by you as an unacceptable output. Verify again or contact admin buttons.',
      status: 'verified',
      createdAt: '2026-08-24',
    },
    {
      id: 'verification-03',
      ownerId: 'farmer-emmanuel',
      farmName: 'Mtenga Highlands',
      farmOutput: 15700,
      verificationMessage: 'Your farm has been filled with an output of 15700. Click VERIFY to accept or DENY to ignore.',
      pendingMessage: 'Your farm has been denied by you as an unacceptable output. Verify again or contact admin buttons.',
      status: 'pending',
      createdAt: '2026-08-18',
    },
  ]

  return { regions, districts, crops, farmers, farms, regionalPrices, outputVerifications: outputVerifications }
}

export default buildSeedData