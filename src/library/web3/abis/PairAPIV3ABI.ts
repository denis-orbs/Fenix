const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'Owner',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldVoter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newVoter',
        type: 'address',
      },
    ],
    name: 'Voter',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldWBF',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newWBF',
        type: 'address',
      },
    ],
    name: 'WBF',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MAX_EPOCHS',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_PAIRS',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_REWARDS',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'WEEK',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amounts',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_offset',
        type: 'uint256',
      },
    ],
    name: 'getAllCLPair',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'pair_address',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'decimals',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'stable',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'total_supply',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'clPool',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'dysonPool',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'feeAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'token0',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'token0_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'token0_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserve0',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimable0',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'token1',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'token1_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'token1_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserve1',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimable1',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'gauge',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'gauge_total_supply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gauge_total_weight',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'fee',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bribe',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'emissions',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'emissions_token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'emissions_token_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_lp_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_token0_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_token1_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_total_weight',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_earned',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'token_id',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'symbol',
                type: 'string',
              },
              {
                internalType: 'address',
                name: 'pair_address',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'vault_address',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'gauge',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'lp_balance',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'weight',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'emissions_claimable',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maturity_time',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maturity_multiplier',
                type: 'uint256',
              },
            ],
            internalType: 'struct IMaGaugeStruct.MaNftInfo[]',
            name: 'tokens_info_of_account',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'dysonStrategy',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_a0Expect',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_a1Expect',
            type: 'uint256',
          },
        ],
        internalType: 'struct PairAPIV3.pairInfo[]',
        name: 'Pairs',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amounts',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_offset',
        type: 'uint256',
      },
    ],
    name: 'getAllPair',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'pair_address',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'decimals',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'stable',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'total_supply',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'clPool',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'dysonPool',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'feeAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'token0',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'token0_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'token0_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserve0',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimable0',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'token1',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'token1_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'token1_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserve1',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimable1',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'gauge',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'gauge_total_supply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gauge_total_weight',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'fee',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bribe',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'emissions',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'emissions_token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'emissions_token_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_lp_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_token0_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_token1_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_total_weight',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_earned',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'token_id',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'symbol',
                type: 'string',
              },
              {
                internalType: 'address',
                name: 'pair_address',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'vault_address',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'gauge',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'lp_balance',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'weight',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'emissions_claimable',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maturity_time',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maturity_multiplier',
                type: 'uint256',
              },
            ],
            internalType: 'struct IMaGaugeStruct.MaNftInfo[]',
            name: 'tokens_info_of_account',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'dysonStrategy',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_a0Expect',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_a1Expect',
            type: 'uint256',
          },
        ],
        internalType: 'struct PairAPIV3.pairInfo[]',
        name: 'Pairs',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    name: 'getCLPair',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'pair_address',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'decimals',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'stable',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'total_supply',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'clPool',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'dysonPool',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'feeAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'token0',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'token0_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'token0_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserve0',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimable0',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'token1',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'token1_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'token1_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserve1',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimable1',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'gauge',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'gauge_total_supply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gauge_total_weight',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'fee',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bribe',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'emissions',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'emissions_token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'emissions_token_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_lp_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_token0_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_token1_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_total_weight',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_earned',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'token_id',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'symbol',
                type: 'string',
              },
              {
                internalType: 'address',
                name: 'pair_address',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'vault_address',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'gauge',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'lp_balance',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'weight',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'emissions_claimable',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maturity_time',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maturity_multiplier',
                type: 'uint256',
              },
            ],
            internalType: 'struct IMaGaugeStruct.MaNftInfo[]',
            name: 'tokens_info_of_account',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'dysonStrategy',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_a0Expect',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_a1Expect',
            type: 'uint256',
          },
        ],
        internalType: 'struct PairAPIV3.pairInfo',
        name: '_pairInfo',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_gauge',
        type: 'address',
      },
    ],
    name: 'getGaugeMaNFTsOfOwner',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'token_id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'pair_address',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'vault_address',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'gauge',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'lp_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'weight',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'emissions_claimable',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maturity_time',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maturity_multiplier',
            type: 'uint256',
          },
        ],
        internalType: 'struct IMaGaugeStruct.MaNftInfo[]',
        name: '_tokens',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_pair',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    name: 'getPair',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'pair_address',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'decimals',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'stable',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'total_supply',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'clPool',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'dysonPool',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'feeAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'token0',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'token0_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'token0_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserve0',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimable0',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'token1',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'token1_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'token1_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserve1',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimable1',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'gauge',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'gauge_total_supply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gauge_total_weight',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'fee',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bribe',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'emissions',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'emissions_token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'emissions_token_decimals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_lp_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_token0_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_token1_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_balance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_total_weight',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'account_gauge_earned',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'token_id',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'symbol',
                type: 'string',
              },
              {
                internalType: 'address',
                name: 'pair_address',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'vault_address',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'gauge',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'lp_balance',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'weight',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'emissions_claimable',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maturity_time',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maturity_multiplier',
                type: 'uint256',
              },
            ],
            internalType: 'struct IMaGaugeStruct.MaNftInfo[]',
            name: 'tokens_info_of_account',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'dysonStrategy',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_a0Expect',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_a1Expect',
            type: 'uint256',
          },
        ],
        internalType: 'struct PairAPIV3.pairInfo',
        name: '_pairInfo',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amounts',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_offset',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_pair',
        type: 'address',
      },
    ],
    name: 'getPairBribe',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'epochTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalVotes',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'pair',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint8',
                name: 'decimals',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'symbol',
                type: 'string',
              },
            ],
            internalType: 'struct PairAPIV3.tokenBribe[]',
            name: 'bribes',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct PairAPIV3.pairBribeEpoch[]',
        name: '_pairEpoch',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_voter',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_pair',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'left',
    outputs: [
      {
        internalType: 'uint256',
        name: '_rewPerEpoch',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
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
    name: 'pairFactory',
    outputs: [
      {
        internalType: 'contract IPairFactory',
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
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_voter',
        type: 'address',
      },
    ],
    name: 'setVoter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'underlyingToken',
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
    name: 'voter',
    outputs: [
      {
        internalType: 'contract IVoterV3',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'wBribeFactory',
    outputs: [
      {
        internalType: 'contract IWrappedBribeFactory',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export default abi
