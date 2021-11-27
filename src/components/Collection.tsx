import React from 'react';

import type { Options } from '@nfteyez/sol-rayz';
import { useWalletNfts } from '@nfteyez/sol-rayz-react';
import { clusterApiUrl, Connection } from '@solana/web3.js';

import config from '../config/index.json';
import { SPLToken } from '../utils/types';
import NFT from './NFT';

const walletPublicKey = 'H8oMhzkrpA63MH548xQd1MLHLUBAJJXPJPZoAhr1j8ny';

const Collection = () => {
  const {
    collection: { title, subtitle, description },
  } = config;

  // Connect to solana mainnet cluster
  const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

  const {
    nfts = [],
    isLoading,
    error,
  } = useWalletNfts({
    publicAddress: walletPublicKey,
    connection, // pass your connection object to use specific RPC node
  } as Options);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className={`py-12 bg-background`} id="collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2
            className={`text-base text-primary font-semibold tracking-wide uppercase`}
          >
            {title}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {subtitle}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {description}
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {nfts.map((nft: SPLToken) => (
              <NFT key={nft.data.uri} nft={nft} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Collection;
