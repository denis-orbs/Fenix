export const algebraQuoterV2ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_factory',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_WNativeToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_poolDeployer',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'WNativeToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'amount0Delta',
        type: 'int256',
      },
      {
        internalType: 'int256',
        name: 'amount1Delta',
        type: 'int256',
      },
      {
        internalType: 'bytes',
        name: 'path',
        type: 'bytes',
      },
    ],
    name: 'algebraSwapCallback',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolDeployer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'path',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'amountInRequired',
        type: 'uint256',
      },
    ],
    name: 'quoteExactInput',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint160[]',
        name: 'sqrtPriceX96AfterList',
        type: 'uint160[]',
      },
      {
        internalType: 'uint32[]',
        name: 'initializedTicksCrossedList',
        type: 'uint32[]',
      },
      {
        internalType: 'uint256',
        name: 'gasEstimate',
        type: 'uint256',
      },
      {
        internalType: 'uint16[]',
        name: 'feeList',
        type: 'uint16[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'tokenOut',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amountIn',
            type: 'uint256',
          },
          {
            internalType: 'uint160',
            name: 'limitSqrtPrice',
            type: 'uint160',
          },
        ],
        internalType: 'struct IQuoterV2.QuoteExactInputSingleParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'quoteExactInputSingle',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint160',
        name: 'sqrtPriceX96After',
        type: 'uint160',
      },
      {
        internalType: 'uint32',
        name: 'initializedTicksCrossed',
        type: 'uint32',
      },
      {
        internalType: 'uint256',
        name: 'gasEstimate',
        type: 'uint256',
      },
      {
        internalType: 'uint16',
        name: 'fee',
        type: 'uint16',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'path',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'amountOutRequired',
        type: 'uint256',
      },
    ],
    name: 'quoteExactOutput',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint160[]',
        name: 'sqrtPriceX96AfterList',
        type: 'uint160[]',
      },
      {
        internalType: 'uint32[]',
        name: 'initializedTicksCrossedList',
        type: 'uint32[]',
      },
      {
        internalType: 'uint256',
        name: 'gasEstimate',
        type: 'uint256',
      },
      {
        internalType: 'uint16[]',
        name: 'feeList',
        type: 'uint16[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'tokenOut',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint160',
            name: 'limitSqrtPrice',
            type: 'uint160',
          },
        ],
        internalType: 'struct IQuoterV2.QuoteExactOutputSingleParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'quoteExactOutputSingle',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint160',
        name: 'sqrtPriceX96After',
        type: 'uint160',
      },
      {
        internalType: 'uint32',
        name: 'initializedTicksCrossed',
        type: 'uint32',
      },
      {
        internalType: 'uint256',
        name: 'gasEstimate',
        type: 'uint256',
      },
      {
        internalType: 'uint16',
        name: 'fee',
        type: 'uint16',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
