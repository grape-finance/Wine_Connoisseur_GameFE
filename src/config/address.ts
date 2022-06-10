export enum SupportedChainId {
  MAINNET = 43114,
  TESTNET = 43113,
  HEX_MAINNET = "0xa86a",
  HEX_TESTNET = "0xa869",
}

type AddressMap = { [chainId: number]: string };

export const GRAPE_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "0x5541D83EFaD1f281571B343977648B75d95cdAC2",
  [SupportedChainId.TESTNET]: "0xD1328c498A7B2Befe61e33B3f4687935CA1f4b4c",
};

export const VINTAGEWINE_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0xAE1975Ae877F2f445DC681436033C00ca87bc2Cf",
};

export const CELLAR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x3dBeD17aB0a3e5EE75F5A04Eb6C8329984D7e70e",
};

export const UPGRADE_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0xD9FB85B711BaEbD3d9395214FB4B75Fa2b7a75Eb",
};

export const VINTNER_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x942dA7B4dfd375134f2787b6b6ACa51054cD2324",
};

export const WINERYPROGRESSION_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x5b8c50A598DD77BbD1A3cd2cC9bE0916c19817F0",
};

export const WINERY_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x64943ba510c025a93766a65881b3347083a88f20",
};

export const buyGrapeAddress = `https://traderjoexyz.com/trade?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=${GRAPE_ADDRESS[43114]}`;
export const buyVintageWineAddress = `https://traderjoexyz.com/trade?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=${VINTAGEWINE_ADDRESS[43114]}`;
export const buyVintnerNFTAddress =
  "https://nftrade.com/assets/avalanche/0x001e68282d52dcaba3749291bac33a9678073d01";
export const buyToolsNFTAddress =
  "https://nftrade.com/assets/avalanche/0x6cc4cc814c7154fb67965c8044cc803b3199ec53";
