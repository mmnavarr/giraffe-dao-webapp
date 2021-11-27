export type SPLToken = {
  data: {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: SPLTokenCreator[];
  };
  editionNonce: unknown;
  isMutable: number;
  key: number;
  mint: string;
  primarySaleHappened: 1;
  updateAuthority: string;
};

type SPLTokenCreator = {
  address: string;
  verified: number;
  share: number;
};

export type NFTMetadata = {
  attributes: NFTAttribute[];
  description: string;
  image: string;
  name: string;
  seller_fee_basis_points: number;
  symbol: string;
};

type NFTAttribute = {
  trait_type: string;
  value: string;
};
