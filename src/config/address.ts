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
  [SupportedChainId.MAINNET]: "0x01Af64EF39AEB5612202AA07B3A3829f20c395fd",
  [SupportedChainId.TESTNET]: "0x063c8BC02bF3e22C7C12d6583203DB5C7fe868f6",
};

export const USDC_VINTAGEWINE_LP_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "0x1A3b20040dD5C890f247a5fb6C078B9943FfaA40",
  [SupportedChainId.TESTNET]: "0x46372ce0868EBB34CdB334daF8C0d699a24d39a4",
};

export const VINTNER_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "0xe26168f45030E1Eb7477Fa5F9A4a28d93c0658B4",
  [SupportedChainId.TESTNET]: "0x1DC322CB392F608139Cd52088Aa8C167f826aE17",
};

export const UPGRADE_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "0xb73c3c17B52c3002273896D94F154ABb027562c4",
  [SupportedChainId.TESTNET]: "0xBC2C298C2F55f7a6CEFA448460ab3Ca3d38Ca4C4",
};

export const CELLAR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "0xf016e69F2c08a0b743a7d815d1059318DCa8Fc0e",
  [SupportedChainId.TESTNET]: "0x52339089664AA68d3a924c9E2a9b3aDa0E3eE3Fd",
};

export const WINERYPROGRESSION_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "0x46840fEDBaFaf7Ad2b9b6395421662EE9279349f",
  [SupportedChainId.TESTNET]: "0x969A6229B0Aae4336E7593ED7B796B656E65e0FC",
};

export const WINERY_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "0xaE1DE1c258c5587CFEA69045992a5467cFF4406F",
  [SupportedChainId.TESTNET]: "0x145EC35A42EF05753569Cf6C3Ca42AE01432A149",
};

export const VINTAGEWINE_FOUNTAIN_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "0x329F8a3044E17d5691B64c6BD1b4dEd45775BB92",
  [SupportedChainId.TESTNET]: "0x004FeC4da28E9137c9779C948A047C0c4fff92Ca",
};

export const MULTICALL_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "0xa78482391Aa16C481790B4AB6E68766c3b725b76",
  [SupportedChainId.TESTNET]: "0xAf61f4F9b4461BE61bfc9ad28A5B6d63FC22CFc0",
};

export const MIM_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: "0x130966628846bfd36ff31a822705796e8cb8c18d",
  [SupportedChainId.TESTNET]: "",
};

export const NFT_URI =
  "https://vintner-image.s3.us-west-1.amazonaws.com/images";


export const TOOL_URI = "https://vintner-tools.s3.us-west-1.amazonaws.com/tool";
export const buyGrapeAddress = `https://www.swapsicle.io/swap?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=0x5541D83EFaD1f281571B343977648B75d95cdAC2#/`;
export const buyVintageWineAddress = `https://www.swapsicle.io/swap?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=0x01Af64EF39AEB5612202AA07B3A3829f20c395fd#/`;
export const buyVintnerNFTAddress = "https://mint.grapefinance.app/";
export const buyToolsNFTAddress =
  "https://winemaker.grapefinance.app/app/Tools";
