'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Replace with your preferred icon import, e.g. react-icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Home() {
  type Product = { name: string; price: number; image?: string; };

  const defaultProducts: Product[] = [
    { name: 'Classic Hoodie', price: 1299, image: 'https://i.pinimg.com/736x/82/d4/d4/82d4d4a14abfd08114d60400738b23bd.jpg' },
    { name: 'Premium Hoodie', price: 1499, image: 'https://i.pinimg.com/1200x/6a/bf/1e/6abf1e076f5c0a887cce55d67c0196af.jpg' },
    { name: 'Stylish Beige Hoodie', price: 1399, image: 'https://i.pinimg.com/1200x/b5/81/cb/b581cb893bd4d85dd3729702516adcbc.jpg' },
    {
      name: 'Steep AJ Hoodie',
      price: 1599,
      image: 'https://i.pinimg.com/1200x/3b/0c/4e/3b0c4e4faf56c7e478ea6691dea29d27.jpg',
    },
    {
      name: 'Nikton Hoodie',
      price: 2399,
      image: 'https://i.pinimg.com/1200x/c7/f0/69/c7f069ba8881f8bd6c4771c8dda6d6ec.jpg',
    },
  ];

  const defaultHero = { tagline: 'Limited Edition Hoodies. Drop Yours Today.', background: '/videos/hero.mp4' };
  const [products, setProducts] = useState<Product[]>([]);
  const [hero, setHero] = useState(defaultHero);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const countdownDate = new Date('2025-12-31T23:59:59').getTime();
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = countdownDate - now;
      if (diff <= 0) {
        clearInterval(timer);
        return setTimeLeft('Sale Ended');
      }
      const d = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor((diff % (1000*60*60*24))/(1000*60*60));
      const m = Math.floor((diff % (1000*60*60))/(1000*60));
      const s = Math.floor((diff % (1000*60))/1000);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('hoodieData') || '{}');
    const extra = stored.products || [];
    setProducts([...defaultProducts, ...extra]);
    setHero({ tagline: stored.hero?.tagline || defaultHero.tagline, background: stored.hero?.background || defaultHero.background });
  }, []);

  const isVideo = hero.background.endsWith('.mp4');

  const PrevArrow = ({ onClick }: any) => (
    <button onClick={onClick} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200">
      <FaChevronLeft />
    </button>
  );
  const NextArrow = ({ onClick }: any) => (
    <button onClick={onClick} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200">
      <FaChevronRight />
    </button>
  );

  const sliderSettings = {
    centerMode: true,
    centerPadding: '150px',
    slidesToShow: 3,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    focusOnSelect: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, centerPadding: '100px' } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: '50px' } }
    ]
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden flex items-center justify-center">
        {isVideo ? (
          <video src={hero.background} autoPlay muted loop className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div style={{ backgroundImage: `url(${hero.background})` }} className="absolute inset-0 bg-cover bg-center" />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <Typewriter options={{ strings: [hero.tagline, 'Only This Season', 'Get Yours Now'], autoStart: true, loop: true }} />
          </h1>
          <p className="mb-4 text-lg font-semibold">{timeLeft && `⏰ ${timeLeft}`}</p>
          <a href="#products" className="bg-white text-black px-6 py-3 font-semibold rounded-full shadow hover:bg-gray-200 transition">
            🛍️ Shop Now
          </a>
        </div>
      </section>

      {/* Featured 3D Carousel */}
      <section className="	bg-yellow-50 py-16 px-4 w-full relative">


        <h2 className="text-3xl font-bold text-center mb-10">Featured Hoodies</h2>
        <Slider {...sliderSettings}>
          {defaultProducts.map((item, i) => (
            <motion.div
              key={i}
              className="px-4"
              animate={{
                scale: [0.8, 1.1, 0.8],
                rotateY: [0, 20, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-[4/3] flex items-center justify-center bg-gray-50">
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </section>

      {/* All products */}
      <section id="products" className="py-20 px-4 max-w-7xl mx-auto bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-14">Our Hoodies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 1.02 }} className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform">
              <div className="aspect-[3/4]  // taller cards
 overflow-hidden rounded-t-2xl">

                {p.image ?   <img
    src={p.image}
    alt={p.name}
    className="w-full h-full object-cover"
  />
 : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-4 text-center space-y-2">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-base font-medium text-gray-700">₹{p.price}</p>
                <a href={`https://wa.me/?text=I want to order: ${p.name}`} className="block bg-black text-white py-2 rounded-xl shadow hover:bg-gray-800 transition">🛒 Order Now</a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center mt-10">
        <p>Follow us on <a href="https://instagram.com/yourbrand" className="underline">Instagram</a></p>
        <p className="text-sm mt-2">© 2025 Hoodie Brand</p>
      </footer>
    </main>
  );
}
