'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  type Product = {
    name: string;
    price: number;
    image?: string;
    description?: string;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [hero, setHero] = useState({ tagline: '', background: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('hoodieData') || '{}');
    setProducts(stored.products || []);
    setHero(stored.hero || { tagline: '', background: '' });
  }, []);

  const saveData = () => {
    localStorage.setItem('hoodieData', JSON.stringify({ products, hero }));
    alert('Saved!');
  };

  const addProduct = () => {
    setProducts([...products, { name: '', price: 0, image: '', description: '' }]);
  };

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    const updated = [...products];
    if (field === 'price') {
      updated[index][field] = Number(value);
    } else {
      updated[index][field] = value;
    }
    setProducts(updated);
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Hero Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Hero Section</h2>
        <input
          className="w-full border mb-2 p-2"
          placeholder="Tagline"
          value={hero.tagline}
          onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
        />
        <input
          className="w-full border p-2"
          placeholder="Background Image URL"
          value={hero.background}
          onChange={(e) => setHero({ ...hero, background: e.target.value })}
        />
      </section>

      {/* Products Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        {products.map((p, i) => (
          <div key={i} className="border p-4 mb-4 rounded-lg bg-white shadow">
            <input
              className="w-full border mb-2 p-1"
              placeholder="Name"
              value={p.name}
              onChange={(e) => updateProduct(i, 'name', e.target.value)}
            />
            <input
              className="w-full border mb-2 p-1"
              placeholder="Price"
              type="number"
              value={p.price}
              onChange={(e) => updateProduct(i, 'price', e.target.value)}
            />
            <input
              className="w-full border mb-2 p-1"
              placeholder="Image URL"
              value={p.image}
              onChange={(e) => updateProduct(i, 'image', e.target.value)}
            />
            <textarea
              className="w-full border p-1"
              placeholder="Description"
              value={p.description}
              onChange={(e) => updateProduct(i, 'description', e.target.value)}
            />
            <button
              onClick={() =>
                setProducts(products.filter((_, idx) => idx !== i))
              }
              className="mt-2 text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
        <button
          onClick={addProduct}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add Product
        </button>
      </section>

      <button
        onClick={saveData}
        className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700"
      >
        Save All
      </button>
    </main>
  );
}
