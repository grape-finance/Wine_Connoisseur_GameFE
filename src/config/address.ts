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
  [SupportedChainId.TESTNET]: "0x063c8BC02bF3e22C7C12d6583203DB5C7fe868f6",
};

export const USDC_VINTAGEWINE_LP_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x46372ce0868EBB34CdB334daF8C0d699a24d39a4",
};

export const VINTNER_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x1DC322CB392F608139Cd52088Aa8C167f826aE17",
};

export const UPGRADE_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0xBC2C298C2F55f7a6CEFA448460ab3Ca3d38Ca4C4",
};

export const CELLAR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x52339089664AA68d3a924c9E2a9b3aDa0E3eE3Fd",
};

export const WINERYPROGRESSION_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x969A6229B0Aae4336E7593ED7B796B656E65e0FC",
};

export const WINERY_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x145EC35A42EF05753569Cf6C3Ca42AE01432A149",
};

export const VINTAGEWINE_FOUNTAIN_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x004FeC4da28E9137c9779C948A047C0c4fff92Ca",
};

export const MULTICALL_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0xAf61f4F9b4461BE61bfc9ad28A5B6d63FC22CFc0",
};

export const NFT_URI = "https://gateway.pinata.cloud/ipfs/QmcdXuXda9f8PzFs9zdwUJqJpo7NfzTomQQBHnkNj2ZRCg";
export const TOOL_URI = "https://gateway.pinata.cloud/ipfs/QmSuSATfSD3DoxJAznHxwgebQE7petmM655VFnQzyNad6B";
export const buyGrapeAddress = `https://traderjoexyz.com/trade?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=${GRAPE_ADDRESS[43114]}`;
export const buyVintageWineAddress = `https://traderjoexyz.com/trade?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=${VINTAGEWINE_ADDRESS[43114]}`;
export const buyVintnerNFTAddress =
  "#";
export const buyToolsNFTAddress =
  "#";
