'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  type Product = {
    name: string;
    price: number;
    image?: string;
  };

  // ✅ Hardcoded hoodie products for demo
  const [products] = useState<Product[]>([
    {
      name: 'Classic Hoodie',
      price: 1299,
      image: 'https://i.pinimg.com/736x/82/d4/d4/82d4d4a14abfd08114d60400738b23bd.jpg',
    },
    {
      name: 'Premium  Hoodie',
      price: 1499,
      image: 'https://i.pinimg.com/1200x/6a/bf/1e/6abf1e076f5c0a887cce55d67c0196af.jpg',
    },
    {
      name: 'Stylish Beige Hoodie',
      price: 1399,
      image: 'https://i.pinimg.com/1200x/b5/81/cb/b581cb893bd4d85dd3729702516adcbc.jpg',
    },

     { name: 'Steep AJ Hoodie',
      price: 1599,
      image: 'https://i.pinimg.com/1200x/3b/0c/4e/3b0c4e4faf56c7e478ea6691dea29d27.jpg',},

      {name: 'Nikton Hoodie',
      price: 2399,
      image: 'https://i.pinimg.com/1200x/c7/f0/69/c7f069ba8881f8bd6c4771c8dda6d6ec.jpg',
    },
  ]);

  // ✅ Hardcoded hero section (optional)
  const hero = {
    tagline: 'Limited Edition Hoodies. Drop Yours Today.',
    background:
      'https://i.pinimg.com/1200x/62/32/06/6232061577e1bc074fa0aafa6550d924.jpg',
  };

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero.background})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-md">
            {hero.tagline}
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
          {products.map((p, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
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
