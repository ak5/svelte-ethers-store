(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('ethers'), require('svelte-proxied-store'), require('svelte/store')) :
  typeof define === 'function' && define.amd ? define(['exports', 'ethers', 'svelte-proxied-store', 'svelte/store'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ethers-stores"] = {}, global.ethers, global.svelteProxiedStore, global.store));
})(this, (function (exports, ethers, svelteProxiedStore, store) { 'use strict';

  const chains = [
    {
      name: 'Ethereum Mainnet',
      chain: 'ETH',
      icon: 'ethereum',
      rpc: [
        'https://mainnet.infura.io/v3/${INFURA_API_KEY}',
        'wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}',
        'https://api.mycryptoapi.com/eth',
        'https://cloudflare-eth.com'
      ],
      faucets: [],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://ethereum.org',
      shortName: 'eth',
      chainId: 1,
      networkId: 1,
      slip44: 60,
      ens: { registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
      explorers: [
        {
          name: 'etherscan',
          url: 'https://etherscan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Expanse Network',
      chain: 'EXP',
      rpc: [ 'https://node.expanse.tech' ],
      faucets: [],
      nativeCurrency: { name: 'Expanse Network Ether', symbol: 'EXP', decimals: 18 },
      infoURL: 'https://expanse.tech',
      shortName: 'exp',
      chainId: 2,
      networkId: 1,
      slip44: 40
    },
    {
      name: 'Ropsten',
      title: 'Ethereum Testnet Ropsten',
      chain: 'ETH',
      network: 'testnet',
      rpc: [
        'https://ropsten.infura.io/v3/${INFURA_API_KEY}',
        'wss://ropsten.infura.io/ws/v3/${INFURA_API_KEY}'
      ],
      faucets: [
        'http://fauceth.komputing.org?chain=3&address=${ADDRESS}',
        'https://faucet.ropsten.be?${ADDRESS}'
      ],
      nativeCurrency: { name: 'Ropsten Ether', symbol: 'ROP', decimals: 18 },
      infoURL: 'https://github.com/ethereum/ropsten',
      shortName: 'rop',
      chainId: 3,
      networkId: 3,
      ens: { registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010' },
      explorers: [
        {
          name: 'etherscan',
          url: 'https://ropsten.etherscan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Rinkeby',
      title: 'Ethereum Testnet Rinkeby',
      chain: 'ETH',
      network: 'testnet',
      rpc: [
        'https://rinkeby.infura.io/v3/${INFURA_API_KEY}',
        'wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY}'
      ],
      faucets: [
        'http://fauceth.komputing.org?chain=4&address=${ADDRESS}',
        'https://faucet.rinkeby.io'
      ],
      nativeCurrency: { name: 'Rinkeby Ether', symbol: 'RIN', decimals: 18 },
      infoURL: 'https://www.rinkeby.io',
      shortName: 'rin',
      chainId: 4,
      networkId: 4,
      ens: { registry: '0xe7410170f87102df0055eb195163a03b7f2bff4a' },
      explorers: [
        {
          name: 'etherscan-rinkeby',
          url: 'https://rinkeby.etherscan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Görli',
      title: 'Ethereum Testnet Görli',
      chain: 'ETH',
      network: 'testnet',
      rpc: [
        'https://goerli.infura.io/v3/${INFURA_API_KEY}',
        'wss://goerli.infura.io/v3/${INFURA_API_KEY}',
        'https://rpc.goerli.mudit.blog/'
      ],
      faucets: [
        'http://fauceth.komputing.org?chain=5&address=${ADDRESS}',
        'https://goerli-faucet.slock.it?address=${ADDRESS}',
        'https://faucet.goerli.mudit.blog'
      ],
      nativeCurrency: { name: 'Görli Ether', symbol: 'GOR', decimals: 18 },
      infoURL: 'https://goerli.net/#about',
      shortName: 'gor',
      chainId: 5,
      networkId: 5,
      ens: { registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010' },
      explorers: [
        {
          name: 'etherscan-goerli',
          url: 'https://goerli.etherscan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Ethereum Classic Testnet Kotti',
      chain: 'ETC',
      rpc: [ 'https://www.ethercluster.com/kotti' ],
      faucets: [],
      nativeCurrency: { name: 'Kotti Ether', symbol: 'KOT', decimals: 18 },
      infoURL: 'https://explorer.jade.builders/?network=kotti',
      shortName: 'kot',
      chainId: 6,
      networkId: 6
    },
    {
      name: 'ThaiChain',
      chain: 'TCH',
      rpc: [ 'https://rpc.dome.cloud' ],
      faucets: [],
      nativeCurrency: { name: 'ThaiChain Ether', symbol: 'TCH', decimals: 18 },
      infoURL: 'https://thaichain.io',
      shortName: 'tch',
      chainId: 7,
      networkId: 7
    },
    {
      name: 'Ubiq',
      chain: 'UBQ',
      rpc: [ 'https://rpc.octano.dev', 'https://pyrus2.ubiqscan.io' ],
      faucets: [],
      nativeCurrency: { name: 'Ubiq Ether', symbol: 'UBQ', decimals: 18 },
      infoURL: 'https://ubiqsmart.com',
      shortName: 'ubq',
      chainId: 8,
      networkId: 8,
      slip44: 108,
      explorers: [
        {
          name: 'ubiqscan',
          url: 'https://ubiqscan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Ubiq Network Testnet',
      chain: 'UBQ',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Ubiq Testnet Ether', symbol: 'TUBQ', decimals: 18 },
      infoURL: 'https://ethersocial.org',
      shortName: 'tubq',
      chainId: 9,
      networkId: 2
    },
    {
      name: 'Optimism',
      chain: 'ETH',
      rpc: [ 'https://mainnet.optimism.io/' ],
      faucets: [],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://optimism.io',
      shortName: 'oeth',
      chainId: 10,
      networkId: 10,
      explorers: [
        {
          name: 'etherscan',
          url: 'https://optimistic.etherscan.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Metadium Mainnet',
      chain: 'META',
      rpc: [ 'https://api.metadium.com/prod' ],
      faucets: [],
      nativeCurrency: { name: 'Metadium Mainnet Ether', symbol: 'META', decimals: 18 },
      infoURL: 'https://metadium.com',
      shortName: 'meta',
      chainId: 11,
      networkId: 11,
      slip44: 916
    },
    {
      name: 'Metadium Testnet',
      chain: 'META',
      rpc: [ 'https://api.metadium.com/dev' ],
      faucets: [],
      nativeCurrency: { name: 'Metadium Testnet Ether', symbol: 'KAL', decimals: 18 },
      infoURL: 'https://metadium.com',
      shortName: 'kal',
      chainId: 12,
      networkId: 12
    },
    {
      name: 'Diode Testnet Staging',
      chain: 'DIODE',
      rpc: [
        'https://staging.diode.io:8443/',
        'wss://staging.diode.io:8443/ws'
      ],
      faucets: [],
      nativeCurrency: { name: 'Staging Diodes', symbol: 'sDIODE', decimals: 18 },
      infoURL: 'https://diode.io/staging',
      shortName: 'dstg',
      chainId: 13,
      networkId: 13
    },
    {
      name: 'Flare Mainnet',
      chain: 'FLR',
      icon: 'flare',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Spark', symbol: 'FLR', decimals: 18 },
      infoURL: 'https://flare.xyz',
      shortName: 'flr',
      chainId: 14,
      networkId: 14
    },
    {
      name: 'Diode Prenet',
      chain: 'DIODE',
      rpc: [
        'https://prenet.diode.io:8443/',
        'wss://prenet.diode.io:8443/ws'
      ],
      faucets: [],
      nativeCurrency: { name: 'Diodes', symbol: 'DIODE', decimals: 18 },
      infoURL: 'https://diode.io/prenet',
      shortName: 'diode',
      chainId: 15,
      networkId: 15
    },
    {
      name: 'Flare Testnet Coston',
      chain: 'FLR',
      rpc: [ 'https://coston-api.flare.network/ext/bc/C/rpc' ],
      faucets: [
        'https://faucet.towolabs.com',
        'https://fauceth.komputing.org?chain=16&address=${ADDRESS}'
      ],
      nativeCurrency: { name: 'Coston Spark', symbol: 'CFLR', decimals: 18 },
      infoURL: 'https://flare.xyz',
      shortName: 'cflr',
      chainId: 16,
      networkId: 16,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://coston-explorer.flare.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'ThaiChain 2.0 ThaiFi',
      chain: 'TCH',
      rpc: [ 'https://rpc.thaifi.com' ],
      faucets: [],
      nativeCurrency: { name: 'Thaifi Ether', symbol: 'TFI', decimals: 18 },
      infoURL: 'https://exp.thaifi.com',
      shortName: 'tfi',
      chainId: 17,
      networkId: 17
    },
    {
      name: 'ThunderCore Testnet',
      chain: 'TST',
      rpc: [ 'https://testnet-rpc.thundercore.com' ],
      faucets: [ 'https://faucet-testnet.thundercore.com' ],
      nativeCurrency: { name: 'ThunderCore Testnet Token', symbol: 'TST', decimals: 18 },
      infoURL: 'https://thundercore.com',
      shortName: 'TST',
      chainId: 18,
      networkId: 18,
      explorers: [
        {
          name: 'thundercore-blockscout-testnet',
          url: 'https://explorer-testnet.thundercore.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Songbird Canary-Network',
      chain: 'SGB',
      icon: 'songbird',
      rpc: [
        'https://songbird.towolabs.com/rpc',
        'https://sgb.ftso.com.au/ext/bc/C/rpc',
        'https://sgb.lightft.so/rpc',
        'https://sgb-rpc.ftso.eu'
      ],
      faucets: [],
      nativeCurrency: { name: 'Songbird', symbol: 'SGB', decimals: 18 },
      infoURL: 'https://flare.xyz',
      shortName: 'sgb',
      chainId: 19,
      networkId: 19,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://songbird-explorer.flare.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Elastos Smart Chain',
      chain: 'ETH',
      rpc: [ 'https://api.elastos.io/eth' ],
      faucets: [ 'https://faucet.elastos.org/' ],
      nativeCurrency: { name: 'Elastos', symbol: 'ELA', decimals: 18 },
      infoURL: 'https://www.elastos.org/',
      shortName: 'elaeth',
      chainId: 20,
      networkId: 20,
      explorers: [
        {
          name: 'elastos eth explorer',
          url: 'https://eth.elastos.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'ELA-ETH-Sidechain Testnet',
      chain: 'ETH',
      rpc: [ 'https://rpc.elaeth.io' ],
      faucets: [ 'https://faucet.elaeth.io/' ],
      nativeCurrency: { name: 'Elastos', symbol: 'tELA', decimals: 18 },
      infoURL: 'https://elaeth.io/',
      shortName: 'elaetht',
      chainId: 21,
      networkId: 21
    },
    {
      name: 'ELA-DID-Sidechain Mainnet',
      chain: 'ETH',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Elastos', symbol: 'ELA', decimals: 18 },
      infoURL: 'https://www.elastos.org/',
      shortName: 'eladid',
      chainId: 22,
      networkId: 22
    },
    {
      name: 'ELA-DID-Sidechain Testnet',
      chain: 'ETH',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Elastos', symbol: 'tELA', decimals: 18 },
      infoURL: 'https://elaeth.io/',
      shortName: 'eladidt',
      chainId: 23,
      networkId: 23
    },
    {
      name: 'Dithereum Mainnet',
      chain: 'DTH',
      icon: 'dithereum',
      rpc: [ 'https://node-mainnet.dithereum.io' ],
      faucets: [ 'https://faucet.dithereum.org' ],
      nativeCurrency: { name: 'Dither', symbol: 'DTH', decimals: 18 },
      infoURL: 'https://dithereum.org',
      shortName: 'dthmainnet',
      chainId: 24,
      networkId: 24
    },
    {
      name: 'Cronos Mainnet Beta',
      chain: 'CRO',
      rpc: [ 'https://evm.cronos.org' ],
      faucets: [],
      nativeCurrency: { name: 'Cronos', symbol: 'CRO', decimals: 18 },
      infoURL: 'https://cronos.org/',
      shortName: 'cro',
      chainId: 25,
      networkId: 25,
      explorers: [
        {
          name: 'Cronos Explorer',
          url: 'https://cronos.org/explorer',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Genesis L1 testnet',
      chain: 'genesis',
      rpc: [ 'https://testrpc.genesisl1.org' ],
      faucets: [],
      nativeCurrency: { name: 'L1 testcoin', symbol: 'L1test', decimals: 18 },
      infoURL: 'https://www.genesisl1.com',
      shortName: 'L1test',
      chainId: 26,
      networkId: 26,
      explorers: [
        {
          name: 'Genesis L1 testnet explorer',
          url: 'https://testnet.genesisl1.org',
          standard: 'none'
        }
      ]
    },
    {
      name: 'ShibaChain',
      chain: 'SHIB',
      rpc: [ 'https://rpc.shibachain.net' ],
      faucets: [],
      nativeCurrency: { name: 'SHIBA INU COIN', symbol: 'SHIB', decimals: 18 },
      infoURL: 'https://www.shibachain.net',
      shortName: 'shib',
      chainId: 27,
      networkId: 27,
      explorers: [
        {
          name: 'Shiba Explorer',
          url: 'https://exp.shibachain.net',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Boba Network Rinkeby Testnet',
      chain: 'ETH',
      rpc: [ 'https://rinkeby.boba.network/' ],
      faucets: [],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://boba.network',
      shortName: 'Boba Rinkeby',
      chainId: 28,
      networkId: 28,
      explorers: [
        {
          name: 'Blockscout',
          url: 'https://blockexplorer.rinkeby.boba.network',
          standard: 'none'
        }
      ],
      parent: {
        type: 'L2',
        chain: 'eip155-4',
        bridges: [ { url: 'https://gateway.rinkeby.boba.network' } ]
      }
    },
    {
      name: 'Genesis L1',
      chain: 'genesis',
      rpc: [ 'https://rpc.genesisl1.org' ],
      faucets: [],
      nativeCurrency: { name: 'L1 coin', symbol: 'L1', decimals: 18 },
      infoURL: 'https://www.genesisl1.com',
      shortName: 'L1',
      chainId: 29,
      networkId: 29,
      explorers: [
        {
          name: 'Genesis L1 blockchain explorer',
          url: 'https://explorer.genesisl1.org',
          standard: 'none'
        }
      ]
    },
    {
      name: 'RSK Mainnet',
      chain: 'RSK',
      rpc: [ 'https://public-node.rsk.co', 'https://mycrypto.rsk.co' ],
      faucets: [ 'https://free-online-app.com/faucet-for-eth-evm-chains/' ],
      nativeCurrency: { name: 'RSK Mainnet Ether', symbol: 'RBTC', decimals: 18 },
      infoURL: 'https://rsk.co',
      shortName: 'rsk',
      chainId: 30,
      networkId: 30,
      slip44: 137,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://explorer.rsk.co',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'RSK Testnet',
      chain: 'RSK',
      rpc: [
        'https://public-node.testnet.rsk.co',
        'https://mycrypto.testnet.rsk.co'
      ],
      faucets: [ 'https://faucet.testnet.rsk.co' ],
      nativeCurrency: { name: 'RSK Testnet Ether', symbol: 'tRBTC', decimals: 18 },
      infoURL: 'https://rsk.co',
      shortName: 'trsk',
      chainId: 31,
      networkId: 31
    },
    {
      name: 'GoodData Testnet',
      chain: 'GooD',
      rpc: [ 'https://test2.goodata.io' ],
      faucets: [],
      nativeCurrency: { name: 'GoodData Testnet Ether', symbol: 'GooD', decimals: 18 },
      infoURL: 'https://www.goodata.org',
      shortName: 'GooDT',
      chainId: 32,
      networkId: 32
    },
    {
      name: 'GoodData Mainnet',
      chain: 'GooD',
      rpc: [ 'https://rpc.goodata.io' ],
      faucets: [],
      nativeCurrency: { name: 'GoodData Mainnet Ether', symbol: 'GooD', decimals: 18 },
      infoURL: 'https://www.goodata.org',
      shortName: 'GooD',
      chainId: 33,
      networkId: 33
    },
    {
      name: 'Dithereum Testnet',
      chain: 'DTH',
      icon: 'dithereum',
      rpc: [ 'https://node-testnet.dithereum.io' ],
      faucets: [ 'https://faucet.dithereum.org' ],
      nativeCurrency: { name: 'Dither', symbol: 'DTH', decimals: 18 },
      infoURL: 'https://dithereum.org',
      shortName: 'dth',
      chainId: 34,
      networkId: 34
    },
    {
      name: 'TBWG Chain',
      chain: 'TBWG',
      rpc: [ 'https://rpc.tbwg.io' ],
      faucets: [],
      nativeCurrency: { name: 'TBWG Ether', symbol: 'TBG', decimals: 18 },
      infoURL: 'https://tbwg.io',
      shortName: 'tbwg',
      chainId: 35,
      networkId: 35
    },
    {
      name: 'Valorbit',
      chain: 'VAL',
      rpc: [ 'https://rpc.valorbit.com/v2' ],
      faucets: [],
      nativeCurrency: { name: 'Valorbit', symbol: 'VAL', decimals: 18 },
      infoURL: 'https://valorbit.com',
      shortName: 'val',
      chainId: 38,
      networkId: 38,
      slip44: 538
    },
    {
      name: 'Telos EVM Mainnet',
      chain: 'TLOS',
      rpc: [ 'https://mainnet.telos.net/evm' ],
      faucets: [],
      nativeCurrency: { name: 'Telos', symbol: 'TLOS', decimals: 18 },
      infoURL: 'https://telos.net',
      shortName: 'Telos EVM',
      chainId: 40,
      networkId: 40,
      explorers: [
        {
          name: 'teloscan',
          url: 'https://teloscan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Telos EVM Testnet',
      chain: 'TLOS',
      rpc: [ 'https://testnet.telos.net/evm' ],
      faucets: [ 'https://app.telos.net/testnet/developers' ],
      nativeCurrency: { name: 'Telos', symbol: 'TLOS', decimals: 18 },
      infoURL: 'https://telos.net',
      shortName: 'Telos EVM Testnet',
      chainId: 41,
      networkId: 41
    },
    {
      name: 'Kovan',
      title: 'Ethereum Testnet Kovan',
      chain: 'ETH',
      network: 'testnet',
      rpc: [
        'https://kovan.poa.network',
        'http://kovan.poa.network:8545',
        'https://kovan.infura.io/v3/${INFURA_API_KEY}',
        'wss://kovan.infura.io/ws/v3/${INFURA_API_KEY}',
        'ws://kovan.poa.network:8546'
      ],
      faucets: [
        'http://fauceth.komputing.org?chain=42&address=${ADDRESS}',
        'https://faucet.kovan.network',
        'https://gitter.im/kovan-testnet/faucet'
      ],
      nativeCurrency: { name: 'Kovan Ether', symbol: 'KOV', decimals: 18 },
      explorers: [
        {
          name: 'etherscan',
          url: 'https://kovan.etherscan.io',
          standard: 'EIP3091'
        }
      ],
      infoURL: 'https://kovan-testnet.github.io/website',
      shortName: 'kov',
      chainId: 42,
      networkId: 42
    },
    {
      name: 'Darwinia Pangolin Testnet',
      chain: 'pangolin',
      rpc: [ 'https://pangolin-rpc.darwinia.network' ],
      faucets: [
        'https://docs.crab.network/dvm/wallets/dvm-metamask#apply-for-the-test-token'
      ],
      nativeCurrency: {
        name: 'Pangolin Network Native Token”',
        symbol: 'PRING',
        decimals: 18
      },
      infoURL: 'https://darwinia.network/',
      shortName: 'pangolin',
      chainId: 43,
      networkId: 43,
      explorers: [
        {
          name: 'subscan',
          url: 'https://pangolin.subscan.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Darwinia Crab Network',
      chain: 'crab',
      rpc: [ 'https://crab-rpc.darwinia.network' ],
      faucets: [],
      nativeCurrency: { name: 'Crab Network Native Token', symbol: 'CRAB', decimals: 18 },
      infoURL: 'https://crab.network/',
      shortName: 'crab',
      chainId: 44,
      networkId: 44,
      explorers: [
        {
          name: 'subscan',
          url: 'https://crab.subscan.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Darwinia Pangoro Testnet',
      chain: 'pangoro',
      rpc: [ 'http://pangoro-rpc.darwinia.network' ],
      faucets: [],
      nativeCurrency: {
        name: 'Pangoro Network Native Token”',
        symbol: 'ORING',
        decimals: 18
      },
      infoURL: 'https://darwinia.network/',
      shortName: 'pangoro',
      chainId: 45,
      networkId: 45,
      explorers: [
        {
          name: 'subscan',
          url: 'https://pangoro.subscan.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'XinFin Network Mainnet',
      chain: 'XDC',
      rpc: [ 'https://rpc.xinfin.network' ],
      faucets: [],
      nativeCurrency: { name: 'XinFin', symbol: 'XDC', decimals: 18 },
      infoURL: 'https://xinfin.org',
      shortName: 'xdc',
      chainId: 50,
      networkId: 50
    },
    {
      name: 'XinFin Apothem Testnet',
      chain: 'TXDC',
      rpc: [ 'https://rpc.apothem.network' ],
      faucets: [],
      nativeCurrency: { name: 'XinFinTest', symbol: 'TXDC', decimals: 18 },
      infoURL: 'https://xinfin.org',
      shortName: 'TXDC',
      chainId: 51,
      networkId: 51
    },
    {
      name: 'CoinEx Smart Chain Mainnet',
      chain: 'CSC',
      rpc: [ 'https://rpc.coinex.net' ],
      faucets: [],
      nativeCurrency: { name: 'CoinEx Chain Native Token', symbol: 'cet', decimals: 18 },
      infoURL: 'https://www.coinex.org/',
      shortName: 'cet',
      chainId: 52,
      networkId: 52,
      explorers: [
        {
          name: 'coinexscan',
          url: 'https://www.coinex.net',
          standard: 'none'
        }
      ]
    },
    {
      name: 'CoinEx Smart Chain Testnet',
      chain: 'CSC',
      rpc: [ 'https://testnet-rpc.coinex.net/' ],
      faucets: [],
      nativeCurrency: {
        name: 'CoinEx Chain Test Native Token',
        symbol: 'cett',
        decimals: 18
      },
      infoURL: 'https://www.coinex.org/',
      shortName: 'tcet',
      chainId: 53,
      networkId: 53,
      explorers: [
        {
          name: 'coinexscan',
          url: 'https://testnet.coinex.net',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Openpiece Mainnet',
      chain: 'OPENPIECE',
      icon: 'openpiece',
      network: 'mainnet',
      rpc: [ 'https://mainnet.openpiece.io' ],
      faucets: [],
      nativeCurrency: { name: 'Belly', symbol: 'BELLY', decimals: 18 },
      infoURL: 'https://cryptopiece.online',
      shortName: 'OP',
      chainId: 54,
      networkId: 54,
      explorers: [
        {
          name: 'Belly Scan',
          url: 'https://bellyscan.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Zyx Mainnet',
      chain: 'ZYX',
      rpc: [
        'https://rpc-1.zyx.network/',
        'https://rpc-2.zyx.network/',
        'https://rpc-3.zyx.network/',
        'https://rpc-4.zyx.network/',
        'https://rpc-5.zyx.network/',
        'https://rpc-6.zyx.network/'
      ],
      faucets: [],
      nativeCurrency: { name: 'Zyx', symbol: 'ZYX', decimals: 18 },
      infoURL: 'https://zyx.network/',
      shortName: 'ZYX',
      chainId: 55,
      networkId: 55,
      explorers: [
        { name: 'zyxscan', url: 'https://zyxscan.com', standard: 'none' }
      ]
    },
    {
      name: 'Binance Smart Chain Mainnet',
      chain: 'BSC',
      rpc: [
        'https://bsc-dataseed1.binance.org',
        'https://bsc-dataseed2.binance.org',
        'https://bsc-dataseed3.binance.org',
        'https://bsc-dataseed4.binance.org',
        'https://bsc-dataseed1.defibit.io',
        'https://bsc-dataseed2.defibit.io',
        'https://bsc-dataseed3.defibit.io',
        'https://bsc-dataseed4.defibit.io',
        'https://bsc-dataseed1.ninicoin.io',
        'https://bsc-dataseed2.ninicoin.io',
        'https://bsc-dataseed3.ninicoin.io',
        'https://bsc-dataseed4.ninicoin.io',
        'wss://bsc-ws-node.nariox.org'
      ],
      faucets: [ 'https://free-online-app.com/faucet-for-eth-evm-chains/' ],
      nativeCurrency: { name: 'Binance Chain Native Token', symbol: 'BNB', decimals: 18 },
      infoURL: 'https://www.binance.org',
      shortName: 'bnb',
      chainId: 56,
      networkId: 56,
      slip44: 714,
      explorers: [
        {
          name: 'bscscan',
          url: 'https://bscscan.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Syscoin Mainnet',
      chain: 'SYS',
      rpc: [ 'https://rpc.syscoin.org', 'wss://rpc.syscoin.org/wss' ],
      faucets: [ 'https://faucet.syscoin.org' ],
      nativeCurrency: { name: 'Syscoin', symbol: 'SYS', decimals: 18 },
      infoURL: 'https://www.syscoin.org',
      shortName: 'sys',
      chainId: 57,
      networkId: 57,
      explorers: [
        {
          name: 'Syscoin Block Explorer',
          url: 'https://explorer.syscoin.org',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Ontology Mainnet',
      chain: 'Ontology',
      rpc: [
        'http://dappnode1.ont.io:20339',
        'http://dappnode2.ont.io:20339',
        'http://dappnode3.ont.io:20339',
        'http://dappnode4.ont.io:20339',
        'https://dappnode1.ont.io:10339',
        'https://dappnode2.ont.io:10339',
        'https://dappnode3.ont.io:10339',
        'https://dappnode4.ont.io:10339'
      ],
      faucets: [],
      nativeCurrency: { name: 'ONG', symbol: 'ONG', decimals: 18 },
      infoURL: 'https://ont.io/',
      shortName: 'Ontology Mainnet',
      chainId: 58,
      networkId: 58,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer.ont.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'EOS Mainnet',
      chain: 'EOS',
      rpc: [ 'https://api.eosargentina.io' ],
      faucets: [],
      nativeCurrency: { name: 'EOS', symbol: 'EOS', decimals: 18 },
      infoURL: 'https://eoscommunity.org/',
      shortName: 'EOS Mainnet',
      chainId: 59,
      networkId: 59,
      explorers: [
        {
          name: 'bloks',
          url: 'https://bloks.eosargentina.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'GoChain',
      chain: 'GO',
      rpc: [ 'https://rpc.gochain.io' ],
      faucets: [ 'https://free-online-app.com/faucet-for-eth-evm-chains/' ],
      nativeCurrency: { name: 'GoChain Ether', symbol: 'GO', decimals: 18 },
      infoURL: 'https://gochain.io',
      shortName: 'go',
      chainId: 60,
      networkId: 60,
      slip44: 6060,
      explorers: [
        {
          name: 'GoChain Explorer',
          url: 'https://explorer.gochain.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Ethereum Classic Mainnet',
      chain: 'ETC',
      rpc: [ 'https://www.ethercluster.com/etc' ],
      faucets: [ 'https://free-online-app.com/faucet-for-eth-evm-chains/?' ],
      nativeCurrency: { name: 'Ethereum Classic Ether', symbol: 'ETC', decimals: 18 },
      infoURL: 'https://ethereumclassic.org',
      shortName: 'etc',
      chainId: 61,
      networkId: 1,
      slip44: 61,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://blockscout.com/etc/mainnet',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Ethereum Classic Testnet Morden',
      chain: 'ETC',
      rpc: [],
      faucets: [],
      nativeCurrency: {
        name: 'Ethereum Classic Testnet Ether',
        symbol: 'TETC',
        decimals: 18
      },
      infoURL: 'https://ethereumclassic.org',
      shortName: 'tetc',
      chainId: 62,
      networkId: 2
    },
    {
      name: 'Ethereum Classic Testnet Mordor',
      chain: 'ETC',
      rpc: [ 'https://www.ethercluster.com/mordor' ],
      faucets: [],
      nativeCurrency: {
        name: 'Mordor Classic Testnet Ether',
        symbol: 'METC',
        decimals: 18
      },
      infoURL: 'https://github.com/eth-classic/mordor/',
      shortName: 'metc',
      chainId: 63,
      networkId: 7
    },
    {
      name: 'Ellaism',
      chain: 'ELLA',
      rpc: [ 'https://jsonrpc.ellaism.org' ],
      faucets: [],
      nativeCurrency: { name: 'Ellaism Ether', symbol: 'ELLA', decimals: 18 },
      infoURL: 'https://ellaism.org',
      shortName: 'ella',
      chainId: 64,
      networkId: 64,
      slip44: 163
    },
    {
      name: 'OKExChain Testnet',
      chain: 'okexchain',
      rpc: [ 'https://exchaintestrpc.okex.org' ],
      faucets: [ 'https://www.okex.com/drawdex' ],
      nativeCurrency: {
        name: 'OKExChain Global Utility Token in testnet',
        symbol: 'OKT',
        decimals: 18
      },
      infoURL: 'https://www.okex.com/okexchain',
      shortName: 'tokt',
      chainId: 65,
      networkId: 65,
      explorers: [
        {
          name: 'OKLink',
          url: 'https://www.oklink.com/okexchain-test',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'OKXChain Mainnet',
      chain: 'okxchain',
      rpc: [
        'https://exchainrpc.okex.org',
        'https://okc-mainnet.gateway.pokt.network/v1/lb/6275309bea1b320039c893ff'
      ],
      faucets: [ 'https://free-online-app.com/faucet-for-eth-evm-chains/?' ],
      nativeCurrency: {
        name: 'OKXChain Global Utility Token',
        symbol: 'OKT',
        decimals: 18
      },
      infoURL: 'https://www.okex.com/okc',
      shortName: 'okt',
      chainId: 66,
      networkId: 66,
      explorers: [
        {
          name: 'OKLink',
          url: 'https://www.oklink.com/en/okc',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'DBChain Testnet',
      chain: 'DBM',
      rpc: [ 'http://test-rpc.dbmbp.com' ],
      faucets: [],
      nativeCurrency: { name: 'DBChain Testnet', symbol: 'DBM', decimals: 18 },
      infoURL: 'http://test.dbmbp.com',
      shortName: 'dbm',
      chainId: 67,
      networkId: 67
    },
    {
      name: 'SoterOne Mainnet',
      chain: 'SOTER',
      rpc: [ 'https://rpc.soter.one' ],
      faucets: [],
      nativeCurrency: { name: 'SoterOne Mainnet Ether', symbol: 'SOTER', decimals: 18 },
      infoURL: 'https://www.soterone.com',
      shortName: 'SO1',
      chainId: 68,
      networkId: 68
    },
    {
      name: 'Optimism Kovan',
      title: 'Optimism Testnet Kovan',
      chain: 'ETH',
      rpc: [ 'https://kovan.optimism.io/' ],
      faucets: [ 'http://fauceth.komputing.org?chain=69&address=${ADDRESS}' ],
      nativeCurrency: { name: 'Kovan Ether', symbol: 'KOR', decimals: 18 },
      explorers: [
        {
          name: 'etherscan',
          url: 'https://kovan-optimistic.etherscan.io',
          standard: 'EIP3091'
        }
      ],
      infoURL: 'https://optimism.io',
      shortName: 'okov',
      chainId: 69,
      networkId: 69
    },
    {
      name: 'Hoo Smart Chain',
      chain: 'HSC',
      rpc: [
        'https://http-mainnet.hoosmartchain.com',
        'https://http-mainnet2.hoosmartchain.com',
        'wss://ws-mainnet.hoosmartchain.com',
        'wss://ws-mainnet2.hoosmartchain.com'
      ],
      faucets: [],
      nativeCurrency: {
        name: 'Hoo Smart Chain Native Token',
        symbol: 'HOO',
        decimals: 18
      },
      infoURL: 'https://www.hoosmartchain.com',
      shortName: 'hsc',
      chainId: 70,
      networkId: 70,
      slip44: 1170,
      explorers: [
        {
          name: 'hooscan',
          url: 'https://www.hooscan.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Conflux eSpace (Testnet)',
      chain: 'Conflux',
      network: 'testnet',
      rpc: [ 'https://evmtestnet.confluxrpc.com' ],
      faucets: [ 'https://faucet.confluxnetwork.org' ],
      nativeCurrency: { name: 'CFX', symbol: 'CFX', decimals: 18 },
      infoURL: 'https://confluxnetwork.org',
      shortName: 'cfxtest',
      chainId: 71,
      networkId: 71,
      icon: 'conflux',
      explorers: [
        {
          name: 'Conflux Scan',
          url: 'https://evmtestnet.confluxscan.net',
          standard: 'none'
        }
      ]
    },
    {
      name: 'IDChain Mainnet',
      chain: 'IDChain',
      network: 'mainnet',
      rpc: [ 'https://idchain.one/rpc/', 'wss://idchain.one/ws/' ],
      faucets: [],
      nativeCurrency: { name: 'EIDI', symbol: 'EIDI', decimals: 18 },
      infoURL: 'https://idchain.one/begin/',
      shortName: 'idchain',
      chainId: 74,
      networkId: 74,
      icon: 'idchain',
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer.idchain.one',
          icon: 'etherscan',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Mix',
      chain: 'MIX',
      rpc: [ 'https://rpc2.mix-blockchain.org:8647' ],
      faucets: [],
      nativeCurrency: { name: 'Mix Ether', symbol: 'MIX', decimals: 18 },
      infoURL: 'https://mix-blockchain.org',
      shortName: 'mix',
      chainId: 76,
      networkId: 76,
      slip44: 76
    },
    {
      name: 'POA Network Sokol',
      chain: 'POA',
      rpc: [
        'https://sokol.poa.network',
        'wss://sokol.poa.network/wss',
        'ws://sokol.poa.network:8546'
      ],
      faucets: [ 'https://faucet.poa.network' ],
      nativeCurrency: { name: 'POA Sokol Ether', symbol: 'SPOA', decimals: 18 },
      infoURL: 'https://poa.network',
      shortName: 'spoa',
      chainId: 77,
      networkId: 77,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://blockscout.com/poa/sokol',
          standard: 'none'
        }
      ]
    },
    {
      name: 'PrimusChain mainnet',
      chain: 'PC',
      rpc: [ 'https://ethnode.primusmoney.com/mainnet' ],
      faucets: [],
      nativeCurrency: { name: 'Primus Ether', symbol: 'PETH', decimals: 18 },
      infoURL: 'https://primusmoney.com',
      shortName: 'primuschain',
      chainId: 78,
      networkId: 78
    },
    {
      name: 'Zenith Mainnet',
      chain: 'Zenith',
      rpc: [
        'https://dataserver-us-1.zenithchain.co/',
        'https://dataserver-asia-3.zenithchain.co/',
        'https://dataserver-asia-4.zenithchain.co/',
        'https://dataserver-asia-2.zenithchain.co/',
        'https://dataserver-asia-5.zenithchain.co/',
        'https://dataserver-asia-6.zenithchain.co/',
        'https://dataserver-asia-7.zenithchain.co/'
      ],
      faucets: [],
      nativeCurrency: { name: 'ZENITH', symbol: 'ZENITH', decimals: 18 },
      infoURL: 'https://www.zenithchain.co/',
      chainId: 79,
      networkId: 79,
      shortName: 'zenith',
      explorers: [
        {
          name: 'zenith scan',
          url: 'https://scan.zenithchain.co',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'GeneChain',
      chain: 'GeneChain',
      rpc: [ 'https://rpc.genechain.io' ],
      faucets: [],
      nativeCurrency: { name: 'RNA', symbol: 'RNA', decimals: 18 },
      infoURL: 'https://scan.genechain.io/',
      shortName: 'GeneChain',
      chainId: 80,
      networkId: 80,
      explorers: [
        {
          name: 'GeneChain Scan',
          url: 'https://scan.genechain.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Zenith Testnet (Vilnius)',
      chain: 'Zenith',
      rpc: [ 'https://vilnius.zenithchain.co/http' ],
      faucets: [ 'https://faucet.zenithchain.co/' ],
      nativeCurrency: { name: 'Vilnius', symbol: 'VIL', decimals: 18 },
      infoURL: 'https://www.zenithchain.co/',
      chainId: 81,
      networkId: 81,
      shortName: 'VIL',
      explorers: [
        {
          name: 'vilnius scan',
          url: 'https://vilnius.scan.zenithchain.co',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Meter Mainnet',
      chain: 'METER',
      rpc: [ 'https://rpc.meter.io' ],
      faucets: [ 'https://faucet.meter.io' ],
      nativeCurrency: { name: 'Meter', symbol: 'MTR', decimals: 18 },
      infoURL: 'https://www.meter.io',
      shortName: 'Meter',
      chainId: 82,
      networkId: 82,
      explorers: [
        {
          name: 'Meter Mainnet Scan',
          url: 'https://scan.meter.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Meter Testnet',
      chain: 'METER Testnet',
      rpc: [ 'https://rpctest.meter.io' ],
      faucets: [ 'https://faucet-warringstakes.meter.io' ],
      nativeCurrency: { name: 'Meter', symbol: 'MTR', decimals: 18 },
      infoURL: 'https://www.meter.io',
      shortName: 'MeterTest',
      chainId: 83,
      networkId: 83,
      explorers: [
        {
          name: 'Meter Testnet Scan',
          url: 'https://scan-warringstakes.meter.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'GateChain Testnet',
      chainId: 85,
      shortName: 'gttest',
      chain: 'GTTEST',
      networkId: 85,
      nativeCurrency: { name: 'GateToken', symbol: 'GT', decimals: 18 },
      rpc: [ 'https://testnet.gatenode.cc' ],
      faucets: [ 'https://www.gatescan.org/testnet/faucet' ],
      explorers: [
        {
          name: 'GateScan',
          url: 'https://www.gatescan.org/testnet',
          standard: 'EIP3091'
        }
      ],
      infoURL: 'https://www.gatechain.io'
    },
    {
      name: 'GateChain Mainnet',
      chainId: 86,
      shortName: 'gt',
      chain: 'GT',
      networkId: 86,
      nativeCurrency: { name: 'GateToken', symbol: 'GT', decimals: 18 },
      rpc: [ 'https://evm.gatenode.cc' ],
      faucets: [ 'https://www.gatescan.org/faucet' ],
      explorers: [
        {
          name: 'GateScan',
          url: 'https://www.gatescan.org',
          standard: 'EIP3091'
        }
      ],
      infoURL: 'https://www.gatechain.io'
    },
    {
      name: 'Nova Network',
      chain: 'NNW',
      icon: 'novanetwork',
      rpc: [
        'https://connect.novanetwork.io',
        'https://0x57.redjackstudio.com',
        'https://rpc.novanetwork.io:9070'
      ],
      faucets: [],
      nativeCurrency: { name: 'Supernova', symbol: 'SNT', decimals: 18 },
      infoURL: 'https://novanetwork.io',
      shortName: 'nnw',
      chainId: 87,
      networkId: 87,
      explorers: [
        {
          name: 'novanetwork',
          url: 'https://explorer.novanetwork.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'TomoChain',
      chain: 'TOMO',
      rpc: [ 'https://rpc.tomochain.com' ],
      faucets: [],
      nativeCurrency: { name: 'TomoChain', symbol: 'TOMO', decimals: 18 },
      infoURL: 'https://tomochain.com',
      shortName: 'tomo',
      chainId: 88,
      networkId: 88,
      slip44: 889
    },
    {
      name: 'TomoChain Testnet',
      chain: 'TOMO',
      rpc: [ 'https://rpc.testnet.tomochain.com' ],
      faucets: [],
      nativeCurrency: { name: 'TomoChain', symbol: 'TOMO', decimals: 18 },
      infoURL: 'https://tomochain.com',
      shortName: 'tomot',
      chainId: 89,
      networkId: 89,
      slip44: 889
    },
    {
      name: 'Garizon Stage0',
      chain: 'GAR',
      network: 'mainnet',
      icon: 'garizon',
      rpc: [ 'https://s0.garizon.net/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'Garizon', symbol: 'GAR', decimals: 18 },
      infoURL: 'https://garizon.com',
      shortName: 'gar-s0',
      chainId: 90,
      networkId: 90,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer.garizon.com',
          icon: 'garizon',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Garizon Stage1',
      chain: 'GAR',
      network: 'mainnet',
      icon: 'garizon',
      rpc: [ 'https://s1.garizon.net/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'Garizon', symbol: 'GAR', decimals: 18 },
      infoURL: 'https://garizon.com',
      shortName: 'gar-s1',
      chainId: 91,
      networkId: 91,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer.garizon.com',
          icon: 'garizon',
          standard: 'EIP3091'
        }
      ],
      parent: { chain: 'eip155-90', type: 'shard' }
    },
    {
      name: 'Garizon Stage2',
      chain: 'GAR',
      network: 'mainnet',
      icon: 'garizon',
      rpc: [ 'https://s2.garizon.net/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'Garizon', symbol: 'GAR', decimals: 18 },
      infoURL: 'https://garizon.com',
      shortName: 'gar-s2',
      chainId: 92,
      networkId: 92,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer.garizon.com',
          icon: 'garizon',
          standard: 'EIP3091'
        }
      ],
      parent: { chain: 'eip155-90', type: 'shard' }
    },
    {
      name: 'Garizon Stage3',
      chain: 'GAR',
      network: 'mainnet',
      icon: 'garizon',
      rpc: [ 'https://s3.garizon.net/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'Garizon', symbol: 'GAR', decimals: 18 },
      infoURL: 'https://garizon.com',
      shortName: 'gar-s3',
      chainId: 93,
      networkId: 93,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer.garizon.com',
          icon: 'garizon',
          standard: 'EIP3091'
        }
      ],
      parent: { chain: 'eip155-90', type: 'shard' }
    },
    {
      name: 'CryptoKylin Testnet',
      chain: 'EOS',
      rpc: [ 'https://kylin.eosargentina.io' ],
      faucets: [],
      nativeCurrency: { name: 'EOS', symbol: 'EOS', decimals: 18 },
      infoURL: 'https://www.cryptokylin.io/',
      shortName: 'Kylin Testnet',
      chainId: 95,
      networkId: 95,
      explorers: [
        {
          name: 'eosq',
          url: 'https://kylin.eosargentina.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'NEXT Smart Chain',
      chain: 'NSC',
      rpc: [ 'https://rpc.nextsmartchain.com' ],
      faucets: [ 'https://faucet.nextsmartchain.com' ],
      nativeCurrency: { name: 'NEXT', symbol: 'NEXT', decimals: 18 },
      infoURL: 'https://www.nextsmartchain.com/',
      shortName: 'nsc',
      chainId: 96,
      networkId: 96,
      explorers: [
        {
          name: 'Next Smart Chain Explorer',
          url: 'https://explorer.nextsmartchain.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Binance Smart Chain Testnet',
      chain: 'BSC',
      rpc: [
        'https://data-seed-prebsc-1-s1.binance.org:8545',
        'https://data-seed-prebsc-2-s1.binance.org:8545',
        'https://data-seed-prebsc-1-s2.binance.org:8545',
        'https://data-seed-prebsc-2-s2.binance.org:8545',
        'https://data-seed-prebsc-1-s3.binance.org:8545',
        'https://data-seed-prebsc-2-s3.binance.org:8545'
      ],
      faucets: [ 'https://testnet.binance.org/faucet-smart' ],
      nativeCurrency: {
        name: 'Binance Chain Native Token',
        symbol: 'tBNB',
        decimals: 18
      },
      infoURL: 'https://testnet.binance.org/',
      shortName: 'bnbt',
      chainId: 97,
      networkId: 97,
      explorers: [
        {
          name: 'bscscan-testnet',
          url: 'https://testnet.bscscan.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'POA Network Core',
      chain: 'POA',
      rpc: [
        'https://core.poanetwork.dev',
        'http://core.poanetwork.dev:8545',
        'https://core.poa.network',
        'ws://core.poanetwork.dev:8546'
      ],
      faucets: [],
      nativeCurrency: { name: 'POA Network Core Ether', symbol: 'POA', decimals: 18 },
      infoURL: 'https://poa.network',
      shortName: 'poa',
      chainId: 99,
      networkId: 99,
      slip44: 178,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://blockscout.com/poa/core',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Gnosis',
      chain: 'Gnosis',
      icon: 'gnosis',
      rpc: [
        'https://rpc.gnosischain.com',
        'https://rpc.ankr.com/gnosis',
        'https://gnosischain-rpc.gateway.pokt.network',
        'https://gnosis-mainnet.public.blastapi.io',
        'wss://rpc.gnosischain.com/wss'
      ],
      faucets: [
        'https://faucet.gimlu.com/gnosis',
        'https://stakely.io/faucet/gnosis-chain-xdai',
        'https://faucet.prussia.dev/xdai'
      ],
      nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
      infoURL: 'https://developers.gnosischain.com',
      shortName: 'gno',
      chainId: 100,
      networkId: 100,
      slip44: 700,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://blockscout.com/xdai/mainnet',
          icon: 'blockscout',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'EtherInc',
      chain: 'ETI',
      rpc: [ 'https://api.einc.io/jsonrpc/mainnet' ],
      faucets: [],
      nativeCurrency: { name: 'EtherInc Ether', symbol: 'ETI', decimals: 18 },
      infoURL: 'https://einc.io',
      shortName: 'eti',
      chainId: 101,
      networkId: 1,
      slip44: 464
    },
    {
      name: 'Web3Games Testnet',
      chain: 'Web3Games',
      icon: 'web3games',
      rpc: [ 'https://testnet.web3games.org/evm' ],
      faucets: [],
      nativeCurrency: { name: 'Web3Games', symbol: 'W3G', decimals: 18 },
      infoURL: 'https://web3games.org/',
      shortName: 'tw3g',
      chainId: 102,
      networkId: 102
    },
    {
      name: 'Web3Games Devnet',
      chain: 'Web3Games',
      icon: 'web3games',
      rpc: [ 'https://devnet.web3games.org/evm' ],
      faucets: [],
      nativeCurrency: { name: 'Web3Games', symbol: 'W3G', decimals: 18 },
      infoURL: 'https://web3games.org/',
      shortName: 'dw3g',
      chainId: 105,
      networkId: 105,
      explorers: [
        {
          name: 'Web3Games Explorer',
          url: 'https://explorer-devnet.web3games.org',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Velas EVM Mainnet',
      chain: 'Velas',
      icon: 'velas',
      rpc: [
        'https://evmexplorer.velas.com/rpc',
        'https://explorer.velas.com/rpc'
      ],
      faucets: [],
      nativeCurrency: { name: 'Velas', symbol: 'VLX', decimals: 18 },
      infoURL: 'https://velas.com',
      shortName: 'vlx',
      chainId: 106,
      networkId: 106,
      explorers: [
        {
          name: 'Velas Explorer',
          url: 'https://evmexplorer.velas.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Nebula Testnet',
      chain: 'NTN',
      icon: 'nebulatestnet',
      rpc: [ 'https://testnet.rpc.novanetwork.io:9070' ],
      faucets: [],
      nativeCurrency: { name: 'Nebula X', symbol: 'NBX', decimals: 18 },
      infoURL: 'https://novanetwork.io',
      shortName: 'ntn',
      chainId: 107,
      networkId: 107,
      explorers: [
        {
          name: 'nebulatestnet',
          url: 'https://explorer.novanetwork.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'ThunderCore Mainnet',
      chain: 'TT',
      rpc: [
        'https://mainnet-rpc.thundercore.com',
        'https://mainnet-rpc.thundertoken.net',
        'https://mainnet-rpc.thundercore.io'
      ],
      faucets: [ 'https://faucet.thundercore.com' ],
      nativeCurrency: { name: 'ThunderCore Token', symbol: 'TT', decimals: 18 },
      infoURL: 'https://thundercore.com',
      shortName: 'TT',
      chainId: 108,
      networkId: 108,
      slip44: 1001,
      explorers: [
        {
          name: 'thundercore-viewblock',
          url: 'https://viewblock.io/thundercore',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Proton Testnet',
      chain: 'XPR',
      rpc: [ 'https://protontestnet.greymass.com/' ],
      faucets: [],
      nativeCurrency: { name: 'Proton', symbol: 'XPR', decimals: 4 },
      infoURL: 'https://protonchain.com',
      shortName: 'xpr',
      chainId: 110,
      networkId: 110
    },
    {
      name: 'EtherLite Chain',
      chain: 'ETL',
      rpc: [ 'https://rpc.etherlite.org' ],
      faucets: [ 'https://etherlite.org/faucets' ],
      nativeCurrency: { name: 'EtherLite', symbol: 'ETL', decimals: 18 },
      infoURL: 'https://etherlite.org',
      shortName: 'ETL',
      chainId: 111,
      networkId: 111,
      icon: 'etherlite'
    },
    {
      name: 'Fuse Mainnet',
      chain: 'FUSE',
      rpc: [ 'https://rpc.fuse.io' ],
      faucets: [],
      nativeCurrency: { name: 'Fuse', symbol: 'FUSE', decimals: 18 },
      infoURL: 'https://fuse.io/',
      shortName: 'fuse',
      chainId: 122,
      networkId: 122
    },
    {
      name: 'Fuse Sparknet',
      chain: 'fuse',
      rpc: [ 'https://rpc.fusespark.io' ],
      faucets: [ 'https://get.fusespark.io' ],
      nativeCurrency: { name: 'Spark', symbol: 'SPARK', decimals: 18 },
      infoURL: 'https://docs.fuse.io/general/fuse-network-blockchain/fuse-testnet',
      shortName: 'spark',
      chainId: 123,
      networkId: 123
    },
    {
      name: 'Decentralized Web Mainnet',
      shortName: 'dwu',
      chain: 'DWU',
      chainId: 124,
      networkId: 124,
      rpc: [ 'https://decentralized-web.tech/dw_rpc.php' ],
      faucets: [],
      infoURL: 'https://decentralized-web.tech/dw_chain.php',
      nativeCurrency: { name: 'Decentralized Web Utility', symbol: 'DWU', decimals: 18 }
    },
    {
      name: 'OYchain Testnet',
      chain: 'OYchain',
      rpc: [ 'https://rpc.testnet.oychain.io' ],
      faucets: [ 'https://faucet.oychain.io' ],
      nativeCurrency: { name: 'OYchain Token', symbol: 'OY', decimals: 18 },
      infoURL: 'https://www.oychain.io',
      shortName: 'oychain testnet',
      chainId: 125,
      networkId: 125,
      slip44: 125,
      explorers: [
        {
          name: 'OYchain Testnet Explorer',
          url: 'https://explorer.testnet.oychain.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'OYchain Mainnet',
      chain: 'OYchain',
      icon: 'oychain',
      rpc: [ 'https://rpc.mainnet.oychain.io' ],
      faucets: [],
      nativeCurrency: { name: 'OYchain Token', symbol: 'OY', decimals: 18 },
      infoURL: 'https://www.oychain.io',
      shortName: 'oychain mainnet',
      chainId: 126,
      networkId: 126,
      slip44: 126,
      explorers: [
        {
          name: 'OYchain Mainnet Explorer',
          url: 'https://explorer.oychain.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Factory 127 Mainnet',
      chain: 'FETH',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Factory 127 Token', symbol: 'FETH', decimals: 18 },
      infoURL: 'https://www.factory127.com',
      shortName: 'feth',
      chainId: 127,
      networkId: 127,
      slip44: 127
    },
    {
      name: 'Huobi ECO Chain Mainnet',
      chain: 'Heco',
      rpc: [
        'https://http-mainnet.hecochain.com',
        'wss://ws-mainnet.hecochain.com'
      ],
      faucets: [ 'https://free-online-app.com/faucet-for-eth-evm-chains/' ],
      nativeCurrency: {
        name: 'Huobi ECO Chain Native Token',
        symbol: 'HT',
        decimals: 18
      },
      infoURL: 'https://www.hecochain.com',
      shortName: 'heco',
      chainId: 128,
      networkId: 128,
      slip44: 1010,
      explorers: [
        {
          name: 'hecoinfo',
          url: 'https://hecoinfo.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Polygon Mainnet',
      chain: 'Polygon',
      rpc: [
        'https://polygon-rpc.com/',
        'https://rpc-mainnet.matic.network',
        'https://matic-mainnet.chainstacklabs.com',
        'https://rpc-mainnet.maticvigil.com',
        'https://rpc-mainnet.matic.quiknode.pro',
        'https://matic-mainnet-full-rpc.bwarelabs.com'
      ],
      faucets: [],
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
      infoURL: 'https://polygon.technology/',
      shortName: 'MATIC',
      chainId: 137,
      networkId: 137,
      slip44: 966,
      explorers: [
        {
          name: 'polygonscan',
          url: 'https://polygonscan.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Openpiece Testnet',
      chain: 'OPENPIECE',
      icon: 'openpiece',
      network: 'testnet',
      rpc: [ 'https://testnet.openpiece.io' ],
      faucets: [],
      nativeCurrency: { name: 'Belly', symbol: 'BELLY', decimals: 18 },
      infoURL: 'https://cryptopiece.online',
      shortName: 'OPtest',
      chainId: 141,
      networkId: 141,
      explorers: [
        {
          name: 'Belly Scan',
          url: 'https://testnet.bellyscan.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'DAX CHAIN',
      chain: 'DAX',
      rpc: [ 'https://rpc.prodax.io' ],
      faucets: [],
      nativeCurrency: { name: 'Prodax', symbol: 'DAX', decimals: 18 },
      infoURL: 'https://prodax.io/',
      shortName: 'dax',
      chainId: 142,
      networkId: 142
    },
    {
      name: 'Lightstreams Testnet',
      chain: 'PHT',
      rpc: [ 'https://node.sirius.lightstreams.io' ],
      faucets: [ 'https://discuss.lightstreams.network/t/request-test-tokens' ],
      nativeCurrency: { name: 'Lightstreams PHT', symbol: 'PHT', decimals: 18 },
      infoURL: 'https://explorer.sirius.lightstreams.io',
      shortName: 'tpht',
      chainId: 162,
      networkId: 162
    },
    {
      name: 'Lightstreams Mainnet',
      chain: 'PHT',
      rpc: [ 'https://node.mainnet.lightstreams.io' ],
      faucets: [],
      nativeCurrency: { name: 'Lightstreams PHT', symbol: 'PHT', decimals: 18 },
      infoURL: 'https://explorer.lightstreams.io',
      shortName: 'pht',
      chainId: 163,
      networkId: 163
    },
    {
      name: 'AIOZ Network',
      chain: 'AIOZ',
      network: 'mainnet',
      icon: 'aioz',
      rpc: [ 'https://eth-dataseed.aioz.network' ],
      faucets: [],
      nativeCurrency: { name: 'AIOZ', symbol: 'AIOZ', decimals: 18 },
      infoURL: 'https://aioz.network',
      shortName: 'aioz',
      chainId: 168,
      networkId: 168,
      slip44: 60,
      explorers: [
        {
          name: 'AIOZ Network Explorer',
          url: 'https://explorer.aioz.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'HOO Smart Chain Testnet',
      chain: 'ETH',
      rpc: [ 'https://http-testnet.hoosmartchain.com' ],
      faucets: [ 'https://faucet-testnet.hscscan.com/' ],
      nativeCurrency: { name: 'HOO', symbol: 'HOO', decimals: 18 },
      infoURL: 'https://www.hoosmartchain.com',
      shortName: 'hoosmartchain',
      chainId: 170,
      networkId: 170
    },
    {
      name: 'Latam-Blockchain Resil Testnet',
      chain: 'Resil',
      rpc: [
        'https://rpc.latam-blockchain.com',
        'wss://ws.latam-blockchain.com'
      ],
      faucets: [ 'https://faucet.latam-blockchain.com' ],
      nativeCurrency: {
        name: 'Latam-Blockchain Resil Test Native Token',
        symbol: 'usd',
        decimals: 18
      },
      infoURL: 'https://latam-blockchain.com',
      shortName: 'resil',
      chainId: 172,
      networkId: 172
    },
    {
      name: 'AME Chain Mainnet',
      chain: 'AME',
      rpc: [ 'https://node1.amechain.io/' ],
      faucets: [],
      nativeCurrency: { name: 'AME', symbol: 'AME', decimals: 18 },
      infoURL: 'https://amechain.io/',
      shortName: 'ame',
      chainId: 180,
      networkId: 180,
      explorers: [
        {
          name: 'AME Scan',
          url: 'https://amescan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Seele Mainnet',
      chain: 'Seele',
      rpc: [ 'https://rpc.seelen.pro/' ],
      faucets: [],
      nativeCurrency: { name: 'Seele', symbol: 'Seele', decimals: 18 },
      infoURL: 'https://seelen.pro/',
      shortName: 'Seele',
      chainId: 186,
      networkId: 186,
      explorers: [
        {
          name: 'seeleview',
          url: 'https://seeleview.net',
          standard: 'none'
        }
      ]
    },
    {
      name: 'BMC Mainnet',
      chain: 'BMC',
      rpc: [ 'https://mainnet.bmcchain.com/' ],
      faucets: [],
      nativeCurrency: { name: 'BTM', symbol: 'BTM', decimals: 18 },
      infoURL: 'https://bmc.bytom.io/',
      shortName: 'BMC',
      chainId: 188,
      networkId: 188,
      explorers: [
        {
          name: 'Blockmeta',
          url: 'https://bmc.blockmeta.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'BMC Testnet',
      chain: 'BMC',
      rpc: [ 'https://testnet.bmcchain.com' ],
      faucets: [],
      nativeCurrency: { name: 'BTM', symbol: 'BTM', decimals: 18 },
      infoURL: 'https://bmc.bytom.io/',
      shortName: 'BMCT',
      chainId: 189,
      networkId: 189,
      explorers: [
        {
          name: 'Blockmeta',
          url: 'https://bmctestnet.blockmeta.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Crypto Emergency',
      chain: 'CEM',
      rpc: [ 'https://cemchain.com' ],
      faucets: [],
      nativeCurrency: { name: 'Crypto Emergency', symbol: 'CEM', decimals: 18 },
      infoURL: 'https://cemblockchain.com/',
      shortName: 'cem',
      chainId: 193,
      networkId: 193,
      explorers: [
        {
          name: 'cemscan',
          url: 'https://cemscan.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'BitTorrent Chain Mainnet',
      chain: 'BTTC',
      rpc: [ 'https://rpc.bittorrentchain.io/' ],
      faucets: [],
      nativeCurrency: { name: 'BitTorrent', symbol: 'BTT', decimals: 18 },
      infoURL: 'https://bittorrentchain.io/',
      shortName: 'BTT',
      chainId: 199,
      networkId: 199,
      explorers: [
        {
          name: 'bttcscan',
          url: 'https://scan.bittorrentchain.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Arbitrum on xDai',
      chain: 'AOX',
      rpc: [ 'https://arbitrum.xdaichain.com/' ],
      faucets: [],
      nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
      infoURL: 'https://xdaichain.com',
      shortName: 'aox',
      chainId: 200,
      networkId: 200,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://blockscout.com/xdai/arbitrum',
          standard: 'EIP3091'
        }
      ],
      parent: { chain: 'eip155-100', type: 'L2' }
    },
    {
      name: 'Freight Trust Network',
      chain: 'EDI',
      rpc: [
        'http://13.57.207.168:3435',
        'https://app.freighttrust.net/ftn/${API_KEY}'
      ],
      faucets: [ 'http://faucet.freight.sh' ],
      nativeCurrency: { name: 'Freight Trust Native', symbol: '0xF', decimals: 18 },
      infoURL: 'https://freighttrust.com',
      shortName: 'EDI',
      chainId: 211,
      networkId: 0
    },
    {
      name: 'SoterOne Mainnet old',
      chain: 'SOTER',
      rpc: [ 'https://rpc.soter.one' ],
      faucets: [],
      nativeCurrency: { name: 'SoterOne Mainnet Ether', symbol: 'SOTER', decimals: 18 },
      infoURL: 'https://www.soterone.com',
      shortName: 'SO1-old',
      chainId: 218,
      networkId: 218,
      status: 'deprecated'
    },
    {
      name: 'Permission',
      chain: 'ASK',
      rpc: [ 'https://blockchain-api-mainnet.permission.io/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'ASK', symbol: 'ASK', decimals: 18 },
      infoURL: 'https://permission.io/',
      shortName: 'ASK',
      chainId: 222,
      networkId: 2221,
      slip44: 2221
    },
    {
      name: 'LACHAIN Mainnet',
      chain: 'LA',
      icon: 'lachain',
      rpc: [ 'https://rpc-mainnet.lachain.io' ],
      faucets: [],
      nativeCurrency: { name: 'LA', symbol: 'LA', decimals: 18 },
      infoURL: 'https://lachain.io',
      shortName: 'LA',
      chainId: 225,
      networkId: 225,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://scan.lachain.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'LACHAIN Testnet',
      chain: 'TLA',
      icon: 'lachain',
      rpc: [ 'https://rpc-testnet.lachain.io' ],
      faucets: [],
      nativeCurrency: { name: 'TLA', symbol: 'TLA', decimals: 18 },
      infoURL: 'https://lachain.io',
      shortName: 'TLA',
      chainId: 226,
      networkId: 226,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://scan-test.lachain.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Aitd Testnet',
      chain: 'AITD',
      icon: 'aitd',
      rpc: [ 'http://http-testnet.aitd.io' ],
      faucets: [ 'https://aitd-faucet-pre.aitdcoin.com/' ],
      nativeCurrency: { name: 'AITD Testnet', symbol: 'AITD', decimals: 18 },
      infoURL: 'https://www.aitd.io/',
      shortName: 'AITD',
      chainId: 239,
      networkId: 239,
      explorers: [
        {
          name: 'AITD Chain Explorer',
          url: 'https://aitd-explorer-pre.aitdcoin.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Energy Web Chain',
      chain: 'Energy Web Chain',
      rpc: [ 'https://rpc.energyweb.org', 'wss://rpc.energyweb.org/ws' ],
      faucets: [
        'https://faucet.carbonswap.exchange',
        'https://free-online-app.com/faucet-for-eth-evm-chains/'
      ],
      nativeCurrency: { name: 'Energy Web Token', symbol: 'EWT', decimals: 18 },
      infoURL: 'https://energyweb.org',
      shortName: 'ewt',
      chainId: 246,
      networkId: 246,
      slip44: 246,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://explorer.energyweb.org',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Fantom Opera',
      chain: 'FTM',
      rpc: [ 'https://rpc.ftm.tools' ],
      faucets: [ 'https://free-online-app.com/faucet-for-eth-evm-chains/' ],
      nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
      infoURL: 'https://fantom.foundation',
      shortName: 'ftm',
      chainId: 250,
      networkId: 250,
      icon: 'fantom',
      explorers: [
        {
          name: 'ftmscan',
          url: 'https://ftmscan.com',
          icon: 'ftmscan',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Huobi ECO Chain Testnet',
      chain: 'Heco',
      rpc: [
        'https://http-testnet.hecochain.com',
        'wss://ws-testnet.hecochain.com'
      ],
      faucets: [ 'https://scan-testnet.hecochain.com/faucet' ],
      nativeCurrency: {
        name: 'Huobi ECO Chain Test Native Token',
        symbol: 'htt',
        decimals: 18
      },
      infoURL: 'https://testnet.hecoinfo.com',
      shortName: 'hecot',
      chainId: 256,
      networkId: 256
    },
    {
      name: 'Setheum',
      chain: 'Setheum',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Setheum', symbol: 'SETM', decimals: 18 },
      infoURL: 'https://setheum.xyz',
      shortName: 'setm',
      chainId: 258,
      networkId: 258
    },
    {
      name: 'SUR Blockchain Network',
      chain: 'SUR',
      rpc: [ 'https://sur.nilin.org' ],
      faucets: [],
      nativeCurrency: { name: 'Suren', symbol: 'SRN', decimals: 18 },
      infoURL: 'https://surnet.org',
      shortName: 'SUR',
      chainId: 262,
      networkId: 1,
      icon: 'SUR',
      explorers: [
        {
          name: 'Surnet Explorer',
          url: 'https://explorer.surnet.org',
          icon: 'SUR',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'High Performance Blockchain',
      chain: 'HPB',
      rpc: [ 'https://hpbnode.com', 'wss://ws.hpbnode.com' ],
      faucets: [ 'https://myhpbwallet.com/' ],
      nativeCurrency: {
        name: 'High Performance Blockchain Ether',
        symbol: 'HPB',
        decimals: 18
      },
      infoURL: 'https://hpb.io',
      shortName: 'hpb',
      chainId: 269,
      networkId: 269,
      slip44: 269,
      explorers: [
        { name: 'hscan', url: 'https://hscan.org', standard: 'EIP3091' }
      ]
    },
    {
      name: 'Boba Network',
      chain: 'ETH',
      rpc: [ 'https://mainnet.boba.network/' ],
      faucets: [],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://boba.network',
      shortName: 'Boba',
      chainId: 288,
      networkId: 288,
      explorers: [
        {
          name: 'Blockscout',
          url: 'https://blockexplorer.boba.network',
          standard: 'none'
        }
      ],
      parent: {
        type: 'L2',
        chain: 'eip155-1',
        bridges: [ { url: 'https://gateway.boba.network' } ]
      }
    },
    {
      name: 'Optimism on Gnosis Chain',
      chain: 'OGC',
      rpc: [
        'https://optimism.gnosischain.com',
        'wss://optimism.gnosischain.com/wss'
      ],
      faucets: [ 'https://faucet.gimlu.com/gnosis' ],
      nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
      infoURL: 'https://www.xdaichain.com/for-developers/optimism-optimistic-rollups-on-gc',
      shortName: 'ogc',
      chainId: 300,
      networkId: 300,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://blockscout.com/xdai/optimism',
          icon: 'blockscout',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'KCC Mainnet',
      chain: 'KCC',
      rpc: [
        'https://rpc-mainnet.kcc.network',
        'wss://rpc-ws-mainnet.kcc.network'
      ],
      faucets: [],
      nativeCurrency: { name: 'KuCoin Token', symbol: 'KCS', decimals: 18 },
      infoURL: 'https://kcc.io',
      shortName: 'kcs',
      chainId: 321,
      networkId: 1,
      explorers: [
        {
          name: 'KCC Explorer',
          url: 'https://explorer.kcc.io/en',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'KCC Testnet',
      chain: 'KCC',
      rpc: [
        'https://rpc-testnet.kcc.network',
        'wss://rpc-ws-testnet.kcc.network'
      ],
      faucets: [ 'https://faucet-testnet.kcc.network' ],
      nativeCurrency: { name: 'KuCoin Testnet Token', symbol: 'tKCS', decimals: 18 },
      infoURL: 'https://scan-testnet.kcc.network',
      shortName: 'kcst',
      chainId: 322,
      networkId: 322,
      explorers: [
        {
          name: 'kcc-scan',
          url: 'https://scan-testnet.kcc.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Web3Q Mainnet',
      chain: 'Web3Q',
      rpc: [ 'https://mainnet.web3q.io:8545' ],
      faucets: [],
      nativeCurrency: { name: 'Web3Q', symbol: 'W3Q', decimals: 18 },
      infoURL: 'https://web3q.io/home.w3q/',
      shortName: 'w3q',
      chainId: 333,
      networkId: 333,
      explorers: [
        {
          name: 'w3q-mainnet',
          url: 'https://explorer.mainnet.web3q.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'DFK Chain Test',
      chain: 'DFK',
      icon: 'dfk',
      network: 'testnet',
      rpc: [
        'https://subnets.avax.network/defi-kingdoms/dfk-chain-testnet/rpc'
      ],
      faucets: [],
      nativeCurrency: { name: 'Jewel', symbol: 'JEWEL', decimals: 18 },
      infoURL: 'https://defikingdoms.com',
      shortName: 'DFKTEST',
      chainId: 335,
      networkId: 335,
      explorers: [
        {
          name: 'ethernal',
          url: 'https://explorer-test.dfkchain.com',
          icon: 'ethereum',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Shiden',
      chain: 'SDN',
      rpc: [
        'https://rpc.shiden.astar.network:8545',
        'wss://shiden.api.onfinality.io/public-ws'
      ],
      faucets: [],
      nativeCurrency: { name: 'Shiden', symbol: 'SDN', decimals: 18 },
      infoURL: 'https://shiden.astar.network/',
      shortName: 'sdn',
      chainId: 336,
      networkId: 336,
      icon: 'shiden',
      explorers: [
        {
          name: 'subscan',
          url: 'https://shiden.subscan.io',
          standard: 'none',
          icon: 'subscan'
        }
      ]
    },
    {
      name: 'Cronos Testnet',
      chain: 'CRO',
      rpc: [
        'https://cronos-testnet-3.crypto.org:8545',
        'wss://cronos-testnet-3.crypto.org:8546'
      ],
      faucets: [ 'https://cronos.crypto.org/faucet' ],
      nativeCurrency: { name: 'Crypto.org Test Coin', symbol: 'TCRO', decimals: 18 },
      infoURL: 'https://cronos.crypto.org',
      shortName: 'tcro',
      chainId: 338,
      networkId: 338,
      explorers: [
        {
          name: 'Cronos Testnet Explorer',
          url: 'https://cronos.crypto.org/explorer/testnet3',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Theta Mainnet',
      chain: 'Theta',
      rpc: [ 'https://eth-rpc-api.thetatoken.org/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'Theta Fuel', symbol: 'TFUEL', decimals: 18 },
      infoURL: 'https://www.thetatoken.org/',
      shortName: 'theta-mainnet',
      chainId: 361,
      networkId: 361,
      explorers: [
        {
          name: 'Theta Mainnet Explorer',
          url: 'https://explorer.thetatoken.org',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Theta Sapphire Testnet',
      chain: 'Theta',
      rpc: [ 'https://eth-rpc-api-sapphire.thetatoken.org/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'Theta Fuel', symbol: 'TFUEL', decimals: 18 },
      infoURL: 'https://www.thetatoken.org/',
      shortName: 'theta-sapphire',
      chainId: 363,
      networkId: 363,
      explorers: [
        {
          name: 'Theta Sapphire Testnet Explorer',
          url: 'https://guardian-testnet-sapphire-explorer.thetatoken.org',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Theta Amber Testnet',
      chain: 'Theta',
      rpc: [ 'https://eth-rpc-api-amber.thetatoken.org/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'Theta Fuel', symbol: 'TFUEL', decimals: 18 },
      infoURL: 'https://www.thetatoken.org/',
      shortName: 'theta-amber',
      chainId: 364,
      networkId: 364,
      explorers: [
        {
          name: 'Theta Amber Testnet Explorer',
          url: 'https://guardian-testnet-amber-explorer.thetatoken.org',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Theta Testnet',
      chain: 'Theta',
      rpc: [ 'https://eth-rpc-api-testnet.thetatoken.org/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'Theta Fuel', symbol: 'TFUEL', decimals: 18 },
      infoURL: 'https://www.thetatoken.org/',
      shortName: 'theta-testnet',
      chainId: 365,
      networkId: 365,
      explorers: [
        {
          name: 'Theta Testnet Explorer',
          url: 'https://testnet-explorer.thetatoken.org',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'PulseChain Mainnet',
      shortName: 'pls',
      chain: 'PLS',
      chainId: 369,
      networkId: 369,
      infoURL: 'https://pulsechain.com/',
      rpc: [
        'https://rpc.mainnet.pulsechain.com/',
        'wss://rpc.mainnet.pulsechain.com/'
      ],
      faucets: [],
      nativeCurrency: { name: 'Pulse', symbol: 'PLS', decimals: 18 }
    },
    {
      name: 'Lisinski',
      chain: 'CRO',
      rpc: [ 'https://rpc-bitfalls1.lisinski.online' ],
      faucets: [ 'https://pipa.lisinski.online' ],
      nativeCurrency: { name: 'Lisinski Ether', symbol: 'LISINS', decimals: 18 },
      infoURL: 'https://lisinski.online',
      shortName: 'lisinski',
      chainId: 385,
      networkId: 385
    },
    {
      name: 'SX Network Mainnet',
      chain: 'SX',
      icon: 'SX',
      network: 'mainnet',
      rpc: [ 'https://rpc.sx.technology' ],
      faucets: [],
      nativeCurrency: { name: 'SX Network', symbol: 'SX', decimals: 18 },
      infoURL: 'https://www.sx.technology',
      shortName: 'SX',
      chainId: 416,
      networkId: 416,
      explorers: [
        {
          name: 'SX Network Explorer',
          url: 'https://explorer.sx.technology',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Optimistic Ethereum Testnet Goerli',
      chain: 'ETH',
      rpc: [ 'https://goerli.optimism.io/' ],
      faucets: [],
      nativeCurrency: { name: 'Görli Ether', symbol: 'GOR', decimals: 18 },
      infoURL: 'https://optimism.io',
      shortName: 'ogor',
      chainId: 420,
      networkId: 420
    },
    {
      name: 'Rupaya',
      chain: 'RUPX',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Rupaya', symbol: 'RUPX', decimals: 18 },
      infoURL: 'https://www.rupx.io',
      shortName: 'rupx',
      chainId: 499,
      networkId: 499,
      slip44: 499
    },
    {
      name: 'Double-A Chain Mainnet',
      chain: 'AAC',
      rpc: [ 'https://rpc.acuteangle.com' ],
      faucets: [],
      nativeCurrency: { name: 'Acuteangle Native Token', symbol: 'AAC', decimals: 18 },
      infoURL: 'https://www.acuteangle.com/',
      shortName: 'aac',
      chainId: 512,
      networkId: 512,
      slip44: 1512,
      explorers: [
        {
          name: 'aacscan',
          url: 'https://scan.acuteangle.com',
          standard: 'EIP3091'
        }
      ],
      icon: 'aac'
    },
    {
      name: 'Double-A Chain Testnet',
      chain: 'AAC',
      icon: 'aac',
      rpc: [ 'https://rpc-testnet.acuteangle.com' ],
      faucets: [ 'https://scan-testnet.acuteangle.com/faucet' ],
      nativeCurrency: { name: 'Acuteangle Native Token', symbol: 'AAC', decimals: 18 },
      infoURL: 'https://www.acuteangle.com/',
      shortName: 'aact',
      chainId: 513,
      networkId: 513,
      explorers: [
        {
          name: 'aacscan-testnet',
          url: 'https://scan-testnet.acuteangle.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'XT Smart Chain Mainnet',
      chain: 'XSC',
      icon: 'xsc',
      rpc: [
        'https://datarpc1.xsc.pub',
        'https://datarpc2.xsc.pub',
        'https://datarpc3.xsc.pub'
      ],
      faucets: [ 'https://xsc.pub/faucet' ],
      nativeCurrency: { name: 'XT Smart Chain Native Token', symbol: 'XT', decimals: 18 },
      infoURL: 'https://xsc.pub/',
      shortName: 'xt',
      chainId: 520,
      networkId: 1024,
      explorers: [
        {
          name: 'xscscan',
          url: 'https://xscscan.pub',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Candle',
      chain: 'Candle',
      rpc: [ 'https://candle-rpc.com/', 'https://rpc.cndlchain.com' ],
      faucets: [],
      nativeCurrency: { name: 'CANDLE', symbol: 'CNDL', decimals: 18 },
      infoURL: 'https://candlelabs.org/',
      shortName: 'CNDL',
      chainId: 534,
      networkId: 534,
      slip44: 674,
      explorers: [
        {
          name: 'candleexplorer',
          url: 'https://candleexplorer.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Vela1 Chain Mainnet',
      chain: 'VELA1',
      rpc: [ 'https://rpc.velaverse.io' ],
      faucets: [],
      nativeCurrency: { name: 'CLASS COIN', symbol: 'CLASS', decimals: 18 },
      infoURL: 'https://velaverse.io',
      shortName: 'CLASS',
      chainId: 555,
      networkId: 555,
      explorers: [
        {
          name: 'Vela1 Chain Mainnet Explorer',
          url: 'https://exp.velaverse.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Tao Network',
      chain: 'TAO',
      rpc: [
        'https://rpc.testnet.tao.network',
        'http://rpc.testnet.tao.network:8545',
        'https://rpc.tao.network',
        'wss://rpc.tao.network'
      ],
      faucets: [],
      nativeCurrency: { name: 'Tao', symbol: 'TAO', decimals: 18 },
      infoURL: 'https://tao.network',
      shortName: 'tao',
      chainId: 558,
      networkId: 558
    },
    {
      name: 'Metis Stardust Testnet',
      chain: 'ETH',
      rpc: [ 'https://stardust.metis.io/?owner=588' ],
      faucets: [],
      nativeCurrency: { name: 'tMetis', symbol: 'METIS', decimals: 18 },
      infoURL: 'https://www.metis.io',
      shortName: 'metis-stardust',
      chainId: 588,
      networkId: 588,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://stardust-explorer.metis.io',
          standard: 'EIP3091'
        }
      ],
      parent: {
        type: 'L2',
        chain: 'eip155-4',
        bridges: [ { url: 'https://bridge.metis.io' } ]
      }
    },
    {
      name: 'Astar',
      chain: 'ASTR',
      rpc: [ 'https://rpc.astar.network:8545' ],
      faucets: [],
      nativeCurrency: { name: 'Astar', symbol: 'ASTR', decimals: 18 },
      infoURL: 'https://astar.network/',
      shortName: 'astr',
      chainId: 592,
      networkId: 592,
      icon: 'astar',
      explorers: [
        {
          name: 'subscan',
          url: 'https://astar.subscan.io',
          standard: 'none',
          icon: 'subscan'
        }
      ]
    },
    {
      name: 'Acala Mandala Testnet',
      chain: 'mACA',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Acala Mandala Token', symbol: 'mACA', decimals: 18 },
      infoURL: 'https://acala.network',
      shortName: 'maca',
      chainId: 595,
      networkId: 595
    },
    {
      name: 'Karura Network Testnet',
      chain: 'KAR',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Karura Token', symbol: 'KAR', decimals: 18 },
      infoURL: 'https://karura.network',
      shortName: 'tkar',
      chainId: 596,
      networkId: 596,
      slip44: 596
    },
    {
      name: 'Acala Network Testnet',
      chain: 'ACA',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Acala Token', symbol: 'ACA', decimals: 18 },
      infoURL: 'https://acala.network',
      shortName: 'taca',
      chainId: 597,
      networkId: 597,
      slip44: 597
    },
    {
      name: 'Meshnyan testnet',
      chain: 'MeshTestChain',
      rpc: [],
      faucets: [],
      nativeCurrency: {
        name: 'Meshnyan Testnet Native Token',
        symbol: 'MESHT',
        decimals: 18
      },
      infoURL: '',
      shortName: 'mesh-chain-testnet',
      chainId: 600,
      networkId: 600
    },
    {
      name: 'SX Network Testnet',
      chain: 'SX',
      icon: 'SX',
      network: 'testnet',
      rpc: [ 'https://rpc.toronto.sx.technology' ],
      faucets: [ 'https://faucet.toronto.sx.technology' ],
      nativeCurrency: { name: 'SX Network', symbol: 'SX', decimals: 18 },
      infoURL: 'https://www.sx.technology',
      shortName: 'SX-Testnet',
      chainId: 647,
      networkId: 647,
      explorers: [
        {
          name: 'SX Network Toronto Explorer',
          url: 'https://explorer.toronto.sx.technology',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Pixie Chain Testnet',
      chain: 'PixieChain',
      rpc: [
        'https://http-testnet.chain.pixie.xyz',
        'wss://ws-testnet.chain.pixie.xyz'
      ],
      faucets: [ 'https://chain.pixie.xyz/faucet' ],
      nativeCurrency: {
        name: 'Pixie Chain Testnet Native Token',
        symbol: 'PCTT',
        decimals: 18
      },
      infoURL: 'https://scan-testnet.chain.pixie.xyz',
      shortName: 'pixie-chain-testnet',
      chainId: 666,
      networkId: 666
    },
    {
      name: 'Karura Network',
      chain: 'KAR',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Karura Token', symbol: 'KAR', decimals: 18 },
      infoURL: 'https://karura.network',
      shortName: 'kar',
      chainId: 686,
      networkId: 686,
      slip44: 686
    },
    {
      name: 'Star Social Testnet',
      chain: 'SNS',
      rpc: [ 'https://avastar.cc/ext/bc/C/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'Social', symbol: 'SNS', decimals: 18 },
      infoURL: 'https://info.avastar.cc',
      shortName: 'SNS',
      chainId: 700,
      networkId: 700,
      explorers: [
        {
          name: 'starscan',
          url: 'https://avastar.info',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'BlockChain Station Mainnet',
      chain: 'BCS',
      rpc: [
        'https://rpc-mainnet.bcsdev.io',
        'wss://rpc-ws-mainnet.bcsdev.io'
      ],
      faucets: [],
      nativeCurrency: { name: 'BCS Token', symbol: 'BCS', decimals: 18 },
      infoURL: 'https://blockchainstation.io',
      shortName: 'bcs',
      chainId: 707,
      networkId: 707,
      explorers: [
        {
          name: 'BlockChain Station Explorer',
          url: 'https://explorer.bcsdev.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'BlockChain Station Testnet',
      chain: 'BCS',
      rpc: [
        'https://rpc-testnet.bcsdev.io',
        'wss://rpc-ws-testnet.bcsdev.io'
      ],
      faucets: [ 'https://faucet.bcsdev.io' ],
      nativeCurrency: { name: 'BCS Testnet Token', symbol: 'tBCS', decimals: 18 },
      infoURL: 'https://blockchainstation.io',
      shortName: 'tbcs',
      chainId: 708,
      networkId: 708,
      explorers: [
        {
          name: 'BlockChain Station Explorer',
          url: 'https://testnet.bcsdev.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Factory 127 Testnet',
      chain: 'FETH',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Factory 127 Token', symbol: 'FETH', decimals: 18 },
      infoURL: 'https://www.factory127.com',
      shortName: 'tfeth',
      chainId: 721,
      networkId: 721,
      slip44: 721
    },
    {
      name: 'OpenChain Testnet',
      chain: 'OpenChain Testnet',
      rpc: [
        'http://mainnet.openchain.info:8545',
        'https://mainnet1.openchain.info'
      ],
      faucets: [ 'https://faucet.openchain.info/' ],
      nativeCurrency: { name: 'Openchain Testnet', symbol: 'TOPC', decimals: 18 },
      infoURL: 'https://testnet.openchain.info/',
      shortName: 'opc',
      chainId: 776,
      networkId: 776,
      explorers: [
        {
          name: 'OPEN CHAIN TESTNET',
          url: 'https://testnet.openchain.info',
          standard: 'none'
        }
      ]
    },
    {
      name: 'cheapETH',
      chain: 'cheapETH',
      rpc: [ 'https://node.cheapeth.org/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'cTH', symbol: 'cTH', decimals: 18 },
      infoURL: 'https://cheapeth.org/',
      shortName: 'cth',
      chainId: 777,
      networkId: 777
    },
    {
      name: 'Acala Network',
      chain: 'ACA',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Acala Token', symbol: 'ACA', decimals: 18 },
      infoURL: 'https://acala.network',
      shortName: 'aca',
      chainId: 787,
      networkId: 787,
      slip44: 787
    },
    {
      name: 'Aerochain Testnet',
      chain: 'Aerochain',
      network: 'testnet',
      rpc: [ 'https://testnet-rpc.aerochain.id/' ],
      faucets: [ 'https://faucet.aerochain.id/' ],
      nativeCurrency: { name: 'Aerochain Testnet', symbol: 'TAero', decimals: 18 },
      infoURL: 'https://aerochaincoin.org/',
      shortName: 'taero',
      chainId: 788,
      networkId: 788,
      explorers: [
        {
          name: 'aeroscan',
          url: 'https://testnet.aeroscan.id',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Haic',
      chain: 'Haic',
      rpc: [ 'https://orig.haichain.io/' ],
      faucets: [],
      nativeCurrency: { name: 'Haicoin', symbol: 'HAIC', decimals: 18 },
      infoURL: 'https://www.haichain.io/',
      shortName: 'haic',
      chainId: 803,
      networkId: 803
    },
    {
      name: 'Callisto Mainnet',
      chain: 'CLO',
      rpc: [ 'https://clo-geth.0xinfra.com' ],
      faucets: [],
      nativeCurrency: { name: 'Callisto Mainnet Ether', symbol: 'CLO', decimals: 18 },
      infoURL: 'https://callisto.network',
      shortName: 'clo',
      chainId: 820,
      networkId: 1,
      slip44: 820
    },
    {
      name: 'Callisto Testnet',
      chain: 'CLO',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Callisto Testnet Ether', symbol: 'TCLO', decimals: 18 },
      infoURL: 'https://callisto.network',
      shortName: 'tclo',
      chainId: 821,
      networkId: 2
    },
    {
      name: 'Ambros Chain Mainnet',
      chain: 'ambroschain',
      rpc: [ 'https://api.ambros.network' ],
      faucets: [],
      nativeCurrency: { name: 'AMBROS', symbol: 'AMBROS', decimals: 18 },
      infoURL: 'https://ambros.network',
      shortName: 'ambros',
      chainId: 880,
      networkId: 880,
      explorers: [
        {
          name: 'Ambros Chain Explorer',
          url: 'https://ambrosscan.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Wanchain',
      chain: 'WAN',
      rpc: [ 'https://gwan-ssl.wandevs.org:56891/' ],
      faucets: [],
      nativeCurrency: { name: 'Wancoin', symbol: 'WAN', decimals: 18 },
      infoURL: 'https://www.wanscan.org',
      shortName: 'wan',
      chainId: 888,
      networkId: 888,
      slip44: 5718350
    },
    {
      name: 'Garizon Testnet Stage0',
      chain: 'GAR',
      network: 'testnet',
      icon: 'garizon',
      rpc: [ 'https://s0-testnet.garizon.net/rpc' ],
      faucets: [ 'https://faucet-testnet.garizon.com' ],
      nativeCurrency: { name: 'Garizon', symbol: 'GAR', decimals: 18 },
      infoURL: 'https://garizon.com',
      shortName: 'gar-test-s0',
      chainId: 900,
      networkId: 900,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer-testnet.garizon.com',
          icon: 'garizon',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Garizon Testnet Stage1',
      chain: 'GAR',
      network: 'testnet',
      icon: 'garizon',
      rpc: [ 'https://s1-testnet.garizon.net/rpc' ],
      faucets: [ 'https://faucet-testnet.garizon.com' ],
      nativeCurrency: { name: 'Garizon', symbol: 'GAR', decimals: 18 },
      infoURL: 'https://garizon.com',
      shortName: 'gar-test-s1',
      chainId: 901,
      networkId: 901,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer-testnet.garizon.com',
          icon: 'garizon',
          standard: 'EIP3091'
        }
      ],
      parent: { chain: 'eip155-900', type: 'shard' }
    },
    {
      name: 'Garizon Testnet Stage2',
      chain: 'GAR',
      network: 'testnet',
      icon: 'garizon',
      rpc: [ 'https://s2-testnet.garizon.net/rpc' ],
      faucets: [ 'https://faucet-testnet.garizon.com' ],
      nativeCurrency: { name: 'Garizon', symbol: 'GAR', decimals: 18 },
      infoURL: 'https://garizon.com',
      shortName: 'gar-test-s2',
      chainId: 902,
      networkId: 902,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer-testnet.garizon.com',
          icon: 'garizon',
          standard: 'EIP3091'
        }
      ],
      parent: { chain: 'eip155-900', type: 'shard' }
    },
    {
      name: 'Garizon Testnet Stage3',
      chain: 'GAR',
      network: 'testnet',
      icon: 'garizon',
      rpc: [ 'https://s3-testnet.garizon.net/rpc' ],
      faucets: [ 'https://faucet-testnet.garizon.com' ],
      nativeCurrency: { name: 'Garizon', symbol: 'GAR', decimals: 18 },
      infoURL: 'https://garizon.com',
      shortName: 'gar-test-s3',
      chainId: 903,
      networkId: 903,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer-testnet.garizon.com',
          icon: 'garizon',
          standard: 'EIP3091'
        }
      ],
      parent: { chain: 'eip155-900', type: 'shard' }
    },
    {
      name: 'PulseChain Testnet',
      shortName: 'tpls',
      chain: 'tPLS',
      chainId: 940,
      networkId: 940,
      infoURL: 'https://pulsechain.com/',
      rpc: [
        'https://rpc.v2.testnet.pulsechain.com/',
        'wss://rpc.v2.testnet.pulsechain.com/'
      ],
      faucets: [ 'https://faucet.v2.testnet.pulsechain.com/' ],
      nativeCurrency: { name: 'Test Pulse', symbol: 'tPLS', decimals: 18 }
    },
    {
      name: 'PulseChain Testnet v2b',
      shortName: 't2bpls',
      chain: 't2bPLS',
      network: 'testnet-2b',
      chainId: 941,
      networkId: 941,
      infoURL: 'https://pulsechain.com/',
      rpc: [
        'https://rpc.v2b.testnet.pulsechain.com/',
        'wss://rpc.v2b.testnet.pulsechain.com/'
      ],
      faucets: [ 'https://faucet.v2b.testnet.pulsechain.com/' ],
      nativeCurrency: { name: 'Test Pulse', symbol: 'tPLS', decimals: 18 }
    },
    {
      name: 'PulseChain Testnet v3',
      shortName: 't3pls',
      chain: 't3PLS',
      network: 'testnet-3',
      chainId: 942,
      networkId: 942,
      infoURL: 'https://pulsechain.com/',
      rpc: [
        'https://rpc.v3.testnet.pulsechain.com/',
        'wss://rpc.v3.testnet.pulsechain.com/'
      ],
      faucets: [ 'https://faucet.v3.testnet.pulsechain.com/' ],
      nativeCurrency: { name: 'Test Pulse', symbol: 'tPLS', decimals: 18 }
    },
    {
      name: 'Nepal Blockchain Network',
      chain: 'YETI',
      rpc: [
        'https://api.nepalblockchain.dev',
        'https://api.nepalblockchain.network'
      ],
      faucets: [ 'https://faucet.nepalblockchain.network' ],
      nativeCurrency: {
        name: 'Nepal Blockchain Network Ether',
        symbol: 'YETI',
        decimals: 18
      },
      infoURL: 'https://nepalblockchain.network',
      shortName: 'yeti',
      chainId: 977,
      networkId: 977
    },
    {
      name: 'TOP Mainnet EVM',
      chain: 'TOP',
      icon: 'top',
      rpc: [ 'ethapi.topnetwork.org' ],
      faucets: [],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://www.topnetwork.org/',
      shortName: 'top_evm',
      chainId: 980,
      networkId: 0,
      explorers: [
        {
          name: 'topscan.dev',
          url: 'https://www.topscan.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'TOP Mainnet',
      chain: 'TOP',
      icon: 'top',
      rpc: [ 'topapi.topnetwork.org' ],
      faucets: [],
      nativeCurrency: { name: 'TOP', symbol: 'TOP', decimals: 6 },
      infoURL: 'https://www.topnetwork.org/',
      shortName: 'top',
      chainId: 989,
      networkId: 0,
      explorers: [
        {
          name: 'topscan.dev',
          url: 'https://www.topscan.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Lucky Network',
      chain: 'LN',
      rpc: [
        'https://rpc.luckynetwork.org',
        'wss://ws.lnscan.org',
        'https://rpc.lnscan.org'
      ],
      faucets: [],
      nativeCurrency: { name: 'Lucky', symbol: 'L99', decimals: 18 },
      infoURL: 'https://luckynetwork.org',
      shortName: 'ln',
      chainId: 998,
      networkId: 998,
      icon: 'lucky',
      explorers: [
        {
          name: 'blockscout',
          url: 'https://explorer.luckynetwork.org',
          standard: 'none'
        },
        {
          name: 'expedition',
          url: 'https://lnscan.org',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Wanchain Testnet',
      chain: 'WAN',
      rpc: [ 'https://gwan-ssl.wandevs.org:46891/' ],
      faucets: [],
      nativeCurrency: { name: 'Wancoin', symbol: 'WAN', decimals: 18 },
      infoURL: 'https://testnet.wanscan.org',
      shortName: 'twan',
      chainId: 999,
      networkId: 999
    },
    {
      name: 'Klaytn Testnet Baobab',
      chain: 'KLAY',
      rpc: [ 'https://api.baobab.klaytn.net:8651' ],
      faucets: [ 'https://baobab.wallet.klaytn.com/access?next=faucet' ],
      nativeCurrency: { name: 'KLAY', symbol: 'KLAY', decimals: 18 },
      infoURL: 'https://www.klaytn.com/',
      shortName: 'Baobab',
      chainId: 1001,
      networkId: 1001
    },
    {
      name: 'Newton Testnet',
      chain: 'NEW',
      rpc: [ 'https://rpc1.newchain.newtonproject.org' ],
      faucets: [],
      nativeCurrency: { name: 'Newton', symbol: 'NEW', decimals: 18 },
      infoURL: 'https://www.newtonproject.org/',
      shortName: 'tnew',
      chainId: 1007,
      networkId: 1007
    },
    {
      name: 'Eurus Mainnet',
      chain: 'EUN',
      network: 'eurus',
      rpc: [ 'https://mainnet.eurus.network/' ],
      faucets: [],
      nativeCurrency: { name: 'Eurus', symbol: 'EUN', decimals: 18 },
      infoURL: 'https://eurus.network',
      shortName: 'eun',
      chainId: 1008,
      networkId: 1008,
      icon: 'eurus',
      explorers: [
        {
          name: 'eurusexplorer',
          url: 'https://explorer.eurus.network',
          icon: 'eurus',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Evrice Network',
      chain: 'EVC',
      rpc: [ 'https://meta.evrice.com' ],
      faucets: [],
      nativeCurrency: { name: 'Evrice', symbol: 'EVC', decimals: 18 },
      infoURL: 'https://evrice.com',
      shortName: 'EVC',
      chainId: 1010,
      networkId: 1010,
      slip44: 1020
    },
    {
      name: 'Newton',
      chain: 'NEW',
      rpc: [ 'https://global.rpc.mainnet.newtonproject.org' ],
      faucets: [],
      nativeCurrency: { name: 'Newton', symbol: 'NEW', decimals: 18 },
      infoURL: 'https://www.newtonproject.org/',
      shortName: 'new',
      chainId: 1012,
      networkId: 1012
    },
    {
      name: 'Sakura',
      chain: 'Sakura',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Sakura', symbol: 'SKU', decimals: 18 },
      infoURL: 'https://clover.finance/sakura',
      shortName: 'sku',
      chainId: 1022,
      networkId: 1022
    },
    {
      name: 'Clover Testnet',
      chain: 'Clover',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Clover', symbol: 'CLV', decimals: 18 },
      infoURL: 'https://clover.finance',
      shortName: 'tclv',
      chainId: 1023,
      networkId: 1023
    },
    {
      name: 'CLV Parachain',
      chain: 'CLV',
      rpc: [ 'https://api-para.clover.finance' ],
      faucets: [],
      nativeCurrency: { name: 'CLV', symbol: 'CLV', decimals: 18 },
      infoURL: 'https://clv.org',
      shortName: 'clv',
      chainId: 1024,
      networkId: 1024
    },
    {
      name: 'BitTorrent Chain Testnet',
      chain: 'BTTC',
      rpc: [ 'https://testrpc.bittorrentchain.io/' ],
      faucets: [],
      nativeCurrency: { name: 'BitTorrent', symbol: 'BTT', decimals: 18 },
      infoURL: 'https://bittorrentchain.io/',
      shortName: 'tbtt',
      chainId: 1028,
      networkId: 1028,
      explorers: [
        {
          name: 'testbttcscan',
          url: 'https://testscan.bittorrentchain.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Conflux eSpace',
      chain: 'Conflux',
      network: 'mainnet',
      rpc: [ 'https://evm.confluxrpc.com' ],
      faucets: [],
      nativeCurrency: { name: 'CFX', symbol: 'CFX', decimals: 18 },
      infoURL: 'https://confluxnetwork.org',
      shortName: 'cfx',
      chainId: 1030,
      networkId: 1030,
      icon: 'conflux',
      explorers: [
        {
          name: 'Conflux Scan',
          url: 'https://evm.confluxscan.net',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Metis Andromeda Mainnet',
      chain: 'ETH',
      rpc: [ 'https://andromeda.metis.io/?owner=1088' ],
      faucets: [],
      nativeCurrency: { name: 'Metis', symbol: 'METIS', decimals: 18 },
      infoURL: 'https://www.metis.io',
      shortName: 'metis-andromeda',
      chainId: 1088,
      networkId: 1088,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://andromeda-explorer.metis.io',
          standard: 'EIP3091'
        }
      ],
      parent: {
        type: 'L2',
        chain: 'eip155-1',
        bridges: [ { url: 'https://bridge.metis.io' } ]
      }
    },
    {
      name: 'MathChain',
      chain: 'MATH',
      rpc: [
        'https://mathchain-asia.maiziqianbao.net/rpc',
        'https://mathchain-us.maiziqianbao.net/rpc'
      ],
      faucets: [],
      nativeCurrency: { name: 'MathChain', symbol: 'MATH', decimals: 18 },
      infoURL: 'https://mathchain.org',
      shortName: 'MATH',
      chainId: 1139,
      networkId: 1139
    },
    {
      name: 'MathChain Testnet',
      chain: 'MATH',
      rpc: [ 'https://galois-hk.maiziqianbao.net/rpc' ],
      faucets: [ 'https://scan.boka.network/#/Galois/faucet' ],
      nativeCurrency: { name: 'MathChain', symbol: 'MATH', decimals: 18 },
      infoURL: 'https://mathchain.org',
      shortName: 'tMATH',
      chainId: 1140,
      networkId: 1140
    },
    {
      name: 'Iora Chain',
      chain: 'IORA',
      network: 'iorachain',
      icon: 'iorachain',
      rpc: [ 'https://dataseed.iorachain.com' ],
      faucets: [],
      nativeCurrency: { name: 'Iora', symbol: 'IORA', decimals: 18 },
      infoURL: 'https://iorachain.com',
      shortName: 'iora',
      chainId: 1197,
      networkId: 1197,
      explorers: [
        {
          name: 'ioraexplorer',
          url: 'https://explorer.iorachain.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Evanesco Testnet',
      chain: 'Evanesco Testnet',
      network: 'avis',
      rpc: [ 'https://seed5.evanesco.org:8547' ],
      faucets: [],
      nativeCurrency: { name: 'AVIS', symbol: 'AVIS', decimals: 18 },
      infoURL: 'https://evanesco.org/',
      shortName: 'avis',
      chainId: 1201,
      networkId: 1201
    },
    {
      name: 'World Trade Technical Chain Mainnet',
      chain: 'WTT',
      rpc: [ 'https://rpc.cadaut.com', 'wss://rpc.cadaut.com/ws' ],
      faucets: [],
      nativeCurrency: { name: 'World Trade Token', symbol: 'WTT', decimals: 18 },
      infoURL: 'http://www.cadaut.com',
      shortName: 'wtt',
      chainId: 1202,
      networkId: 2048,
      explorers: [
        {
          name: 'WTTScout',
          url: 'https://explorer.cadaut.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Popcateum Mainnet',
      chain: 'POPCATEUM',
      rpc: [ 'https://dataseed.popcateum.org' ],
      faucets: [],
      nativeCurrency: { name: 'Popcat', symbol: 'POP', decimals: 18 },
      infoURL: 'https://popcateum.org',
      shortName: 'popcat',
      chainId: 1213,
      networkId: 1213,
      explorers: [
        {
          name: 'popcateum explorer',
          url: 'https://explorer.popcateum.org',
          standard: 'none'
        }
      ]
    },
    {
      name: 'EnterChain Mainnet',
      chain: 'ENTER',
      network: 'mainnet',
      rpc: [ 'https://tapi.entercoin.net/' ],
      faucets: [],
      nativeCurrency: { name: 'EnterCoin', symbol: 'ENTER', decimals: 18 },
      infoURL: 'https://entercoin.net',
      shortName: 'enter',
      chainId: 1214,
      networkId: 1214,
      icon: 'enter',
      explorers: [
        {
          name: 'Enter Explorer - Expenter',
          url: 'https://explorer.entercoin.net',
          icon: 'enter',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'HALO Mainnet',
      chain: 'HALO',
      rpc: [ 'https://nodes.halo.land' ],
      faucets: [],
      nativeCurrency: { name: 'HALO', symbol: 'HO', decimals: 18 },
      infoURL: 'https://halo.land/#/',
      shortName: 'HO',
      chainId: 1280,
      networkId: 1280,
      explorers: [
        {
          name: 'HALOexplorer',
          url: 'https://browser.halo.land',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Moonbeam',
      chain: 'MOON',
      rpc: [
        'https://rpc.api.moonbeam.network',
        'wss://wss.api.moonbeam.network'
      ],
      faucets: [],
      nativeCurrency: { name: 'Glimmer', symbol: 'GLMR', decimals: 18 },
      infoURL: 'https://moonbeam.network/networks/moonbeam/',
      shortName: 'mbeam',
      chainId: 1284,
      networkId: 1284,
      explorers: [
        {
          name: 'moonscan',
          url: 'https://moonbeam.moonscan.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Moonriver',
      chain: 'MOON',
      rpc: [
        'https://rpc.api.moonriver.moonbeam.network',
        'wss://wss.api.moonriver.moonbeam.network'
      ],
      faucets: [],
      nativeCurrency: { name: 'Moonriver', symbol: 'MOVR', decimals: 18 },
      infoURL: 'https://moonbeam.network/networks/moonriver/',
      shortName: 'mriver',
      chainId: 1285,
      networkId: 1285,
      explorers: [
        {
          name: 'moonscan',
          url: 'https://moonriver.moonscan.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Moonrock old',
      chain: 'MOON',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Rocs', symbol: 'ROC', decimals: 18 },
      infoURL: '',
      shortName: 'mrock-old',
      chainId: 1286,
      networkId: 1286,
      status: 'deprecated'
    },
    {
      name: 'Moonbase Alpha',
      chain: 'MOON',
      rpc: [
        'https://rpc.api.moonbase.moonbeam.network',
        'wss://wss.api.moonbase.moonbeam.network'
      ],
      faucets: [],
      nativeCurrency: { name: 'Dev', symbol: 'DEV', decimals: 18 },
      infoURL: 'https://docs.moonbeam.network/networks/testnet/',
      shortName: 'mbase',
      chainId: 1287,
      networkId: 1287,
      explorers: [
        {
          name: 'moonscan',
          url: 'https://moonbase.moonscan.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Moonrock',
      chain: 'MOON',
      rpc: [
        'https://rpc.api.moonrock.moonbeam.network',
        'wss://wss.api.moonrock.moonbeam.network'
      ],
      faucets: [],
      nativeCurrency: { name: 'Rocs', symbol: 'ROC', decimals: 18 },
      infoURL: 'https://docs.moonbeam.network/learn/platform/networks/overview/',
      shortName: 'mrock',
      chainId: 1288,
      networkId: 1288
    },
    {
      name: 'CENNZnet old',
      chain: 'CENNZnet',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'CPAY', symbol: 'CPAY', decimals: 18 },
      infoURL: 'https://cennz.net',
      shortName: 'cennz-old',
      chainId: 1337,
      networkId: 1337,
      status: 'deprecated'
    },
    {
      name: 'Sherpax Mainnet',
      chain: 'Sherpax Mainnet',
      rpc: [ 'https://mainnet.sherpax.io/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'KSX', symbol: 'KSX', decimals: 18 },
      infoURL: 'https://sherpax.io/',
      shortName: 'Sherpax',
      chainId: 1506,
      networkId: 1506,
      explorers: [
        {
          name: 'Sherpax Mainnet Explorer',
          url: 'https://evm.sherpax.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Sherpax Testnet',
      chain: 'Sherpax Testnet',
      rpc: [ 'https://sherpax-testnet.chainx.org/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'KSX', symbol: 'KSX', decimals: 18 },
      infoURL: 'https://sherpax.io/',
      shortName: 'Sherpax Testnet',
      chainId: 1507,
      networkId: 1507,
      explorers: [
        {
          name: 'Sherpax Testnet Explorer',
          url: 'https://evm-pre.sherpax.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Catecoin Chain Mainnet',
      chain: 'Catechain',
      rpc: [ 'https://send.catechain.com' ],
      faucets: [],
      nativeCurrency: { name: 'Catecoin', symbol: 'CATE', decimals: 18 },
      infoURL: 'https://catechain.com',
      shortName: 'cate',
      chainId: 1618,
      networkId: 1618
    },
    {
      name: 'Atheios',
      chain: 'ATH',
      rpc: [ 'https://wallet.atheios.com:8797' ],
      faucets: [],
      nativeCurrency: { name: 'Atheios Ether', symbol: 'ATH', decimals: 18 },
      infoURL: 'https://atheios.com',
      shortName: 'ath',
      chainId: 1620,
      networkId: 11235813,
      slip44: 1620
    },
    {
      name: 'Btachain',
      chain: 'btachain',
      rpc: [ 'https://dataseed1.btachain.com/' ],
      faucets: [],
      nativeCurrency: { name: 'Bitcoin Asset', symbol: 'BTA', decimals: 18 },
      infoURL: 'https://bitcoinasset.io/',
      shortName: 'bta',
      chainId: 1657,
      networkId: 1657
    },
    {
      name: 'LUDAN Mainnet',
      chain: 'LUDAN',
      rpc: [ 'https://rpc.ludan.org/' ],
      faucets: [],
      nativeCurrency: { name: 'LUDAN', symbol: 'LUDAN', decimals: 18 },
      infoURL: 'https://www.ludan.org/',
      shortName: 'LUDAN',
      icon: 'ludan',
      chainId: 1688,
      networkId: 1688
    },
    {
      name: 'Cube Chain Mainnet',
      chain: 'Cube',
      icon: 'cube',
      rpc: [
        'https://http-mainnet.cube.network',
        'wss://ws-mainnet.cube.network',
        'https://http-mainnet-sg.cube.network',
        'wss://ws-mainnet-sg.cube.network',
        'https://http-mainnet-us.cube.network',
        'wss://ws-mainnet-us.cube.network'
      ],
      faucets: [],
      nativeCurrency: { name: 'Cube Chain Native Token', symbol: 'CUBE', decimals: 18 },
      infoURL: 'https://www.cube.network',
      shortName: 'cube',
      chainId: 1818,
      networkId: 1818,
      slip44: 1818,
      explorers: [
        {
          name: 'cube-scan',
          url: 'https://cubescan.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Cube Chain Testnet',
      chain: 'Cube',
      icon: 'cube',
      rpc: [
        'https://http-testnet.cube.network',
        'wss://ws-testnet.cube.network',
        'https://http-testnet-sg.cube.network',
        'wss://ws-testnet-sg.cube.network',
        'https://http-testnet-jp.cube.network',
        'wss://ws-testnet-jp.cube.network',
        'https://http-testnet-us.cube.network',
        'wss://ws-testnet-us.cube.network'
      ],
      faucets: [ 'https://faucet.cube.network' ],
      nativeCurrency: {
        name: 'Cube Chain Test Native Token',
        symbol: 'CUBET',
        decimals: 18
      },
      infoURL: 'https://www.cube.network',
      shortName: 'cubet',
      chainId: 1819,
      networkId: 1819,
      slip44: 1819,
      explorers: [
        {
          name: 'cubetest-scan',
          url: 'https://testnet.cubescan.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Teslafunds',
      chain: 'TSF',
      rpc: [ 'https://tsfapi.europool.me' ],
      faucets: [],
      nativeCurrency: { name: 'Teslafunds Ether', symbol: 'TSF', decimals: 18 },
      infoURL: 'https://teslafunds.io',
      shortName: 'tsf',
      chainId: 1856,
      networkId: 1
    },
    {
      name: 'BON Network',
      chain: 'BON',
      network: 'testnet',
      rpc: [ 'http://rpc.boyanet.org:8545', 'ws://rpc.boyanet.org:8546' ],
      faucets: [],
      nativeCurrency: { name: 'BOYACoin', symbol: 'BOY', decimals: 18 },
      infoURL: 'https://boyanet.org',
      shortName: 'boya',
      chainId: 1898,
      networkId: 1,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer.boyanet.org:4001',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Eurus Testnet',
      chain: 'EUN',
      network: 'eurus-testnet',
      rpc: [ 'https://testnet.eurus.network' ],
      faucets: [],
      nativeCurrency: { name: 'Eurus', symbol: 'EUN', decimals: 18 },
      infoURL: 'https://eurus.network',
      shortName: 'euntest',
      chainId: 1984,
      networkId: 1984,
      icon: 'eurus',
      explorers: [
        {
          name: 'testnetexplorer',
          url: 'https://testnetexplorer.eurus.network',
          icon: 'eurus',
          standard: 'none'
        }
      ]
    },
    {
      name: 'EtherGem',
      chain: 'EGEM',
      rpc: [ 'https://jsonrpc.egem.io/custom' ],
      faucets: [],
      nativeCurrency: { name: 'EtherGem Ether', symbol: 'EGEM', decimals: 18 },
      infoURL: 'https://egem.io',
      shortName: 'egem',
      chainId: 1987,
      networkId: 1987,
      slip44: 1987
    },
    {
      name: 'Milkomeda C1 Mainnet',
      chain: 'milkAda',
      icon: 'milkomeda',
      network: 'mainnet',
      rpc: [
        'https://rpc-mainnet-cardano-evm.c1.milkomeda.com',
        'wss://rpc-mainnet-cardano-evm.c1.milkomeda.com'
      ],
      faucets: [],
      nativeCurrency: { name: 'milkAda', symbol: 'mADA', decimals: 18 },
      infoURL: 'https://milkomeda.com',
      shortName: 'milkAda',
      chainId: 2001,
      networkId: 2001,
      explorers: [
        {
          name: 'Blockscout',
          url: 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'CloudWalk Testnet',
      chain: 'CloudWalk Testnet',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'CloudWalk Native Token', symbol: 'CWN', decimals: 18 },
      infoURL: 'https://cloudwalk.io',
      shortName: 'cloudwalk_testnet',
      chainId: 2008,
      networkId: 2008,
      explorers: [
        {
          name: 'CloudWalk Testnet Explorer',
          url: 'https://explorer.testnet.cloudwalk.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'CloudWalk Mainnet',
      chain: 'CloudWalk Mainnet',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'CloudWalk Native Token', symbol: 'CWN', decimals: 18 },
      infoURL: 'https://cloudwalk.io',
      shortName: 'cloudwalk_mainnet',
      chainId: 2009,
      networkId: 2009,
      explorers: [
        {
          name: 'CloudWalk Mainnet Explorer',
          url: 'https://explorer.mainnet.cloudwalk.io',
          standard: 'none'
        }
      ]
    },
    {
      name: '420coin',
      chain: '420',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'Fourtwenty', symbol: '420', decimals: 18 },
      infoURL: 'https://420integrated.com',
      shortName: '420',
      chainId: 2020,
      networkId: 2020
    },
    {
      name: 'Edgeware Mainnet',
      chain: 'EDG',
      rpc: [ 'https://mainnet1.edgewa.re' ],
      faucets: [],
      nativeCurrency: { name: 'Edge', symbol: 'EDG', decimals: 18 },
      infoURL: 'http://edgewa.re',
      shortName: 'edg',
      chainId: 2021,
      networkId: 2021
    },
    {
      name: 'Beresheet Testnet',
      chain: 'EDG',
      rpc: [ 'https://beresheet1.edgewa.re' ],
      faucets: [],
      nativeCurrency: { name: 'Testnet Edge', symbol: 'tEDG', decimals: 18 },
      infoURL: 'http://edgewa.re',
      shortName: 'edgt',
      chainId: 2022,
      networkId: 2022
    },
    {
      name: 'Taycan Testnet',
      chain: 'Taycan',
      rpc: [ 'https://test-taycan.hupayx.io' ],
      faucets: [ 'https://ttaycan-faucet.hupayx.io/' ],
      nativeCurrency: { name: 'test-Shuffle', symbol: 'tSFL', decimals: 18 },
      infoURL: 'https://hupayx.io',
      shortName: 'taycan-testnet',
      chainId: 2023,
      networkId: 2023,
      explorers: [
        {
          name: 'Taycan Explorer(Blockscout)',
          url: 'https://evmscan-test.hupayx.io',
          standard: 'none'
        },
        {
          name: 'Taycan Cosmos Explorer',
          url: 'https://cosmoscan-test.hupayx.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Rangers Protocol Mainnet',
      chain: 'Rangers',
      icon: 'rangers',
      rpc: [ 'https://mainnet.rangersprotocol.com/api/jsonrpc' ],
      faucets: [],
      nativeCurrency: { name: 'Rangers Protocol Gas', symbol: 'RPG', decimals: 18 },
      infoURL: 'https://rangersprotocol.com',
      shortName: 'rpg',
      chainId: 2025,
      networkId: 2025,
      slip44: 1008,
      explorers: [
        {
          name: 'rangersscan',
          url: 'https://scan.rangersprotocol.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Ecoball Mainnet',
      chain: 'ECO',
      rpc: [ 'https://api.ecoball.org/ecoball/' ],
      faucets: [],
      nativeCurrency: { name: 'Ecoball Coin', symbol: 'ECO', decimals: 18 },
      infoURL: 'https://ecoball.org',
      shortName: 'eco',
      chainId: 2100,
      networkId: 2100,
      explorers: [
        {
          name: 'Ecoball Explorer',
          url: 'https://scan.ecoball.org',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Ecoball Testnet Espuma',
      chain: 'ECO',
      rpc: [ 'https://api.ecoball.org/espuma/' ],
      faucets: [],
      nativeCurrency: { name: 'Espuma Coin', symbol: 'ECO', decimals: 18 },
      infoURL: 'https://ecoball.org',
      shortName: 'esp',
      chainId: 2101,
      networkId: 2101,
      explorers: [
        {
          name: 'Ecoball Testnet Explorer',
          url: 'https://espuma-scan.ecoball.org',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Findora Mainnet',
      chain: 'Findora',
      network: 'mainnet',
      rpc: [ 'https://prod-mainnet.prod.findora.org:8545' ],
      faucets: [],
      nativeCurrency: { name: 'FRA', symbol: 'FRA', decimals: 18 },
      infoURL: 'https://findora.org/',
      shortName: 'fra',
      chainId: 2152,
      networkId: 2152,
      explorers: [
        {
          name: 'findorascan',
          url: 'https://evm.findorascan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Findora Testnet',
      chain: 'Testnet-anvil',
      network: 'testnet',
      rpc: [ 'https://prod-testnet.prod.findora.org:8545/' ],
      faucets: [],
      nativeCurrency: { name: 'FRA', symbol: 'FRA', decimals: 18 },
      infoURL: 'https://findora.org/',
      shortName: 'findora-testnet',
      chainId: 2153,
      networkId: 2153,
      explorers: [
        {
          name: 'findorascan',
          url: 'https://testnet-anvil.evm.findorascan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Evanesco Mainnet',
      chain: 'EVA',
      network: 'mainnet',
      rpc: [ 'https://seed4.evanesco.org:8546' ],
      faucets: [],
      nativeCurrency: { name: 'EVA', symbol: 'EVA', decimals: 18 },
      infoURL: 'https://evanesco.org/',
      shortName: 'evanesco',
      chainId: 2213,
      networkId: 2213,
      icon: 'evanesco',
      explorers: [
        {
          name: 'Evanesco Explorer',
          url: 'https://explorer.evanesco.org',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Kava EVM Testnet',
      chain: 'KAVA',
      network: 'testnet',
      rpc: [
        'https://evm.evm-alpha.kava.io',
        'wss://evm-ws.evm-alpha.kava.io'
      ],
      faucets: [ 'https://faucet.kava.io' ],
      nativeCurrency: { name: 'TKava', symbol: 'TKAVA', decimals: 18 },
      infoURL: 'https://www.kava.io',
      shortName: 'tkava',
      chainId: 2221,
      networkId: 2221,
      icon: 'kava',
      explorers: [
        {
          name: 'Kava Testnet Explorer',
          url: 'https://explorer.evm-alpha.kava.io',
          standard: 'EIP3091',
          icon: 'kava'
        }
      ]
    },
    {
      name: 'Kava EVM',
      chain: 'KAVA',
      network: 'mainnet',
      rpc: [
        'https://evm.kava.io',
        'https://evm2.kava.io',
        'wss://wevm.kava.io',
        'wss://wevm2.kava.io'
      ],
      faucets: [],
      nativeCurrency: { name: 'Kava', symbol: 'KAVA', decimals: 18 },
      infoURL: 'https://www.kava.io',
      shortName: 'kava',
      chainId: 2222,
      networkId: 2222,
      icon: 'kava',
      explorers: [
        {
          name: 'Kava EVM Explorer',
          url: 'https://explorer.kava.io',
          standard: 'EIP3091',
          icon: 'kava'
        }
      ]
    },
    {
      name: 'VChain Mainnet',
      chain: 'VChain',
      rpc: [ 'https://bc.vcex.xyz' ],
      faucets: [],
      nativeCurrency: { name: 'VNDT', symbol: 'VNDT', decimals: 18 },
      infoURL: 'https://bo.vcex.xyz/',
      shortName: 'VChain',
      chainId: 2223,
      networkId: 2223,
      explorers: [
        {
          name: 'VChain Scan',
          url: 'https://scan.vcex.xyz',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Kortho Mainnet',
      chain: 'Kortho Chain',
      rpc: [ 'https://www.kortho-chain.com' ],
      faucets: [],
      nativeCurrency: { name: 'KorthoChain', symbol: 'KTO', decimals: 11 },
      infoURL: 'https://www.kortho.io/',
      shortName: 'ktoc',
      chainId: 2559,
      networkId: 2559
    },
    {
      name: 'TechPay Mainnet',
      chain: 'TPC',
      network: 'mainnet',
      rpc: [ 'https://api.techpay.io/' ],
      faucets: [],
      nativeCurrency: { name: 'TechPay', symbol: 'TPC', decimals: 18 },
      infoURL: 'https://techpay.io/',
      shortName: 'tpc',
      chainId: 2569,
      networkId: 2569,
      icon: 'techpay',
      explorers: [
        {
          name: 'tpcscan',
          url: 'https://tpcscan.com',
          icon: 'techpay',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'EZChain C-Chain Mainnet',
      chain: 'EZC',
      rpc: [ 'https://api.ezchain.com/ext/bc/C/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'EZChain', symbol: 'EZC', decimals: 18 },
      infoURL: 'https://ezchain.com',
      shortName: 'EZChain',
      chainId: 2612,
      networkId: 2612,
      icon: 'ezchain',
      explorers: [
        {
          name: 'ezchain',
          url: 'https://cchain-explorer.ezchain.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'EZChain C-Chain Testnet',
      chain: 'EZC',
      rpc: [ 'https://testnet-api.ezchain.com/ext/bc/C/rpc' ],
      faucets: [ 'https://testnet-faucet.ezchain.com' ],
      nativeCurrency: { name: 'EZChain', symbol: 'EZC', decimals: 18 },
      infoURL: 'https://ezchain.com',
      shortName: 'Fuji-EZChain',
      chainId: 2613,
      networkId: 2613,
      icon: 'ezchain',
      explorers: [
        {
          name: 'ezchain',
          url: 'https://testnet-cchain-explorer.ezchain.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'CENNZnet Rata',
      chain: 'CENNZnet',
      network: 'rata',
      rpc: [ 'https://rata.centrality.me/public' ],
      faucets: [ 'https://app-faucet.centrality.me' ],
      nativeCurrency: { name: 'CPAY', symbol: 'CPAY', decimals: 18 },
      infoURL: 'https://cennz.net',
      shortName: 'cennz-r',
      chainId: 3000,
      networkId: 3000,
      icon: 'cennz'
    },
    {
      name: 'CENNZnet Nikau',
      chain: 'CENNZnet',
      network: 'nikau',
      rpc: [ 'https://nikau.centrality.me/public' ],
      faucets: [ 'https://app-faucet.centrality.me' ],
      nativeCurrency: { name: 'CPAY', symbol: 'CPAY', decimals: 18 },
      infoURL: 'https://cennz.net',
      shortName: 'cennz-n',
      chainId: 3001,
      networkId: 3001,
      icon: 'cennz',
      explorers: [
        {
          name: 'UNcover',
          url: 'https://www.uncoverexplorer.com/?network=Nikau',
          standard: 'none'
        }
      ]
    },
    {
      name: 'ZCore Testnet',
      chain: 'Beach',
      icon: 'zcore',
      rpc: [ 'https://rpc-testnet.zcore.cash' ],
      faucets: [ 'https://faucet.zcore.cash' ],
      nativeCurrency: { name: 'ZCore', symbol: 'ZCR', decimals: 18 },
      infoURL: 'https://zcore.cash',
      shortName: 'zcrbeach',
      chainId: 3331,
      networkId: 3331
    },
    {
      name: 'Web3Q Testnet',
      chain: 'Web3Q',
      rpc: [ 'https://testnet.web3q.io:8545' ],
      faucets: [],
      nativeCurrency: { name: 'Web3Q', symbol: 'W3Q', decimals: 18 },
      infoURL: 'https://testnet.web3q.io/home.w3q/',
      shortName: 'w3q-t',
      chainId: 3333,
      networkId: 3333,
      explorers: [
        {
          name: 'w3q-testnet',
          url: 'https://explorer.testnet.web3q.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Web3Q Galileo',
      chain: 'Web3Q',
      rpc: [ 'https://galileo.web3q.io:8545' ],
      faucets: [],
      nativeCurrency: { name: 'Web3Q', symbol: 'W3Q', decimals: 18 },
      infoURL: 'https://galileo.web3q.io/home.w3q/',
      shortName: 'w3q-g',
      chainId: 3334,
      networkId: 3334,
      explorers: [
        {
          name: 'w3q-galileo',
          url: 'https://explorer.galileo.web3q.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Paribu Net Mainnet',
      chain: 'PRB',
      network: 'Paribu Net',
      rpc: [ 'https://rpc.paribu.network' ],
      faucets: [],
      nativeCurrency: { name: 'PRB', symbol: 'PRB', decimals: 18 },
      infoURL: 'https://net.paribu.com',
      shortName: 'prb',
      chainId: 3400,
      networkId: 3400,
      icon: 'prb',
      explorers: [
        {
          name: 'Paribu Net Explorer',
          url: 'https://explorer.paribu.network',
          icon: 'explorer',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Paribu Net Testnet',
      chain: 'PRB',
      network: 'Paribu Net',
      rpc: [ 'https://rpc.testnet.paribuscan.com' ],
      faucets: [ 'https://faucet.paribuscan.com' ],
      nativeCurrency: { name: 'PRB', symbol: 'PRB', decimals: 18 },
      infoURL: 'https://net.paribu.com',
      shortName: 'prbtestnet',
      chainId: 3500,
      networkId: 3500,
      icon: 'prb',
      explorers: [
        {
          name: 'Paribu Net Testnet Explorer',
          url: 'https://testnet.paribuscan.com',
          icon: 'explorer',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Bittex Mainnet',
      chain: 'BTX',
      rpc: [ 'https://rpc1.bittexscan.info', 'https://rpc2.bittexscan.info' ],
      faucets: [],
      nativeCurrency: { name: 'Bittex', symbol: 'BTX', decimals: 18 },
      infoURL: 'https://bittexscan.com',
      shortName: 'btx',
      chainId: 3690,
      networkId: 3690,
      icon: 'ethereum',
      explorers: [
        {
          name: 'bittexscan',
          url: 'https://bittexscan.com',
          icon: 'etherscan',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Crossbell',
      chain: 'Crossbell',
      network: 'mainnet',
      rpc: [ 'https://rpc.crossbell.io' ],
      faucets: [ 'https://faucet.crossbell.io' ],
      nativeCurrency: { name: 'Crossbell Token', symbol: 'CSB', decimals: 18 },
      infoURL: 'https://crossbell.io',
      shortName: 'csb',
      chainId: 3737,
      networkId: 3737,
      icon: 'crossbell',
      explorers: [
        {
          name: 'Crossbell Explorer',
          url: 'https://scan.crossbell.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'DYNO Mainnet',
      chain: 'DYNO',
      rpc: [ 'https://api.dynoprotocol.com' ],
      faucets: [ 'https://faucet.dynoscan.io' ],
      nativeCurrency: { name: 'DYNO Token', symbol: 'DYNO', decimals: 18 },
      infoURL: 'https://dynoprotocol.com',
      shortName: 'dyno',
      chainId: 3966,
      networkId: 3966,
      explorers: [
        {
          name: 'DYNO Explorer',
          url: 'https://dynoscan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'DYNO Testnet',
      chain: 'DYNO',
      rpc: [ 'https://tapi.dynoprotocol.com' ],
      faucets: [ 'https://faucet.dynoscan.io' ],
      nativeCurrency: { name: 'DYNO Token', symbol: 'tDYNO', decimals: 18 },
      infoURL: 'https://dynoprotocol.com',
      shortName: 'tdyno',
      chainId: 3967,
      networkId: 3967,
      explorers: [
        {
          name: 'DYNO Explorer',
          url: 'https://testnet.dynoscan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'YuanChain Mainnet',
      chain: 'YCC',
      network: 'mainnet',
      rpc: [ 'https://mainnet.yuan.org/eth' ],
      faucets: [],
      nativeCurrency: { name: 'YCC', symbol: 'YCC', decimals: 18 },
      infoURL: 'https://www.yuan.org',
      shortName: 'ycc',
      chainId: 3999,
      networkId: 3999,
      icon: 'ycc',
      explorers: [
        {
          name: 'YuanChain Explorer',
          url: 'https://mainnet.yuan.org',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Fantom Testnet',
      chain: 'FTM',
      rpc: [ 'https://rpc.testnet.fantom.network' ],
      faucets: [ 'https://faucet.fantom.network' ],
      nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
      infoURL: 'https://docs.fantom.foundation/quick-start/short-guide#fantom-testnet',
      shortName: 'tftm',
      chainId: 4002,
      networkId: 4002,
      icon: 'fantom',
      explorers: [
        {
          name: 'ftmscan',
          url: 'https://testnet.ftmscan.com',
          icon: 'ftmscan',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'AIOZ Network Testnet',
      chain: 'AIOZ',
      network: 'testnet',
      icon: 'aioz',
      rpc: [ 'https://eth-ds.testnet.aioz.network' ],
      faucets: [],
      nativeCurrency: { name: 'testAIOZ', symbol: 'AIOZ', decimals: 18 },
      infoURL: 'https://aioz.network',
      shortName: 'aioz-testnet',
      chainId: 4102,
      networkId: 4102,
      slip44: 60,
      explorers: [
        {
          name: 'AIOZ Network Testnet Explorer',
          url: 'https://testnet.explorer.aioz.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'PHI Network',
      chain: 'PHI',
      network: 'mainnet',
      rpc: [ 'https://rpc1.phi.network', 'https://rpc2.phi.network' ],
      faucets: [],
      nativeCurrency: { name: 'PHI', symbol: 'Φ', decimals: 18 },
      infoURL: 'https://phi.network',
      shortName: 'PHI',
      chainId: 4181,
      networkId: 4181,
      icon: 'phi',
      explorers: [
        {
          name: 'PHI Explorer',
          url: 'https://explorer.phi.network',
          icon: 'phi',
          standard: 'none'
        }
      ]
    },
    {
      name: 'IoTeX Network Mainnet',
      chain: 'iotex.io',
      rpc: [ 'https://babel-api.mainnet.iotex.io' ],
      faucets: [],
      nativeCurrency: { name: 'IoTeX', symbol: 'IOTX', decimals: 18 },
      infoURL: 'https://iotex.io',
      shortName: 'iotex-mainnet',
      chainId: 4689,
      networkId: 4689,
      explorers: [
        {
          name: 'iotexscan',
          url: 'https://iotexscan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'IoTeX Network Testnet',
      chain: 'iotex.io',
      rpc: [ 'https://babel-api.testnet.iotex.io' ],
      faucets: [ 'https://faucet.iotex.io/' ],
      nativeCurrency: { name: 'IoTeX', symbol: 'IOTX', decimals: 18 },
      infoURL: 'https://iotex.io',
      shortName: 'iotex-testnet',
      chainId: 4690,
      networkId: 4690,
      explorers: [
        {
          name: 'testnet iotexscan',
          url: 'https://testnet.iotexscan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Venidium Testnet',
      chain: 'XVM',
      rpc: [ 'https://rpc-evm-testnet.venidium.io' ],
      faucets: [],
      nativeCurrency: { name: 'Venidium', symbol: 'XVM', decimals: 18 },
      infoURL: 'https://venidium.io',
      shortName: 'txvm',
      chainId: 4918,
      networkId: 4918,
      explorers: [
        {
          name: 'Venidium EVM Testnet Explorer',
          url: 'https://evm-testnet.venidiumexplorer.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Venidium Mainnet',
      chain: 'XVM',
      icon: 'venidium',
      rpc: [ 'https://rpc.venidium.io' ],
      faucets: [],
      nativeCurrency: { name: 'Venidium', symbol: 'XVM', decimals: 18 },
      infoURL: 'https://venidium.io',
      shortName: 'xvm',
      chainId: 4919,
      networkId: 4919,
      explorers: [
        {
          name: 'Venidium Explorer',
          url: 'https://evm.venidiumexplorer.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'TLChain Network Mainnet',
      chain: 'TLC',
      icon: 'tlc',
      rpc: [ 'https://mainnet-rpc.tlxscan.com/' ],
      faucets: [],
      nativeCurrency: { name: 'TLChain Network', symbol: 'TLC', decimals: 18 },
      infoURL: 'https://tlchain.network/',
      shortName: 'tlc',
      chainId: 5177,
      networkId: 5177,
      explorers: [
        {
          name: 'TLChain Explorer',
          url: 'https://explorer.tlchain.network',
          standard: 'none'
        }
      ]
    },
    {
      name: 'EraSwap Mainnet',
      chain: 'ESN',
      icon: 'eraswap',
      rpc: [
        'https://mainnet.eraswap.network',
        'https://rpc-mumbai.mainnet.eraswap.network'
      ],
      faucets: [],
      nativeCurrency: { name: 'EraSwap', symbol: 'ES', decimals: 18 },
      infoURL: 'https://eraswap.info/',
      shortName: 'es',
      chainId: 5197,
      networkId: 5197
    },
    {
      name: 'Uzmi Network Mainnet',
      chain: 'UZMI',
      rpc: [ 'https://network.uzmigames.com.br/' ],
      faucets: [],
      nativeCurrency: { name: 'UZMI', symbol: 'UZMI', decimals: 18 },
      infoURL: 'https://uzmigames.com.br/',
      shortName: 'UZMI',
      chainId: 5315,
      networkId: 5315
    },
    {
      name: 'Nahmii Mainnet',
      chain: 'Nahmii',
      network: 'mainnet',
      rpc: [ 'https://l2.nahmii.io' ],
      faucets: [],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://nahmii.io',
      shortName: 'Nahmii',
      chainId: 5551,
      networkId: 5551,
      icon: 'nahmii',
      explorers: [
        {
          name: 'Nahmii mainnet explorer',
          url: 'https://explorer.nahmii.io',
          icon: 'nahmii',
          standard: 'EIP3091'
        }
      ],
      parent: {
        type: 'L2',
        chain: 'eip155-1',
        bridges: [ { url: 'https://bridge.nahmii.io' } ]
      }
    },
    {
      name: 'Nahmii Testnet',
      chain: 'Nahmii',
      network: 'testnet',
      rpc: [ 'https://l2.testnet.nahmii.io' ],
      faucets: [],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://nahmii.io',
      shortName: 'Nahmii testnet',
      chainId: 5553,
      networkId: 5553,
      icon: 'nahmii',
      explorers: [
        {
          name: 'blockscout',
          url: 'https://explorer.testnet.nahmii.io',
          icon: 'nahmii',
          standard: 'EIP3091'
        }
      ],
      parent: {
        type: 'L2',
        chain: 'eip155-3',
        bridges: [ { url: 'https://bridge.nahmii.io' } ]
      }
    },
    {
      name: 'Syscoin Tanenbaum Testnet',
      chain: 'SYS',
      rpc: [ 'https://rpc.tanenbaum.io', 'wss://rpc.tanenbaum.io/wss' ],
      faucets: [ 'https://faucet.tanenbaum.io' ],
      nativeCurrency: { name: 'Testnet Syscoin', symbol: 'tSYS', decimals: 18 },
      infoURL: 'https://syscoin.org',
      shortName: 'tsys',
      chainId: 5700,
      networkId: 5700,
      explorers: [
        {
          name: 'Syscoin Testnet Block Explorer',
          url: 'https://tanenbaum.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Digest Swarm Chain',
      chain: 'DSC',
      icon: 'swarmchain',
      rpc: [ 'https://rpc.digestgroup.ltd' ],
      faucets: [],
      nativeCurrency: { name: 'DigestCoin', symbol: 'DGCC', decimals: 18 },
      infoURL: 'https://digestgroup.ltd',
      shortName: 'dgcc',
      chainId: 5777,
      networkId: 5777,
      explorers: [
        {
          name: 'swarmexplorer',
          url: 'https://explorer.digestgroup.ltd',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Ontology Testnet',
      chain: 'Ontology',
      rpc: [
        'http://polaris1.ont.io:20339',
        'http://polaris2.ont.io:20339',
        'http://polaris3.ont.io:20339',
        'http://polaris4.ont.io:20339',
        'https://polaris1.ont.io:10339',
        'https://polaris2.ont.io:10339',
        'https://polaris3.ont.io:10339',
        'https://polaris4.ont.io:10339'
      ],
      faucets: [ 'https://developer.ont.io/' ],
      nativeCurrency: { name: 'ONG', symbol: 'ONG', decimals: 18 },
      infoURL: 'https://ont.io/',
      shortName: 'Ontology Testnet',
      chainId: 5851,
      networkId: 5851,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer.ont.io/testnet',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Wegochain Rubidium Mainnet',
      chain: 'RBD',
      rpc: [ 'https://proxy.wegochain.io', 'http://wallet.wegochain.io:7764' ],
      faucets: [],
      nativeCurrency: { name: 'Rubid', symbol: 'RBD', decimals: 18 },
      infoURL: 'https://www.wegochain.io',
      shortName: 'rbd',
      chainId: 5869,
      networkId: 5869,
      explorers: [
        {
          name: 'wegoscan2',
          url: 'https://scan2.wegochain.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Pixie Chain Mainnet',
      chain: 'PixieChain',
      rpc: [
        'https://http-mainnet.chain.pixie.xyz',
        'wss://ws-mainnet.chain.pixie.xyz'
      ],
      faucets: [],
      nativeCurrency: { name: 'Pixie Chain Native Token', symbol: 'PIX', decimals: 18 },
      infoURL: 'https://chain.pixie.xyz',
      shortName: 'pixie-chain',
      chainId: 6626,
      networkId: 6626,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://scan.chain.pixie.xyz',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Ella the heart',
      chain: 'ella',
      icon: 'ella',
      rpc: [ 'https://rpc.ella.network' ],
      faucets: [],
      nativeCurrency: { name: 'Ella', symbol: 'ELLA', decimals: 18 },
      infoURL: 'https://ella.network',
      shortName: 'ELLA',
      chainId: 7027,
      networkId: 7027,
      explorers: [
        {
          name: 'Ella',
          url: 'https://ella.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Shyft Mainnet',
      chain: 'SHYFT',
      icon: 'shyft',
      rpc: [ 'https://rpc.shyft.network/' ],
      faucets: [],
      nativeCurrency: { name: 'Shyft', symbol: 'SHYFT', decimals: 18 },
      infoURL: 'https://shyft.network',
      shortName: 'shyft',
      chainId: 7341,
      networkId: 7341,
      slip44: 2147490989,
      explorers: [
        {
          name: 'Shyft BX',
          url: 'https://bx.shyft.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Rise of the Warbots Testnet',
      chain: 'nmactest',
      rpc: [
        'https://testnet1.riseofthewarbots.com',
        'https://testnet2.riseofthewarbots.com',
        'https://testnet3.riseofthewarbots.com',
        'https://testnet4.riseofthewarbots.com',
        'https://testnet5.riseofthewarbots.com'
      ],
      faucets: [],
      nativeCurrency: { name: 'Nano Machines', symbol: 'NMAC', decimals: 18 },
      infoURL: 'https://riseofthewarbots.com/',
      shortName: 'Rise of the Warbots Testnet',
      chainId: 7777,
      networkId: 7777,
      explorers: [
        {
          name: 'avascan',
          url: 'https://testnet.avascan.info/blockchain/2mZ9doojfwHzXN3VXDQELKnKyZYxv7833U8Yq5eTfFx3hxJtiy',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Hazlor Testnet',
      chain: 'SCAS',
      rpc: [
        'https://hatlas.rpc.hazlor.com:8545',
        'wss://hatlas.rpc.hazlor.com:8546'
      ],
      faucets: [ 'https://faucet.hazlor.com' ],
      nativeCurrency: { name: 'Hazlor Test Coin', symbol: 'TSCAS', decimals: 18 },
      infoURL: 'https://hazlor.com',
      shortName: 'tscas',
      chainId: 7878,
      networkId: 7878,
      explorers: [
        {
          name: 'Hazlor Testnet Explorer',
          url: 'https://explorer.hazlor.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Teleport',
      chain: 'Teleport',
      rpc: [ 'https://evm-rpc.teleport.network' ],
      faucets: [],
      nativeCurrency: { name: 'Tele', symbol: 'TELE', decimals: 18 },
      infoURL: 'https://teleport.network',
      shortName: 'teleport',
      chainId: 8000,
      networkId: 8000,
      icon: 'teleport',
      explorers: [
        {
          name: 'Teleport EVM Explorer (Blockscout)',
          url: 'https://evm-explorer.teleport.network',
          standard: 'none',
          icon: 'teleport'
        },
        {
          name: 'Teleport Cosmos Explorer (Big Dipper)',
          url: 'https://explorer.teleport.network',
          standard: 'none',
          icon: 'teleport'
        }
      ]
    },
    {
      name: 'Teleport Testnet',
      chain: 'Teleport',
      rpc: [ 'https://evm-rpc.testnet.teleport.network' ],
      faucets: [ 'https://chain-docs.teleport.network/testnet/faucet.html' ],
      nativeCurrency: { name: 'Tele', symbol: 'TELE', decimals: 18 },
      infoURL: 'https://teleport.network',
      shortName: 'teleport-testnet',
      chainId: 8001,
      networkId: 8001,
      icon: 'teleport',
      explorers: [
        {
          name: 'Teleport EVM Explorer (Blockscout)',
          url: 'https://evm-explorer.testnet.teleport.network',
          standard: 'none',
          icon: 'teleport'
        },
        {
          name: 'Teleport Cosmos Explorer (Big Dipper)',
          url: 'https://explorer.testnet.teleport.network',
          standard: 'none',
          icon: 'teleport'
        }
      ]
    },
    {
      name: 'MDGL Testnet',
      chain: 'MDGL',
      rpc: [ 'https://testnet.mdgl.io' ],
      faucets: [],
      nativeCurrency: { name: 'MDGL Token', symbol: 'MDGLT', decimals: 18 },
      infoURL: 'https://mdgl.io',
      shortName: 'mdgl',
      chainId: 8029,
      networkId: 8029
    },
    {
      name: 'GeneChain Adenine Testnet',
      chain: 'GeneChain',
      rpc: [ 'https://rpc-testnet.genechain.io' ],
      faucets: [ 'https://faucet.genechain.io' ],
      nativeCurrency: { name: 'Testnet RNA', symbol: 'tRNA', decimals: 18 },
      infoURL: 'https://scan-testnet.genechain.io/',
      shortName: 'GeneChainAdn',
      chainId: 8080,
      networkId: 8080,
      explorers: [
        {
          name: 'GeneChain Adenine Testnet Scan',
          url: 'https://scan-testnet.genechain.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Klaytn Mainnet Cypress',
      chain: 'KLAY',
      rpc: [ 'https://public-node-api.klaytnapi.com/v1/cypress' ],
      faucets: [],
      nativeCurrency: { name: 'KLAY', symbol: 'KLAY', decimals: 18 },
      infoURL: 'https://www.klaytn.com/',
      shortName: 'Cypress',
      chainId: 8217,
      networkId: 8217,
      slip44: 8217,
      explorers: [
        {
          name: 'Klaytnscope',
          url: 'https://scope.klaytn.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'KorthoTest',
      chain: 'Kortho',
      rpc: [ 'https://www.krotho-test.net' ],
      faucets: [],
      nativeCurrency: { name: 'Kortho Test', symbol: 'KTO', decimals: 11 },
      infoURL: 'https://www.kortho.io/',
      shortName: 'Kortho',
      chainId: 8285,
      networkId: 8285
    },
    {
      name: 'TOOL Global Mainnet',
      chain: 'OLO',
      rpc: [ 'https://mainnet-web3.wolot.io' ],
      faucets: [],
      nativeCurrency: { name: 'TOOL Global', symbol: 'OLO', decimals: 18 },
      infoURL: 'https://ibdt.io',
      shortName: 'olo',
      chainId: 8723,
      networkId: 8723,
      slip44: 479,
      explorers: [
        {
          name: 'OLO Block Explorer',
          url: 'https://www.olo.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'TOOL Global Testnet',
      chain: 'OLO',
      rpc: [ 'https://testnet-web3.wolot.io' ],
      faucets: [ 'https://testnet-explorer.wolot.io' ],
      nativeCurrency: { name: 'TOOL Global', symbol: 'OLO', decimals: 18 },
      infoURL: 'https://testnet-explorer.wolot.io',
      shortName: 'tolo',
      chainId: 8724,
      networkId: 8724,
      slip44: 479
    },
    {
      name: 'Ambros Chain Testnet',
      chain: 'ambroschain',
      rpc: [ 'https://api.testnet.ambros.network' ],
      faucets: [],
      nativeCurrency: { name: 'AMBROS', symbol: 'AMBROS', decimals: 18 },
      infoURL: 'https://test.ambros.network',
      shortName: 'ambrostestnet',
      chainId: 8888,
      networkId: 8888,
      explorers: [
        {
          name: 'Ambros Chain Explorer',
          url: 'https://testnet.ambrosscan.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Mammoth Mainnet',
      title: 'Mammoth Chain',
      chain: 'MMT',
      rpc: [
        'https://dataseed.mmtscan.io',
        'https://dataseed1.mmtscan.io',
        'https://dataseed2.mmtscan.io'
      ],
      faucets: [ 'https://faucet.mmtscan.io/' ],
      nativeCurrency: { name: 'Mammoth Token', symbol: 'MMT', decimals: 18 },
      infoURL: 'https://mmtchain.io/',
      shortName: 'mmt',
      chainId: 8898,
      networkId: 8898,
      icon: 'mmt',
      explorers: [
        {
          name: 'mmtscan',
          url: 'https://mmtscan.io',
          standard: 'EIP3091',
          icon: 'mmt'
        }
      ]
    },
    {
      name: 'bloxberg',
      chain: 'bloxberg',
      rpc: [ 'https://core.bloxberg.org' ],
      faucets: [ 'https://faucet.bloxberg.org/' ],
      nativeCurrency: { name: 'BERG', symbol: 'U+25B3', decimals: 18 },
      infoURL: 'https://bloxberg.org',
      shortName: 'berg',
      chainId: 8995,
      networkId: 8995
    },
    {
      name: 'Evmos Testnet',
      chain: 'Evmos',
      rpc: [ 'https://eth.bd.evmos.dev:8545' ],
      faucets: [ 'https://faucet.evmos.dev' ],
      nativeCurrency: { name: 'test-Evmos', symbol: 'tEVMOS', decimals: 18 },
      infoURL: 'https://evmos.org',
      shortName: 'evmos-testnet',
      chainId: 9000,
      networkId: 9000,
      icon: 'evmos',
      explorers: [
        {
          name: 'Evmos EVM Explorer',
          url: 'https://evm.evmos.dev',
          standard: 'EIP3091',
          icon: 'evmos'
        },
        {
          name: 'Evmos Cosmos Explorer',
          url: 'https://explorer.evmos.dev',
          standard: 'none',
          icon: 'evmos'
        }
      ]
    },
    {
      name: 'Evmos',
      chain: 'Evmos',
      rpc: [ 'https://eth.bd.evmos.org:8545' ],
      faucets: [],
      nativeCurrency: { name: 'Evmos', symbol: 'EVMOS', decimals: 18 },
      infoURL: 'https://evmos.org',
      shortName: 'evmos',
      chainId: 9001,
      networkId: 9001,
      icon: 'evmos',
      explorers: [
        {
          name: 'Evmos EVM Explorer (Blockscout)',
          url: 'https://evm.evmos.org',
          standard: 'none',
          icon: 'evmos'
        },
        {
          name: 'Evmos Cosmos Explorer (Mintscan)',
          url: 'https://www.mintscan.io/evmos',
          standard: 'none',
          icon: 'evmos'
        }
      ]
    },
    {
      name: 'Genesis Coin',
      chain: 'Genesis',
      rpc: [ 'https://genesis-gn.com', 'wss://genesis-gn.com' ],
      faucets: [],
      nativeCurrency: { name: 'GN Coin', symbol: 'GNC', decimals: 18 },
      infoURL: 'https://genesis-gn.com',
      shortName: 'GENEC',
      chainId: 9100,
      networkId: 9100
    },
    {
      name: 'Rangers Protocol Testnet Robin',
      chain: 'Rangers',
      icon: 'rangers',
      rpc: [ 'https://robin.rangersprotocol.com/api/jsonrpc' ],
      faucets: [ 'https://robin-faucet.rangersprotocol.com' ],
      nativeCurrency: { name: 'Rangers Protocol Gas', symbol: 'tRPG', decimals: 18 },
      infoURL: 'https://rangersprotocol.com',
      shortName: 'trpg',
      chainId: 9527,
      networkId: 9527,
      explorers: [
        {
          name: 'rangersscan-robin',
          url: 'https://robin-rangersscan.rangersprotocol.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'myOwn Testnet',
      chain: 'myOwn',
      rpc: [ 'https://geth.dev.bccloud.net' ],
      faucets: [],
      nativeCurrency: { name: 'MYN', symbol: 'MYN', decimals: 18 },
      infoURL: 'https://docs.bccloud.net/',
      shortName: 'myn',
      chainId: 9999,
      networkId: 9999
    },
    {
      name: 'Smart Bitcoin Cash',
      chain: 'smartBCH',
      rpc: [
        'https://smartbch.greyh.at',
        'https://rpc-mainnet.smartbch.org',
        'https://smartbch.fountainhead.cash/mainnet',
        'https://smartbch.devops.cash/mainnet'
      ],
      faucets: [],
      nativeCurrency: { name: 'Bitcoin Cash', symbol: 'BCH', decimals: 18 },
      infoURL: 'https://smartbch.org/',
      shortName: 'smartbch',
      chainId: 10000,
      networkId: 10000
    },
    {
      name: 'Smart Bitcoin Cash Testnet',
      chain: 'smartBCHTest',
      rpc: [
        'https://rpc-testnet.smartbch.org',
        'https://smartbch.devops.cash/testnet'
      ],
      faucets: [],
      nativeCurrency: { name: 'Bitcoin Cash Test Token', symbol: 'BCHT', decimals: 18 },
      infoURL: 'http://smartbch.org/',
      shortName: 'smartbchtest',
      chainId: 10001,
      networkId: 10001
    },
    {
      name: 'Blockchain Genesis Mainnet',
      chain: 'GEN',
      rpc: [
        'https://eu.mainnet.xixoio.com',
        'https://us.mainnet.xixoio.com',
        'https://asia.mainnet.xixoio.com'
      ],
      faucets: [],
      nativeCurrency: { name: 'GEN', symbol: 'GEN', decimals: 18 },
      infoURL: 'https://www.xixoio.com/',
      shortName: 'GEN',
      chainId: 10101,
      networkId: 10101
    },
    {
      name: 'CryptoCoinPay',
      chain: 'CCP',
      rpc: [
        'http://node106.cryptocoinpay.info:8545',
        'ws://node106.cryptocoinpay.info:8546'
      ],
      faucets: [],
      icon: 'ccp',
      nativeCurrency: { name: 'CryptoCoinPay', symbol: 'CCP', decimals: 18 },
      infoURL: 'https://www.cryptocoinpay.co',
      shortName: 'CCP',
      chainId: 10823,
      networkId: 10823,
      explorers: [
        {
          name: 'CCP Explorer',
          url: 'https://cryptocoinpay.info',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Quadrans Blockchain',
      chain: 'QDC',
      network: 'mainnet',
      icon: 'quadrans',
      rpc: [
        'https://rpc.quadrans.io',
        'https://rpcna.quadrans.io',
        'https://rpceu.quadrans.io'
      ],
      faucets: [],
      nativeCurrency: { name: 'Quadrans Coin', symbol: 'QDC', decimals: 18 },
      infoURL: 'https://quadrans.io',
      shortName: 'quadrans',
      chainId: 10946,
      networkId: 10946,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer.quadrans.io',
          icon: 'quadrans',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Quadrans Blockchain Testnet',
      chain: 'tQDC',
      network: 'testnet',
      icon: 'quadrans',
      rpc: [ 'https://rpctest.quadrans.io', 'https://rpctest2.quadrans.io' ],
      faucets: [ 'https://faucetpage.quadrans.io' ],
      nativeCurrency: { name: 'Quadrans Testnet Coin', symbol: 'tQDC', decimals: 18 },
      infoURL: 'https://quadrans.io',
      shortName: 'quadranstestnet',
      chainId: 10947,
      networkId: 10947,
      explorers: [
        {
          name: 'explorer',
          url: 'https://explorer.testnet.quadrans.io',
          icon: 'quadrans',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'WAGMI',
      chain: 'WAGMI',
      icon: 'wagmi',
      rpc: [ 'https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc' ],
      faucets: [ 'https://faucet.trywagmi.xyz' ],
      nativeCurrency: { name: 'WAGMI', symbol: 'WGM', decimals: 18 },
      infoURL: 'https://trywagmi.xyz',
      shortName: 'WAGMI',
      chainId: 11111,
      networkId: 11111,
      explorers: [
        {
          name: 'WAGMI Explorer',
          url: 'https://subnets.avax.network/wagmi/wagmi-chain-testnet/explorer',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Shyft Testnet',
      chain: 'SHYFTT',
      icon: 'shyft',
      rpc: [ 'https://rpc.testnet.shyft.network/' ],
      faucets: [],
      nativeCurrency: { name: 'Shyft Test Token', symbol: 'SHYFTT', decimals: 18 },
      infoURL: 'https://shyft.network',
      shortName: 'shyftt',
      chainId: 11437,
      networkId: 11437,
      explorers: [
        {
          name: 'Shyft Testnet BX',
          url: 'https://bx.testnet.shyft.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Singularity ZERO Testnet',
      chain: 'ZERO',
      rpc: [ 'https://betaenv.singularity.gold:18545' ],
      faucets: [ 'https://nft.singularity.gold' ],
      nativeCurrency: { name: 'ZERO', symbol: 'tZERO', decimals: 18 },
      infoURL: 'https://www.singularity.gold',
      shortName: 'tZERO',
      chainId: 12051,
      networkId: 12051,
      explorers: [
        {
          name: 'zeroscan',
          url: 'https://betaenv.singularity.gold:18002',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Singularity ZERO Mainnet',
      chain: 'ZERO',
      rpc: [ 'https://zerorpc.singularity.gold' ],
      faucets: [ 'https://zeroscan.singularity.gold' ],
      nativeCurrency: { name: 'ZERO', symbol: 'ZERO', decimals: 18 },
      infoURL: 'https://www.singularity.gold',
      shortName: 'ZERO',
      chainId: 12052,
      networkId: 12052,
      slip44: 621,
      explorers: [
        {
          name: 'zeroscan',
          url: 'https://zeroscan.singularity.gold',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Phoenix Mainnet',
      chain: 'Phoenix',
      network: 'mainnet',
      rpc: [ 'https://rpc.phoenixplorer.com/' ],
      faucets: [],
      nativeCurrency: { name: 'Phoenix', symbol: 'PHX', decimals: 18 },
      infoURL: 'https://cryptophoenix.org/phoenix',
      shortName: 'Phoenix',
      chainId: 13381,
      networkId: 13381,
      icon: 'phoenix',
      explorers: [
        {
          name: 'phoenixplorer',
          url: 'https://phoenixplorer.com',
          icon: 'phoenixplorer',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'MetaDot Mainnet',
      chain: 'MTT',
      rpc: [ 'https://mainnet.metadot.network' ],
      faucets: [],
      nativeCurrency: { name: 'MetaDot Token', symbol: 'MTT', decimals: 18 },
      infoURL: 'https://metadot.network',
      shortName: 'mtt',
      chainId: 16000,
      networkId: 16000
    },
    {
      name: 'MetaDot Testnet',
      chain: 'MTTTest',
      rpc: [ 'https://testnet.metadot.network' ],
      faucets: [ 'https://faucet.metadot.network/' ],
      nativeCurrency: { name: 'MetaDot Token TestNet', symbol: 'MTTest', decimals: 18 },
      infoURL: 'https://metadot.network',
      shortName: 'mtttest',
      chainId: 16001,
      networkId: 16001
    },
    {
      name: 'IVAR Chain Testnet',
      chain: 'IVAR',
      icon: 'ivar',
      rpc: [ 'https://testnet-rpc.ivarex.com' ],
      faucets: [ 'https://tfaucet.ivarex.com/' ],
      nativeCurrency: { name: 'tIvar', symbol: 'tIVAR', decimals: 18 },
      infoURL: 'https://ivarex.com',
      shortName: 'tivar',
      chainId: 16888,
      networkId: 16888,
      explorers: [
        {
          name: 'ivarscan',
          url: 'https://testnet.ivarscan.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'BTCIX Network',
      chain: 'BTCIX',
      rpc: [ 'https://seed.btcix.org/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'BTCIX Network', symbol: 'BTCIX', decimals: 18 },
      infoURL: 'https://bitcolojix.org',
      shortName: 'btcix',
      chainId: 19845,
      networkId: 19845,
      explorers: [
        {
          name: 'BTCIXScan',
          url: 'https://btcixscan.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'CENNZnet Azalea',
      chain: 'CENNZnet',
      network: 'azalea',
      rpc: [ 'https://cennznet.unfrastructure.io/public' ],
      faucets: [],
      nativeCurrency: { name: 'CPAY', symbol: 'CPAY', decimals: 18 },
      infoURL: 'https://cennz.net',
      shortName: 'cennz-a',
      chainId: 21337,
      networkId: 21337,
      icon: 'cennz',
      explorers: [
        {
          name: 'UNcover',
          url: 'https://uncoverexplorer.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'omChain Mainnet',
      chain: 'OML',
      icon: 'omlira',
      rpc: [ 'https://seed.omchain.io' ],
      faucets: [],
      nativeCurrency: { name: 'omChain', symbol: 'OMC', decimals: 18 },
      infoURL: 'https://omchain.io',
      shortName: 'omc',
      chainId: 21816,
      networkId: 21816,
      explorers: [
        {
          name: 'omChain Explorer',
          url: 'https://explorer.omchain.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Taycan',
      chain: 'Taycan',
      network: 'mainnet',
      rpc: [ 'https://taycan-rpc.hupayx.io:8545' ],
      faucets: [],
      nativeCurrency: { name: 'shuffle', symbol: 'SFL', decimals: 18 },
      infoURL: 'https://hupayx.io',
      shortName: 'SFL',
      chainId: 22023,
      networkId: 22023,
      explorers: [
        {
          name: 'Taycan Explorer(Blockscout)',
          url: 'https://taycan-evmscan.hupayx.io',
          standard: 'none'
        },
        {
          name: 'Taycan Cosmos Explorer(BigDipper)',
          url: 'https://taycan-cosmoscan.hupayx.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Webchain',
      chain: 'WEB',
      rpc: [ 'https://node1.webchain.network' ],
      faucets: [],
      nativeCurrency: { name: 'Webchain Ether', symbol: 'WEB', decimals: 18 },
      infoURL: 'https://webchain.network',
      shortName: 'web',
      chainId: 24484,
      networkId: 37129,
      slip44: 227
    },
    {
      name: 'MintMe.com Coin',
      chain: 'MINTME',
      rpc: [ 'https://node1.mintme.com' ],
      faucets: [],
      nativeCurrency: { name: 'MintMe.com Coin', symbol: 'MINTME', decimals: 18 },
      infoURL: 'https://www.mintme.com',
      shortName: 'mintme',
      chainId: 24734,
      networkId: 37480
    },
    {
      name: 'OasisChain Mainnet',
      chain: 'OasisChain',
      rpc: [
        'https://rpc1.oasischain.io',
        'https://rpc2.oasischain.io',
        'https://rpc3.oasischain.io'
      ],
      faucets: [ 'http://faucet.oasischain.io' ],
      nativeCurrency: { name: 'OAC', symbol: 'OAC', decimals: 18 },
      infoURL: 'https://scan.oasischain.io',
      shortName: 'OAC',
      chainId: 26863,
      networkId: 26863,
      explorers: [
        {
          name: 'OasisChain Explorer',
          url: 'https://scan.oasischain.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Piece testnet',
      chain: 'PieceNetwork',
      icon: 'piecechain',
      rpc: [ 'https://testnet-rpc0.piecenetwork.com' ],
      faucets: [ 'https://piecenetwork.com/faucet' ],
      nativeCurrency: { name: 'ECE', symbol: 'ECE', decimals: 18 },
      infoURL: 'https://piecenetwork.com',
      shortName: 'Piece',
      chainId: 30067,
      networkId: 30067,
      explorers: [
        {
          name: 'Piece Scan',
          url: 'https://testnet-scan.piecenetwork.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Ethersocial Network',
      chain: 'ESN',
      rpc: [ 'https://api.esn.gonspool.com' ],
      faucets: [],
      nativeCurrency: { name: 'Ethersocial Network Ether', symbol: 'ESN', decimals: 18 },
      infoURL: 'https://ethersocial.org',
      shortName: 'esn',
      chainId: 31102,
      networkId: 1,
      slip44: 31102
    },
    {
      name: 'GoChain Testnet',
      chain: 'GO',
      rpc: [ 'https://testnet-rpc.gochain.io' ],
      faucets: [],
      nativeCurrency: { name: 'GoChain Coin', symbol: 'GO', decimals: 18 },
      infoURL: 'https://gochain.io',
      shortName: 'got',
      chainId: 31337,
      networkId: 31337,
      slip44: 6060,
      explorers: [
        {
          name: 'GoChain Testnet Explorer',
          url: 'https://testnet-explorer.gochain.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Bitgert Mainnet',
      chain: 'Brise',
      rpc: [
        'https://mainnet-rpc.brisescan.com',
        'https://chainrpc.com',
        'https://serverrpc.com'
      ],
      faucets: [],
      nativeCurrency: { name: 'Bitrise Token', symbol: 'Brise', decimals: 18 },
      infoURL: 'https://bitgert.com/',
      shortName: 'Brise',
      chainId: 32520,
      networkId: 32520,
      icon: 'brise',
      explorers: [
        {
          name: 'Brise Scan',
          url: 'https://brisescan.com',
          icon: 'brise',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Fusion Mainnet',
      chain: 'FSN',
      rpc: [ 'https://mainnet.anyswap.exchange', 'https://fsn.dev/api' ],
      faucets: [],
      nativeCurrency: { name: 'Fusion', symbol: 'FSN', decimals: 18 },
      infoURL: 'https://www.fusion.org/',
      shortName: 'fsn',
      chainId: 32659,
      networkId: 32659
    },
    {
      name: 'Energi Mainnet',
      chain: 'NRG',
      rpc: [ 'https://nodeapi.energi.network' ],
      faucets: [],
      nativeCurrency: { name: 'Energi', symbol: 'NRG', decimals: 18 },
      infoURL: 'https://www.energi.world/',
      shortName: 'nrg',
      chainId: 39797,
      networkId: 39797,
      slip44: 39797
    },
    {
      name: 'pegglecoin',
      chain: '42069',
      rpc: [],
      faucets: [],
      nativeCurrency: { name: 'pegglecoin', symbol: 'peggle', decimals: 18 },
      infoURL: 'https://teampeggle.com',
      shortName: 'PC',
      chainId: 42069,
      networkId: 42069
    },
    {
      name: 'Arbitrum One',
      chainId: 42161,
      shortName: 'arb1',
      chain: 'ETH',
      networkId: 42161,
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpc: [
        'https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}',
        'https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
        'https://arb1.arbitrum.io/rpc'
      ],
      faucets: [],
      explorers: [
        {
          name: 'Arbiscan',
          url: 'https://arbiscan.io',
          standard: 'EIP3091'
        },
        {
          name: 'Arbitrum Explorer',
          url: 'https://explorer.arbitrum.io',
          standard: 'EIP3091'
        }
      ],
      infoURL: 'https://arbitrum.io',
      parent: {
        type: 'L2',
        chain: 'eip155-1',
        bridges: [ { url: 'https://bridge.arbitrum.io' } ]
      }
    },
    {
      name: 'Celo Mainnet',
      chainId: 42220,
      shortName: 'CELO',
      chain: 'CELO',
      networkId: 42220,
      nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
      rpc: [ 'https://forno.celo.org', 'wss://forno.celo.org/ws' ],
      faucets: [ 'https://free-online-app.com/faucet-for-eth-evm-chains/' ],
      infoURL: 'https://docs.celo.org/',
      explorers: [
        {
          name: 'blockscout',
          url: 'https://explorer.celo.org',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Emerald Paratime Testnet',
      chain: 'Emerald',
      icon: 'oasis',
      rpc: [
        'https://testnet.emerald.oasis.dev/',
        'wss://testnet.emerald.oasis.dev/ws'
      ],
      faucets: [],
      nativeCurrency: { name: 'Emerald Rose', symbol: 'ROSE', decimals: 18 },
      infoURL: 'https://docs.oasis.dev/general/developer-resources/overview',
      shortName: 'emerald',
      chainId: 42261,
      networkId: 42261,
      explorers: [
        {
          name: 'Emerald Paratime Testnet Explorer',
          url: 'https://testnet.explorer.emerald.oasis.dev',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Emerald Paratime Mainnet',
      chain: 'Emerald',
      icon: 'oasis',
      rpc: [ 'https://emerald.oasis.dev', 'wss://emerald.oasis.dev/ws' ],
      faucets: [],
      nativeCurrency: { name: 'Emerald Rose', symbol: 'ROSE', decimals: 18 },
      infoURL: 'https://docs.oasis.dev/general/developer-resources/overview',
      shortName: 'oasis',
      chainId: 42262,
      networkId: 42262,
      explorers: [
        {
          name: 'Emerald Paratime Mainnet Explorer',
          url: 'https://explorer.emerald.oasis.dev',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Athereum',
      chain: 'ATH',
      rpc: [ 'https://ava.network:21015/ext/evm/rpc' ],
      faucets: [ 'http://athfaucet.ava.network//?address=${ADDRESS}' ],
      nativeCurrency: { name: 'Athereum Ether', symbol: 'ATH', decimals: 18 },
      infoURL: 'https://athereum.ava.network',
      shortName: 'avaeth',
      chainId: 43110,
      networkId: 43110
    },
    {
      name: 'Avalanche Fuji Testnet',
      chain: 'AVAX',
      rpc: [ 'https://api.avax-test.network/ext/bc/C/rpc' ],
      faucets: [ 'https://faucet.avax-test.network/' ],
      nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
      infoURL: 'https://cchain.explorer.avax-test.network',
      shortName: 'Fuji',
      chainId: 43113,
      networkId: 1,
      explorers: [
        {
          name: 'snowtrace',
          url: 'https://testnet.snowtrace.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Avalanche C-Chain',
      chain: 'AVAX',
      rpc: [ 'https://api.avax.network/ext/bc/C/rpc' ],
      faucets: [ 'https://free-online-app.com/faucet-for-eth-evm-chains/' ],
      nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
      infoURL: 'https://www.avax.network/',
      shortName: 'Avalanche',
      chainId: 43114,
      networkId: 43114,
      slip44: 9005,
      explorers: [
        {
          name: 'snowtrace',
          url: 'https://snowtrace.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Celo Alfajores Testnet',
      chainId: 44787,
      shortName: 'ALFA',
      chain: 'CELO',
      networkId: 44787,
      nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
      rpc: [
        'https://alfajores-forno.celo-testnet.org',
        'wss://alfajores-forno.celo-testnet.org/ws'
      ],
      faucets: [
        'https://celo.org/developers/faucet',
        'https://cauldron.pretoriaresearchlab.io/alfajores-faucet'
      ],
      infoURL: 'https://docs.celo.org/'
    },
    {
      name: 'Autobahn Network',
      chain: 'TXL',
      network: 'mainnet',
      rpc: [ 'https://rpc.autobahn.network' ],
      faucets: [],
      nativeCurrency: { name: 'TXL', symbol: 'TXL', decimals: 18 },
      infoURL: 'https://autobahn.network',
      shortName: 'Autobahn Network',
      chainId: 45000,
      networkId: 45000,
      icon: 'autobahn',
      explorers: [
        {
          name: 'autobahn explorer',
          url: 'https://explorer.autobahn.network',
          icon: 'autobahn',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'REI Network',
      chain: 'REI',
      rpc: [ 'https://rpc.rei.network', 'wss://rpc.rei.network' ],
      faucets: [],
      nativeCurrency: { name: 'REI', symbol: 'REI', decimals: 18 },
      infoURL: 'https://rei.network/',
      shortName: 'REI',
      chainId: 47805,
      networkId: 47805,
      explorers: [
        {
          name: 'rei-scan',
          url: 'https://scan.rei.network',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Energi Testnet',
      chain: 'NRG',
      rpc: [ 'https://nodeapi.test.energi.network' ],
      faucets: [],
      nativeCurrency: { name: 'Energi', symbol: 'NRG', decimals: 18 },
      infoURL: 'https://www.energi.world/',
      shortName: 'tnrg',
      chainId: 49797,
      networkId: 49797,
      slip44: 49797
    },
    {
      name: 'DFK Chain',
      chain: 'DFK',
      icon: 'dfk',
      network: 'mainnet',
      rpc: [ 'https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc' ],
      faucets: [],
      nativeCurrency: { name: 'Jewel', symbol: 'JEWEL', decimals: 18 },
      infoURL: 'https://defikingdoms.com',
      shortName: 'DFK',
      chainId: 53935,
      networkId: 53935,
      explorers: [
        {
          name: 'ethernal',
          url: 'https://explorer.dfkchain.com',
          icon: 'ethereum',
          standard: 'none'
        }
      ]
    },
    {
      name: 'REI Chain Mainnet',
      chain: 'REI',
      icon: 'reichain',
      rpc: [ 'https://rei-rpc.moonrhythm.io' ],
      faucets: [ 'http://kururu.finance/faucet?chainId=55555' ],
      nativeCurrency: { name: 'Rei', symbol: 'REI', decimals: 18 },
      infoURL: 'https://reichain.io',
      shortName: 'rei',
      chainId: 55555,
      networkId: 55555,
      explorers: [
        {
          name: 'reiscan',
          url: 'https://reiscan.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'REI Chain Testnet',
      chain: 'REI',
      icon: 'reichain',
      rpc: [ 'https://rei-testnet-rpc.moonrhythm.io' ],
      faucets: [ 'http://kururu.finance/faucet?chainId=55556' ],
      nativeCurrency: { name: 'tRei', symbol: 'tREI', decimals: 18 },
      infoURL: 'https://reichain.io',
      shortName: 'trei',
      chainId: 55556,
      networkId: 55556,
      explorers: [
        {
          name: 'reiscan',
          url: 'https://testnet.reiscan.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Thinkium Testnet Chain 0',
      chain: 'Thinkium',
      rpc: [ 'https://test.thinkiumrpc.net/' ],
      faucets: [ 'https://www.thinkiumdev.net/faucet' ],
      nativeCurrency: { name: 'TKM', symbol: 'TKM', decimals: 18 },
      infoURL: 'https://thinkium.net/',
      shortName: 'TKM-test0',
      chainId: 60000,
      networkId: 60000,
      explorers: [
        {
          name: 'thinkiumscan',
          url: 'https://test0.thinkiumscan.net',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Thinkium Testnet Chain 1',
      chain: 'Thinkium',
      rpc: [ 'https://test1.thinkiumrpc.net/' ],
      faucets: [ 'https://www.thinkiumdev.net/faucet' ],
      nativeCurrency: { name: 'TKM', symbol: 'TKM', decimals: 18 },
      infoURL: 'https://thinkium.net/',
      shortName: 'TKM-test1',
      chainId: 60001,
      networkId: 60001,
      explorers: [
        {
          name: 'thinkiumscan',
          url: 'https://test1.thinkiumscan.net',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Thinkium Testnet Chain 2',
      chain: 'Thinkium',
      rpc: [ 'https://test2.thinkiumrpc.net/' ],
      faucets: [ 'https://www.thinkiumdev.net/faucet' ],
      nativeCurrency: { name: 'TKM', symbol: 'TKM', decimals: 18 },
      infoURL: 'https://thinkium.net/',
      shortName: 'TKM-test2',
      chainId: 60002,
      networkId: 60002,
      explorers: [
        {
          name: 'thinkiumscan',
          url: 'https://test2.thinkiumscan.net',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Thinkium Testnet Chain 103',
      chain: 'Thinkium',
      rpc: [ 'https://test103.thinkiumrpc.net/' ],
      faucets: [ 'https://www.thinkiumdev.net/faucet' ],
      nativeCurrency: { name: 'TKM', symbol: 'TKM', decimals: 18 },
      infoURL: 'https://thinkium.net/',
      shortName: 'TKM-test103',
      chainId: 60103,
      networkId: 60103,
      explorers: [
        {
          name: 'thinkiumscan',
          url: 'https://test103.thinkiumscan.net',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Celo Baklava Testnet',
      chainId: 62320,
      shortName: 'BKLV',
      chain: 'CELO',
      networkId: 62320,
      nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
      rpc: [ 'https://baklava-forno.celo-testnet.org' ],
      faucets: [
        'https://docs.google.com/forms/d/e/1FAIpQLSdfr1BwUTYepVmmvfVUDRCwALejZ-TUva2YujNpvrEmPAX2pg/viewform',
        'https://cauldron.pretoriaresearchlab.io/baklava-faucet'
      ],
      infoURL: 'https://docs.celo.org/'
    },
    {
      name: 'MultiVAC Mainnet',
      chain: 'MultiVAC',
      icon: 'multivac',
      rpc: [ 'https://rpc.mtv.ac', 'https://rpc-eu.mtv.ac' ],
      faucets: [],
      nativeCurrency: { name: 'MultiVAC', symbol: 'MTV', decimals: 18 },
      infoURL: 'https://mtv.ac',
      shortName: 'mtv',
      chainId: 62621,
      networkId: 62621,
      explorers: [
        {
          name: 'MultiVAC Explorer',
          url: 'https://e.mtv.ac',
          standard: 'none'
        }
      ]
    },
    {
      name: 'eCredits Mainnet',
      chain: 'ECS',
      network: 'mainnet',
      rpc: [ 'https://rpc.ecredits.com' ],
      faucets: [],
      nativeCurrency: { name: 'eCredits', symbol: 'ECS', decimals: 18 },
      infoURL: 'https://ecredits.com',
      shortName: 'ecs',
      chainId: 63000,
      networkId: 63000,
      icon: 'ecredits',
      explorers: [
        {
          name: 'eCredits MainNet Explorer',
          url: 'https://explorer.ecredits.com',
          icon: 'ecredits',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'eCredits Testnet',
      chain: 'ECS',
      network: 'testnet',
      rpc: [ 'https://rpc.tst.ecredits.com' ],
      faucets: [ 'https://faucet.tst.ecredits.com' ],
      nativeCurrency: { name: 'eCredits', symbol: 'ECS', decimals: 18 },
      infoURL: 'https://ecredits.com',
      shortName: 'ecs-testnet',
      chainId: 63001,
      networkId: 63001,
      icon: 'ecredits',
      explorers: [
        {
          name: 'eCredits TestNet Explorer',
          url: 'https://explorer.tst.ecredits.com',
          icon: 'ecredits',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Condrieu',
      title: 'Ethereum Verkle Testnet Condrieu',
      chain: 'ETH',
      rpc: [ 'https://rpc.condrieu.ethdevops.io:8545' ],
      faucets: [ 'https://faucet.condrieu.ethdevops.io' ],
      nativeCurrency: { name: 'Condrieu Testnet Ether', symbol: 'CTE', decimals: 18 },
      infoURL: 'https://condrieu.ethdevops.io',
      shortName: 'cndr',
      chainId: 69420,
      networkId: 69420,
      explorers: [
        {
          name: 'Condrieu explorer',
          url: 'https://explorer.condrieu.ethdevops.io',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Thinkium Mainnet Chain 0',
      chain: 'Thinkium',
      rpc: [ 'https://proxy.thinkiumrpc.net/' ],
      faucets: [],
      nativeCurrency: { name: 'TKM', symbol: 'TKM', decimals: 18 },
      infoURL: 'https://thinkium.net/',
      shortName: 'TKM0',
      chainId: 70000,
      networkId: 70000,
      explorers: [
        {
          name: 'thinkiumscan',
          url: 'https://chain0.thinkiumscan.net',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Thinkium Mainnet Chain 1',
      chain: 'Thinkium',
      rpc: [ 'https://proxy1.thinkiumrpc.net/' ],
      faucets: [],
      nativeCurrency: { name: 'TKM', symbol: 'TKM', decimals: 18 },
      infoURL: 'https://thinkium.net/',
      shortName: 'TKM1',
      chainId: 70001,
      networkId: 70001,
      explorers: [
        {
          name: 'thinkiumscan',
          url: 'https://chain1.thinkiumscan.net',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Thinkium Mainnet Chain 2',
      chain: 'Thinkium',
      rpc: [ 'https://proxy2.thinkiumrpc.net/' ],
      faucets: [],
      nativeCurrency: { name: 'TKM', symbol: 'TKM', decimals: 18 },
      infoURL: 'https://thinkium.net/',
      shortName: 'TKM2',
      chainId: 70002,
      networkId: 70002,
      explorers: [
        {
          name: 'thinkiumscan',
          url: 'https://chain2.thinkiumscan.net',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Thinkium Mainnet Chain 103',
      chain: 'Thinkium',
      rpc: [ 'https://proxy103.thinkiumrpc.net/' ],
      faucets: [],
      nativeCurrency: { name: 'TKM', symbol: 'TKM', decimals: 18 },
      infoURL: 'https://thinkium.net/',
      shortName: 'TKM103',
      chainId: 70103,
      networkId: 70103,
      explorers: [
        {
          name: 'thinkiumscan',
          url: 'https://chain103.thinkiumscan.net',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Polyjuice Testnet',
      chain: 'CKB',
      icon: 'polyjuice',
      rpc: [
        'https://godwoken-testnet-web3-rpc.ckbapp.dev',
        'ws://godwoken-testnet-web3-rpc.ckbapp.dev/ws'
      ],
      faucets: [ 'https://faucet.nervos.org/' ],
      nativeCurrency: { name: 'CKB', symbol: 'CKB', decimals: 8 },
      infoURL: 'https://github.com/nervosnetwork/godwoken',
      shortName: 'ckb',
      chainId: 71393,
      networkId: 1
    },
    {
      name: 'Godwoken Testnet (V1.1)',
      chain: 'GWT',
      rpc: [ 'https://godwoken-testnet-v1.ckbapp.dev' ],
      faucets: [ 'https://testnet.bridge.godwoken.io' ],
      nativeCurrency: { name: 'CKB', symbol: 'CKB', decimals: 18 },
      infoURL: 'https://www.nervos.org',
      shortName: 'gw-testnet-v1',
      chainId: 71401,
      networkId: 71401,
      explorers: [
        {
          name: 'GWScan Block Explorer',
          url: 'https://v1.aggron.gwscan.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Godwoken Mainnet',
      chain: 'GWT',
      rpc: [ 'https://godwoken-testnet-v1.ckbapp.dev' ],
      faucets: [ 'https://testnet.bridge.godwoken.io' ],
      nativeCurrency: { name: 'CKB', symbol: 'CKB', decimals: 18 },
      infoURL: 'https://www.nervos.org',
      shortName: 'gw-mainnet-v1',
      chainId: 71402,
      networkId: 71402,
      explorers: [
        {
          name: 'GWScan Block Explorer',
          url: 'https://v1.aggron.gwscan.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Energy Web Volta Testnet',
      chain: 'Volta',
      rpc: [
        'https://volta-rpc.energyweb.org',
        'wss://volta-rpc.energyweb.org/ws'
      ],
      faucets: [ 'https://voltafaucet.energyweb.org' ],
      nativeCurrency: { name: 'Volta Token', symbol: 'VT', decimals: 18 },
      infoURL: 'https://energyweb.org',
      shortName: 'vt',
      chainId: 73799,
      networkId: 73799
    },
    {
      name: 'Mixin Virtual Machine',
      chain: 'MVM',
      network: 'mainnet',
      rpc: [ 'https://geth.mvm.dev' ],
      faucets: [],
      nativeCurrency: { name: 'Mixin', symbol: 'XIN', decimals: 8 },
      infoURL: 'https://mvm.dev',
      shortName: 'mvm',
      chainId: 73927,
      networkId: 73927,
      icon: 'mvm',
      explorers: [
        {
          name: 'mvmscan',
          url: 'https://scan.mvm.dev',
          icon: 'mvm',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Firenze test network',
      chain: 'ETH',
      rpc: [ 'https://ethnode.primusmoney.com/firenze' ],
      faucets: [],
      nativeCurrency: { name: 'Firenze Ether', symbol: 'FIN', decimals: 18 },
      infoURL: 'https://primusmoney.com',
      shortName: 'firenze',
      chainId: 78110,
      networkId: 78110
    },
    {
      name: 'Mumbai',
      title: 'Polygon Testnet Mumbai',
      chain: 'Polygon',
      rpc: [
        'https://matic-mumbai.chainstacklabs.com',
        'https://rpc-mumbai.maticvigil.com',
        'https://matic-testnet-archive-rpc.bwarelabs.com'
      ],
      faucets: [ 'https://faucet.polygon.technology/' ],
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
      infoURL: 'https://polygon.technology/',
      shortName: 'maticmum',
      chainId: 80001,
      networkId: 80001,
      explorers: [
        {
          name: 'polygonscan',
          url: 'https://mumbai.polygonscan.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'IVAR Chain Mainnet',
      chain: 'IVAR',
      icon: 'ivar',
      rpc: [ 'https://mainnet-rpc.ivarex.com' ],
      faucets: [ 'https://faucet.ivarex.com/' ],
      nativeCurrency: { name: 'Ivar', symbol: 'IVAR', decimals: 18 },
      infoURL: 'https://ivarex.com',
      shortName: 'ivar',
      chainId: 88888,
      networkId: 88888,
      explorers: [
        {
          name: 'ivarscan',
          url: 'https://ivarscan.com',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'UB Smart Chain(testnet)',
      chain: 'USC',
      network: 'testnet',
      rpc: [ 'https://testnet.rpc.uschain.network' ],
      faucets: [],
      nativeCurrency: { name: 'UBC', symbol: 'UBC', decimals: 18 },
      infoURL: 'https://www.ubchain.site',
      shortName: 'usctest',
      chainId: 99998,
      networkId: 99998
    },
    {
      name: 'UB Smart Chain',
      chain: 'USC',
      network: 'mainnet',
      rpc: [ 'https://rpc.uschain.network' ],
      faucets: [],
      nativeCurrency: { name: 'UBC', symbol: 'UBC', decimals: 18 },
      infoURL: 'https://www.ubchain.site/',
      shortName: 'usc',
      chainId: 99999,
      networkId: 99999
    },
    {
      name: 'QuarkChain Mainnet Root',
      chain: 'QuarkChain',
      rpc: [ 'http://jrpc.mainnet.quarkchain.io:38391' ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-r',
      chainId: 100000,
      networkId: 100000
    },
    {
      name: 'QuarkChain Mainnet Shard 0',
      chain: 'QuarkChain',
      rpc: [
        'https://mainnet-s0-ethapi.quarkchain.io',
        'http://eth-jrpc.mainnet.quarkchain.io:39000'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-s0',
      chainId: 100001,
      networkId: 100001,
      parent: { chain: 'eip155-100000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-mainnet',
          url: 'https://mainnet.quarkchain.io/0',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Mainnet Shard 1',
      chain: 'QuarkChain',
      rpc: [
        'https://mainnet-s1-ethapi.quarkchain.io',
        'http://eth-jrpc.mainnet.quarkchain.io:39001'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-s1',
      chainId: 100002,
      networkId: 100002,
      parent: { chain: 'eip155-100000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-mainnet',
          url: 'https://mainnet.quarkchain.io/1',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Mainnet Shard 2',
      chain: 'QuarkChain',
      rpc: [
        'https://mainnet-s2-ethapi.quarkchain.io',
        'http://eth-jrpc.mainnet.quarkchain.io:39002'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-s2',
      chainId: 100003,
      networkId: 100003,
      parent: { chain: 'eip155-100000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-mainnet',
          url: 'https://mainnet.quarkchain.io/2',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Mainnet Shard 3',
      chain: 'QuarkChain',
      rpc: [
        'https://mainnet-s3-ethapi.quarkchain.io',
        'http://eth-jrpc.mainnet.quarkchain.io:39003'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-s3',
      chainId: 100004,
      networkId: 100004,
      parent: { chain: 'eip155-100000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-mainnet',
          url: 'https://mainnet.quarkchain.io/3',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Mainnet Shard 4',
      chain: 'QuarkChain',
      rpc: [
        'https://mainnet-s4-ethapi.quarkchain.io',
        'http://eth-jrpc.mainnet.quarkchain.io:39004'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-s4',
      chainId: 100005,
      networkId: 100005,
      parent: { chain: 'eip155-100000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-mainnet',
          url: 'https://mainnet.quarkchain.io/4',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Mainnet Shard 5',
      chain: 'QuarkChain',
      rpc: [
        'https://mainnet-s5-ethapi.quarkchain.io',
        'http://eth-jrpc.mainnet.quarkchain.io:39005'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-s5',
      chainId: 100006,
      networkId: 100006,
      parent: { chain: 'eip155-100000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-mainnet',
          url: 'https://mainnet.quarkchain.io/5',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Mainnet Shard 6',
      chain: 'QuarkChain',
      rpc: [
        'https://mainnet-s6-ethapi.quarkchain.io',
        'http://eth-jrpc.mainnet.quarkchain.io:39006'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-s6',
      chainId: 100007,
      networkId: 100007,
      parent: { chain: 'eip155-100000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-mainnet',
          url: 'https://mainnet.quarkchain.io/6',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Mainnet Shard 7',
      chain: 'QuarkChain',
      rpc: [
        'https://mainnet-s7-ethapi.quarkchain.io',
        'http://eth-jrpc.mainnet.quarkchain.io:39007'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-s7',
      chainId: 100008,
      networkId: 100008,
      parent: { chain: 'eip155-100000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-mainnet',
          url: 'https://mainnet.quarkchain.io/7',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Crystaleum',
      chain: 'crystal',
      network: 'mainnet',
      rpc: [
        'https://evm.cryptocurrencydevs.org',
        'https://rpc.crystaleum.org'
      ],
      faucets: [],
      nativeCurrency: { name: 'CRFI', symbol: '◈', decimals: 18 },
      infoURL: 'https://crystaleum.org',
      shortName: 'CRFI',
      chainId: 103090,
      networkId: 1,
      icon: 'crystal',
      explorers: [
        {
          name: 'blockscout',
          url: 'https://scan.crystaleum.org',
          icon: 'crystal',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'BROChain Mainnet',
      chain: 'BRO',
      network: 'mainnet',
      rpc: [
        'https://rpc.brochain.org',
        'http://rpc.brochain.org',
        'https://rpc.brochain.org/mainnet',
        'http://rpc.brochain.org/mainnet'
      ],
      faucets: [],
      nativeCurrency: { name: 'Brother', symbol: 'BRO', decimals: 18 },
      infoURL: 'https://brochain.org',
      shortName: 'bro',
      chainId: 108801,
      networkId: 108801,
      explorers: [
        {
          name: 'BROChain Explorer',
          url: 'https://explorer.brochain.org',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Devnet Root',
      chain: 'QuarkChain',
      rpc: [ 'http://jrpc.devnet.quarkchain.io:38391' ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-d-r',
      chainId: 110000,
      networkId: 110000
    },
    {
      name: 'QuarkChain Devnet Shard 0',
      chain: 'QuarkChain',
      rpc: [
        'https://devnet-s0-ethapi.quarkchain.io',
        'http://eth-jrpc.devnet.quarkchain.io:39900'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-d-s0',
      chainId: 110001,
      networkId: 110001,
      parent: { chain: 'eip155-110000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-devnet',
          url: 'https://devnet.quarkchain.io/0',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Devnet Shard 1',
      chain: 'QuarkChain',
      rpc: [
        'https://devnet-s1-ethapi.quarkchain.io',
        'http://eth-jrpc.devnet.quarkchain.io:39901'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-d-s1',
      chainId: 110002,
      networkId: 110002,
      parent: { chain: 'eip155-110000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-devnet',
          url: 'https://devnet.quarkchain.io/1',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Devnet Shard 2',
      chain: 'QuarkChain',
      rpc: [
        'https://devnet-s2-ethapi.quarkchain.io',
        'http://eth-jrpc.devnet.quarkchain.io:39902'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-d-s2',
      chainId: 110003,
      networkId: 110003,
      parent: { chain: 'eip155-110000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-devnet',
          url: 'https://devnet.quarkchain.io/2',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Devnet Shard 3',
      chain: 'QuarkChain',
      rpc: [
        'https://devnet-s3-ethapi.quarkchain.io',
        'http://eth-jrpc.devnet.quarkchain.io:39903'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-d-s3',
      chainId: 110004,
      networkId: 110004,
      parent: { chain: 'eip155-110000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-devnet',
          url: 'https://devnet.quarkchain.io/3',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Devnet Shard 4',
      chain: 'QuarkChain',
      rpc: [
        'https://devnet-s4-ethapi.quarkchain.io',
        'http://eth-jrpc.devnet.quarkchain.io:39904'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-d-s4',
      chainId: 110005,
      networkId: 110005,
      parent: { chain: 'eip155-110000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-devnet',
          url: 'https://devnet.quarkchain.io/4',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Devnet Shard 5',
      chain: 'QuarkChain',
      rpc: [
        'https://devnet-s5-ethapi.quarkchain.io',
        'http://eth-jrpc.devnet.quarkchain.io:39905'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-d-s5',
      chainId: 110006,
      networkId: 110006,
      parent: { chain: 'eip155-110000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-devnet',
          url: 'https://devnet.quarkchain.io/5',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Devnet Shard 6',
      chain: 'QuarkChain',
      rpc: [
        'https://devnet-s6-ethapi.quarkchain.io',
        'http://eth-jrpc.devnet.quarkchain.io:39906'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-d-s6',
      chainId: 110007,
      networkId: 110007,
      parent: { chain: 'eip155-110000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-devnet',
          url: 'https://devnet.quarkchain.io/6',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'QuarkChain Devnet Shard 7',
      chain: 'QuarkChain',
      rpc: [
        'https://devnet-s7-ethapi.quarkchain.io',
        'http://eth-jrpc.devnet.quarkchain.io:39907'
      ],
      faucets: [],
      nativeCurrency: { name: 'QKC', symbol: 'QKC', decimals: 18 },
      infoURL: 'https://www.quarkchain.io',
      shortName: 'qkc-d-s7',
      chainId: 110008,
      networkId: 110008,
      parent: { chain: 'eip155-110000', type: 'shard' },
      explorers: [
        {
          name: 'quarkchain-devnet',
          url: 'https://devnet.quarkchain.io/7',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Milkomeda C1 Testnet',
      chain: 'milkTAda',
      icon: 'milkomeda',
      network: 'testnet',
      rpc: [
        'https://rpc-devnet-cardano-evm.c1.milkomeda.com',
        'wss://rpc-devnet-cardano-evm.c1.milkomeda.com'
      ],
      faucets: [],
      nativeCurrency: { name: 'milkTAda', symbol: 'mTAda', decimals: 18 },
      infoURL: 'https://milkomeda.com',
      shortName: 'milkTAda',
      chainId: 200101,
      networkId: 200101,
      explorers: [
        {
          name: 'Blockscout',
          url: 'https://explorer-devnet-cardano-evm.c1.milkomeda.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Akroma',
      chain: 'AKA',
      rpc: [ 'https://remote.akroma.io' ],
      faucets: [],
      nativeCurrency: { name: 'Akroma Ether', symbol: 'AKA', decimals: 18 },
      infoURL: 'https://akroma.io',
      shortName: 'aka',
      chainId: 200625,
      networkId: 200625,
      slip44: 200625
    },
    {
      name: 'Alaya Mainnet',
      chain: 'Alaya',
      rpc: [
        'https://openapi.alaya.network/rpc',
        'wss://openapi.alaya.network/ws'
      ],
      faucets: [],
      nativeCurrency: { name: 'ATP', symbol: 'atp', decimals: 18 },
      infoURL: 'https://www.alaya.network/',
      shortName: 'alaya',
      chainId: 201018,
      networkId: 1,
      icon: 'alaya',
      explorers: [
        {
          name: 'alaya explorer',
          url: 'https://scan.alaya.network',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Alaya Dev Testnet',
      chain: 'Alaya',
      rpc: [
        'https://devnetopenapi.alaya.network/rpc',
        'wss://devnetopenapi.alaya.network/ws'
      ],
      faucets: [
        'https://faucet.alaya.network/faucet/?id=f93426c0887f11eb83b900163e06151c'
      ],
      nativeCurrency: { name: 'ATP', symbol: 'atp', decimals: 18 },
      infoURL: 'https://www.alaya.network/',
      shortName: 'alayadev',
      chainId: 201030,
      networkId: 1,
      icon: 'alaya',
      explorers: [
        {
          name: 'alaya explorer',
          url: 'https://devnetscan.alaya.network',
          standard: 'none'
        }
      ]
    },
    {
      name: 'PlatON Mainnet',
      chain: 'PlatON',
      network: 'mainnet',
      rpc: [
        'https://openapi2.platon.network/rpc',
        'wss://openapi2.platon.network/ws'
      ],
      faucets: [],
      nativeCurrency: { name: 'LAT', symbol: 'lat', decimals: 18 },
      infoURL: 'https://www.platon.network',
      shortName: 'platon',
      chainId: 210425,
      networkId: 1,
      icon: 'platon',
      explorers: [
        {
          name: 'PlatON explorer',
          url: 'https://scan.platon.network',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Haymo Testnet',
      chain: 'tHYM',
      network: 'testnet',
      rpc: [ 'https://testnet1.haymo.network' ],
      faucets: [],
      nativeCurrency: { name: 'HAYMO', symbol: 'HYM', decimals: 18 },
      infoURL: 'https://haymoswap.web.app/',
      shortName: 'hym',
      chainId: 234666,
      networkId: 234666
    },
    {
      name: 'ARTIS sigma1',
      chain: 'ARTIS',
      rpc: [ 'https://rpc.sigma1.artis.network' ],
      faucets: [],
      nativeCurrency: { name: 'ARTIS sigma1 Ether', symbol: 'ATS', decimals: 18 },
      infoURL: 'https://artis.eco',
      shortName: 'ats',
      chainId: 246529,
      networkId: 246529,
      slip44: 246529
    },
    {
      name: 'ARTIS Testnet tau1',
      chain: 'ARTIS',
      rpc: [ 'https://rpc.tau1.artis.network' ],
      faucets: [],
      nativeCurrency: { name: 'ARTIS tau1 Ether', symbol: 'tATS', decimals: 18 },
      infoURL: 'https://artis.network',
      shortName: 'atstau',
      chainId: 246785,
      networkId: 246785
    },
    {
      name: 'Social Smart Chain Mainnet',
      chain: 'SoChain',
      rpc: [ 'https://socialsmartchain.digitalnext.business' ],
      faucets: [],
      nativeCurrency: { name: 'SoChain', symbol: '$OC', decimals: 18 },
      infoURL: 'https://digitalnext.business/SocialSmartChain',
      shortName: 'SoChain',
      chainId: 281121,
      networkId: 281121,
      explorers: []
    },
    {
      name: 'Polis Testnet',
      chain: 'Sparta',
      icon: 'polis',
      rpc: [ 'https://sparta-rpc.polis.tech' ],
      faucets: [ 'https://faucet.polis.tech' ],
      nativeCurrency: { name: 'tPolis', symbol: 'tPOLIS', decimals: 18 },
      infoURL: 'https://polis.tech',
      shortName: 'sparta',
      chainId: 333888,
      networkId: 333888
    },
    {
      name: 'Polis Mainnet',
      chain: 'Olympus',
      icon: 'polis',
      rpc: [ 'https://rpc.polis.tech' ],
      faucets: [ 'https://faucet.polis.tech' ],
      nativeCurrency: { name: 'Polis', symbol: 'POLIS', decimals: 18 },
      infoURL: 'https://polis.tech',
      shortName: 'olympus',
      chainId: 333999,
      networkId: 333999
    },
    {
      name: 'Arbitrum Rinkeby',
      title: 'Arbitrum Testnet Rinkeby',
      chainId: 421611,
      shortName: 'arb-rinkeby',
      chain: 'ETH',
      networkId: 421611,
      nativeCurrency: { name: 'Arbitrum Rinkeby Ether', symbol: 'ARETH', decimals: 18 },
      rpc: [ 'https://rinkeby.arbitrum.io/rpc' ],
      faucets: [ 'http://fauceth.komputing.org?chain=421611&address=${ADDRESS}' ],
      infoURL: 'https://arbitrum.io',
      explorers: [
        {
          name: 'arbiscan-testnet',
          url: 'https://testnet.arbiscan.io',
          standard: 'EIP3091'
        },
        {
          name: 'arbitrum-rinkeby',
          url: 'https://rinkeby-explorer.arbitrum.io',
          standard: 'EIP3091'
        }
      ],
      parent: {
        type: 'L2',
        chain: 'eip155-4',
        bridges: [ { url: 'https://bridge.arbitrum.io' } ]
      }
    },
    {
      name: 'Dexalot Testnet',
      chain: 'DEXALOT',
      network: 'testnet',
      rpc: [ 'https://subnets.avax.network/dexalot/testnet/rpc' ],
      faucets: [ 'https://sfaucet.dexalot-test.com' ],
      nativeCurrency: { name: 'Dexalot', symbol: 'ALOT', decimals: 18 },
      infoURL: 'https://dexalot.com',
      shortName: 'Dexalot',
      chainId: 432201,
      networkId: 432201,
      explorers: [
        {
          name: 'Avalanche Subnet Explorer',
          url: 'https://subnets.avax.network/dexalot/testnet/explorer',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Weelink Testnet',
      chain: 'WLK',
      rpc: [ 'https://weelinknode1c.gw002.oneitfarm.com' ],
      faucets: [ 'https://faucet.weelink.gw002.oneitfarm.com' ],
      nativeCurrency: { name: 'Weelink Chain Token', symbol: 'tWLK', decimals: 18 },
      infoURL: 'https://weelink.cloud',
      shortName: 'wlkt',
      chainId: 444900,
      networkId: 444900,
      explorers: [
        {
          name: 'weelink-testnet',
          url: 'https://weelink.cloud/#/blockView/overview',
          standard: 'none'
        }
      ]
    },
    {
      name: 'OpenChain Mainnet',
      chain: 'OpenChain',
      rpc: [
        'https://baas-rpc.luniverse.io:18545?lChainId=1641349324562974539'
      ],
      faucets: [],
      nativeCurrency: { name: 'OpenCoin', symbol: 'OPC', decimals: 10 },
      infoURL: 'https://www.openchain.live',
      shortName: 'oc',
      chainId: 474142,
      networkId: 474142,
      explorers: [
        {
          name: 'SIDE SCAN',
          url: 'https://sidescan.luniverse.io/1641349324562974539',
          standard: 'none'
        }
      ]
    },
    {
      name: 'CMP-Testnet',
      chain: 'CMP',
      network: 'testnet',
      rpc: [
        'https://galaxy.block.caduceus.foundation',
        'wss://galaxy.block.caduceus.foundation'
      ],
      faucets: [ 'https://dev.caduceus.foundation/testNetwork' ],
      nativeCurrency: { name: 'Caduceus Testnet Token', symbol: 'CMP', decimals: 18 },
      infoURL: 'https://caduceus.foundation/',
      shortName: 'cmp',
      chainId: 512512,
      networkId: 512512,
      explorers: [
        {
          name: 'Galaxy Scan',
          url: 'https://galaxy.scan.caduceus.foundation',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Vision - Vpioneer Test Chain',
      chain: 'Vision-Vpioneer',
      rpc: [ 'https://vpioneer.infragrid.v.network/ethereum/compatible' ],
      faucets: [ 'https://vpioneerfaucet.visionscan.org' ],
      nativeCurrency: { name: 'VS', symbol: 'VS', decimals: 18 },
      infoURL: 'https://visionscan.org',
      shortName: 'vpioneer',
      chainId: 666666,
      networkId: 666666,
      slip44: 60
    },
    {
      name: 'Vision - Mainnet',
      chain: 'Vision',
      rpc: [ 'https://infragrid.v.network/ethereum/compatible' ],
      faucets: [],
      nativeCurrency: { name: 'VS', symbol: 'VS', decimals: 18 },
      infoURL: 'https://www.v.network',
      explorers: [
        {
          name: 'Visionscan',
          url: 'https://www.visionscan.org',
          standard: 'EIP3091'
        }
      ],
      shortName: 'vision',
      chainId: 888888,
      networkId: 888888,
      slip44: 60
    },
    {
      name: 'Eluvio Content Fabric',
      chain: 'Eluvio',
      rpc: [
        'https://host-76-74-28-226.contentfabric.io/eth/',
        'https://host-76-74-28-232.contentfabric.io/eth/',
        'https://host-76-74-29-2.contentfabric.io/eth/',
        'https://host-76-74-29-8.contentfabric.io/eth/',
        'https://host-76-74-29-34.contentfabric.io/eth/',
        'https://host-76-74-29-35.contentfabric.io/eth/',
        'https://host-154-14-211-98.contentfabric.io/eth/',
        'https://host-154-14-192-66.contentfabric.io/eth/',
        'https://host-60-240-133-202.contentfabric.io/eth/',
        'https://host-64-235-250-98.contentfabric.io/eth/'
      ],
      faucets: [],
      nativeCurrency: { name: 'ELV', symbol: 'ELV', decimals: 18 },
      infoURL: 'https://eluv.io',
      shortName: 'elv',
      chainId: 955305,
      networkId: 955305,
      slip44: 1011,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://explorer.eluv.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Etho Protocol',
      chain: 'ETHO',
      rpc: [ 'https://rpc.ethoprotocol.com' ],
      faucets: [],
      nativeCurrency: { name: 'Etho Protocol', symbol: 'ETHO', decimals: 18 },
      infoURL: 'https://ethoprotocol.com',
      shortName: 'etho',
      chainId: 1313114,
      networkId: 1313114,
      slip44: 1313114,
      explorers: [
        {
          name: 'blockscout',
          url: 'https://explorer.ethoprotocol.com',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Xerom',
      chain: 'XERO',
      rpc: [ 'https://rpc.xerom.org' ],
      faucets: [],
      nativeCurrency: { name: 'Xerom Ether', symbol: 'XERO', decimals: 18 },
      infoURL: 'https://xerom.org',
      shortName: 'xero',
      chainId: 1313500,
      networkId: 1313500
    },
    {
      name: 'Kintsugi',
      title: 'Kintsugi merge testnet',
      chain: 'ETH',
      rpc: [ 'https://rpc.kintsugi.themerge.dev' ],
      faucets: [
        'http://fauceth.komputing.org?chain=1337702&address=${ADDRESS}',
        'https://faucet.kintsugi.themerge.dev'
      ],
      nativeCurrency: { name: 'kintsugi Ethere', symbol: 'kiETH', decimals: 18 },
      infoURL: 'https://kintsugi.themerge.dev/',
      shortName: 'kintsugi',
      chainId: 1337702,
      networkId: 1337702,
      explorers: [
        {
          name: 'kintsugi explorer',
          url: 'https://explorer.kintsugi.themerge.dev',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Kiln',
      chain: 'ETH',
      network: 'testnet',
      rpc: [ 'https://rpc.kiln.themerge.dev' ],
      faucets: [
        'https://faucet.kiln.themerge.dev',
        'https://kiln-faucet.pk910.de',
        'https://kilnfaucet.com'
      ],
      nativeCurrency: { name: 'Testnet ETH', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://kiln.themerge.dev/',
      shortName: 'kiln',
      chainId: 1337802,
      networkId: 1337802,
      icon: 'ethereum',
      explorers: [
        {
          name: 'Kiln Explorer',
          url: 'https://explorer.kiln.themerge.dev',
          icon: 'ethereum',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'PlatON Dev Testnet',
      chain: 'PlatON',
      rpc: [
        'https://devnetopenapi2.platon.network/rpc',
        'wss://devnetopenapi2.platon.network/ws'
      ],
      faucets: [
        'https://faucet.platon.network/faucet/?id=e5d32df10aee11ec911142010a667c03'
      ],
      nativeCurrency: { name: 'LAT', symbol: 'lat', decimals: 18 },
      infoURL: 'https://www.platon.network',
      shortName: 'platondev',
      chainId: 2203181,
      networkId: 1,
      icon: 'platon',
      explorers: [
        {
          name: 'PlatON explorer',
          url: 'https://devnetscan.platon.network',
          standard: 'none'
        }
      ]
    },
    {
      name: 'PlatON Dev Testnet2',
      chain: 'PlatON',
      rpc: [
        'https://devnet2openapi.platon.network/rpc',
        'wss://devnet2openapi.platon.network/ws'
      ],
      faucets: [ 'https://devnet2faucet.platon.network/faucet' ],
      nativeCurrency: { name: 'LAT', symbol: 'lat', decimals: 18 },
      infoURL: 'https://www.platon.network',
      shortName: 'platondev2',
      chainId: 2206132,
      networkId: 1,
      icon: 'platon',
      explorers: [
        {
          name: 'PlatON explorer',
          url: 'https://devnet2scan.platon.network',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Musicoin',
      chain: 'MUSIC',
      rpc: [ 'https://mewapi.musicoin.tw' ],
      faucets: [],
      nativeCurrency: { name: 'Musicoin', symbol: 'MUSIC', decimals: 18 },
      infoURL: 'https://musicoin.tw',
      shortName: 'music',
      chainId: 7762959,
      networkId: 7762959,
      slip44: 184
    },
    {
      name: 'Sepolia',
      title: 'Ethereum Testnet Sepolia',
      chain: 'ETH',
      network: 'testnet',
      rpc: [],
      faucets: [
        'http://fauceth.komputing.org?chain=11155111&address=${ADDRESS}'
      ],
      nativeCurrency: { name: 'Sepolia Ether', symbol: 'SEP', decimals: 18 },
      infoURL: 'https://sepolia.otterscan.io',
      shortName: 'sep',
      chainId: 11155111,
      networkId: 11155111,
      explorers: [
        {
          name: 'otterscan-sepolia',
          url: 'https://sepolia.otterscan.io',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'PepChain Churchill',
      chain: 'PEP',
      rpc: [ 'https://churchill-rpc.pepchain.io' ],
      faucets: [],
      nativeCurrency: { name: 'PepChain Churchill Ether', symbol: 'TPEP', decimals: 18 },
      infoURL: 'https://pepchain.io',
      shortName: 'tpep',
      chainId: 13371337,
      networkId: 13371337
    },
    {
      name: 'IOLite',
      chain: 'ILT',
      rpc: [ 'https://net.iolite.io' ],
      faucets: [],
      nativeCurrency: { name: 'IOLite Ether', symbol: 'ILT', decimals: 18 },
      infoURL: 'https://iolite.io',
      shortName: 'ilt',
      chainId: 18289463,
      networkId: 18289463
    },
    {
      name: 'SmartMesh Mainnet',
      chain: 'Spectrum',
      rpc: [ 'https://jsonapi1.smartmesh.cn' ],
      faucets: [],
      nativeCurrency: { name: 'SmartMesh Native Token', symbol: 'SMT', decimals: 18 },
      infoURL: 'https://smartmesh.io',
      shortName: 'spectrum',
      chainId: 20180430,
      networkId: 1,
      explorers: [
        {
          name: 'spectrum',
          url: 'https://spectrum.pub',
          standard: 'none'
        }
      ]
    },
    {
      name: 'quarkblockchain',
      chain: 'QKI',
      rpc: [ 'https://hz.rpc.qkiscan.cn', 'https://jp.rpc.qkiscan.io' ],
      faucets: [],
      nativeCurrency: {
        name: 'quarkblockchain Native Token',
        symbol: 'QKI',
        decimals: 18
      },
      infoURL: 'https://quarkblockchain.org/',
      shortName: 'qki',
      chainId: 20181205,
      networkId: 20181205
    },
    {
      name: 'Auxilium Network Mainnet',
      chain: 'AUX',
      rpc: [ 'https://rpc.auxilium.global' ],
      faucets: [],
      nativeCurrency: { name: 'Auxilium coin', symbol: 'AUX', decimals: 18 },
      infoURL: 'https://auxilium.global',
      shortName: 'auxi',
      chainId: 28945486,
      networkId: 28945486,
      slip44: 344
    },
    {
      name: 'Joys Digital Mainnet',
      chain: 'JOYS',
      rpc: [ 'https://node.joys.digital' ],
      faucets: [],
      nativeCurrency: { name: 'JOYS', symbol: 'JOYS', decimals: 18 },
      infoURL: 'https://joys.digital',
      shortName: 'JOYS',
      chainId: 35855456,
      networkId: 35855456
    },
    {
      name: 'Aquachain',
      chain: 'AQUA',
      rpc: [ 'https://c.onical.org', 'https://tx.aquacha.in/api' ],
      faucets: [ 'https://aquacha.in/faucet' ],
      nativeCurrency: { name: 'Aquachain Ether', symbol: 'AQUA', decimals: 18 },
      infoURL: 'https://aquachain.github.io',
      shortName: 'aqua',
      chainId: 61717561,
      networkId: 61717561,
      slip44: 61717561
    },
    {
      name: 'Joys Digital TestNet',
      chain: 'TOYS',
      rpc: [ 'https://toys.joys.cash/' ],
      faucets: [ 'https://faucet.joys.digital/' ],
      nativeCurrency: { name: 'TOYS', symbol: 'TOYS', decimals: 18 },
      infoURL: 'https://joys.digital',
      shortName: 'TOYS',
      chainId: 99415706,
      networkId: 99415706
    },
    {
      name: 'Gather Mainnet Network',
      chain: 'GTH',
      rpc: [ 'https://mainnet.gather.network' ],
      faucets: [],
      nativeCurrency: { name: 'Gather', symbol: 'GTH', decimals: 18 },
      infoURL: 'https://gather.network',
      shortName: 'GTH',
      chainId: 192837465,
      networkId: 192837465,
      explorers: [
        {
          name: 'Blockscout',
          url: 'https://explorer.gather.network',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Neon EVM DevNet',
      chain: 'Solana',
      rpc: [ 'https://proxy.devnet.neonlabs.org/solana' ],
      faucets: [ 'https://neonswap.live/#/get-tokens' ],
      icon: 'neon',
      nativeCurrency: { name: 'Neon', symbol: 'NEON', decimals: 18 },
      infoURL: 'https://neon-labs.org',
      shortName: 'neonevm-devnet',
      chainId: 245022926,
      networkId: 245022926,
      explorers: [
        {
          name: 'native',
          url: 'https://devnet.explorer.neon-labs.org',
          standard: 'EIP3091'
        },
        {
          name: 'neonscan',
          url: 'https://devnet.neonscan.org',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Neon EVM MainNet',
      chain: 'Solana',
      rpc: [ 'https://proxy.mainnet.neonlabs.org/solana' ],
      faucets: [],
      icon: 'neon',
      nativeCurrency: { name: 'Neon', symbol: 'NEON', decimals: 18 },
      infoURL: 'https://neon-labs.org',
      shortName: 'neonevm-mainnet',
      chainId: 245022934,
      networkId: 245022934,
      explorers: [
        {
          name: 'native',
          url: 'https://mainnet.explorer.neon-labs.org',
          standard: 'EIP3091'
        },
        {
          name: 'neonscan',
          url: 'https://mainnet.neonscan.org',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Neon EVM TestNet',
      chain: 'Solana',
      rpc: [ 'https://proxy.testnet.neonlabs.org/solana' ],
      faucets: [],
      icon: 'neon',
      nativeCurrency: { name: 'Neon', symbol: 'NEON', decimals: 18 },
      infoURL: 'https://neon-labs.org',
      shortName: 'neonevm-testnet',
      chainId: 245022940,
      networkId: 245022940,
      explorers: [
        {
          name: 'native',
          url: 'https://testnet.explorer.neon-labs.org',
          standard: 'EIP3091'
        },
        {
          name: 'neonscan',
          url: 'https://testnet.neonscan.org',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'OneLedger Mainnet',
      chain: 'OLT',
      icon: 'oneledger',
      rpc: [ 'https://mainnet-rpc.oneledger.network' ],
      faucets: [],
      nativeCurrency: { name: 'OLT', symbol: 'OLT', decimals: 18 },
      infoURL: 'https://oneledger.io',
      shortName: 'oneledger',
      chainId: 311752642,
      networkId: 311752642,
      explorers: [
        {
          name: 'OneLedger Block Explorer',
          url: 'https://mainnet-explorer.oneledger.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Gather Testnet Network',
      chain: 'GTH',
      rpc: [ 'https://testnet.gather.network' ],
      faucets: [],
      nativeCurrency: { name: 'Gather', symbol: 'GTH', decimals: 18 },
      infoURL: 'https://gather.network',
      shortName: 'tGTH',
      chainId: 356256156,
      networkId: 356256156,
      explorers: [
        {
          name: 'Blockscout',
          url: 'https://testnet-explorer.gather.network',
          standard: 'none'
        }
      ]
    },
    {
      name: 'Gather Devnet Network',
      chain: 'GTH',
      rpc: [ 'https://devnet.gather.network' ],
      faucets: [],
      nativeCurrency: { name: 'Gather', symbol: 'GTH', decimals: 18 },
      infoURL: 'https://gather.network',
      shortName: 'dGTH',
      chainId: 486217935,
      networkId: 486217935,
      explorers: [
        {
          name: 'Blockscout',
          url: 'https://devnet-explorer.gather.network',
          standard: 'none'
        }
      ]
    },
    {
      name: 'IPOS Network',
      chain: 'IPOS',
      rpc: [ 'https://rpc.iposlab.com', 'https://rpc2.iposlab.com' ],
      faucets: [],
      nativeCurrency: { name: 'IPOS Network Ether', symbol: 'IPOS', decimals: 18 },
      infoURL: 'https://iposlab.com',
      shortName: 'ipos',
      chainId: 1122334455,
      networkId: 1122334455
    },
    {
      name: 'Aurora Mainnet',
      chain: 'NEAR',
      rpc: [ 'https://mainnet.aurora.dev' ],
      faucets: [],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://aurora.dev',
      shortName: 'aurora',
      chainId: 1313161554,
      networkId: 1313161554,
      explorers: [
        {
          name: 'aurorascan.dev',
          url: 'https://aurorascan.dev',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Aurora Testnet',
      chain: 'NEAR',
      rpc: [ 'https://testnet.aurora.dev/' ],
      faucets: [],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://aurora.dev',
      shortName: 'aurora-testnet',
      chainId: 1313161555,
      networkId: 1313161555,
      explorers: [
        {
          name: 'aurorascan.dev',
          url: 'https://testnet.aurorascan.dev',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Aurora Betanet',
      chain: 'NEAR',
      rpc: [ 'https://betanet.aurora.dev/' ],
      faucets: [],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://aurora.dev',
      shortName: 'aurora-betanet',
      chainId: 1313161556,
      networkId: 1313161556
    },
    {
      name: 'Harmony Mainnet Shard 0',
      chain: 'Harmony',
      rpc: [ 'https://api.harmony.one', 'https://api.s0.t.hmny.io' ],
      faucets: [ 'https://free-online-app.com/faucet-for-eth-evm-chains/' ],
      nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
      infoURL: 'https://www.harmony.one/',
      shortName: 'hmy-s0',
      chainId: 1666600000,
      networkId: 1666600000,
      explorers: [
        {
          name: 'Harmony Block Explorer',
          url: 'https://explorer.harmony.one',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Harmony Mainnet Shard 1',
      chain: 'Harmony',
      rpc: [ 'https://api.s1.t.hmny.io' ],
      faucets: [],
      nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
      infoURL: 'https://www.harmony.one/',
      shortName: 'hmy-s1',
      chainId: 1666600001,
      networkId: 1666600001
    },
    {
      name: 'Harmony Mainnet Shard 2',
      chain: 'Harmony',
      rpc: [ 'https://api.s2.t.hmny.io' ],
      faucets: [],
      nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
      infoURL: 'https://www.harmony.one/',
      shortName: 'hmy-s2',
      chainId: 1666600002,
      networkId: 1666600002
    },
    {
      name: 'Harmony Mainnet Shard 3',
      chain: 'Harmony',
      rpc: [ 'https://api.s3.t.hmny.io' ],
      faucets: [],
      nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
      infoURL: 'https://www.harmony.one/',
      shortName: 'hmy-s3',
      chainId: 1666600003,
      networkId: 1666600003
    },
    {
      name: 'Harmony Testnet Shard 0',
      chain: 'Harmony',
      rpc: [ 'https://api.s0.b.hmny.io' ],
      faucets: [ 'https://faucet.pops.one' ],
      nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
      infoURL: 'https://www.harmony.one/',
      shortName: 'hmy-b-s0',
      chainId: 1666700000,
      networkId: 1666700000,
      explorers: [
        {
          name: 'Harmony Testnet Block Explorer',
          url: 'https://explorer.pops.one',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Harmony Testnet Shard 1',
      chain: 'Harmony',
      rpc: [ 'https://api.s1.b.hmny.io' ],
      faucets: [],
      nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
      infoURL: 'https://www.harmony.one/',
      shortName: 'hmy-b-s1',
      chainId: 1666700001,
      networkId: 1666700001
    },
    {
      name: 'Harmony Testnet Shard 2',
      chain: 'Harmony',
      rpc: [ 'https://api.s2.b.hmny.io' ],
      faucets: [],
      nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
      infoURL: 'https://www.harmony.one/',
      shortName: 'hmy-b-s2',
      chainId: 1666700002,
      networkId: 1666700002
    },
    {
      name: 'Harmony Testnet Shard 3',
      chain: 'Harmony',
      rpc: [ 'https://api.s3.b.hmny.io' ],
      faucets: [],
      nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
      infoURL: 'https://www.harmony.one/',
      shortName: 'hmy-b-s3',
      chainId: 1666700003,
      networkId: 1666700003
    },
    {
      name: 'DataHopper',
      chain: 'HOP',
      rpc: [ 'https://23.92.21.121:8545' ],
      faucets: [],
      nativeCurrency: { name: 'DataHoppers', symbol: 'HOP', decimals: 18 },
      infoURL: 'https://www.DataHopper.com',
      shortName: 'hop',
      chainId: 2021121117,
      networkId: 2021121117
    },
    {
      name: 'Pirl',
      chain: 'PIRL',
      rpc: [ 'https://wallrpc.pirl.io' ],
      faucets: [],
      nativeCurrency: { name: 'Pirl Ether', symbol: 'PIRL', decimals: 18 },
      infoURL: 'https://pirl.io',
      shortName: 'pirl',
      chainId: 3125659152,
      networkId: 3125659152,
      slip44: 164
    },
    {
      name: 'OneLedger Testnet Frankenstein',
      chain: 'OLT',
      icon: 'oneledger',
      rpc: [ 'https://frankenstein-rpc.oneledger.network' ],
      faucets: [ 'https://frankenstein-faucet.oneledger.network' ],
      nativeCurrency: { name: 'OLT', symbol: 'OLT', decimals: 18 },
      infoURL: 'https://oneledger.io',
      shortName: 'frankenstein',
      chainId: 4216137055,
      networkId: 4216137055,
      explorers: [
        {
          name: 'OneLedger Block Explorer',
          url: 'https://frankenstein-explorer.oneledger.network',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Palm Testnet',
      chain: 'Palm',
      icon: 'palm',
      rpc: [ 'https://palm-testnet.infura.io/v3/${INFURA_API_KEY}' ],
      faucets: [],
      nativeCurrency: { name: 'PALM', symbol: 'PALM', decimals: 18 },
      infoURL: 'https://palm.io',
      shortName: 'tpalm',
      chainId: 11297108099,
      networkId: 11297108099,
      explorers: [
        {
          name: 'Palm Testnet Explorer',
          url: 'https://explorer.palm-uat.xyz',
          standard: 'EIP3091',
          icon: 'palm'
        }
      ]
    },
    {
      name: 'Palm',
      chain: 'Palm',
      icon: 'palm',
      rpc: [ 'https://palm-mainnet.infura.io/v3/${INFURA_API_KEY}' ],
      faucets: [],
      nativeCurrency: { name: 'PALM', symbol: 'PALM', decimals: 18 },
      infoURL: 'https://palm.io',
      shortName: 'palm',
      chainId: 11297108109,
      networkId: 11297108109,
      explorers: [
        {
          name: 'Palm Explorer',
          url: 'https://explorer.palm.io',
          standard: 'EIP3091',
          icon: 'palm'
        }
      ]
    },
    {
      name: 'Ntity Mainnet',
      chain: 'Ntity',
      rpc: [ 'https://rpc.ntity.io' ],
      faucets: [],
      nativeCurrency: { name: 'Ntity', symbol: 'NTT', decimals: 18 },
      infoURL: 'https://ntity.io',
      shortName: 'ntt',
      chainId: 197710212030,
      networkId: 197710212030,
      icon: 'ntity',
      explorers: [
        {
          name: 'Ntity Blockscout',
          url: 'https://blockscout.ntity.io',
          icon: 'ntity',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Haradev Testnet',
      chain: 'Ntity',
      rpc: [ 'https://blockchain.haradev.com' ],
      faucets: [],
      nativeCurrency: { name: 'Ntity Haradev', symbol: 'NTTH', decimals: 18 },
      infoURL: 'https://ntity.io',
      shortName: 'ntt-haradev',
      chainId: 197710212031,
      networkId: 197710212031,
      icon: 'ntity',
      explorers: [
        {
          name: 'Ntity Haradev Blockscout',
          url: 'https://blockscout.haradev.com',
          icon: 'ntity',
          standard: 'EIP3091'
        }
      ]
    },
    {
      name: 'Molereum Network',
      chain: 'ETH',
      rpc: [ 'https://molereum.jdubedition.com' ],
      faucets: [],
      nativeCurrency: { name: 'Molereum Ether', symbol: 'MOLE', decimals: 18 },
      infoURL: 'https://github.com/Jdubedition/molereum',
      shortName: 'mole',
      chainId: 6022140761023,
      networkId: 6022140761023
    },
    {
      name: 'Godwoken Testnet (V1)',
      chain: 'GWT',
      rpc: [ 'https://godwoken-testnet-web3-v1-rpc.ckbapp.dev' ],
      faucets: [ 'https://homura.github.io/light-godwoken' ],
      nativeCurrency: { name: 'CKB', symbol: 'CKB', decimals: 8 },
      infoURL: 'https://www.nervos.org',
      shortName: 'gw-testnet-v1-deprecated',
      chainId: 868455272153094,
      networkId: 868455272153094,
      status: 'deprecated',
      explorers: [
        {
          name: 'GWScan Block Explorer',
          url: 'https://v1.aggron.gwscan.com',
          standard: 'none'
        }
      ]
    }
  ];

  /* eslint no-undef: "warn" */
  const getGlobalObject = () => {
    if (typeof globalThis !== 'undefined') {
      return globalThis
    }
    if (typeof self !== 'undefined') {
      return self
    }
    if (typeof window !== 'undefined') {
      return window
    }
    if (typeof global !== 'undefined') {
      return global
    }
    throw new Error('[svelte-ethers-store] cannot find the global object')
  };

  const getWindowEthereum = () => {
    try {
      if (getGlobalObject().ethereum) return getGlobalObject().ethereum
    } catch (err) {
      console.error('[svelte-ethers-store] no globalThis.ethereum object');
    }
  };

  const alwaysNumber = n => ethers.utils.isHexString(n) ? parseInt(n, 16) : n;

  const createStore = () => {
    const { emit, get, subscribe, assign, deleteAll } = svelteProxiedStore.proxied();

    const switch1193Provider = async ({
      chainId,
      signerAddress, // not used
      addressOrIndex = 0
    }) => {
      if (!get('provider')) {
        //console.log('lost connection')
        init();
        emit();
        return
      }
      if (!chainId) {
        chainId =  alwaysNumber((await get('provider').getNetwork()).chainId);
      }
      const signer = get('provider').getSigner(addressOrIndex);
      try {
        signerAddress = await signer.getAddress();
      } catch (e) {
        console.warn('[svelte-ethers-store] '+e);
      }
      assign({
        connected: true,
        chainId,
        signer,
        signerAddress
      });
      emit();
    };

    const accountsChangedHandler = accounts =>
      switch1193Provider({
        addressOrIndex:
          Array.isArray(accounts) && accounts.length ? accounts[0] : 0
      });
    const chainChangedHandler = (eipProvider, addressOrIndex) => chainId => set1193Provider(eipProvider, addressOrIndex, alwaysNumber(chainId));
    // TODO better error support ?
    const disconnectHandler = error => switch1193Provider({ error });

    const init = () => {
      if (get('eipProvider') && get('eipProvider').removeListener) {
        get('eipProvider').removeListener(
          'accountsChanged',
          accountsChangedHandler
        );
        get('eipProvider').removeListener('chainChanged', chainChangedHandler);
        get('eipProvider').removeListener('disconnect', disconnectHandler);
      }
      deleteAll();
      assign({
        connected: false,
        evmProviderType: ''
      });
    };

    const set1193Provider = async (eipProvider, addressOrIndex, chainId) => {
      init();
      let accounts;
      try {
        accounts = await eipProvider.request({ method: 'eth_requestAccounts' });
      } catch (e) {
        console.warn('[svelte-ethers-store] non compliant 1193 provider');
        // some provider may store accounts directly like walletconnect
        accounts = eipProvider.accounts;
      }
      if (addressOrIndex == null && Array.isArray(accounts) && accounts.length) {
        addressOrIndex = accounts[0];
      }
      const provider = new ethers.ethers.providers.Web3Provider(eipProvider);
      assign({
        provider,
        eipProvider,
        evmProviderType: 'EIP1193'
      });
      if (eipProvider.on) {
        // TODO handle disconnect/connect events
        eipProvider.on('accountsChanged', accountsChangedHandler);
        eipProvider.on('chainChanged', chainChangedHandler(eipProvider, addressOrIndex));
        eipProvider.on('disconnect', disconnectHandler);
      }
      return switch1193Provider({ addressOrIndex, chainId })
    };

    const setProvider = async (provider, addressOrIndex = 0) => {
      if (!provider) {
        if (!getWindowEthereum())
          throw new Error(
            '[svelte-ethers-store] Please authorize browser extension (Metamask or similar)'
          )
        getWindowEthereum().autoRefreshOnNetworkChange = false;
        return set1193Provider(getWindowEthereum())
      }
      if (typeof provider === 'object' && provider.request)
        return set1193Provider(provider, addressOrIndex)
      init();
      if (
        typeof provider !== 'object' ||
        (!(
          Object.getPrototypeOf(provider) instanceof ethers.ethers.providers.BaseProvider
        ) &&
          !(
            Object.getPrototypeOf(provider) instanceof
            ethers.ethers.providers.UrlJsonRpcProvider
          ))
      ) {
        provider = new ethers.ethers.providers.JsonRpcProvider(provider);
      }
      const { chainId } = await provider.getNetwork();
      let signer, signerAddress;
      if (addressOrIndex !== null) {
        try {
          // XXX some providers do not support getSigner
          if (typeof provider.listAccounts === 'function') {
            signer = provider.getSigner(addressOrIndex);
          } else {
            signer = provider.getSigner();
          }
          signerAddress = await signer.getAddress();
        } catch (e) {
          console.warn('[svelte-ethers-store] '+e);
        }
      }
      assign({
        signer,
        signerAddress,
        provider,
        connected: true,
        chainId: alwaysNumber(chainId),
        evmProviderType: provider.constructor.name
      });
      emit();
    };

    const setBrowserProvider = () => setProvider();

    const disconnect = async () => {
      init();
      emit();
    };

    return {
      setBrowserProvider,
      setProvider,
      disconnect,
      subscribe,
      get
    }
  };

  const createContractStore = () => {
    const { emit, get, subscribe, assign, deleteAll } = svelteProxiedStore.proxied();

    const attachContract = async (name, address, abi, fromSigner = true) => {
      assign({
        [name]: [address, abi, fromSigner]
      });
      emit();
    };

    return {
      attachContract,
      subscribe,
      get
    }
  };

  const allStores = {};

  const noData = { rpc: [], explorers: [{}], faucets: [], nativeCurrency: {} };

  const getData = id => {
    for (const data of chains) {
      if (data.chainId === id) return data
    }
    return noData
  };

  const subStoreNames = [
    'connected',
    'provider',
    'chainId',
    'chainData',
    'signer',
    'signerAddress',
    'evmProviderType',
    'contracts'
  ];

  const makeEvmStores = name => {
    const evmStore = (allStores[name] = createStore());
    const registry = createContractStore();
    const target = {};

    allStores[name].connected = store.derived(
      evmStore,
      $evmStore => $evmStore.connected
    );

    allStores[name].provider = store.derived(evmStore, $evmStore => $evmStore.provider);
    allStores[name].chainId = store.derived(evmStore, $evmStore => $evmStore.chainId);
    allStores[name].chainData = store.derived(evmStore, $evmStore =>
      $evmStore.chainId ? getData(alwaysNumber($evmStore.chainId)) : {}
    );

    allStores[name].signer = store.derived(evmStore, $evmStore => $evmStore.signer);
    allStores[name].signerAddress = store.derived(
      evmStore,
      $evmStore => $evmStore.signerAddress
    );

    allStores[name].evmProviderType = store.derived(
      evmStore,
      $evmStore => $evmStore.evmProviderType
    );

    allStores[name].contracts = store.derived(
      [ evmStore, registry ],
      ([ $evmStore, $registry ]) => {
        if (!$evmStore.connected) return target
        for (let key of Object.keys($registry)) {
          target[key] = new ethers.ethers.Contract(
            $registry[key][0],
            $registry[key][1],
            !$registry[key][2] || !$evmStore.signer ? $evmStore.provider : $evmStore.signer
          );
        }
        return target
      }
    );

    // force one subscribtion on $contracts so it's defined via proxy
    allStores[name].contracts.subscribe(()=>{});

    return new Proxy(allStores[name], {
      get: function (internal, property) {
        if (property === '$contracts') return target
        if (/^\$/.test(property)) {
          // TODO forbid deconstruction !
          property = property.slice(1);
          if (subStoreNames.includes(property))
            return allStores[name].get(property)
          throw new Error(`[svelte-ethers-store] no store named ${property}`)
        }
        if (property === 'attachContract') return registry.attachContract
        if (
          [
            'setBrowserProvider',
            'setProvider',
            'disconnect',
            ...subStoreNames
          ].includes(property)
        )
          return Reflect.get(internal, property)
        throw new Error(`[svelte-ethers-store] no store named ${property}`)
      }
    })
  };


  const getChainStore = name => {
    if (!allStores[name])
      throw new Error(`[svelte-ethers-store] chain store ${name} does not exist`)
    return allStores[name]
  };

  const getChainDataByChainId = id => (chains.filter(o => o.chainId === id) || [{}])[0];

  const defaultEvmStores = makeEvmStores('default');

  const connected = allStores.default.connected;
  const provider = allStores.default.provider;
  const chainId = allStores.default.chainId;
  const signer = allStores.default.signer;
  const signerAddress = allStores.default.signerAddress;
  const evmProviderType = allStores.default.evmProviderType;

  const contracts = allStores.default.contracts;

  const chainData = allStores.default.chainData;

  exports.allChainsData = chains;
  exports.chainData = chainData;
  exports.chainId = chainId;
  exports.connected = connected;
  exports.contracts = contracts;
  exports.createContractStore = createContractStore;
  exports.createStore = createStore;
  exports.defaultEvmStores = defaultEvmStores;
  exports.evmProviderType = evmProviderType;
  exports.getChainDataByChainId = getChainDataByChainId;
  exports.getChainStore = getChainStore;
  exports.makeEvmStores = makeEvmStores;
  exports.provider = provider;
  exports.signer = signer;
  exports.signerAddress = signerAddress;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
