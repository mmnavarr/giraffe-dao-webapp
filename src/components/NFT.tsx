import React, { useCallback, useEffect, useState } from 'react';

import { fetcher } from '../utils/fetcher';
import { NFTMetadata, SPLToken } from '../utils/types';

type NFTProps = {
  nft: SPLToken;
};

const NFT = ({ nft }: NFTProps) => {
  const {
    data: { uri },
  } = nft;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [nftMetadata, setNFTMetadata] = useState<NFTMetadata>();

  const fetchNftMetadata = useCallback(async () => {
    if (!uri) {
      setError(new Error(`No token URI provided`));
      return;
    }
    setIsLoading(true);
    try {
      const nftMetadataResponse: NFTMetadata = await fetcher(uri);

      setNFTMetadata(nftMetadataResponse);
    } catch (err: any) {
      setIsLoading(false);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [uri]);

  useEffect(() => {
    fetchNftMetadata();
  }, [fetchNftMetadata]);

  if (error || !nftMetadata) return null;

  if (isLoading) {
    <div>Loading...</div>;
  }

  const { name, symbol, image } = nftMetadata;

  return (
    <div key={name} className={`flex flex-col items-center justify-center`}>
      <div
        className={`flex items-center justify-center h-24 w-24 rounded-md bg-background text-tertiary border-primary border-4`}
      >
        <img className={`inline-block max-h-full`} src={image} alt={name} />
      </div>
      <p className="text-md font-medium text-gray-900">
        {name}
        {symbol && <span>({symbol})</span>}
      </p>
    </div>
  );
};

export default NFT;
