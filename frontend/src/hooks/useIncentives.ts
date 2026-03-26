import { useQuery } from '@tanstack/react-query'
import { ScavengerClient } from '@/api/client'
import { Incentive, WasteType } from '@/api/types'
import { useContract } from '@/context/ContractContext'
import { networkConfig } from '@/lib/stellar'

const INCENTIVES_STALE_TIME = 30 * 1000 // 30 seconds

export function useIncentives(wasteType?: WasteType) {
  const { config } = useContract()

  const { data, isLoading, isError } = useQuery<Incentive[]>({
    queryKey: ['incentives', wasteType ?? 'all'],
    queryFn: async () => {
      const client = new ScavengerClient({
        rpcUrl: config.rpcUrl,
        networkPassphrase: networkConfig.networkPassphrase,
        contractId: config.contractId,
      })

      if (wasteType !== undefined) {
        return client.getIncentives(wasteType)
      }

      return client.getAllActiveIncentives()
    },
    staleTime: INCENTIVES_STALE_TIME,
  })

  return {
    incentives: data ?? [],
    isLoading,
    isError,
  }
}
