import './globals.css';

export const metadata = {
  title: 'GameZone - Ultimate Gaming Platform',
  description: 'Cheza michezo mizuri zaidi mtandaoni',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sw">
      <body className="bg-[#f7f3ee] text-gray-800 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

