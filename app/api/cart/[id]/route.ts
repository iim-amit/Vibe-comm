import { NextResponse } from "next/server"

let cart: any[] = []

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const itemId = Number.parseInt(params.id)
  cart = cart.filter((item) => item.id !== itemId)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return NextResponse.json({ items: cart, total })
}
