/* eslint-disable import/prefer-default-export */

import chrmigrateabi from '../../abi/chrmigrate.json'
import chrnftmigrateabi from '../../abi/chrnftmigrate.json'
import vechrmigrateabi from '../../abi/vechrmigrate.json'
import elchrmigrateabi from '../../abi/elchrmigrate.json'
import spchrmigrateabi from '../../abi/spchrmigrate.json'
import chrabi from '../../abi/chr.json'
import chrnftabi from '../../abi/chrnft.json'
import vechrabi from '../../abi/vechr.json'
import elchrabi from '../../abi/elchr.json'
import spchrabi from '../../abi/spchr.json'

export const EXCHANGE_LIST = [
  {
    label: 'Exchange Ratio',
    amount: '166 CHR: 1 veFNX',
    icon: 'icon-lucide',
  },
  {
    label: 'Exchange Ratio',
    amount: '166 spCHR: 1 veFNX',
    icon: 'icon-lucide',
  },
  {
    label: 'Exchange Ratio',
    amount: '166 elCHR: 1 veFNX',
    icon: 'icon-lucide',
  },
  {
    label: 'Exchange Ratio',
    amount: '76 veCHR: 1 veFNX',
    icon: 'icon-lucide',
  },
  {
    label: 'Exchange Ratio',
    amount: '1 chrNFT: 76 veFNX',
    icon: 'icon-lucide',
  },
]

export const TOKENS_LIST = [
  {
    token: 'CHR',
    abi:chrabi,
    address:'0x15b2fb8f08e4ac1ce019eadae02ee92aedf06851',
    migrateAddress:"0x5152875C0982b57dd9515A8230eE3621E774aCB1",
    migrateabi:chrmigrateabi,
    icon: 'CHR',
    migrated: {
      amount: 12.49,
      icon: 'CHR',
    },
    claimable: {
      amount: 14.89,
      icon: 'FNX',
    },
  },
  {
    token: 'veCHR',
    abi:vechrabi,
    address:'0x9A01857f33aa382b1d5bb96C3180347862432B0d',
    migrateAddress:"0x1bFd1e832Be53D423d1F5b8f91C37FBB492af322",
    migrateabi:vechrmigrateabi,
    icon: 'CHR',
    migrated: {
      amount: 123.49,
      icon: 'CHR',
    },
    claimable: {
      amount: 136.78,
      icon: 'FNX',
    },
  },
  {
    token: 'chrNFT',
    abi:chrnftabi,
    address:'0x55d26d7e20bfb42948a05d6d9a69af8fd5400fa0',
    migrateAddress:"0x0372Fd0930f0956766bC61933ceD9daC9Fe6b8b8",
    migrateabi:chrnftmigrateabi,
    icon: 'chrNFT',
    migrated: {
      amount: 3,
      icon: 'chrNFT',
    },
    claimable: {
      amount: 3.18,
      icon: 'FNX',
    },
  },
  {
    token: 'elCHR',
    abi:elchrabi,
    address:'0xD600Ec98cf6418c50EE051ACE53219D95AeAa134',
    migrateAddress:"0x2d36289E80F5E135bdc10edF491F84905109a37f",
    migrateabi:elchrmigrateabi,
    icon: 'CHR',
    migrated: {
      amount: 30,
      icon: 'CHR',
    },
    claimable: {
      amount: 21,
      icon: 'FNX',
    },
  },
  {
    token: 'spCHR',
    abi:spchrabi,
    address:'0xFEA2906087D82BD8Da630E7E2c7D9a4dEb061097',
    migrateAddress:"0x1F8fCdd07711d6631069edE517583ABECC273819",
    migrateabi:spchrmigrateabi,
    icon: 'CHR',
    migrated: {
      amount: 30,
      icon: 'CHR',
    },
    claimable: {
      amount: 21,
      icon: 'FNX',
    },
  },
]

export const NONSNAPSHOT_TOKENS_LIST = [
  {
    token: 'CHR',
    abi:chrabi,
    address:'0x15b2fb8f08e4ac1ce019eadae02ee92aedf06851',
    migrateAddress:"0x5152875C0982b57dd9515A8230eE3621E774aCB1",
    migrateabi:chrmigrateabi,
    icon: 'CHR',
    migrated: {
      amount: 12.49,
      icon: 'CHR',
    },
    claimable: {
      amount: 14.89,
      icon: 'FNX',
    },
  },
  {
    token: 'veCHR',
    abi:vechrabi,
    address:'0x9A01857f33aa382b1d5bb96C3180347862432B0d',
    migrateAddress:"0x1bFd1e832Be53D423d1F5b8f91C37FBB492af322",
    migrateabi:vechrmigrateabi,
    icon: 'CHR',
    migrated: {
      amount: 123.49,
      icon: 'CHR',
    },
    claimable: {
      amount: 136.78,
      icon: 'FNX',
    },
  },
  // {
  //   token: 'chrNFT',
  //   abi:chrnftabi,
  //   address:'0x55d26d7e20bfb42948a05d6d9a69af8fd5400fa0',
  //   migrateAddress:"0x0372Fd0930f0956766bC61933ceD9daC9Fe6b8b8",
  //   migrateabi:chrnftmigrateabi,
  //   icon: 'chrNFT',
  //   migrated: {
  //     amount: 3,
  //     icon: 'chrNFT',
  //   },
  //   claimable: {
  //     amount: 3.18,
  //     icon: 'FNX',
  //   },
  // },
 
]

export const STEPS = [
  {
    title: 'Check your Wallet',
    description: 'Sign in with your wallet to check your CHR ecosystem tokens balances.',
    icon: 'icon-wallet',
  },
  {
    title: 'Migrate your Tokens',
    description: 'Select your CHR ecosystem tokens and migrate them to veFNX.',
    icon: 'icon-circles',
  },
  {
    title: 'Migration',
    description:
      'Your veFNX tokens will be airdropped a week before the launch of Fenix to the wallet you used for the migration.',
    icon: 'icon-download',
  },
]
