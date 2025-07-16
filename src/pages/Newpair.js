import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BoostedEthTokens({ onTokenClick }) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchBoosted = async () => {
      try {
        const res = await axios.get("https://api.dexscreener.com/token-boosts/latest/v1");
        const ethTokens = res.data
          .filter((t) => t.chainId === "ethereum")
          .slice(0, 20);
        setTokens(ethTokens);
      } catch (e) {
        console.error("Error fetching boosted ETH tokens", e);
      }
    };

    fetchBoosted();
  }, []);

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4 text-white">⚡ Newly ETH Tokens</h3>
      <div className="flex overflow-x-auto space-x-4 pb-2 no-scrollbar">
        {tokens.map((token) => (
          <div
            key={token.tokenAddress}
            onClick={() => onTokenClick && onTokenClick(token.tokenAddress)}
            className="bg-black p-4 rounded-xl min-w-[220px] flex-shrink-0 shadow hover:bg-purple-800 transition cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={token.icon || "/eth.png"}
                alt="Token Icon"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-white font-semibold text-sm truncate w-[130px]">
                  {token.tokenName || "Unknown"}
                </h4>
                <p className="text-gray-400 text-xs break-all">
                  {token.tokenAddress}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
