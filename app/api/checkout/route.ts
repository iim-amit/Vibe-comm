import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { customerName, customerEmail, cartItems } = await req.json()

  if (!customerName || !customerEmail || !cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: "Invalid checkout data" }, { status: 400 })
  }

  const total = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
  const orderId = `ORD-${Date.now()}`
  const timestamp = new Date().toISOString()

  // Mock receipt
  const receipt = {
    orderId,
    customerName,
    customerEmail,
    items: cartItems,
    total,
    timestamp,
    status: "confirmed",
  }

  return NextResponse.json(receipt)
}
