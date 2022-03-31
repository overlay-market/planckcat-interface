import { ChainId } from '@sushiswap/sdk';

type AddressMap = { [chainId: number]: string }

export const MINTER_ADDRESS: AddressMap = {
  [ChainId.ARBITRUM]: '0x2A2e181Cc177974c5D013240C34E1dEf1A3CC31a',
  [ChainId.RINKEBY]: '0x9ba2D3D2ED1a70ab7826978329DC04C6B1fbc888',
}