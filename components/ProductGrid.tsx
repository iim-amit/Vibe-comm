"use client"

import ProductCard from "./ProductCard"

export default function ProductGrid({ products, loading, onAddToCart }) {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-secondary rounded-lg h-80 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-foreground mb-2">Discover Our Products</h2>
        <p className="text-muted-foreground">Curated selection of premium tech and accessories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </main>
  )
}
