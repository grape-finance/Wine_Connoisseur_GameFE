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
  [SupportedChainId.TESTNET]: "0x54460352BaA4bDCA62280245f39cF522E045A2c0",
};

export const UPGRADE_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0xeC0c8C862ABCbCB10BF6E6254306960c7cdCfaBD",
};

export const CELLAR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x244Fe7B271757D43DE730b980A0216a2C98D4883",
};

export const WINERYPROGRESSION_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x969A6229B0Aae4336E7593ED7B796B656E65e0FC",
};

export const WINERY_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0xb3aa28E9e1b2573f0301d4f23D43dA21d374aA1E",
};

export const VINTAGEWINE_FOUNTAIN_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0x004FeC4da28E9137c9779C948A047C0c4fff92Ca",
};

export const MULTICALL_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TESTNET]: "0xAf61f4F9b4461BE61bfc9ad28A5B6d63FC22CFc0",
};

export const NFT_URI = "https://api.pizza.game/chefs/img";
export const TOOL_URI = "https://api.pizza.game/static/img";
export const buyGrapeAddress = `https://traderjoexyz.com/trade?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=${GRAPE_ADDRESS[43114]}`;
export const buyVintageWineAddress = `https://traderjoexyz.com/trade?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=${VINTAGEWINE_ADDRESS[43114]}`;
export const buyVintnerNFTAddress =
  "https://nftrade.com/assets/avalanche/0x001e68282d52dcaba3749291bac33a9678073d01";
export const buyToolsNFTAddress =
  "https://nftrade.com/assets/avalanche/0x6cc4cc814c7154fb67965c8044cc803b3199ec53";
