"use client";

import QuantityButton from "@/components/QuantityButton";
import { removeFromCart } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hooks";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";


const Cart = () => {
    const items = useAppSelector((state) => state.cart.items);
    const { accessToken } = useAppSelector(
        (state) => state.auth
    );
    const router = useRouter()
    const dispatch = useDispatch()
    const subtotal = items.reduce((acc, item) => acc + item.product.price *
        item.quantity, 0);

    const taxRate = subtotal * 0.8;

    if (!items.length) {
        return (
            <div className="flex flex-col items-center gap-4 py-16">
                <div
                    className="h-24 w-24 rounded-full bg-athens-gray flex items-center
                    justify-center"
                >
                    <ShoppingBag className="h-12 w-12 text-pale-sky" />
                </div>
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <p className="text-pale-sky">
                    Looks like you haven&apos;t added anything to your cart yet.
                </p>
                <Link
                    href="/"
                    className="bg-red-500 text-white text-sm font-medium
                    py-2.5 px-4 rounded-md flex gap-2 mt-2 items-center"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const handleRemove = (productId: number, quantity: number) => {
        dispatch(removeFromCart({ productId, quantity }))
    }

    const handleCheckout = () => {
        if (!accessToken) {
            router.push("/login");
        } else {
            router.push("/checkout");
        }
    };
    return (
        <div className="py-8 max-w-7xl m-auto">
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
            <p className="text-pale-sky mt-2">{items.length} items in your cart</p>

            <div className="mt-8 grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div className="rounded-lg border p-6 flex flex-col gap-4">
                        {items.map(({ product, quantity }) => (
                            <div
                                key={product.id}
                                className="flex gap-4 pb-6 border-b
                                last:border-b-0 last:pb-0"
                            >
                                <div className="h-24 w-24 rounded-lg 
                                overflow-hidden cursor-pointer"
                                    onClick={() =>
                                        router.push(`/product/${product.id}`)}>
                                    <Image
                                        src={product.images[0]}
                                        width={96}
                                        height={96}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h3 className="font-medium leading-tight">{product.title}</h3>
                                    <p className="text-sm text-pale-sky">{product.price} each</p>
                                    <QuantityButton product={product} />
                                </div>
                                <div className="flex justify-between flex-col ml-auto">
                                    <p className="text-right font-semibold">
                                        ${(product.price * quantity).toLocaleString()}
                                    </p>
                                    <button
                                        className="flex items-center gap-2 text-red-500
                                        cursor-pointer"
                                        onClick={() =>

                                            handleRemove(product.id, quantity)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link href="/" className="flex items-center mt-6 gap-2 font-medium
                text-sm">
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                    </Link>
                </div>

                <div className="rounded-lg border shadow-sm sticky p-6 flex gap-4
                    flex-col top-24 h-fit">
                    <h1 className="tracking-tight text-2xl font-semibold leading-none">
                        Order Summary
                    </h1>
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex justify-between">
                            <span className="text-pale-sky">Subtotal</span>
                            <span className="font-medium">{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-pale-sky">Tax (8%)</span>
                            <span className="font-medium">{taxRate.toLocaleString()}</span>
                        </div>
                        <div className="h-px w-full bg-athens-gray"></div>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${(subtotal + taxRate).toLocaleString()}</span>
                        </div>
                        <button
                            className="bg-red-500 text-white rounded-lg
                        font-medium text-sm py-3 mt-2 cursor-pointer"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
