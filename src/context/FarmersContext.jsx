/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  initializeStorage,
  loadAllCollections,
  farmersStore,
  farmsStore,
  cropsStore,
  regionsStore,
  districtsStore,
  regionalPricesStore,
  outputVerificationsStore,
} from '../services/storage.js'

const FarmersContext = createContext(null)

export function FarmersProvider({ children }) {
  const [data, setData] = useState(() => {
    initializeStorage()
    return loadAllCollections()
  })

  const refresh = useCallback(() => {
    setData(loadAllCollections())
  }, [])

  const createCrud = useCallback((store, setCollection) => {
    return {
      add: (item) => {
        const saved = store.add(item)
        setCollection((list) => [...list, saved])
        return saved
      },
      update: (id, changes) => {
        const updated = store.update(id, changes)
        if (updated) {
          setCollection((list) => list.map((item) => (item.id === id ? updated : item)))
        }
        return updated
      },
      delete: (id) => {
        store.delete(id)
        setCollection((list) => list.filter((item) => item.id !== id))
      },
    }
  }, [])

  const value = useMemo(() => {
    const { farmers, farms, crops, regions, districts, regionalPrices, outputVerifications } = data

    const getFarmer = (id) => farmers.find((f) => f.id === id) || null
    const getFarm = (id) => farms.find((f) => f.id === id) || null
    const getCrop = (id) => crops.find((c) => c.id === id) || null
    const getRegion = (id) => regions.find((r) => r.id === id) || null
    const getDistrict = (id) => districts.find((d) => d.id === id) || null

    const farmerName = (id) => {
      const farmer = getFarmer(id)
      return farmer ? `${farmer.firstName} ${farmer.lastName}` : 'Unknown'
    }
    const cropName = (id) => (getCrop(id)?.name ?? 'Unknown')
    const regionName = (id) => (getRegion(id)?.name ?? 'Unknown')
    const districtName = (id) => (getDistrict(id)?.name ?? 'Unknown')

    const farmsByRegion = (regionId) => farms.filter((farm) => farm.regionId === regionId)
    const farmsByOwner = (ownerId) => farms.filter((farm) => farm.ownerId === ownerId)
    const districtsOfRegion = (regionId) => districts.filter((d) => d.regionId === regionId)

    return {
      farmers,
      farms,
      crops,
      regions,
      districts,
      regionalPrices,
      outputVerifications,
      totals: {
        farmers: farmers.length,
        farms: farms.length,
        crops: crops.length,
        regions: regions.length,
        districts: districts.length,
        output: farms.reduce((sum, farm) => sum + (Number(farm.totalOutput) || 0), 0),
      },
      getFarmer,
      getFarm,
      getCrop,
      getRegion,
      getDistrict,
      farmerName,
      cropName,
      regionName,
      districtName,
      farmsByRegion,
      farmsByOwner,
      districtsOfRegion,
      farmersCrud: createCrud(farmersStore, (fn) =>
        setData((prev) => ({ ...prev, farmers: fn(prev.farmers) })),
      ),
      farmsCrud: createCrud(farmsStore, (fn) =>
        setData((prev) => ({ ...prev, farms: fn(prev.farms) })),
      ),
      cropsCrud: createCrud(cropsStore, (fn) =>
        setData((prev) => ({ ...prev, crops: fn(prev.crops) })),
      ),
      regionsCrud: createCrud(regionsStore, (fn) =>
        setData((prev) => ({ ...prev, regions: fn(prev.regions) })),
      ),
      districtsCrud: createCrud(districtsStore, (fn) =>
        setData((prev) => ({ ...prev, districts: fn(prev.districts) })),
      ),
      regionalPricesCrud: createCrud(regionalPricesStore, (fn) =>
        setData((prev) => ({ ...prev, regionalPrices: fn(prev.regionalPrices) })),
      ),
      outputVerificationsCrud: createCrud(outputVerificationsStore, (fn) =>
        setData((prev) => ({ ...prev, outputVerifications: fn(prev.outputVerifications) })),
      ),
      refresh,
    }
  }, [data, createCrud, refresh])

  return <FarmersContext.Provider value={value}>{children}</FarmersContext.Provider>
}

export function useFarmers() {
  const context = useContext(FarmersContext)
  if (!context) {
    throw new Error('useFarmers must be used within a FarmersProvider')
  }
  return context
}