'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [hero, setHero] = useState({ tagline: '', background: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('hoodieData') || '{}');
    setProducts(stored.products || []);
    setHero(stored.hero || { tagline: '', background: '' });
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: hero.background
            ? `url(${hero.background})`
            : 'url(/default-hero.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-md">
            {hero.tagline ||
              'Premium Comfort. Minimal Aesthetic. Limited Drops.'}
          </h1>
          <a
            href="#products"
            className="inline-block bg-white text-black px-6 py-3 text-lg font-semibold rounded-full shadow hover:bg-gray-200 transition"
          >
            🛍️ Shop Now
          </a>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Our Hoodies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p: any, idx: number) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl border shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Content */}
              <div className="p-5 text-center space-y-2">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-gray-600">₹{p.price}</p>
                <a
                  href={`https://wa.me/?text=I want to order: ${p.name}`}
                  className="inline-block mt-2 bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
                >
                  🛒 Order Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center">
        <p>
          Follow us on{' '}
          <a
            href="https://instagram.com/yourbrand"
            className="underline hover:text-gray-300"
          >
            Instagram
          </a>
        </p>
        <p className="text-sm mt-2">© 2025 Hoodie Brand</p>
      </footer>
    </main>
  );
}
