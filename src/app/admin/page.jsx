'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminPanel() {
  const [gameTitle, setGameTitle] = useState('');
  const [gameLink, setGameLink] = useState('');
  const [notification, setNotification] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddGame = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "games"), {
        title: gameTitle,
        link: gameLink,
        createdAt: serverTimestamp()
      });
      setStatusMessage(`Game "${gameTitle}" imehifadhiwa kwenye Firebase!`);
      setGameTitle('');
      setGameLink('');
    } catch (error) {
      setStatusMessage('Kosa limetokea wakati wa kuhifadhi game.');
    }
    setLoading(false);
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "notifications"), {
        message: notification,
        createdAt: serverTimestamp()
      });
      setStatusMessage(`Notisi imetumwa kikamilifu!`);
      setNotification('');
    } catch (error) {
      setStatusMessage('Kosa limetokea wakati wa kutuma notisi.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cream-bg p-6 md:p-12 max-w-4xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-cream-dark">🔒 Admin Dashboard (/admin)</h1>
        <a href="/" className="text-sm font-semibold text-gray-600 hover:text-black">Rudi Nyumbani</a>
      </div>

      {statusMessage && (
        <div className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-3 rounded-xl mb-6 text-sm">
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-4 text-cream-dark">Ongeza Game Mpya</h2>
          <form onSubmit={handleAddGame} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Jina la Game</label>
              <input 
                type="text" 
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-cream-bg border-none text-sm"
                placeholder="Mfano: Car Racing"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Link ya Game (URL)</label>
              <input 
                type="text" 
                value={gameLink}
                onChange={(e) => setGameLink(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-cream-bg border-none text-sm"
                placeholder="https://..."
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-cream-dark text-white py-3 rounded-xl font-bold hover:bg-black transition">
              {loading ? 'Inapakia...' : 'Chapisha kwenye Firebase'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-4 text-cream-dark">Tuma Notisi kwa Wachezaji</h2>
          <form onSubmit={handleSendNotification} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Ujumbe</label>
              <textarea 
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
                required
                rows="4"
                className="w-full p-3 rounded-xl bg-cream-bg border-none text-sm"
                placeholder="Andika taarifa mpya..."
              ></textarea>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-cream-accent text-gray-900 py-3 rounded-xl font-bold hover:bg-cream-dark hover:text-white transition">
              {loading ? 'Inatuma...' : 'Tuma Notisi'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

