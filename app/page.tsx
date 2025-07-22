'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  type Product = {
  name: string;
  price: number;
  image?: string;
};

const [products, setProducts] = useState<Product[]>([]);

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
    backgroundImage: hero.background ? `url(${hero.background})` : 'url(/default-hero.jpg)',
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10 text-center px-6 max-w-3xl text-white">
    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-md">
      {hero.tagline || 'Premium Comfort. Minimal Aesthetic. Limited Drops.'}
    </h1>

    <a
      href="#products"
      className="inline-block bg-white text-black px-6 py-3 text-lg font-semibold rounded-full shadow hover:bg-gray-200 transition"
    >
      🛍️ Shop Now
    </a>
  </div>
</section>



      {/* Product Section */}
      <section id="products" className="py-20 px-4 max-w-7xl mx-auto bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-14">Our Hoodies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p: any, idx: number) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="w-full aspect-[4/3]">
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

              {/* Order Now Button in visible black box */}
              <div className="flex justify-center mt-4 px-6">
                <div className="bg-black text-white px-6 py-3 rounded-xl shadow-lg text-center w-full">
                  <a
                    href={`https://wa.me/?text=I want to order: ${p.name}`}
                    className="font-semibold text-base block hover:text-gray-300 transition"
                  >
                    🛒 Order Now
                  </a>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col items-center text-center px-6 py-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
                <p className="text-base font-medium text-gray-700">₹{p.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center mt-10">
        <p>
          Follow us on{' '}
          <a href="https://instagram.com/yourbrand" className="underline">
            Instagram
          </a>
        </p>
        <p className="text-sm mt-2">© 2025 Hoodie Brand</p>
      </footer>
    </main>
  );
}
