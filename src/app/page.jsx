'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Home() {
  const [games, setGames] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubGames = onSnapshot(collection(db, "games"), (snapshot) => {
      setGames(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubNotifs = onSnapshot(collection(db, "notifications"), (snapshot) => {
      setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubGames();
      unsubNotifs();
    };
  }, []);

  return (
    <main className="min-h-screen bg-cream-bg text-cream-dark p-4 md:p-8 font-sans">
      {notifications.length > 0 && (
        <div className="max-w-6xl mx-auto mb-6 bg-cream-accent/40 border border-cream-accent text-cream-dark px-6 py-3 rounded-full text-sm font-medium shadow-sm">
          <span>🔔 <strong>Taarifa Mpya:</strong> {notifications[notifications.length - 1].message}</span>
        </div>
      )}

      <nav className="flex justify-between items-center bg-[#2d2826] text-white px-8 py-4 rounded-full shadow-lg max-w-6xl mx-auto">
        <h1 className="text-xl font-extrabold tracking-wider text-cream-accent">GAME<span className="text-white">ZONE</span></h1>
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest">
          <a href="#" className="hover:text-cream-accent transition">HOME</a>
          <a href="#games" className="hover:text-cream-accent transition">GAMES</a>
        </div>
        <a href="/admin" className="bg-cream-accent text-gray-900 px-5 py-2 rounded-full text-xs font-extrabold hover:bg-white transition shadow-md">
          ADMIN
        </a>
      </nav>

      <section className="max-w-6xl mx-auto mt-8 bg-cream-card rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-sm">
        <div className="max-w-xl z-10">
          <span className="bg-white text-cream-dark text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Ultimate Gaming
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-4 text-cream-dark leading-tight">
            Explore the Best Games in One Place.
          </h2>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Furahia michezo mizuri ya kisasa moja kwa moja kupitia kivinjari chako.
          </p>
        </div>
        <div className="mt-8 md:mt-0 text-8xl bg-white/60 p-10 rounded-full shadow-inner">
          🕹️
        </div>
      </section>

      <section id="games" className="max-w-6xl mx-auto mt-16">
        <h3 className="text-2xl font-black text-cream-dark mb-8">🔥 Michezo Inayopatikana</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.length > 0 ? (
            games.map((game) => (
              <div key={game.id} className="bg-white p-6 rounded-[2rem] shadow-xs border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="w-24 h-24 bg-cream-bg rounded-2xl flex items-center justify-center text-4xl mb-4">🎮</div>
                <h4 className="font-bold text-lg text-cream-dark mb-1">{game.title}</h4>
                <a href={game.link} target="_blank" rel="noopener noreferrer" className="w-full mt-4 bg-cream-card text-cream-dark font-bold py-3 rounded-xl hover:bg-cream-dark hover:text-white transition text-xs uppercase block">
                  Play Now
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-[2rem] border border-gray-100">
              <p className="text-gray-400 text-sm">Hakuna michezo iliyopakiwa bado. Tumia /admin kuongeza.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
