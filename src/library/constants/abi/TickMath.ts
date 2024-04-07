import { Abi } from 'viem'

const TICK_MATH_ABI: Abi = [
	{
		"inputs": [
			{
				"internalType": "uint160",
				"name": "_price",
				"type": "uint160"
			}
		],
		"name": "getPriceAndTick",
		"outputs": [
			{
				"internalType": "int24",
				"name": "tick",
				"type": "int24"
			},
			{
				"internalType": "uint160",
				"name": "price",
				"type": "uint160"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int24",
				"name": "tick",
				"type": "int24"
			}
		],
		"name": "getSqrtRatioAtTick",
		"outputs": [
			{
				"internalType": "uint160",
				"name": "price",
				"type": "uint160"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint160",
				"name": "price",
				"type": "uint160"
			}
		],
		"name": "getTickAtSqrtRatio",
		"outputs": [
			{
				"internalType": "int24",
				"name": "tick",
				"type": "int24"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
] as Abi

export default TICK_MATH_ABI
