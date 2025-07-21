import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RugCheckModal from "./RugCheckModal";

import {
  Menu,
  X,
  HomeIcon,
  BarChart2,
  PlusSquare,
  Wallet,
  Repeat
} from 'lucide-react';

import Home from './pages/Home';
import NFT from './pages/NFT';
import Portfolio from './pages/Portfolio';
import WalletAnalyzer from './pages/WalletAnalyzer';
import Swap from './pages/SwapPage';
import Multichart from './pages/Multichart';
import Newpair from './pages/Newpair';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon size={18} /> },
    { name: 'Multicharts', path: '/multicharts', icon: <BarChart2 size={18} /> },
    { name: 'New Pairs', path: '/new-pairs', icon: <PlusSquare size={18} /> },
    { name: 'Portfolio', path: '/wallet-analyzer', icon: <Wallet size={18} /> },
    { name: 'Swap', path: '/swap-page', icon: <Repeat size={18} /> },
  ];

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask to continue");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error("Wallet connection failed", err);
    }
  };

  return (
    <BrowserRouter>
      <RugCheckModal />

      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white min-h-screen">
        {/* 🔝 Top Header Navigation */}
        <header className="flex flex-col lg:flex-row items-center justify-between px-4 py-3 border-b border-purple-700 bg-black/70 backdrop-blur sticky top-0 z-50">
          {/* Logo & Mobile Toggle */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div className="flex items-center gap-2 text-xl font-bold">
              <img src="logo.png" alt="logo" className="h-8 w-8" />
              Grokscreener
            </div>
            <button onClick={toggleMobile} className="lg:hidden text-white">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* 🌐 Nav Links */}
          <nav className={`flex-col lg:flex-row lg:flex gap-6 items-center mt-3 lg:mt-0 ${mobileOpen ? 'flex' : 'hidden'} lg:flex`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMobile}
                className="flex items-center gap-2 hover:text-blue-400 text-sm font-medium"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {/* 🌍 Social Icons & Wallet */}
            <div className="flex items-center gap-3 ml-4">
              <a
                href="https://x.com/GrokDex_Eth"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
                title="Twitter"
              >
                <svg viewBox="0 0 512 512" height="18" width="18" fill="currentColor">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </a>
              <a
                href="https://t.me/GrokDexERC"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
                title="Telegram"
              >
                <svg viewBox="0 0 448 512" height="18" width="18" fill="currentColor">
                  <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
                title="Discord"
              >
                <svg viewBox="0 0 640 512" height="18" width="18" fill="currentColor">
                  <path d="..." />
                </svg>
              </a>

              <button
                onClick={connectWallet}
                title="Connect Wallet"
                className="w-full lg:w-auto bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 text-white text-sm font-semibold text-center"
              >
                {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
              </button>
            </div>
          </nav>
        </header>

        {/* 🔁 Main Content */}
        <main className="px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nft" element={<NFT />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/multicharts" element={<Multichart />} />
            <Route path="/wallet-analyzer" element={<WalletAnalyzer />} />
            <Route path="/swap-page" element={<Swap />} />
            <Route path="/new-pairs" element={<Newpair />} />
          </Routes>
        </main>

        {/* 💬 Chat Popup */}
        {chatOpen && (
          <div className="fixed bottom-4 left-4 bg-white text-black w-80 shadow-lg rounded-lg z-50 flex flex-col">
            <div className="flex justify-between items-center p-3 border-b">
              <h2 className="font-semibold text-lg">ETHIQ AI Chat</h2>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-600 hover:text-red-500"
              >
                ✖
              </button>
            </div>

            <div className="p-3 text-sm bg-purple-100 h-32 overflow-y-auto rounded-b">
              Hi! ETHIQ AI Agent is currently <strong>offline</strong>.
            </div>
            <div className="p-2 border-t bg-purple-200 flex items-center gap-2">
              <input
                type="text"
                className="flex-grow px-3 py-1 rounded-md border border-gray-300 text-sm"
                placeholder="Type your message..."
                disabled
              />
              <button
                className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
                disabled
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
