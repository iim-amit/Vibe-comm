import { NextResponse } from "next/server"

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    description: "High-quality sound with active noise cancellation",
    stock: 15,
    image: "/wireless-headphones.png",
  },
  {
    id: 2,
    name: "USB-C Hub Pro",
    price: 49.99,
    description: "7-in-1 multiport adapter with HDMI and USB ports",
    stock: 25,
    image: "/usb-hub.png",
  },
  {
    id: 3,
    name: "Portable SSD 1TB",
    price: 89.99,
    description: "Fast external storage with 550MB/s transfer speed",
    stock: 12,
    image: "/portable-ssd.jpg",
  },
  {
    id: 4,
    name: "Mechanical Keyboard RGB",
    price: 159.99,
    description: "Wireless mechanical keyboard with customizable RGB lighting",
    stock: 8,
    image: "/mechanical-keyboard.png",
  },
  {
    id: 5,
    name: "Webcam 4K Ultra",
    price: 119.99,
    description: "4K resolution with auto-focus and built-in microphone",
    stock: 18,
    image: "/4k-webcam.png",
  },
  {
    id: 6,
    name: "Phone Stand Adjustable",
    price: 24.99,
    description: "Aluminum stand compatible with all smartphones and tablets",
    stock: 40,
    image: "/phone-stand.jpg",
  },
  {
    id: 7,
    name: "Wireless Power Bank",
    price: 59.99,
    description: "20000mAh with wireless charging and fast charging",
    stock: 22,
    image: "/portable-power-bank.png",
  },
  {
    id: 8,
    name: "Monitor Light Bar",
    price: 99.99,
    description: "Smart screen light with auto-dimming and color temperature control",
    stock: 10,
    image: "/monitor-light-bar.jpg",
  },
]

const cartData: Record<string, { items: any[]; userId: string }> = {}

export async function GET() {
  return NextResponse.json(MOCK_PRODUCTS)
}
