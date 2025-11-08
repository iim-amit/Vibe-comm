import { NextResponse } from "next/server"

const cart: any[] = []

export async function GET() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return NextResponse.json({ items: cart, total })
}

export async function POST(req: Request) {
  const { productId, quantity } = await req.json()

  // Mock product database
  const PRODUCTS = [
    { id: 1, name: "Premium Wireless Headphones", price: 129.99, image: "/wireless-headphones.png" },
    { id: 2, name: "USB-C Hub Pro", price: 49.99, image: "/usb-hub.png" },
    { id: 3, name: "Portable SSD 1TB", price: 89.99, image: "/portable-ssd.jpg" },
    { id: 4, name: "Mechanical Keyboard RGB", price: 159.99, image: "/mechanical-keyboard.png" },
    { id: 5, name: "Webcam 4K Ultra", price: 119.99, image: "/4k-webcam.png" },
    { id: 6, name: "Phone Stand Adjustable", price: 24.99, image: "/phone-stand.jpg" },
    { id: 7, name: "Wireless Power Bank", price: 59.99, image: "/portable-power-bank.png" },
    { id: 8, name: "Monitor Light Bar", price: 99.99, image: "/monitor-light.jpg" },
  ]

  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  // Check if item already in cart
  const existingItem = cart.find((item) => item.id === productId)
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return NextResponse.json({ items: cart, total })
}
