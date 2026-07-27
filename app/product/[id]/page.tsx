"use client";

import QuantityButton from "@/components/QuantityButton";
import { addToCart, fetchProductById } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProductDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        selectedProduct: product,
        items,
        status,
        error,
    } = useAppSelector((state) => state.cart);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id as string));
        }
    }, [dispatch, id]);

    const handleAddToCart = () => {
        if (!product) return;

        dispatch(
            addToCart({
                product,
                quantity: 1,
            })
        );
    };

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <h1 className="text-2xl font-semibold">Loading...</h1>
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
                <h1 className="text-2xl font-bold">
                    {error || "Something went wrong"}
                </h1>

                <Link
                    href="/"
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                    Back to Products
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
                <h1 className="text-2xl font-bold">
                    Product not found
                </h1>

                <Link
                    href="/"
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="py-8 max-w-7xl mx-auto px-4">
            <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>

            <div className="flex flex-col lg:flex-row gap-10 mt-8">
                <div className="flex-1">
                    <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                        <Image
                            src={
                                product.images?.[0] ||
                                "/placeholder-image.svg"
                            }
                            alt={product.title}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <p className="uppercase text-sm tracking-wider text-red-500 font-medium">
                        {product.category?.name}
                    </p>

                    <h1 className="text-4xl font-bold mt-2">
                        {product.title}
                    </h1>

                    <p className="text-3xl font-bold mt-5">
                        ${product.price}
                    </p>

                    <p className="mt-6 leading-8 text-gray-600">
                        {product.description}
                    </p>

                    <div className="flex gap-4 mt-8">
                        {items.some(
                            (item) => item.product.id === product.id
                        ) ? (
                            <QuantityButton product={product} />
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-red-500 text-white rounded-md py-3 flex items-center justify-center gap-2 hover:bg-red-600 transition"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        )}

                        <button
                            onClick={() => router.push("/cart")}
                            className="flex-1 border rounded-md py-3 hover:bg-gray-100 transition"
                        >
                            View Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;