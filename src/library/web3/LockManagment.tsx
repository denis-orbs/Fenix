//@ts-nocheck
import { VeNFTAPIV3Address, VotingEscrowAddress } from './ContractAddresses'
import { getPublicClient, getWalletClient, readContract, writeContract } from '@wagmi/core'
import { Address, Hash } from 'viem'

import { LockElement } from '../structures/lock/LockElement'
import veNFTAPIABIV3 from './abis/VeNFTAPIV3ABI'
import votingEscrowABI from './abis/veFNX'
import { encodeFunctionData } from 'viem'
import { config } from '@/src/app/layout'

export async function getUserVeFNXLockPositions(user: Address, retry = true): Promise<LockElement[]> {
  try {
    const nfts = await readContract(config, {
      // name: 'VeNFTAPI',
      address: VeNFTAPIV3Address,
      abi: veNFTAPIABIV3,
      functionName: 'getNFTFromAddress',
      args: [user],
    })
    const parsedElements: LockElement[] = []

    nfts.map((nft) => {
      parsedElements.push({
        veNFTInfo: {
          decimals: nft.decimals,
          voted: nft.voted,
          attachments: nft.attachments,
          id: nft.id,
          amount: nft.amount,
          voting_amount: nft.voting_amount,
          //uint256 rebase_amount;
          lockEnd: nft.lockEnd,
          vote_ts: Number(nft.vote_ts),
          votes: nft.votes,

          account: nft.account,

          token: nft.token,
          tokenSymbol: nft.tokenSymbol,
          tokenDecimals: Number(nft.tokenDecimals),
        },
      })
    })
    return parsedElements
  } catch (e) {
    // console.log(e, 'error')
    if (retry) {
      return getUserVeFNXLockPositions(user, false)
    } else {
      throw e
    }
  }
}
export async function getIdVeFNXLockPositions(id: Number, retry = true): Promise<LockElement> {
  try {
    const nft = (await readContract(config, {
      // name: 'VeNFTAPI',
      address: VeNFTAPIV3Address,
      abi: veNFTAPIABIV3,
      functionName: 'getNFTFromId',
      args: [id],
    })) as any[]

    let parsedElements: LockElement = {}

    parsedElements = {
      veNFTInfo: {
        decimals: nft.decimals,
        voted: nft.voted,
        attachments: nft.attachments,
        id: nft.id,
        amount: nft.amount,
        voting_amount: nft.voting_amount,
        //uint256 rebase_amount;
        lockEnd: nft.lockEnd,
        vote_ts: Number(nft.vote_ts),
        votes: nft.votes,

        account: nft.account,

        token: nft.token,
        tokenSymbol: nft.tokenSymbol,
        tokenDecimals: Number(nft.tokenDecimals),
      },
    }
    return parsedElements
  } catch (e) {
    if (retry) {
      return getUserVeFNXLockPositions(user, false)
    } else {
      throw e
    }
  }
}

export async function createLock(fnxAmount: bigint, lockDuration: number): Promise<Hash> {
  const data = await writeContract(config, {
    address: VotingEscrowAddress,
    abi: votingEscrowABI,
    functionName: 'create_lock',
    args: [fnxAmount, BigInt(lockDuration)],
  })

  return data?.hash as Hash
}

export async function mergeLock(tokenId1: number, tokenId2: number): Promise<Hash> {
  const data = await writeContract(config, {
    address: VotingEscrowAddress,
    abi: votingEscrowABI,
    functionName: 'merge',
    args: [tokenId1, tokenId2],
  })

  return data as Hash
}

export async function transferLock(from: Address, to: Address, tokenId: number) {
  const data = await writeContract(config, {
    address: VotingEscrowAddress,
    abi: votingEscrowABI,
    functionName: 'transferFrom',
    args: [from, to, tokenId],
  })

  return data as Hash
}

export async function splitLock(cachos: number[], tokenId: number) {
  const data = await writeContract(config, {
    address: VotingEscrowAddress,
    abi: votingEscrowABI,
    functionName: 'split',
    args: [cachos, tokenId],
  })

  return data as Hash
}

export async function increaseLock(tokenId: number, amount: bigint): Promise<Hash> {
  const data = await writeContract(config, {
    address: VotingEscrowAddress,
    abi: votingEscrowABI,
    functionName: 'increase_amount',
    args: [tokenId, amount],
  })

  return data as Hash
}

export async function increaseLockUntilTime(tokenId: number, lockUntil: number): Promise<Hash> {
  const data = await writeContract(config, {
    address: VotingEscrowAddress,
    abi: votingEscrowABI,
    functionName: 'increase_unlock_time',
    args: [tokenId, lockUntil],
  })

  return data as Hash
}

export async function withdraw(tokenId: BigInt): Promise<Hash> {
  const provider = getPublicClient(config)
  const signer = await getWalletClient(config)
  const gas = await provider?.estimateGas({
    // args: [tokenId],
    data: encodeFunctionData({
      abi: votingEscrowABI,
      functionName: 'withdraw',
      args: [tokenId],
    }),
    to: VotingEscrowAddress,
    account: signer.account,
  })
  console.log('gas', gas?.toString())
  const data = await writeContract(config, {
    address: VotingEscrowAddress,
    abi: votingEscrowABI,
    functionName: 'withdraw',
    args: [tokenId],
    gas: gas,
  })

  return data as Hash
}
