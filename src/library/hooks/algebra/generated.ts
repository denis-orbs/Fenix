import {
  getContract,
  GetContractArgs,
  readContract,
  ReadContractConfig,
  writeContract,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
} from 'wagmi/actions'

import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
} from 'wagmi'
import { ReadContractResult, WriteContractMode, PrepareWriteContractResult } from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraBasePlugin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraBasePluginABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_pluginFactory', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'targetIsTooOld' },
  { type: 'error', inputs: [], name: 'volatilityOracleAlreadyInitialized' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeConfig',
        internalType: 'struct AlgebraFeeConfiguration',
        type: 'tuple',
        components: [
          { name: 'alpha1', internalType: 'uint16', type: 'uint16' },
          { name: 'alpha2', internalType: 'uint16', type: 'uint16' },
          { name: 'beta1', internalType: 'uint32', type: 'uint32' },
          { name: 'beta2', internalType: 'uint32', type: 'uint32' },
          { name: 'gamma1', internalType: 'uint16', type: 'uint16' },
          { name: 'gamma2', internalType: 'uint16', type: 'uint16' },
          { name: 'baseFee', internalType: 'uint16', type: 'uint16' },
        ],
        indexed: false,
      },
    ],
    name: 'FeeConfiguration',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newIncentive',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Incentive',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newPlugin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'LimitOrderPlugin',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ALGEBRA_BASE_PLUGIN_MANAGER',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterFlash',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
    ],
    name: 'afterInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int128', type: 'int128' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeFlash',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'beforeInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int128', type: 'int128' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct AlgebraFeeConfiguration',
        type: 'tuple',
        components: [
          { name: 'alpha1', internalType: 'uint16', type: 'uint16' },
          { name: 'alpha2', internalType: 'uint16', type: 'uint16' },
          { name: 'beta1', internalType: 'uint32', type: 'uint32' },
          { name: 'beta2', internalType: 'uint32', type: 'uint32' },
          { name: 'gamma1', internalType: 'uint16', type: 'uint16' },
          { name: 'gamma2', internalType: 'uint16', type: 'uint16' },
          { name: 'baseFee', internalType: 'uint16', type: 'uint16' },
        ],
      },
    ],
    name: 'changeFeeConfiguration',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'defaultPluginConfig',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeConfig',
    outputs: [
      { name: 'alpha1', internalType: 'uint16', type: 'uint16' },
      { name: 'alpha2', internalType: 'uint16', type: 'uint16' },
      { name: 'beta1', internalType: 'uint32', type: 'uint32' },
      { name: 'beta2', internalType: 'uint32', type: 'uint32' },
      { name: 'gamma1', internalType: 'uint16', type: 'uint16' },
      { name: 'gamma2', internalType: 'uint16', type: 'uint16' },
      { name: 'baseFee', internalType: 'uint16', type: 'uint16' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentFee',
    outputs: [{ name: 'fee', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'secondsAgo', internalType: 'uint32', type: 'uint32' }],
    name: 'getSingleTimepoint',
    outputs: [
      { name: 'tickCumulative', internalType: 'int56', type: 'int56' },
      { name: 'volatilityCumulative', internalType: 'uint88', type: 'uint88' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'secondsAgos', internalType: 'uint32[]', type: 'uint32[]' }],
    name: 'getTimepoints',
    outputs: [
      { name: 'tickCumulatives', internalType: 'int56[]', type: 'int56[]' },
      {
        name: 'volatilityCumulatives',
        internalType: 'uint88[]',
        type: 'uint88[]',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'incentive',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'targetIncentive', internalType: 'address', type: 'address' }],
    name: 'isIncentiveConnected',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isInitialized',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastTimepointTimestamp',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'limitOrderPlugin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pool',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'startIndex', internalType: 'uint16', type: 'uint16' },
      { name: 'amount', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'prepayTimepointsStorageSlots',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newIncentive', internalType: 'address', type: 'address' }],
    name: 'setIncentive',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'plugin', internalType: 'address', type: 'address' }],
    name: 'setLimitOrderPlugin',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'timepointIndex',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'timepoints',
    outputs: [
      { name: 'initialized', internalType: 'bool', type: 'bool' },
      { name: 'blockTimestamp', internalType: 'uint32', type: 'uint32' },
      { name: 'tickCumulative', internalType: 'int56', type: 'int56' },
      { name: 'volatilityCumulative', internalType: 'uint88', type: 'uint88' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
      { name: 'averageTick', internalType: 'int24', type: 'int24' },
      { name: 'windowStartIndex', internalType: 'uint16', type: 'uint16' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraFactoryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_poolDeployer', internalType: 'address', type: 'address' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newDefaultCommunityFee',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'DefaultCommunityFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newFarmingAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'FarmingAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'alpha1',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      {
        name: 'alpha2',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      { name: 'beta1', internalType: 'uint32', type: 'uint32', indexed: false },
      { name: 'beta2', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'gamma1',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      {
        name: 'gamma2',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      {
        name: 'baseFee',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'FeeConfiguration',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token0',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token1',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'pool',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Pool',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'renounceOwnershipFinished',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'finishTimestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'renounceOwnershipStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'renounceOwnershipStopped',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseFeeConfiguration',
    outputs: [
      { name: 'alpha1', internalType: 'uint16', type: 'uint16' },
      { name: 'alpha2', internalType: 'uint16', type: 'uint16' },
      { name: 'beta1', internalType: 'uint32', type: 'uint32' },
      { name: 'beta2', internalType: 'uint32', type: 'uint32' },
      { name: 'gamma1', internalType: 'uint16', type: 'uint16' },
      { name: 'gamma2', internalType: 'uint16', type: 'uint16' },
      { name: 'baseFee', internalType: 'uint16', type: 'uint16' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'communityVault',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenA', internalType: 'address', type: 'address' },
      { name: 'tokenB', internalType: 'address', type: 'address' },
    ],
    name: 'createPool',
    outputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'defaultCommunityFee',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'farmingAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRoleMember',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleMemberCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRoleOrOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'poolByPair',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'poolDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'renounceOwnershipStartTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IAlgebraFeeConfiguration.Configuration',
        type: 'tuple',
        components: [
          { name: 'alpha1', internalType: 'uint16', type: 'uint16' },
          { name: 'alpha2', internalType: 'uint16', type: 'uint16' },
          { name: 'beta1', internalType: 'uint32', type: 'uint32' },
          { name: 'beta2', internalType: 'uint32', type: 'uint32' },
          { name: 'gamma1', internalType: 'uint16', type: 'uint16' },
          { name: 'gamma2', internalType: 'uint16', type: 'uint16' },
          { name: 'baseFee', internalType: 'uint16', type: 'uint16' },
        ],
      },
    ],
    name: 'setBaseFeeConfiguration',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newDefaultCommunityFee', internalType: 'uint8', type: 'uint8' }],
    name: 'setDefaultCommunityFee',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newFarmingAddress', internalType: 'address', type: 'address' }],
    name: 'setFarmingAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'startRenounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'stopRenounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

export const algebraFactoryAddress = '0x6AD6A4f233F1E33613e996CCc17409B93fF8bf5f' as const

export const algebraFactoryConfig = {
  address: algebraFactoryAddress,
  abi: algebraFactoryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraPoolABI = [
  { type: 'error', inputs: [], name: 'alreadyInitialized' },
  { type: 'error', inputs: [], name: 'arithmeticError' },
  { type: 'error', inputs: [], name: 'bottomTickLowerThanMIN' },
  { type: 'error', inputs: [], name: 'dynamicFeeActive' },
  { type: 'error', inputs: [], name: 'dynamicFeeDisabled' },
  { type: 'error', inputs: [], name: 'flashInsufficientPaid0' },
  { type: 'error', inputs: [], name: 'flashInsufficientPaid1' },
  { type: 'error', inputs: [], name: 'insufficientInputAmount' },
  { type: 'error', inputs: [], name: 'invalidAmountRequired' },
  {
    type: 'error',
    inputs: [{ name: 'selector', internalType: 'bytes4', type: 'bytes4' }],
    name: 'invalidHookResponse',
  },
  { type: 'error', inputs: [], name: 'invalidLimitSqrtPrice' },
  { type: 'error', inputs: [], name: 'invalidNewCommunityFee' },
  { type: 'error', inputs: [], name: 'invalidNewTickSpacing' },
  { type: 'error', inputs: [], name: 'liquidityAdd' },
  { type: 'error', inputs: [], name: 'liquidityOverflow' },
  { type: 'error', inputs: [], name: 'liquiditySub' },
  { type: 'error', inputs: [], name: 'locked' },
  { type: 'error', inputs: [], name: 'notAllowed' },
  { type: 'error', inputs: [], name: 'notInitialized' },
  { type: 'error', inputs: [], name: 'onlyFarming' },
  { type: 'error', inputs: [], name: 'pluginIsNotConnected' },
  { type: 'error', inputs: [], name: 'priceOutOfRange' },
  { type: 'error', inputs: [], name: 'tickInvalidLinks' },
  { type: 'error', inputs: [], name: 'tickIsNotInitialized' },
  { type: 'error', inputs: [], name: 'tickIsNotSpaced' },
  { type: 'error', inputs: [], name: 'tickOutOfRange' },
  { type: 'error', inputs: [], name: 'topTickAboveMAX' },
  { type: 'error', inputs: [], name: 'topTickLowerOrEqBottomTick' },
  { type: 'error', inputs: [], name: 'transferFailed' },
  { type: 'error', inputs: [], name: 'zeroAmountRequired' },
  { type: 'error', inputs: [], name: 'zeroLiquidityActual' },
  { type: 'error', inputs: [], name: 'zeroLiquidityDesired' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bottomTick',
        internalType: 'int24',
        type: 'int24',
        indexed: true,
      },
      { name: 'topTick', internalType: 'int24', type: 'int24', indexed: true },
      {
        name: 'liquidityAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Burn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'bottomTick',
        internalType: 'int24',
        type: 'int24',
        indexed: true,
      },
      { name: 'topTick', internalType: 'int24', type: 'int24', indexed: true },
      {
        name: 'amount0',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
    ],
    name: 'Collect',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'communityFeeNew',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'CommunityFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'fee', internalType: 'uint16', type: 'uint16', indexed: false }],
    name: 'Fee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'paid0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'paid1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Flash',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'price',
        internalType: 'uint160',
        type: 'uint160',
        indexed: false,
      },
      { name: 'tick', internalType: 'int24', type: 'int24', indexed: false },
    ],
    name: 'Initialize',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bottomTick',
        internalType: 'int24',
        type: 'int24',
        indexed: true,
      },
      { name: 'topTick', internalType: 'int24', type: 'int24', indexed: true },
      {
        name: 'liquidityAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newPluginAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Plugin',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newPluginConfig',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'PluginConfig',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'int256',
        type: 'int256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'int256',
        type: 'int256',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint160',
        type: 'uint160',
        indexed: false,
      },
      {
        name: 'liquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      { name: 'tick', internalType: 'int24', type: 'int24', indexed: false },
    ],
    name: 'Swap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newTickSpacing',
        internalType: 'int24',
        type: 'int24',
        indexed: false,
      },
    ],
    name: 'TickSpacing',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'bottomTick', internalType: 'int24', type: 'int24' },
      { name: 'topTick', internalType: 'int24', type: 'int24' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'burn',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'bottomTick', internalType: 'int24', type: 'int24' },
      { name: 'topTick', internalType: 'int24', type: 'int24' },
      { name: 'amount0Requested', internalType: 'uint128', type: 'uint128' },
      { name: 'amount1Requested', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'collect',
    outputs: [
      { name: 'amount0', internalType: 'uint128', type: 'uint128' },
      { name: 'amount1', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'communityFeeLastTimestamp',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'communityVault',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: 'currentFee', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'flash',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCommunityFeePending',
    outputs: [
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getReserves',
    outputs: [
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'globalState',
    outputs: [
      { name: 'price', internalType: 'uint160', type: 'uint160' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
      { name: 'pluginConfig', internalType: 'uint8', type: 'uint8' },
      { name: 'communityFee', internalType: 'uint16', type: 'uint16' },
      { name: 'unlocked', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'initialPrice', internalType: 'uint160', type: 'uint160' }],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'liquidity',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'maxLiquidityPerTick',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'leftoversRecipient', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'bottomTick', internalType: 'int24', type: 'int24' },
      { name: 'topTick', internalType: 'int24', type: 'int24' },
      { name: 'liquidityDesired', internalType: 'uint128', type: 'uint128' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityActual', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nextTickGlobal',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'plugin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'positions',
    outputs: [
      { name: 'liquidity', internalType: 'uint256', type: 'uint256' },
      {
        name: 'innerFeeGrowth0Token',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'innerFeeGrowth1Token',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'fees0', internalType: 'uint128', type: 'uint128' },
      { name: 'fees1', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'prevTickGlobal',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newCommunityFee', internalType: 'uint16', type: 'uint16' }],
    name: 'setCommunityFee',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newFee', internalType: 'uint16', type: 'uint16' }],
    name: 'setFee',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newPluginAddress', internalType: 'address', type: 'address' }],
    name: 'setPlugin',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newConfig', internalType: 'uint8', type: 'uint8' }],
    name: 'setPluginConfig',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newTickSpacing', internalType: 'int24', type: 'int24' }],
    name: 'setTickSpacing',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: 'amountRequired', internalType: 'int256', type: 'int256' },
      { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'swap',
    outputs: [
      { name: 'amount0', internalType: 'int256', type: 'int256' },
      { name: 'amount1', internalType: 'int256', type: 'int256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'leftoversRecipient', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: 'amountToSell', internalType: 'int256', type: 'int256' },
      { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'swapWithPaymentInAdvance',
    outputs: [
      { name: 'amount0', internalType: 'int256', type: 'int256' },
      { name: 'amount1', internalType: 'int256', type: 'int256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tickSpacing',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'int16', type: 'int16' }],
    name: 'tickTable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'int24', type: 'int24' }],
    name: 'ticks',
    outputs: [
      { name: 'liquidityTotal', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityDelta', internalType: 'int128', type: 'int128' },
      { name: 'prevTick', internalType: 'int24', type: 'int24' },
      { name: 'nextTick', internalType: 'int24', type: 'int24' },
      {
        name: 'outerFeeGrowth0Token',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'outerFeeGrowth1Token',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token0',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token1',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalFeeGrowth0Token',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalFeeGrowth1Token',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraPositionManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraPositionManagerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_WNativeToken', internalType: 'address', type: 'address' },
      { name: '_tokenDescriptor_', internalType: 'address', type: 'address' },
      { name: '_poolDeployer', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'tickOutOfRange' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Collect',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'liquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DecreaseLiquidity',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'farmingCenterAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'FarmingCenter',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'FarmingFailed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'liquidityDesired',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'actualLiquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'pool',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'IncreaseLiquidity',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'NONFUNGIBLE_POSITION_MANAGER_ADMINISTRATOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'WNativeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount0Owed', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1Owed', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'algebraMintCallback',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'approve', internalType: 'bool', type: 'bool' },
      { name: 'farmingAddress', internalType: 'address', type: 'address' },
    ],
    name: 'approveForFarming',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct INonfungiblePositionManager.CollectParams',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'amount0Max', internalType: 'uint128', type: 'uint128' },
          { name: 'amount1Max', internalType: 'uint128', type: 'uint128' },
        ],
      },
    ],
    name: 'collect',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token0', internalType: 'address', type: 'address' },
      { name: 'token1', internalType: 'address', type: 'address' },
      { name: 'sqrtPriceX96', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'createAndInitializePoolIfNecessary',
    outputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct INonfungiblePositionManager.DecreaseLiquidityParams',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
          { name: 'amount0Min', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Min', internalType: 'uint256', type: 'uint256' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'decreaseLiquidity',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'farmingApprovals',
    outputs: [
      {
        name: 'farmingCenterAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'farmingCenter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct INonfungiblePositionManager.IncreaseLiquidityParams',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'amount0Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount0Min', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Min', internalType: 'uint256', type: 'uint256' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'increaseLiquidity',
    outputs: [
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isApprovedOrOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct INonfungiblePositionManager.MintParams',
        type: 'tuple',
        components: [
          { name: 'token0', internalType: 'address', type: 'address' },
          { name: 'token1', internalType: 'address', type: 'address' },
          { name: 'tickLower', internalType: 'int24', type: 'int24' },
          { name: 'tickUpper', internalType: 'int24', type: 'int24' },
          { name: 'amount0Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Desired', internalType: 'uint256', type: 'uint256' },
          { name: 'amount0Min', internalType: 'uint256', type: 'uint256' },
          { name: 'amount1Min', internalType: 'uint256', type: 'uint256' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'mint',
    outputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'poolDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'positions',
    outputs: [
      { name: 'nonce', internalType: 'uint88', type: 'uint88' },
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'token0', internalType: 'address', type: 'address' },
      { name: 'token1', internalType: 'address', type: 'address' },
      { name: 'tickLower', internalType: 'int24', type: 'int24' },
      { name: 'tickUpper', internalType: 'int24', type: 'int24' },
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
      {
        name: 'feeGrowthInside0LastX128',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'feeGrowthInside1LastX128',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'tokensOwed0', internalType: 'uint128', type: 'uint128' },
      { name: 'tokensOwed1', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'refundNativeToken',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermit',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitAllowed',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitAllowedIfNecessary',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitIfNecessary',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newFarmingCenter', internalType: 'address', type: 'address' }],
    name: 'setFarmingCenter',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'sweepToken',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'toActive', internalType: 'bool', type: 'bool' },
    ],
    name: 'switchFarmingStatus',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenFarmedIn',
    outputs: [
      {
        name: 'farmingCenterAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'unwrapWNativeToken',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

export const algebraPositionManagerAddress = '0x5AeFBA317BAba46EAF98Fd6f381d07673bcA6467' as const

export const algebraPositionManagerConfig = {
  address: algebraPositionManagerAddress,
  abi: algebraPositionManagerABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraQuoter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraQuoterABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_WNativeToken', internalType: 'address', type: 'address' },
      { name: '_poolDeployer', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'WNativeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'amount0Delta', internalType: 'int256', type: 'int256' },
      { name: 'amount1Delta', internalType: 'int256', type: 'int256' },
      { name: 'feeAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'path', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'algebraSwapCallback',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'poolDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'path', internalType: 'bytes', type: 'bytes' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'quoteExactInput',
    outputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'fees', internalType: 'uint16[]', type: 'uint16[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenIn', internalType: 'address', type: 'address' },
      { name: 'tokenOut', internalType: 'address', type: 'address' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'quoteExactInputSingle',
    outputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'path', internalType: 'bytes', type: 'bytes' },
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'quoteExactOutput',
    outputs: [
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'fees', internalType: 'uint16[]', type: 'uint16[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenIn', internalType: 'address', type: 'address' },
      { name: 'tokenOut', internalType: 'address', type: 'address' },
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'quoteExactOutputSingle',
    outputs: [
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
    ],
  },
] as const

export const algebraQuoterAddress = '0x38A5C36FA8c8c9E4649b51FCD61810B14e7ce047' as const

export const algebraQuoterConfig = {
  address: algebraQuoterAddress,
  abi: algebraQuoterABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraRouterABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_WNativeToken', internalType: 'address', type: 'address' },
      { name: '_poolDeployer', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'WNativeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount0Delta', internalType: 'int256', type: 'int256' },
      { name: 'amount1Delta', internalType: 'int256', type: 'int256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'algebraSwapCallback',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ISwapRouter.ExactInputParams',
        type: 'tuple',
        components: [
          { name: 'path', internalType: 'bytes', type: 'bytes' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
          { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountOutMinimum',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    name: 'exactInput',
    outputs: [{ name: 'amountOut', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ISwapRouter.ExactInputSingleParams',
        type: 'tuple',
        components: [
          { name: 'tokenIn', internalType: 'address', type: 'address' },
          { name: 'tokenOut', internalType: 'address', type: 'address' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
          { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountOutMinimum',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
        ],
      },
    ],
    name: 'exactInputSingle',
    outputs: [{ name: 'amountOut', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ISwapRouter.ExactInputSingleParams',
        type: 'tuple',
        components: [
          { name: 'tokenIn', internalType: 'address', type: 'address' },
          { name: 'tokenOut', internalType: 'address', type: 'address' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
          { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountOutMinimum',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
        ],
      },
    ],
    name: 'exactInputSingleSupportingFeeOnTransferTokens',
    outputs: [{ name: 'amountOut', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ISwapRouter.ExactOutputParams',
        type: 'tuple',
        components: [
          { name: 'path', internalType: 'bytes', type: 'bytes' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
          { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
          { name: 'amountInMaximum', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'exactOutput',
    outputs: [{ name: 'amountIn', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct ISwapRouter.ExactOutputSingleParams',
        type: 'tuple',
        components: [
          { name: 'tokenIn', internalType: 'address', type: 'address' },
          { name: 'tokenOut', internalType: 'address', type: 'address' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
          { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
          { name: 'amountInMaximum', internalType: 'uint256', type: 'uint256' },
          { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
        ],
      },
    ],
    name: 'exactOutputSingle',
    outputs: [{ name: 'amountIn', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'poolDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'refundNativeToken',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermit',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitAllowed',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitAllowedIfNecessary',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'selfPermitIfNecessary',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'sweepToken',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'feeBips', internalType: 'uint256', type: 'uint256' },
      { name: 'feeRecipient', internalType: 'address', type: 'address' },
    ],
    name: 'sweepTokenWithFee',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'unwrapWNativeToken',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'amountMinimum', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'feeBips', internalType: 'uint256', type: 'uint256' },
      { name: 'feeRecipient', internalType: 'address', type: 'address' },
    ],
    name: 'unwrapWNativeTokenWithFee',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

export const algebraRouterAddress = '0xEC250E6856e14A494cb1f0abC61d72348c79F418' as const

export const algebraRouterConfig = {
  address: algebraRouterAddress,
  abi: algebraRouterABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgerbaQuoterV2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algerbaQuoterV2ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_WNativeToken', internalType: 'address', type: 'address' },
      { name: '_poolDeployer', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'WNativeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'amount0Delta', internalType: 'int256', type: 'int256' },
      { name: 'amount1Delta', internalType: 'int256', type: 'int256' },
      { name: 'path', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'algebraSwapCallback',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'poolDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'path', internalType: 'bytes', type: 'bytes' },
      { name: 'amountInRequired', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'quoteExactInput',
    outputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      {
        name: 'sqrtPriceX96AfterList',
        internalType: 'uint160[]',
        type: 'uint160[]',
      },
      {
        name: 'initializedTicksCrossedList',
        internalType: 'uint32[]',
        type: 'uint32[]',
      },
      { name: 'gasEstimate', internalType: 'uint256', type: 'uint256' },
      { name: 'feeList', internalType: 'uint16[]', type: 'uint16[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct IQuoterV2.QuoteExactInputSingleParams',
        type: 'tuple',
        components: [
          { name: 'tokenIn', internalType: 'address', type: 'address' },
          { name: 'tokenOut', internalType: 'address', type: 'address' },
          { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
          { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
        ],
      },
    ],
    name: 'quoteExactInputSingle',
    outputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'sqrtPriceX96After', internalType: 'uint160', type: 'uint160' },
      {
        name: 'initializedTicksCrossed',
        internalType: 'uint32',
        type: 'uint32',
      },
      { name: 'gasEstimate', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'path', internalType: 'bytes', type: 'bytes' },
      { name: 'amountOutRequired', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'quoteExactOutput',
    outputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      {
        name: 'sqrtPriceX96AfterList',
        internalType: 'uint160[]',
        type: 'uint160[]',
      },
      {
        name: 'initializedTicksCrossedList',
        internalType: 'uint32[]',
        type: 'uint32[]',
      },
      { name: 'gasEstimate', internalType: 'uint256', type: 'uint256' },
      { name: 'feeList', internalType: 'uint16[]', type: 'uint16[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct IQuoterV2.QuoteExactOutputSingleParams',
        type: 'tuple',
        components: [
          { name: 'tokenIn', internalType: 'address', type: 'address' },
          { name: 'tokenOut', internalType: 'address', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
        ],
      },
    ],
    name: 'quoteExactOutputSingle',
    outputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'sqrtPriceX96After', internalType: 'uint160', type: 'uint160' },
      {
        name: 'initializedTicksCrossed',
        internalType: 'uint32',
        type: 'uint32',
      },
      { name: 'gasEstimate', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
    ],
  },
] as const

export const algerbaQuoterV2Address = '0x83D4a9Ea77a4dbA073cD90b30410Ac9F95F93E7C' as const

export const algerbaQuoterV2Config = {
  address: algerbaQuoterV2Address,
  abi: algerbaQuoterV2ABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link algebraBasePluginABI}__.
 */
export function getAlgebraBasePlugin(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: algebraBasePluginABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginABI}__.
 */
export function readAlgebraBasePlugin<
  TAbi extends readonly unknown[] = typeof algebraBasePluginABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return readContract({
    abi: algebraBasePluginABI,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginABI}__.
 */
export function writeAlgebraBasePlugin<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof algebraBasePluginABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof algebraBasePluginABI, TFunctionName>, 'abi'>
) {
  return writeContract({
    abi: algebraBasePluginABI,
    ...config,
  } as unknown as WriteContractArgs<typeof algebraBasePluginABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link algebraBasePluginABI}__.
 */
export function prepareWriteAlgebraBasePlugin<
  TAbi extends readonly unknown[] = typeof algebraBasePluginABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({
    abi: algebraBasePluginABI,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link algebraFactoryABI}__.
 */
export function getAlgebraFactory(config: Omit<GetContractArgs, 'abi' | 'address'>) {
  return getContract({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryABI}__.
 */
export function readAlgebraFactory<
  TAbi extends readonly unknown[] = typeof algebraFactoryABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return readContract({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryABI}__.
 */
export function writeAlgebraFactory<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof algebraFactoryABI, TFunctionName>, 'abi' | 'address'>
    | Omit<WriteContractUnpreparedArgs<typeof algebraFactoryABI, TFunctionName>, 'abi' | 'address'>
) {
  return writeContract({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    ...config,
  } as unknown as WriteContractArgs<typeof algebraFactoryABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link algebraFactoryABI}__.
 */
export function prepareWriteAlgebraFactory<
  TAbi extends readonly unknown[] = typeof algebraFactoryABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return prepareWriteContract({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link algebraPoolABI}__.
 */
export function getAlgebraPool(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: algebraPoolABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolABI}__.
 */
export function readAlgebraPool<
  TAbi extends readonly unknown[] = typeof algebraPoolABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return readContract({
    abi: algebraPoolABI,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolABI}__.
 */
export function writeAlgebraPool<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof algebraPoolABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof algebraPoolABI, TFunctionName>, 'abi'>
) {
  return writeContract({
    abi: algebraPoolABI,
    ...config,
  } as unknown as WriteContractArgs<typeof algebraPoolABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link algebraPoolABI}__.
 */
export function prepareWriteAlgebraPool<
  TAbi extends readonly unknown[] = typeof algebraPoolABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({
    abi: algebraPoolABI,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link algebraPositionManagerABI}__.
 */
export function getAlgebraPositionManager(config: Omit<GetContractArgs, 'abi' | 'address'>) {
  return getContract({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPositionManagerABI}__.
 */
export function readAlgebraPositionManager<
  TAbi extends readonly unknown[] = typeof algebraPositionManagerABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return readContract({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPositionManagerABI}__.
 */
export function writeAlgebraPositionManager<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof algebraPositionManagerABI, TFunctionName>, 'abi' | 'address'>
    | Omit<WriteContractUnpreparedArgs<typeof algebraPositionManagerABI, TFunctionName>, 'abi' | 'address'>
) {
  return writeContract({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    ...config,
  } as unknown as WriteContractArgs<typeof algebraPositionManagerABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link algebraPositionManagerABI}__.
 */
export function prepareWriteAlgebraPositionManager<
  TAbi extends readonly unknown[] = typeof algebraPositionManagerABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return prepareWriteContract({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link algebraQuoterABI}__.
 */
export function getAlgebraQuoter(config: Omit<GetContractArgs, 'abi' | 'address'>) {
  return getContract({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraQuoterABI}__.
 */
export function readAlgebraQuoter<
  TAbi extends readonly unknown[] = typeof algebraQuoterABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return readContract({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraQuoterABI}__.
 */
export function writeAlgebraQuoter<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof algebraQuoterABI, TFunctionName>, 'abi' | 'address'>
    | Omit<WriteContractUnpreparedArgs<typeof algebraQuoterABI, TFunctionName>, 'abi' | 'address'>
) {
  return writeContract({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    ...config,
  } as unknown as WriteContractArgs<typeof algebraQuoterABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link algebraQuoterABI}__.
 */
export function prepareWriteAlgebraQuoter<
  TAbi extends readonly unknown[] = typeof algebraQuoterABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return prepareWriteContract({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link algebraRouterABI}__.
 */
export function getAlgebraRouter(config: Omit<GetContractArgs, 'abi' | 'address'>) {
  return getContract({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraRouterABI}__.
 */
export function readAlgebraRouter<
  TAbi extends readonly unknown[] = typeof algebraRouterABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return readContract({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraRouterABI}__.
 */
export function writeAlgebraRouter<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof algebraRouterABI, TFunctionName>, 'abi' | 'address'>
    | Omit<WriteContractUnpreparedArgs<typeof algebraRouterABI, TFunctionName>, 'abi' | 'address'>
) {
  return writeContract({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    ...config,
  } as unknown as WriteContractArgs<typeof algebraRouterABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link algebraRouterABI}__.
 */
export function prepareWriteAlgebraRouter<
  TAbi extends readonly unknown[] = typeof algebraRouterABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return prepareWriteContract({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link algerbaQuoterV2ABI}__.
 */
export function getAlgerbaQuoterV2(config: Omit<GetContractArgs, 'abi' | 'address'>) {
  return getContract({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algerbaQuoterV2ABI}__.
 */
export function readAlgerbaQuoterV2<
  TAbi extends readonly unknown[] = typeof algerbaQuoterV2ABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return readContract({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algerbaQuoterV2ABI}__.
 */
export function writeAlgerbaQuoterV2<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof algerbaQuoterV2ABI, TFunctionName>, 'abi' | 'address'>
    | Omit<WriteContractUnpreparedArgs<typeof algerbaQuoterV2ABI, TFunctionName>, 'abi' | 'address'>
) {
  return writeContract({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    ...config,
  } as unknown as WriteContractArgs<typeof algerbaQuoterV2ABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link algerbaQuoterV2ABI}__.
 */
export function prepareWriteAlgerbaQuoterV2<
  TAbi extends readonly unknown[] = typeof algerbaQuoterV2ABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi' | 'address'>) {
  return prepareWriteContract({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__.
 */
export function useAlgebraBasePluginRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>, 'abi'> = {} as any) {
  return useContractRead({
    abi: algebraBasePluginABI,
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"ALGEBRA_BASE_PLUGIN_MANAGER"`.
 */
export function useAlgebraBasePluginAlgebraBasePluginManager<
  TFunctionName extends 'ALGEBRA_BASE_PLUGIN_MANAGER',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'ALGEBRA_BASE_PLUGIN_MANAGER',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"defaultPluginConfig"`.
 */
export function useAlgebraBasePluginDefaultPluginConfig<
  TFunctionName extends 'defaultPluginConfig',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'defaultPluginConfig',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"feeConfig"`.
 */
export function useAlgebraBasePluginFeeConfig<
  TFunctionName extends 'feeConfig',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'feeConfig',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"getCurrentFee"`.
 */
export function useAlgebraBasePluginGetCurrentFee<
  TFunctionName extends 'getCurrentFee',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'getCurrentFee',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"getSingleTimepoint"`.
 */
export function useAlgebraBasePluginGetSingleTimepoint<
  TFunctionName extends 'getSingleTimepoint',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'getSingleTimepoint',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"getTimepoints"`.
 */
export function useAlgebraBasePluginGetTimepoints<
  TFunctionName extends 'getTimepoints',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'getTimepoints',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"incentive"`.
 */
export function useAlgebraBasePluginIncentive<
  TFunctionName extends 'incentive',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'incentive',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"isIncentiveConnected"`.
 */
export function useAlgebraBasePluginIsIncentiveConnected<
  TFunctionName extends 'isIncentiveConnected',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'isIncentiveConnected',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"isInitialized"`.
 */
export function useAlgebraBasePluginIsInitialized<
  TFunctionName extends 'isInitialized',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'isInitialized',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"lastTimepointTimestamp"`.
 */
export function useAlgebraBasePluginLastTimepointTimestamp<
  TFunctionName extends 'lastTimepointTimestamp',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'lastTimepointTimestamp',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"limitOrderPlugin"`.
 */
export function useAlgebraBasePluginLimitOrderPlugin<
  TFunctionName extends 'limitOrderPlugin',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'limitOrderPlugin',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"pool"`.
 */
export function useAlgebraBasePluginPool<
  TFunctionName extends 'pool',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'pool',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"timepointIndex"`.
 */
export function useAlgebraBasePluginTimepointIndex<
  TFunctionName extends 'timepointIndex',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'timepointIndex',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"timepoints"`.
 */
export function useAlgebraBasePluginTimepoints<
  TFunctionName extends 'timepoints',
  TSelectData = ReadContractResult<typeof algebraBasePluginABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraBasePluginABI,
    functionName: 'timepoints',
    ...config,
  } as UseContractReadConfig<typeof algebraBasePluginABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__.
 */
export function useAlgebraBasePluginWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof algebraBasePluginABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, TFunctionName, TMode>({
    abi: algebraBasePluginABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"afterFlash"`.
 */
export function useAlgebraBasePluginAfterFlash<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'afterFlash'>['request']['abi'],
        'afterFlash',
        TMode
      > & { functionName?: 'afterFlash' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'afterFlash', TMode> & {
        abi?: never
        functionName?: 'afterFlash'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'afterFlash', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'afterFlash',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function useAlgebraBasePluginAfterInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'afterInitialize'>['request']['abi'],
        'afterInitialize',
        TMode
      > & { functionName?: 'afterInitialize' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'afterInitialize', TMode> & {
        abi?: never
        functionName?: 'afterInitialize'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'afterInitialize', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'afterInitialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"afterModifyPosition"`.
 */
export function useAlgebraBasePluginAfterModifyPosition<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'afterModifyPosition'>['request']['abi'],
        'afterModifyPosition',
        TMode
      > & { functionName?: 'afterModifyPosition' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'afterModifyPosition', TMode> & {
        abi?: never
        functionName?: 'afterModifyPosition'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'afterModifyPosition', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'afterModifyPosition',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"afterSwap"`.
 */
export function useAlgebraBasePluginAfterSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'afterSwap'>['request']['abi'],
        'afterSwap',
        TMode
      > & { functionName?: 'afterSwap' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'afterSwap', TMode> & {
        abi?: never
        functionName?: 'afterSwap'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'afterSwap', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'afterSwap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"beforeFlash"`.
 */
export function useAlgebraBasePluginBeforeFlash<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'beforeFlash'>['request']['abi'],
        'beforeFlash',
        TMode
      > & { functionName?: 'beforeFlash' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'beforeFlash', TMode> & {
        abi?: never
        functionName?: 'beforeFlash'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'beforeFlash', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'beforeFlash',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function useAlgebraBasePluginBeforeInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'beforeInitialize'>['request']['abi'],
        'beforeInitialize',
        TMode
      > & { functionName?: 'beforeInitialize' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'beforeInitialize', TMode> & {
        abi?: never
        functionName?: 'beforeInitialize'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'beforeInitialize', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'beforeInitialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"beforeModifyPosition"`.
 */
export function useAlgebraBasePluginBeforeModifyPosition<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'beforeModifyPosition'>['request']['abi'],
        'beforeModifyPosition',
        TMode
      > & { functionName?: 'beforeModifyPosition' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'beforeModifyPosition', TMode> & {
        abi?: never
        functionName?: 'beforeModifyPosition'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'beforeModifyPosition', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'beforeModifyPosition',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function useAlgebraBasePluginBeforeSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'beforeSwap'>['request']['abi'],
        'beforeSwap',
        TMode
      > & { functionName?: 'beforeSwap' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'beforeSwap', TMode> & {
        abi?: never
        functionName?: 'beforeSwap'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'beforeSwap', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'beforeSwap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"changeFeeConfiguration"`.
 */
export function useAlgebraBasePluginChangeFeeConfiguration<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'changeFeeConfiguration'>['request']['abi'],
        'changeFeeConfiguration',
        TMode
      > & { functionName?: 'changeFeeConfiguration' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'changeFeeConfiguration', TMode> & {
        abi?: never
        functionName?: 'changeFeeConfiguration'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'changeFeeConfiguration', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'changeFeeConfiguration',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"initialize"`.
 */
export function useAlgebraBasePluginInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'initialize'>['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'initialize', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"prepayTimepointsStorageSlots"`.
 */
export function useAlgebraBasePluginPrepayTimepointsStorageSlots<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'prepayTimepointsStorageSlots'>['request']['abi'],
        'prepayTimepointsStorageSlots',
        TMode
      > & { functionName?: 'prepayTimepointsStorageSlots' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'prepayTimepointsStorageSlots', TMode> & {
        abi?: never
        functionName?: 'prepayTimepointsStorageSlots'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'prepayTimepointsStorageSlots', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'prepayTimepointsStorageSlots',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"setIncentive"`.
 */
export function useAlgebraBasePluginSetIncentive<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'setIncentive'>['request']['abi'],
        'setIncentive',
        TMode
      > & { functionName?: 'setIncentive' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'setIncentive', TMode> & {
        abi?: never
        functionName?: 'setIncentive'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'setIncentive', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'setIncentive',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"setLimitOrderPlugin"`.
 */
export function useAlgebraBasePluginSetLimitOrderPlugin<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraBasePluginABI, 'setLimitOrderPlugin'>['request']['abi'],
        'setLimitOrderPlugin',
        TMode
      > & { functionName?: 'setLimitOrderPlugin' }
    : UseContractWriteConfig<typeof algebraBasePluginABI, 'setLimitOrderPlugin', TMode> & {
        abi?: never
        functionName?: 'setLimitOrderPlugin'
      } = {} as any
) {
  return useContractWrite<typeof algebraBasePluginABI, 'setLimitOrderPlugin', TMode>({
    abi: algebraBasePluginABI,
    functionName: 'setLimitOrderPlugin',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__.
 */
export function usePrepareAlgebraBasePluginWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraBasePluginABI, TFunctionName>, 'abi'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"afterFlash"`.
 */
export function usePrepareAlgebraBasePluginAfterFlash(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'afterFlash'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'afterFlash',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'afterFlash'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function usePrepareAlgebraBasePluginAfterInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'afterInitialize'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'afterInitialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'afterInitialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"afterModifyPosition"`.
 */
export function usePrepareAlgebraBasePluginAfterModifyPosition(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'afterModifyPosition'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'afterModifyPosition',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'afterModifyPosition'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"afterSwap"`.
 */
export function usePrepareAlgebraBasePluginAfterSwap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'afterSwap'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'afterSwap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'afterSwap'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"beforeFlash"`.
 */
export function usePrepareAlgebraBasePluginBeforeFlash(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'beforeFlash'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'beforeFlash',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'beforeFlash'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function usePrepareAlgebraBasePluginBeforeInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'beforeInitialize'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'beforeInitialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'beforeInitialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"beforeModifyPosition"`.
 */
export function usePrepareAlgebraBasePluginBeforeModifyPosition(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'beforeModifyPosition'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'beforeModifyPosition',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'beforeModifyPosition'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function usePrepareAlgebraBasePluginBeforeSwap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'beforeSwap'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'beforeSwap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'beforeSwap'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"changeFeeConfiguration"`.
 */
export function usePrepareAlgebraBasePluginChangeFeeConfiguration(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'changeFeeConfiguration'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'changeFeeConfiguration',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'changeFeeConfiguration'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareAlgebraBasePluginInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"prepayTimepointsStorageSlots"`.
 */
export function usePrepareAlgebraBasePluginPrepayTimepointsStorageSlots(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'prepayTimepointsStorageSlots'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'prepayTimepointsStorageSlots',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'prepayTimepointsStorageSlots'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"setIncentive"`.
 */
export function usePrepareAlgebraBasePluginSetIncentive(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'setIncentive'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'setIncentive',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'setIncentive'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraBasePluginABI}__ and `functionName` set to `"setLimitOrderPlugin"`.
 */
export function usePrepareAlgebraBasePluginSetLimitOrderPlugin(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'setLimitOrderPlugin'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraBasePluginABI,
    functionName: 'setLimitOrderPlugin',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraBasePluginABI, 'setLimitOrderPlugin'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__.
 */
export function useAlgebraFactoryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`.
 */
export function useAlgebraFactoryDefaultAdminRole<
  TFunctionName extends 'DEFAULT_ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"baseFeeConfiguration"`.
 */
export function useAlgebraFactoryBaseFeeConfiguration<
  TFunctionName extends 'baseFeeConfiguration',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'baseFeeConfiguration',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"communityVault"`.
 */
export function useAlgebraFactoryCommunityVault<
  TFunctionName extends 'communityVault',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'communityVault',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"defaultCommunityFee"`.
 */
export function useAlgebraFactoryDefaultCommunityFee<
  TFunctionName extends 'defaultCommunityFee',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'defaultCommunityFee',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"farmingAddress"`.
 */
export function useAlgebraFactoryFarmingAddress<
  TFunctionName extends 'farmingAddress',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'farmingAddress',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"getRoleAdmin"`.
 */
export function useAlgebraFactoryGetRoleAdmin<
  TFunctionName extends 'getRoleAdmin',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'getRoleAdmin',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"getRoleMember"`.
 */
export function useAlgebraFactoryGetRoleMember<
  TFunctionName extends 'getRoleMember',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'getRoleMember',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"getRoleMemberCount"`.
 */
export function useAlgebraFactoryGetRoleMemberCount<
  TFunctionName extends 'getRoleMemberCount',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'getRoleMemberCount',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"hasRole"`.
 */
export function useAlgebraFactoryHasRole<
  TFunctionName extends 'hasRole',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'hasRole',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"hasRoleOrOwner"`.
 */
export function useAlgebraFactoryHasRoleOrOwner<
  TFunctionName extends 'hasRoleOrOwner',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'hasRoleOrOwner',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"owner"`.
 */
export function useAlgebraFactoryOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"pendingOwner"`.
 */
export function useAlgebraFactoryPendingOwner<
  TFunctionName extends 'pendingOwner',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'pendingOwner',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"poolByPair"`.
 */
export function useAlgebraFactoryPoolByPair<
  TFunctionName extends 'poolByPair',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'poolByPair',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"poolDeployer"`.
 */
export function useAlgebraFactoryPoolDeployer<
  TFunctionName extends 'poolDeployer',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'poolDeployer',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"renounceOwnershipStartTimestamp"`.
 */
export function useAlgebraFactoryRenounceOwnershipStartTimestamp<
  TFunctionName extends 'renounceOwnershipStartTimestamp',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnershipStartTimestamp',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useAlgebraFactorySupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof algebraFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof algebraFactoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__.
 */
export function useAlgebraFactoryWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof algebraFactoryABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, TFunctionName, TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function useAlgebraFactoryAcceptOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'acceptOwnership'>['request']['abi'],
        'acceptOwnership',
        TMode
      > & { functionName?: 'acceptOwnership' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'acceptOwnership', TMode> & {
        abi?: never
        functionName?: 'acceptOwnership'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'acceptOwnership', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'acceptOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"createPool"`.
 */
export function useAlgebraFactoryCreatePool<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'createPool'>['request']['abi'],
        'createPool',
        TMode
      > & { functionName?: 'createPool' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'createPool', TMode> & {
        abi?: never
        functionName?: 'createPool'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'createPool', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'createPool',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"grantRole"`.
 */
export function useAlgebraFactoryGrantRole<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'grantRole'>['request']['abi'],
        'grantRole',
        TMode
      > & { functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'grantRole', TMode> & {
        abi?: never
        functionName?: 'grantRole'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'grantRole', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'grantRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useAlgebraFactoryRenounceOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'renounceOwnership'>['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'renounceOwnership', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"renounceRole"`.
 */
export function useAlgebraFactoryRenounceRole<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'renounceRole'>['request']['abi'],
        'renounceRole',
        TMode
      > & { functionName?: 'renounceRole' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'renounceRole', TMode> & {
        abi?: never
        functionName?: 'renounceRole'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'renounceRole', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'renounceRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"revokeRole"`.
 */
export function useAlgebraFactoryRevokeRole<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'revokeRole'>['request']['abi'],
        'revokeRole',
        TMode
      > & { functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'revokeRole', TMode> & {
        abi?: never
        functionName?: 'revokeRole'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'revokeRole', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'revokeRole',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"setBaseFeeConfiguration"`.
 */
export function useAlgebraFactorySetBaseFeeConfiguration<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'setBaseFeeConfiguration'>['request']['abi'],
        'setBaseFeeConfiguration',
        TMode
      > & { functionName?: 'setBaseFeeConfiguration' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'setBaseFeeConfiguration', TMode> & {
        abi?: never
        functionName?: 'setBaseFeeConfiguration'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'setBaseFeeConfiguration', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'setBaseFeeConfiguration',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"setDefaultCommunityFee"`.
 */
export function useAlgebraFactorySetDefaultCommunityFee<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'setDefaultCommunityFee'>['request']['abi'],
        'setDefaultCommunityFee',
        TMode
      > & { functionName?: 'setDefaultCommunityFee' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'setDefaultCommunityFee', TMode> & {
        abi?: never
        functionName?: 'setDefaultCommunityFee'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'setDefaultCommunityFee', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'setDefaultCommunityFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"setFarmingAddress"`.
 */
export function useAlgebraFactorySetFarmingAddress<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'setFarmingAddress'>['request']['abi'],
        'setFarmingAddress',
        TMode
      > & { functionName?: 'setFarmingAddress' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'setFarmingAddress', TMode> & {
        abi?: never
        functionName?: 'setFarmingAddress'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'setFarmingAddress', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'setFarmingAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"startRenounceOwnership"`.
 */
export function useAlgebraFactoryStartRenounceOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'startRenounceOwnership'>['request']['abi'],
        'startRenounceOwnership',
        TMode
      > & { functionName?: 'startRenounceOwnership' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'startRenounceOwnership', TMode> & {
        abi?: never
        functionName?: 'startRenounceOwnership'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'startRenounceOwnership', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'startRenounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"stopRenounceOwnership"`.
 */
export function useAlgebraFactoryStopRenounceOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'stopRenounceOwnership'>['request']['abi'],
        'stopRenounceOwnership',
        TMode
      > & { functionName?: 'stopRenounceOwnership' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'stopRenounceOwnership', TMode> & {
        abi?: never
        functionName?: 'stopRenounceOwnership'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'stopRenounceOwnership', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'stopRenounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useAlgebraFactoryTransferOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraFactoryABI, 'transferOwnership'>['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof algebraFactoryABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any
) {
  return useContractWrite<typeof algebraFactoryABI, 'transferOwnership', TMode>({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__.
 */
export function usePrepareAlgebraFactoryWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraFactoryABI, TFunctionName>, 'abi' | 'address'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function usePrepareAlgebraFactoryAcceptOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'acceptOwnership'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'acceptOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'acceptOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"createPool"`.
 */
export function usePrepareAlgebraFactoryCreatePool(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'createPool'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'createPool',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'createPool'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"grantRole"`.
 */
export function usePrepareAlgebraFactoryGrantRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'grantRole'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'grantRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'grantRole'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareAlgebraFactoryRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"renounceRole"`.
 */
export function usePrepareAlgebraFactoryRenounceRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'renounceRole'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'renounceRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'renounceRole'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"revokeRole"`.
 */
export function usePrepareAlgebraFactoryRevokeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'revokeRole'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'revokeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'revokeRole'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"setBaseFeeConfiguration"`.
 */
export function usePrepareAlgebraFactorySetBaseFeeConfiguration(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'setBaseFeeConfiguration'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'setBaseFeeConfiguration',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'setBaseFeeConfiguration'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"setDefaultCommunityFee"`.
 */
export function usePrepareAlgebraFactorySetDefaultCommunityFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'setDefaultCommunityFee'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'setDefaultCommunityFee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'setDefaultCommunityFee'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"setFarmingAddress"`.
 */
export function usePrepareAlgebraFactorySetFarmingAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'setFarmingAddress'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'setFarmingAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'setFarmingAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"startRenounceOwnership"`.
 */
export function usePrepareAlgebraFactoryStartRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'startRenounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'startRenounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'startRenounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"stopRenounceOwnership"`.
 */
export function usePrepareAlgebraFactoryStopRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'stopRenounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'stopRenounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'stopRenounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraFactoryABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareAlgebraFactoryTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraFactoryABI,
    address: algebraFactoryAddress,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraFactoryABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__.
 */
export function useAlgebraPoolRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>, 'abi'> = {} as any) {
  return useContractRead({
    abi: algebraPoolABI,
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"communityFeeLastTimestamp"`.
 */
export function useAlgebraPoolCommunityFeeLastTimestamp<
  TFunctionName extends 'communityFeeLastTimestamp',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'communityFeeLastTimestamp',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"communityVault"`.
 */
export function useAlgebraPoolCommunityVault<
  TFunctionName extends 'communityVault',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'communityVault',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"factory"`.
 */
export function useAlgebraPoolFactory<
  TFunctionName extends 'factory',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'factory',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"fee"`.
 */
export function useAlgebraPoolFee<
  TFunctionName extends 'fee',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'fee',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"getCommunityFeePending"`.
 */
export function useAlgebraPoolGetCommunityFeePending<
  TFunctionName extends 'getCommunityFeePending',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'getCommunityFeePending',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"getReserves"`.
 */
export function useAlgebraPoolGetReserves<
  TFunctionName extends 'getReserves',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'getReserves',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"globalState"`.
 */
export function useAlgebraPoolGlobalState<
  TFunctionName extends 'globalState',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'globalState',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"liquidity"`.
 */
export function useAlgebraPoolLiquidity<
  TFunctionName extends 'liquidity',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'liquidity',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"maxLiquidityPerTick"`.
 */
export function useAlgebraPoolMaxLiquidityPerTick<
  TFunctionName extends 'maxLiquidityPerTick',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'maxLiquidityPerTick',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"nextTickGlobal"`.
 */
export function useAlgebraPoolNextTickGlobal<
  TFunctionName extends 'nextTickGlobal',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'nextTickGlobal',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"plugin"`.
 */
export function useAlgebraPoolPlugin<
  TFunctionName extends 'plugin',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'plugin',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"positions"`.
 */
export function useAlgebraPoolPositions<
  TFunctionName extends 'positions',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'positions',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"prevTickGlobal"`.
 */
export function useAlgebraPoolPrevTickGlobal<
  TFunctionName extends 'prevTickGlobal',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'prevTickGlobal',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"tickSpacing"`.
 */
export function useAlgebraPoolTickSpacing<
  TFunctionName extends 'tickSpacing',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'tickSpacing',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"tickTable"`.
 */
export function useAlgebraPoolTickTable<
  TFunctionName extends 'tickTable',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'tickTable',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"ticks"`.
 */
export function useAlgebraPoolTicks<
  TFunctionName extends 'ticks',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'ticks',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"token0"`.
 */
export function useAlgebraPoolToken0<
  TFunctionName extends 'token0',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'token0',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"token1"`.
 */
export function useAlgebraPoolToken1<
  TFunctionName extends 'token1',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'token1',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"totalFeeGrowth0Token"`.
 */
export function useAlgebraPoolTotalFeeGrowth0Token<
  TFunctionName extends 'totalFeeGrowth0Token',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'totalFeeGrowth0Token',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"totalFeeGrowth1Token"`.
 */
export function useAlgebraPoolTotalFeeGrowth1Token<
  TFunctionName extends 'totalFeeGrowth1Token',
  TSelectData = ReadContractResult<typeof algebraPoolABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPoolABI,
    functionName: 'totalFeeGrowth1Token',
    ...config,
  } as UseContractReadConfig<typeof algebraPoolABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__.
 */
export function useAlgebraPoolWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof algebraPoolABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, TFunctionName, TMode>({
    abi: algebraPoolABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"burn"`.
 */
export function useAlgebraPoolBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'burn', TMode> & {
        abi?: never
        functionName?: 'burn'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'burn', TMode>({
    abi: algebraPoolABI,
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"collect"`.
 */
export function useAlgebraPoolCollect<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'collect'>['request']['abi'],
        'collect',
        TMode
      > & { functionName?: 'collect' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'collect', TMode> & {
        abi?: never
        functionName?: 'collect'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'collect', TMode>({
    abi: algebraPoolABI,
    functionName: 'collect',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"flash"`.
 */
export function useAlgebraPoolFlash<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'flash'>['request']['abi'],
        'flash',
        TMode
      > & { functionName?: 'flash' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'flash', TMode> & {
        abi?: never
        functionName?: 'flash'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'flash', TMode>({
    abi: algebraPoolABI,
    functionName: 'flash',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"initialize"`.
 */
export function useAlgebraPoolInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'initialize'>['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'initialize', TMode>({
    abi: algebraPoolABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"mint"`.
 */
export function useAlgebraPoolMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'mint', TMode>({
    abi: algebraPoolABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"setCommunityFee"`.
 */
export function useAlgebraPoolSetCommunityFee<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'setCommunityFee'>['request']['abi'],
        'setCommunityFee',
        TMode
      > & { functionName?: 'setCommunityFee' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'setCommunityFee', TMode> & {
        abi?: never
        functionName?: 'setCommunityFee'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'setCommunityFee', TMode>({
    abi: algebraPoolABI,
    functionName: 'setCommunityFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"setFee"`.
 */
export function useAlgebraPoolSetFee<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'setFee'>['request']['abi'],
        'setFee',
        TMode
      > & { functionName?: 'setFee' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'setFee', TMode> & {
        abi?: never
        functionName?: 'setFee'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'setFee', TMode>({
    abi: algebraPoolABI,
    functionName: 'setFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"setPlugin"`.
 */
export function useAlgebraPoolSetPlugin<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'setPlugin'>['request']['abi'],
        'setPlugin',
        TMode
      > & { functionName?: 'setPlugin' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'setPlugin', TMode> & {
        abi?: never
        functionName?: 'setPlugin'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'setPlugin', TMode>({
    abi: algebraPoolABI,
    functionName: 'setPlugin',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"setPluginConfig"`.
 */
export function useAlgebraPoolSetPluginConfig<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'setPluginConfig'>['request']['abi'],
        'setPluginConfig',
        TMode
      > & { functionName?: 'setPluginConfig' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'setPluginConfig', TMode> & {
        abi?: never
        functionName?: 'setPluginConfig'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'setPluginConfig', TMode>({
    abi: algebraPoolABI,
    functionName: 'setPluginConfig',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"setTickSpacing"`.
 */
export function useAlgebraPoolSetTickSpacing<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'setTickSpacing'>['request']['abi'],
        'setTickSpacing',
        TMode
      > & { functionName?: 'setTickSpacing' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'setTickSpacing', TMode> & {
        abi?: never
        functionName?: 'setTickSpacing'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'setTickSpacing', TMode>({
    abi: algebraPoolABI,
    functionName: 'setTickSpacing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"swap"`.
 */
export function useAlgebraPoolSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'swap'>['request']['abi'],
        'swap',
        TMode
      > & { functionName?: 'swap' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'swap', TMode> & {
        abi?: never
        functionName?: 'swap'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'swap', TMode>({
    abi: algebraPoolABI,
    functionName: 'swap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"swapWithPaymentInAdvance"`.
 */
export function useAlgebraPoolSwapWithPaymentInAdvance<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPoolABI, 'swapWithPaymentInAdvance'>['request']['abi'],
        'swapWithPaymentInAdvance',
        TMode
      > & { functionName?: 'swapWithPaymentInAdvance' }
    : UseContractWriteConfig<typeof algebraPoolABI, 'swapWithPaymentInAdvance', TMode> & {
        abi?: never
        functionName?: 'swapWithPaymentInAdvance'
      } = {} as any
) {
  return useContractWrite<typeof algebraPoolABI, 'swapWithPaymentInAdvance', TMode>({
    abi: algebraPoolABI,
    functionName: 'swapWithPaymentInAdvance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__.
 */
export function usePrepareAlgebraPoolWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraPoolABI, TFunctionName>, 'abi'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareAlgebraPoolBurn(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraPoolABI, 'burn'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"collect"`.
 */
export function usePrepareAlgebraPoolCollect(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraPoolABI, 'collect'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'collect',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'collect'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"flash"`.
 */
export function usePrepareAlgebraPoolFlash(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraPoolABI, 'flash'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'flash',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'flash'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareAlgebraPoolInitialize(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraPoolABI, 'initialize'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareAlgebraPoolMint(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraPoolABI, 'mint'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"setCommunityFee"`.
 */
export function usePrepareAlgebraPoolSetCommunityFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPoolABI, 'setCommunityFee'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'setCommunityFee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'setCommunityFee'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"setFee"`.
 */
export function usePrepareAlgebraPoolSetFee(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraPoolABI, 'setFee'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'setFee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'setFee'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"setPlugin"`.
 */
export function usePrepareAlgebraPoolSetPlugin(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraPoolABI, 'setPlugin'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'setPlugin',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'setPlugin'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"setPluginConfig"`.
 */
export function usePrepareAlgebraPoolSetPluginConfig(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPoolABI, 'setPluginConfig'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'setPluginConfig',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'setPluginConfig'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"setTickSpacing"`.
 */
export function usePrepareAlgebraPoolSetTickSpacing(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPoolABI, 'setTickSpacing'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'setTickSpacing',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'setTickSpacing'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"swap"`.
 */
export function usePrepareAlgebraPoolSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraPoolABI, 'swap'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'swap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'swap'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPoolABI}__ and `functionName` set to `"swapWithPaymentInAdvance"`.
 */
export function usePrepareAlgebraPoolSwapWithPaymentInAdvance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPoolABI, 'swapWithPaymentInAdvance'>,
    'abi' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPoolABI,
    functionName: 'swapWithPaymentInAdvance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPoolABI, 'swapWithPaymentInAdvance'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__.
 */
export function useAlgebraPositionManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 */
export function useAlgebraPositionManagerDomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'DOMAIN_SEPARATOR',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"NONFUNGIBLE_POSITION_MANAGER_ADMINISTRATOR_ROLE"`.
 */
export function useAlgebraPositionManagerNonfungiblePositionManagerAdministratorRole<
  TFunctionName extends 'NONFUNGIBLE_POSITION_MANAGER_ADMINISTRATOR_ROLE',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'NONFUNGIBLE_POSITION_MANAGER_ADMINISTRATOR_ROLE',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"PERMIT_TYPEHASH"`.
 */
export function useAlgebraPositionManagerPermitTypehash<
  TFunctionName extends 'PERMIT_TYPEHASH',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'PERMIT_TYPEHASH',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"WNativeToken"`.
 */
export function useAlgebraPositionManagerWNativeToken<
  TFunctionName extends 'WNativeToken',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'WNativeToken',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useAlgebraPositionManagerBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"factory"`.
 */
export function useAlgebraPositionManagerFactory<
  TFunctionName extends 'factory',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'factory',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"farmingApprovals"`.
 */
export function useAlgebraPositionManagerFarmingApprovals<
  TFunctionName extends 'farmingApprovals',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'farmingApprovals',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"farmingCenter"`.
 */
export function useAlgebraPositionManagerFarmingCenter<
  TFunctionName extends 'farmingCenter',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'farmingCenter',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"getApproved"`.
 */
export function useAlgebraPositionManagerGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useAlgebraPositionManagerIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"isApprovedOrOwner"`.
 */
export function useAlgebraPositionManagerIsApprovedOrOwner<
  TFunctionName extends 'isApprovedOrOwner',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'isApprovedOrOwner',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"name"`.
 */
export function useAlgebraPositionManagerName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useAlgebraPositionManagerOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"poolDeployer"`.
 */
export function useAlgebraPositionManagerPoolDeployer<
  TFunctionName extends 'poolDeployer',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'poolDeployer',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"positions"`.
 */
export function useAlgebraPositionManagerPositions<
  TFunctionName extends 'positions',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'positions',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useAlgebraPositionManagerSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"symbol"`.
 */
export function useAlgebraPositionManagerSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useAlgebraPositionManagerTokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"tokenFarmedIn"`.
 */
export function useAlgebraPositionManagerTokenFarmedIn<
  TFunctionName extends 'tokenFarmedIn',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'tokenFarmedIn',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function useAlgebraPositionManagerTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useAlgebraPositionManagerTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useAlgebraPositionManagerTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof algebraPositionManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof algebraPositionManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__.
 */
export function useAlgebraPositionManagerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof algebraPositionManagerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, TFunctionName, TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"algebraMintCallback"`.
 */
export function useAlgebraPositionManagerAlgebraMintCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'algebraMintCallback'>['request']['abi'],
        'algebraMintCallback',
        TMode
      > & { functionName?: 'algebraMintCallback' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'algebraMintCallback', TMode> & {
        abi?: never
        functionName?: 'algebraMintCallback'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'algebraMintCallback', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'algebraMintCallback',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"approve"`.
 */
export function useAlgebraPositionManagerApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'approve', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"approveForFarming"`.
 */
export function useAlgebraPositionManagerApproveForFarming<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'approveForFarming'>['request']['abi'],
        'approveForFarming',
        TMode
      > & { functionName?: 'approveForFarming' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'approveForFarming', TMode> & {
        abi?: never
        functionName?: 'approveForFarming'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'approveForFarming', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'approveForFarming',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"burn"`.
 */
export function useAlgebraPositionManagerBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'burn', TMode> & {
        abi?: never
        functionName?: 'burn'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'burn', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"collect"`.
 */
export function useAlgebraPositionManagerCollect<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'collect'>['request']['abi'],
        'collect',
        TMode
      > & { functionName?: 'collect' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'collect', TMode> & {
        abi?: never
        functionName?: 'collect'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'collect', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'collect',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"createAndInitializePoolIfNecessary"`.
 */
export function useAlgebraPositionManagerCreateAndInitializePoolIfNecessary<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof algebraPositionManagerABI,
          'createAndInitializePoolIfNecessary'
        >['request']['abi'],
        'createAndInitializePoolIfNecessary',
        TMode
      > & { functionName?: 'createAndInitializePoolIfNecessary' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'createAndInitializePoolIfNecessary', TMode> & {
        abi?: never
        functionName?: 'createAndInitializePoolIfNecessary'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'createAndInitializePoolIfNecessary', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'createAndInitializePoolIfNecessary',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"decreaseLiquidity"`.
 */
export function useAlgebraPositionManagerDecreaseLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'decreaseLiquidity'>['request']['abi'],
        'decreaseLiquidity',
        TMode
      > & { functionName?: 'decreaseLiquidity' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'decreaseLiquidity', TMode> & {
        abi?: never
        functionName?: 'decreaseLiquidity'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'decreaseLiquidity', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'decreaseLiquidity',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"increaseLiquidity"`.
 */
export function useAlgebraPositionManagerIncreaseLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'increaseLiquidity'>['request']['abi'],
        'increaseLiquidity',
        TMode
      > & { functionName?: 'increaseLiquidity' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'increaseLiquidity', TMode> & {
        abi?: never
        functionName?: 'increaseLiquidity'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'increaseLiquidity', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'increaseLiquidity',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"mint"`.
 */
export function useAlgebraPositionManagerMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'mint', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"multicall"`.
 */
export function useAlgebraPositionManagerMulticall<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'multicall'>['request']['abi'],
        'multicall',
        TMode
      > & { functionName?: 'multicall' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'multicall', TMode> & {
        abi?: never
        functionName?: 'multicall'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'multicall', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'multicall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"permit"`.
 */
export function useAlgebraPositionManagerPermit<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'permit'>['request']['abi'],
        'permit',
        TMode
      > & { functionName?: 'permit' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'permit', TMode> & {
        abi?: never
        functionName?: 'permit'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'permit', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'permit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"refundNativeToken"`.
 */
export function useAlgebraPositionManagerRefundNativeToken<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'refundNativeToken'>['request']['abi'],
        'refundNativeToken',
        TMode
      > & { functionName?: 'refundNativeToken' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'refundNativeToken', TMode> & {
        abi?: never
        functionName?: 'refundNativeToken'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'refundNativeToken', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'refundNativeToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useAlgebraPositionManagerSafeTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'safeTransferFrom'>['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'safeTransferFrom', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"selfPermit"`.
 */
export function useAlgebraPositionManagerSelfPermit<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'selfPermit'>['request']['abi'],
        'selfPermit',
        TMode
      > & { functionName?: 'selfPermit' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermit', TMode> & {
        abi?: never
        functionName?: 'selfPermit'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'selfPermit', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"selfPermitAllowed"`.
 */
export function useAlgebraPositionManagerSelfPermitAllowed<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'selfPermitAllowed'>['request']['abi'],
        'selfPermitAllowed',
        TMode
      > & { functionName?: 'selfPermitAllowed' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermitAllowed', TMode> & {
        abi?: never
        functionName?: 'selfPermitAllowed'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'selfPermitAllowed', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowed',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`.
 */
export function useAlgebraPositionManagerSelfPermitAllowedIfNecessary<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'selfPermitAllowedIfNecessary'>['request']['abi'],
        'selfPermitAllowedIfNecessary',
        TMode
      > & { functionName?: 'selfPermitAllowedIfNecessary' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermitAllowedIfNecessary', TMode> & {
        abi?: never
        functionName?: 'selfPermitAllowedIfNecessary'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'selfPermitAllowedIfNecessary', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowedIfNecessary',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"selfPermitIfNecessary"`.
 */
export function useAlgebraPositionManagerSelfPermitIfNecessary<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'selfPermitIfNecessary'>['request']['abi'],
        'selfPermitIfNecessary',
        TMode
      > & { functionName?: 'selfPermitIfNecessary' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermitIfNecessary', TMode> & {
        abi?: never
        functionName?: 'selfPermitIfNecessary'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'selfPermitIfNecessary', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitIfNecessary',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useAlgebraPositionManagerSetApprovalForAll<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'setApprovalForAll'>['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'setApprovalForAll', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"setFarmingCenter"`.
 */
export function useAlgebraPositionManagerSetFarmingCenter<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'setFarmingCenter'>['request']['abi'],
        'setFarmingCenter',
        TMode
      > & { functionName?: 'setFarmingCenter' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'setFarmingCenter', TMode> & {
        abi?: never
        functionName?: 'setFarmingCenter'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'setFarmingCenter', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'setFarmingCenter',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"sweepToken"`.
 */
export function useAlgebraPositionManagerSweepToken<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'sweepToken'>['request']['abi'],
        'sweepToken',
        TMode
      > & { functionName?: 'sweepToken' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'sweepToken', TMode> & {
        abi?: never
        functionName?: 'sweepToken'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'sweepToken', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'sweepToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"switchFarmingStatus"`.
 */
export function useAlgebraPositionManagerSwitchFarmingStatus<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'switchFarmingStatus'>['request']['abi'],
        'switchFarmingStatus',
        TMode
      > & { functionName?: 'switchFarmingStatus' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'switchFarmingStatus', TMode> & {
        abi?: never
        functionName?: 'switchFarmingStatus'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'switchFarmingStatus', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'switchFarmingStatus',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useAlgebraPositionManagerTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'transferFrom'>['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'transferFrom', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"unwrapWNativeToken"`.
 */
export function useAlgebraPositionManagerUnwrapWNativeToken<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraPositionManagerABI, 'unwrapWNativeToken'>['request']['abi'],
        'unwrapWNativeToken',
        TMode
      > & { functionName?: 'unwrapWNativeToken' }
    : UseContractWriteConfig<typeof algebraPositionManagerABI, 'unwrapWNativeToken', TMode> & {
        abi?: never
        functionName?: 'unwrapWNativeToken'
      } = {} as any
) {
  return useContractWrite<typeof algebraPositionManagerABI, 'unwrapWNativeToken', TMode>({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'unwrapWNativeToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__.
 */
export function usePrepareAlgebraPositionManagerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, TFunctionName>,
    'abi' | 'address'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"algebraMintCallback"`.
 */
export function usePrepareAlgebraPositionManagerAlgebraMintCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'algebraMintCallback'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'algebraMintCallback',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'algebraMintCallback'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareAlgebraPositionManagerApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"approveForFarming"`.
 */
export function usePrepareAlgebraPositionManagerApproveForFarming(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'approveForFarming'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'approveForFarming',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'approveForFarming'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareAlgebraPositionManagerBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"collect"`.
 */
export function usePrepareAlgebraPositionManagerCollect(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'collect'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'collect',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'collect'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"createAndInitializePoolIfNecessary"`.
 */
export function usePrepareAlgebraPositionManagerCreateAndInitializePoolIfNecessary(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'createAndInitializePoolIfNecessary'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'createAndInitializePoolIfNecessary',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'createAndInitializePoolIfNecessary'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"decreaseLiquidity"`.
 */
export function usePrepareAlgebraPositionManagerDecreaseLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'decreaseLiquidity'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'decreaseLiquidity',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'decreaseLiquidity'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"increaseLiquidity"`.
 */
export function usePrepareAlgebraPositionManagerIncreaseLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'increaseLiquidity'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'increaseLiquidity',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'increaseLiquidity'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareAlgebraPositionManagerMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"multicall"`.
 */
export function usePrepareAlgebraPositionManagerMulticall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'multicall'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'multicall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'multicall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"permit"`.
 */
export function usePrepareAlgebraPositionManagerPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'permit'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'permit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'permit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"refundNativeToken"`.
 */
export function usePrepareAlgebraPositionManagerRefundNativeToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'refundNativeToken'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'refundNativeToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'refundNativeToken'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareAlgebraPositionManagerSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"selfPermit"`.
 */
export function usePrepareAlgebraPositionManagerSelfPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermit'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"selfPermitAllowed"`.
 */
export function usePrepareAlgebraPositionManagerSelfPermitAllowed(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermitAllowed'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowed',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermitAllowed'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`.
 */
export function usePrepareAlgebraPositionManagerSelfPermitAllowedIfNecessary(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermitAllowedIfNecessary'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitAllowedIfNecessary',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermitAllowedIfNecessary'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"selfPermitIfNecessary"`.
 */
export function usePrepareAlgebraPositionManagerSelfPermitIfNecessary(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermitIfNecessary'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'selfPermitIfNecessary',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'selfPermitIfNecessary'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareAlgebraPositionManagerSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'setApprovalForAll'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"setFarmingCenter"`.
 */
export function usePrepareAlgebraPositionManagerSetFarmingCenter(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'setFarmingCenter'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'setFarmingCenter',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'setFarmingCenter'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"sweepToken"`.
 */
export function usePrepareAlgebraPositionManagerSweepToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'sweepToken'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'sweepToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'sweepToken'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"switchFarmingStatus"`.
 */
export function usePrepareAlgebraPositionManagerSwitchFarmingStatus(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'switchFarmingStatus'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'switchFarmingStatus',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'switchFarmingStatus'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareAlgebraPositionManagerTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraPositionManagerABI}__ and `functionName` set to `"unwrapWNativeToken"`.
 */
export function usePrepareAlgebraPositionManagerUnwrapWNativeToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'unwrapWNativeToken'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraPositionManagerABI,
    address: algebraPositionManagerAddress,
    functionName: 'unwrapWNativeToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraPositionManagerABI, 'unwrapWNativeToken'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraQuoterABI}__.
 */
export function useAlgebraQuoterRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof algebraQuoterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraQuoterABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any
) {
  return useContractRead({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    ...config,
  } as UseContractReadConfig<typeof algebraQuoterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"WNativeToken"`.
 */
export function useAlgebraQuoterWNativeToken<
  TFunctionName extends 'WNativeToken',
  TSelectData = ReadContractResult<typeof algebraQuoterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraQuoterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'WNativeToken',
    ...config,
  } as UseContractReadConfig<typeof algebraQuoterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"algebraSwapCallback"`.
 */
export function useAlgebraQuoterAlgebraSwapCallback<
  TFunctionName extends 'algebraSwapCallback',
  TSelectData = ReadContractResult<typeof algebraQuoterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraQuoterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'algebraSwapCallback',
    ...config,
  } as UseContractReadConfig<typeof algebraQuoterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"factory"`.
 */
export function useAlgebraQuoterFactory<
  TFunctionName extends 'factory',
  TSelectData = ReadContractResult<typeof algebraQuoterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraQuoterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'factory',
    ...config,
  } as UseContractReadConfig<typeof algebraQuoterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"poolDeployer"`.
 */
export function useAlgebraQuoterPoolDeployer<
  TFunctionName extends 'poolDeployer',
  TSelectData = ReadContractResult<typeof algebraQuoterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraQuoterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'poolDeployer',
    ...config,
  } as UseContractReadConfig<typeof algebraQuoterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraQuoterABI}__.
 */
export function useAlgebraQuoterWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraQuoterABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof algebraQuoterABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof algebraQuoterABI, TFunctionName, TMode>({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"quoteExactInput"`.
 */
export function useAlgebraQuoterQuoteExactInput<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraQuoterABI, 'quoteExactInput'>['request']['abi'],
        'quoteExactInput',
        TMode
      > & { functionName?: 'quoteExactInput' }
    : UseContractWriteConfig<typeof algebraQuoterABI, 'quoteExactInput', TMode> & {
        abi?: never
        functionName?: 'quoteExactInput'
      } = {} as any
) {
  return useContractWrite<typeof algebraQuoterABI, 'quoteExactInput', TMode>({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInput',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"quoteExactInputSingle"`.
 */
export function useAlgebraQuoterQuoteExactInputSingle<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraQuoterABI, 'quoteExactInputSingle'>['request']['abi'],
        'quoteExactInputSingle',
        TMode
      > & { functionName?: 'quoteExactInputSingle' }
    : UseContractWriteConfig<typeof algebraQuoterABI, 'quoteExactInputSingle', TMode> & {
        abi?: never
        functionName?: 'quoteExactInputSingle'
      } = {} as any
) {
  return useContractWrite<typeof algebraQuoterABI, 'quoteExactInputSingle', TMode>({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInputSingle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"quoteExactOutput"`.
 */
export function useAlgebraQuoterQuoteExactOutput<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraQuoterABI, 'quoteExactOutput'>['request']['abi'],
        'quoteExactOutput',
        TMode
      > & { functionName?: 'quoteExactOutput' }
    : UseContractWriteConfig<typeof algebraQuoterABI, 'quoteExactOutput', TMode> & {
        abi?: never
        functionName?: 'quoteExactOutput'
      } = {} as any
) {
  return useContractWrite<typeof algebraQuoterABI, 'quoteExactOutput', TMode>({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutput',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"quoteExactOutputSingle"`.
 */
export function useAlgebraQuoterQuoteExactOutputSingle<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraQuoterABI, 'quoteExactOutputSingle'>['request']['abi'],
        'quoteExactOutputSingle',
        TMode
      > & { functionName?: 'quoteExactOutputSingle' }
    : UseContractWriteConfig<typeof algebraQuoterABI, 'quoteExactOutputSingle', TMode> & {
        abi?: never
        functionName?: 'quoteExactOutputSingle'
      } = {} as any
) {
  return useContractWrite<typeof algebraQuoterABI, 'quoteExactOutputSingle', TMode>({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutputSingle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraQuoterABI}__.
 */
export function usePrepareAlgebraQuoterWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraQuoterABI, TFunctionName>, 'abi' | 'address'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraQuoterABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"quoteExactInput"`.
 */
export function usePrepareAlgebraQuoterQuoteExactInput(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraQuoterABI, 'quoteExactInput'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInput',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraQuoterABI, 'quoteExactInput'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"quoteExactInputSingle"`.
 */
export function usePrepareAlgebraQuoterQuoteExactInputSingle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraQuoterABI, 'quoteExactInputSingle'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'quoteExactInputSingle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraQuoterABI, 'quoteExactInputSingle'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"quoteExactOutput"`.
 */
export function usePrepareAlgebraQuoterQuoteExactOutput(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraQuoterABI, 'quoteExactOutput'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutput',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraQuoterABI, 'quoteExactOutput'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraQuoterABI}__ and `functionName` set to `"quoteExactOutputSingle"`.
 */
export function usePrepareAlgebraQuoterQuoteExactOutputSingle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraQuoterABI, 'quoteExactOutputSingle'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraQuoterABI,
    address: algebraQuoterAddress,
    functionName: 'quoteExactOutputSingle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraQuoterABI, 'quoteExactOutputSingle'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraRouterABI}__.
 */
export function useAlgebraRouterRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof algebraRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraRouterABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any
) {
  return useContractRead({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    ...config,
  } as UseContractReadConfig<typeof algebraRouterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"WNativeToken"`.
 */
export function useAlgebraRouterWNativeToken<
  TFunctionName extends 'WNativeToken',
  TSelectData = ReadContractResult<typeof algebraRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraRouterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'WNativeToken',
    ...config,
  } as UseContractReadConfig<typeof algebraRouterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"factory"`.
 */
export function useAlgebraRouterFactory<
  TFunctionName extends 'factory',
  TSelectData = ReadContractResult<typeof algebraRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraRouterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'factory',
    ...config,
  } as UseContractReadConfig<typeof algebraRouterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"poolDeployer"`.
 */
export function useAlgebraRouterPoolDeployer<
  TFunctionName extends 'poolDeployer',
  TSelectData = ReadContractResult<typeof algebraRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algebraRouterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'poolDeployer',
    ...config,
  } as UseContractReadConfig<typeof algebraRouterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__.
 */
export function useAlgebraRouterWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof algebraRouterABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, TFunctionName, TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"algebraSwapCallback"`.
 */
export function useAlgebraRouterAlgebraSwapCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'algebraSwapCallback'>['request']['abi'],
        'algebraSwapCallback',
        TMode
      > & { functionName?: 'algebraSwapCallback' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'algebraSwapCallback', TMode> & {
        abi?: never
        functionName?: 'algebraSwapCallback'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'algebraSwapCallback', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'algebraSwapCallback',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"exactInput"`.
 */
export function useAlgebraRouterExactInput<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'exactInput'>['request']['abi'],
        'exactInput',
        TMode
      > & { functionName?: 'exactInput' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'exactInput', TMode> & {
        abi?: never
        functionName?: 'exactInput'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'exactInput', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'exactInput',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"exactInputSingle"`.
 */
export function useAlgebraRouterExactInputSingle<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'exactInputSingle'>['request']['abi'],
        'exactInputSingle',
        TMode
      > & { functionName?: 'exactInputSingle' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'exactInputSingle', TMode> & {
        abi?: never
        functionName?: 'exactInputSingle'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'exactInputSingle', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'exactInputSingle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"exactInputSingleSupportingFeeOnTransferTokens"`.
 */
export function useAlgebraRouterExactInputSingleSupportingFeeOnTransferTokens<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof algebraRouterABI,
          'exactInputSingleSupportingFeeOnTransferTokens'
        >['request']['abi'],
        'exactInputSingleSupportingFeeOnTransferTokens',
        TMode
      > & { functionName?: 'exactInputSingleSupportingFeeOnTransferTokens' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'exactInputSingleSupportingFeeOnTransferTokens', TMode> & {
        abi?: never
        functionName?: 'exactInputSingleSupportingFeeOnTransferTokens'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'exactInputSingleSupportingFeeOnTransferTokens', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'exactInputSingleSupportingFeeOnTransferTokens',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"exactOutput"`.
 */
export function useAlgebraRouterExactOutput<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'exactOutput'>['request']['abi'],
        'exactOutput',
        TMode
      > & { functionName?: 'exactOutput' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'exactOutput', TMode> & {
        abi?: never
        functionName?: 'exactOutput'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'exactOutput', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'exactOutput',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"exactOutputSingle"`.
 */
export function useAlgebraRouterExactOutputSingle<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'exactOutputSingle'>['request']['abi'],
        'exactOutputSingle',
        TMode
      > & { functionName?: 'exactOutputSingle' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'exactOutputSingle', TMode> & {
        abi?: never
        functionName?: 'exactOutputSingle'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'exactOutputSingle', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'exactOutputSingle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"multicall"`.
 */
export function useAlgebraRouterMulticall<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'multicall'>['request']['abi'],
        'multicall',
        TMode
      > & { functionName?: 'multicall' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'multicall', TMode> & {
        abi?: never
        functionName?: 'multicall'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'multicall', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'multicall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"refundNativeToken"`.
 */
export function useAlgebraRouterRefundNativeToken<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'refundNativeToken'>['request']['abi'],
        'refundNativeToken',
        TMode
      > & { functionName?: 'refundNativeToken' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'refundNativeToken', TMode> & {
        abi?: never
        functionName?: 'refundNativeToken'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'refundNativeToken', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'refundNativeToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"selfPermit"`.
 */
export function useAlgebraRouterSelfPermit<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'selfPermit'>['request']['abi'],
        'selfPermit',
        TMode
      > & { functionName?: 'selfPermit' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'selfPermit', TMode> & {
        abi?: never
        functionName?: 'selfPermit'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'selfPermit', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'selfPermit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"selfPermitAllowed"`.
 */
export function useAlgebraRouterSelfPermitAllowed<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'selfPermitAllowed'>['request']['abi'],
        'selfPermitAllowed',
        TMode
      > & { functionName?: 'selfPermitAllowed' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'selfPermitAllowed', TMode> & {
        abi?: never
        functionName?: 'selfPermitAllowed'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'selfPermitAllowed', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowed',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`.
 */
export function useAlgebraRouterSelfPermitAllowedIfNecessary<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'selfPermitAllowedIfNecessary'>['request']['abi'],
        'selfPermitAllowedIfNecessary',
        TMode
      > & { functionName?: 'selfPermitAllowedIfNecessary' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'selfPermitAllowedIfNecessary', TMode> & {
        abi?: never
        functionName?: 'selfPermitAllowedIfNecessary'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'selfPermitAllowedIfNecessary', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowedIfNecessary',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"selfPermitIfNecessary"`.
 */
export function useAlgebraRouterSelfPermitIfNecessary<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'selfPermitIfNecessary'>['request']['abi'],
        'selfPermitIfNecessary',
        TMode
      > & { functionName?: 'selfPermitIfNecessary' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'selfPermitIfNecessary', TMode> & {
        abi?: never
        functionName?: 'selfPermitIfNecessary'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'selfPermitIfNecessary', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'selfPermitIfNecessary',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"sweepToken"`.
 */
export function useAlgebraRouterSweepToken<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'sweepToken'>['request']['abi'],
        'sweepToken',
        TMode
      > & { functionName?: 'sweepToken' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'sweepToken', TMode> & {
        abi?: never
        functionName?: 'sweepToken'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'sweepToken', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'sweepToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"sweepTokenWithFee"`.
 */
export function useAlgebraRouterSweepTokenWithFee<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'sweepTokenWithFee'>['request']['abi'],
        'sweepTokenWithFee',
        TMode
      > & { functionName?: 'sweepTokenWithFee' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'sweepTokenWithFee', TMode> & {
        abi?: never
        functionName?: 'sweepTokenWithFee'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'sweepTokenWithFee', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'sweepTokenWithFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"unwrapWNativeToken"`.
 */
export function useAlgebraRouterUnwrapWNativeToken<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'unwrapWNativeToken'>['request']['abi'],
        'unwrapWNativeToken',
        TMode
      > & { functionName?: 'unwrapWNativeToken' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'unwrapWNativeToken', TMode> & {
        abi?: never
        functionName?: 'unwrapWNativeToken'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'unwrapWNativeToken', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"unwrapWNativeTokenWithFee"`.
 */
export function useAlgebraRouterUnwrapWNativeTokenWithFee<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algebraRouterABI, 'unwrapWNativeTokenWithFee'>['request']['abi'],
        'unwrapWNativeTokenWithFee',
        TMode
      > & { functionName?: 'unwrapWNativeTokenWithFee' }
    : UseContractWriteConfig<typeof algebraRouterABI, 'unwrapWNativeTokenWithFee', TMode> & {
        abi?: never
        functionName?: 'unwrapWNativeTokenWithFee'
      } = {} as any
) {
  return useContractWrite<typeof algebraRouterABI, 'unwrapWNativeTokenWithFee', TMode>({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeTokenWithFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__.
 */
export function usePrepareAlgebraRouterWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof algebraRouterABI, TFunctionName>, 'abi' | 'address'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"algebraSwapCallback"`.
 */
export function usePrepareAlgebraRouterAlgebraSwapCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'algebraSwapCallback'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'algebraSwapCallback',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'algebraSwapCallback'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"exactInput"`.
 */
export function usePrepareAlgebraRouterExactInput(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'exactInput'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'exactInput',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'exactInput'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"exactInputSingle"`.
 */
export function usePrepareAlgebraRouterExactInputSingle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'exactInputSingle'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'exactInputSingle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'exactInputSingle'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"exactInputSingleSupportingFeeOnTransferTokens"`.
 */
export function usePrepareAlgebraRouterExactInputSingleSupportingFeeOnTransferTokens(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'exactInputSingleSupportingFeeOnTransferTokens'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'exactInputSingleSupportingFeeOnTransferTokens',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'exactInputSingleSupportingFeeOnTransferTokens'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"exactOutput"`.
 */
export function usePrepareAlgebraRouterExactOutput(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'exactOutput'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'exactOutput',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'exactOutput'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"exactOutputSingle"`.
 */
export function usePrepareAlgebraRouterExactOutputSingle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'exactOutputSingle'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'exactOutputSingle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'exactOutputSingle'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"multicall"`.
 */
export function usePrepareAlgebraRouterMulticall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'multicall'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'multicall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'multicall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"refundNativeToken"`.
 */
export function usePrepareAlgebraRouterRefundNativeToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'refundNativeToken'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'refundNativeToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'refundNativeToken'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"selfPermit"`.
 */
export function usePrepareAlgebraRouterSelfPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'selfPermit'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'selfPermit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'selfPermit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"selfPermitAllowed"`.
 */
export function usePrepareAlgebraRouterSelfPermitAllowed(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'selfPermitAllowed'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowed',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'selfPermitAllowed'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"selfPermitAllowedIfNecessary"`.
 */
export function usePrepareAlgebraRouterSelfPermitAllowedIfNecessary(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'selfPermitAllowedIfNecessary'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'selfPermitAllowedIfNecessary',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'selfPermitAllowedIfNecessary'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"selfPermitIfNecessary"`.
 */
export function usePrepareAlgebraRouterSelfPermitIfNecessary(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'selfPermitIfNecessary'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'selfPermitIfNecessary',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'selfPermitIfNecessary'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"sweepToken"`.
 */
export function usePrepareAlgebraRouterSweepToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'sweepToken'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'sweepToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'sweepToken'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"sweepTokenWithFee"`.
 */
export function usePrepareAlgebraRouterSweepTokenWithFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'sweepTokenWithFee'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'sweepTokenWithFee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'sweepTokenWithFee'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"unwrapWNativeToken"`.
 */
export function usePrepareAlgebraRouterUnwrapWNativeToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'unwrapWNativeToken'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'unwrapWNativeToken'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algebraRouterABI}__ and `functionName` set to `"unwrapWNativeTokenWithFee"`.
 */
export function usePrepareAlgebraRouterUnwrapWNativeTokenWithFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algebraRouterABI, 'unwrapWNativeTokenWithFee'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algebraRouterABI,
    address: algebraRouterAddress,
    functionName: 'unwrapWNativeTokenWithFee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algebraRouterABI, 'unwrapWNativeTokenWithFee'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algerbaQuoterV2ABI}__.
 */
export function useAlgerbaQuoterV2Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof algerbaQuoterV2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algerbaQuoterV2ABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any
) {
  return useContractRead({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    ...config,
  } as UseContractReadConfig<typeof algerbaQuoterV2ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"WNativeToken"`.
 */
export function useAlgerbaQuoterV2WNativeToken<
  TFunctionName extends 'WNativeToken',
  TSelectData = ReadContractResult<typeof algerbaQuoterV2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algerbaQuoterV2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'WNativeToken',
    ...config,
  } as UseContractReadConfig<typeof algerbaQuoterV2ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"algebraSwapCallback"`.
 */
export function useAlgerbaQuoterV2AlgebraSwapCallback<
  TFunctionName extends 'algebraSwapCallback',
  TSelectData = ReadContractResult<typeof algerbaQuoterV2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algerbaQuoterV2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'algebraSwapCallback',
    ...config,
  } as UseContractReadConfig<typeof algerbaQuoterV2ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"factory"`.
 */
export function useAlgerbaQuoterV2Factory<
  TFunctionName extends 'factory',
  TSelectData = ReadContractResult<typeof algerbaQuoterV2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algerbaQuoterV2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'factory',
    ...config,
  } as UseContractReadConfig<typeof algerbaQuoterV2ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"poolDeployer"`.
 */
export function useAlgerbaQuoterV2PoolDeployer<
  TFunctionName extends 'poolDeployer',
  TSelectData = ReadContractResult<typeof algerbaQuoterV2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof algerbaQuoterV2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return useContractRead({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'poolDeployer',
    ...config,
  } as UseContractReadConfig<typeof algerbaQuoterV2ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algerbaQuoterV2ABI}__.
 */
export function useAlgerbaQuoterV2Write<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algerbaQuoterV2ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof algerbaQuoterV2ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<typeof algerbaQuoterV2ABI, TFunctionName, TMode>({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"quoteExactInput"`.
 */
export function useAlgerbaQuoterV2QuoteExactInput<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algerbaQuoterV2ABI, 'quoteExactInput'>['request']['abi'],
        'quoteExactInput',
        TMode
      > & { functionName?: 'quoteExactInput' }
    : UseContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactInput', TMode> & {
        abi?: never
        functionName?: 'quoteExactInput'
      } = {} as any
) {
  return useContractWrite<typeof algerbaQuoterV2ABI, 'quoteExactInput', TMode>({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInput',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"quoteExactInputSingle"`.
 */
export function useAlgerbaQuoterV2QuoteExactInputSingle<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algerbaQuoterV2ABI, 'quoteExactInputSingle'>['request']['abi'],
        'quoteExactInputSingle',
        TMode
      > & { functionName?: 'quoteExactInputSingle' }
    : UseContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactInputSingle', TMode> & {
        abi?: never
        functionName?: 'quoteExactInputSingle'
      } = {} as any
) {
  return useContractWrite<typeof algerbaQuoterV2ABI, 'quoteExactInputSingle', TMode>({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInputSingle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"quoteExactOutput"`.
 */
export function useAlgerbaQuoterV2QuoteExactOutput<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algerbaQuoterV2ABI, 'quoteExactOutput'>['request']['abi'],
        'quoteExactOutput',
        TMode
      > & { functionName?: 'quoteExactOutput' }
    : UseContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactOutput', TMode> & {
        abi?: never
        functionName?: 'quoteExactOutput'
      } = {} as any
) {
  return useContractWrite<typeof algerbaQuoterV2ABI, 'quoteExactOutput', TMode>({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutput',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"quoteExactOutputSingle"`.
 */
export function useAlgerbaQuoterV2QuoteExactOutputSingle<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof algerbaQuoterV2ABI, 'quoteExactOutputSingle'>['request']['abi'],
        'quoteExactOutputSingle',
        TMode
      > & { functionName?: 'quoteExactOutputSingle' }
    : UseContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactOutputSingle', TMode> & {
        abi?: never
        functionName?: 'quoteExactOutputSingle'
      } = {} as any
) {
  return useContractWrite<typeof algerbaQuoterV2ABI, 'quoteExactOutputSingle', TMode>({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutputSingle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algerbaQuoterV2ABI}__.
 */
export function usePrepareAlgerbaQuoterV2Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof algerbaQuoterV2ABI, TFunctionName>, 'abi' | 'address'> = {} as any
) {
  return usePrepareContractWrite({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    ...config,
  } as UsePrepareContractWriteConfig<typeof algerbaQuoterV2ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"quoteExactInput"`.
 */
export function usePrepareAlgerbaQuoterV2QuoteExactInput(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactInput'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInput',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactInput'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"quoteExactInputSingle"`.
 */
export function usePrepareAlgerbaQuoterV2QuoteExactInputSingle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactInputSingle'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactInputSingle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactInputSingle'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"quoteExactOutput"`.
 */
export function usePrepareAlgerbaQuoterV2QuoteExactOutput(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactOutput'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutput',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactOutput'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link algerbaQuoterV2ABI}__ and `functionName` set to `"quoteExactOutputSingle"`.
 */
export function usePrepareAlgerbaQuoterV2QuoteExactOutputSingle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactOutputSingle'>,
    'abi' | 'address' | 'functionName'
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: algerbaQuoterV2ABI,
    address: algerbaQuoterV2Address,
    functionName: 'quoteExactOutputSingle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof algerbaQuoterV2ABI, 'quoteExactOutputSingle'>)
}
