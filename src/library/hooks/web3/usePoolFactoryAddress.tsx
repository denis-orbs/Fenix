// import { IToken } from '@/src/library/types'
// import { useEffect, useState } from 'react'
// import { Abi, Address, zeroAddress } from 'viem'
// import { createConfig, useReadContract, useWriteContract } from 'wagmi'

// const usePoolFactoryAddress = (
//   tokenSell: IToken,
//   tokenGet: IToken,
//   POOL_FACTORY_ADDRESS: Address,
//   algebraFactoryABI: Abi
// ) => {
//   const [poolFactoryAddress, setPoolFactoryAddress] = useState(zeroAddress)
//   // Utilizar un objeto para actuar como caché
//   const cache = {}

//   useEffect(() => {
//     // Crear un identificador único para el par de tokens basado en sus direcciones
//     const [firstToken, secondToken] = [tokenSell.address, tokenGet.address].sort()
//     const cacheKey = `${firstToken}_${secondToken}`

//     const fetchData = async () => {
//       // Verificar si la información ya está en el caché
//       if (cache[cacheKey]) {
//         setPoolFactoryAddress(cache[cacheKey])
//       } else {
//         const result = await useReadContract({
//           address: POOL_FACTORY_ADDRESS,
//           functionName: 'poolByPair',
//           args: [`0x${firstToken}`, `0x${secondToken}`],
//           abi: algebraFactoryABI,
//         })
//         const addressResult = result?.data || zeroAddress
//         // Almacenar el resultado en el caché
//         cache[cacheKey] = addressResult
//         setPoolFactoryAddress(addressResult)
//       }
//     }

//     fetchData()
//   }, [tokenSell.address, tokenGet.address, POOL_FACTORY_ADDRESS, algebraFactoryABI]) // Dependencias del efecto

//   return poolFactoryAddress
// }
