import { Bribes } from '../../../web3/apis/RewardAPIData'
import { Token, TokenData } from '../../../structures/common/TokenData'
import { Address } from 'viem'
import rewardsClient from '../RewardsClient'
import { FETCH_CURRENT_EPOCH_BRIBES } from '../queries/BribesQueries'

export async function getCurrentEpochRewardTokens(availableTokensDictionary: {
  [address: string]: Token
}): Promise<{ [bribeAddr: string]: Bribes }> {
  try {
    const bribeList: any[] = []
    let page = 0
    let queryResult: any[] = []
    do {
      const bribes = (await rewardsClient.query({
        query: FETCH_CURRENT_EPOCH_BRIBES(page),
        fetchPolicy: 'cache-first',
      })) as any

      queryResult = bribes.data.rewards || []
      bribeList.push(...(queryResult || []))
      page++
    } while (queryResult && queryResult.length > 0)

    const joinedBribes: any = {}
    bribeList.forEach((bribe) => {
      const addr = bribe.bribe.id.toLowerCase()

      const tokenAddr = bribe.tokenAddress.toLowerCase()
      const tokenAmount = bribe.tokenAmount ?? 0

      if (!joinedBribes[addr]) joinedBribes[addr] = {}

      if (!joinedBribes[addr][tokenAddr]) {
        joinedBribes[addr][tokenAddr] = BigInt(tokenAmount)
      } else {
        joinedBribes[addr][tokenAddr] += BigInt(tokenAmount)
      }
    })

    const parsedBribeList: Bribes[] = []

    for (const bribeAddr of Object.keys(joinedBribes)) {
      const tokensList: Address[] = []
      const symbolsList: string[] = []
      const decimalsList: bigint[] = []
      const amountsList: bigint[] = []

      for (const tokenAddr of Object.keys(joinedBribes[bribeAddr])) {
        const token = availableTokensDictionary[tokenAddr]
        if (!token) {
          continue
        }
        tokensList.push(tokenAddr as Address)
        symbolsList.push(availableTokensDictionary[tokenAddr].symbol)
        decimalsList.push(BigInt(availableTokensDictionary[tokenAddr].decimals))
        amountsList.push(BigInt(joinedBribes[bribeAddr][tokenAddr] ?? 0))
      }

      parsedBribeList.push({
        bribe: bribeAddr as Address,
        tokens: tokensList,
        symbols: symbolsList,
        decimals: decimalsList,
        amounts: amountsList,
      })
    }

    const bribeDictionary: any = {}

    parsedBribeList.forEach((bribe) => {
      bribeDictionary[bribe.bribe] = bribe
    })

    return bribeDictionary

    // return bribeList;
  } catch (e) {
    // console.log(e)
    return {}
  }
}
