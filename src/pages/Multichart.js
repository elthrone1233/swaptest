// src/pages/MultiChartPage.jsx
import React, { useState } from "react";

const MultiChartPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [input, setInput] = useState("");

  const handleAddAddress = () => {
    const cleaned = input.trim();
    if (
      cleaned &&
      /^0x[a-fA-F0-9]{40}$/.test(cleaned) &&
      !addresses.includes(cleaned)
    ) {
      setAddresses((prev) => [...prev, cleaned]);
    }
    setInput("");
  };

  const handleRemove = (addr) => {
    setAddresses(addresses.filter((a) => a !== addr));
  };

  return (
    <div className="min-h-screen bg-purple-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">
        📊 Multi Token Chart Viewer
      </h1>

      <div className="flex gap-4 mb-6">
        <input
          className="p-3 w-full rounded text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste Ethereum token address"
        />
        <button
          onClick={handleAddAddress}
          className="bg-purple-700 hover:bg-purple-500 px-5 py-3 rounded"
        >
          Add Token
        </button>
      </div>

      {addresses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {addresses.map((address) => (
            <div
              key={address}
              className="relative bg-black rounded-xl p-1 shadow-lg"
              style={{ height: "380px" }}
            >
              <iframe
                title={address}
                src={`https://dexscreener.com/ethereum/${address}?embed=1&theme=dark`}
                width="100%"
                height="100%"
                className="rounded-xl"
                style={{ border: "none" }}
                allowFullScreen
              />
              <button
                onClick={() => handleRemove(address)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-400 text-white rounded-full px-2 py-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {addresses.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          Paste a token address to start viewing charts.
        </p>
      )}
    </div>
  );
};

export default MultiChartPage;
