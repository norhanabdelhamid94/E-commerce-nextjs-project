"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductById, addToCart } from "@/store/cartSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { selectedProduct, status, error, items } = useAppSelector(
        (state) => state.cart
    );

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id as string));
            setCurrentImageIndex(0);
        }
    }, [id, dispatch]);

    const handleAddToCart = () => {
        if (selectedProduct) {
            dispatch(addToCart({ product: selectedProduct, quantity: 1 }));
        }
    };

    if (status === "loading") {
        return <p className="text-center py-16">Loading product...</p>;
    }

    if (status === "failed" || !selectedProduct) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 mt-16">
                <h1 className="text-2xl font-bold">Product not found</h1>
                <p className="text-pale-sky">
                    The product you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link
                    href="/"
                    className="text-sm font-medium py-2 px-4 rounded-md bg-red-500 text-white mt-6"
                >
                    Back to Products
                </Link>
            </div>
        );
    }

    const product = selectedProduct;
    const images = product.images?.length ? product.images : ["/placeholder-image.svg"];
    const isInCart = items.some((item) => item.product.id === product.id);

    const goToPrevious = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="py-8 px-4 lg:px-0 max-w-7xl m-auto">
            <Link
                href="/"
                className="flex items-center justify-center gap-2 font-medium text-sm w-fit"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>

            {/* ✅ عمودي على الموبايل، أفقي على الديسكتوب */}
            <div className="flex flex-col lg:flex-row gap-8 mt-6 w-full">
                {/* الكاروسيل */}
                <div className="flex-1 flex flex-col gap-3">
                    <div className="relative aspect-square overflow-hidden rounded-2xl w-full h-auto lg:h-[36.5rem]">
                        <Image
                            src={images[currentImageIndex]}
                            fill
                            alt={`${product.title} - image ${currentImageIndex + 1}`}
                            className="object-cover"
                        />

                        {images.length > 1 && (
                            <button
                                onClick={goToPrevious}
                                className="absolute left-3 top-1/2 -translate-y-1/2
                                bg-white/80 hover:bg-white rounded-full p-2
                                shadow-md cursor-pointer transition"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                        )}

                        {images.length > 1 && (
                            <button
                                onClick={goToNext}
                                className="absolute right-3 top-1/2 -translate-y-1/2
                                bg-white/80 hover:bg-white rounded-full p-2
                                shadow-md cursor-pointer transition"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="flex justify-center gap-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`h-2 rounded-full transition-all cursor-pointer ${
                                        index === currentImageIndex
                                            ? "w-6 bg-red-500"
                                            : "w-2 bg-athens-gray"
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                    {images.length > 1 && (
                        <div className="flex gap-2 mt-2 overflow-x-auto">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`h-16 w-16 shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer ${
                                        index === currentImageIndex
                                            ? "border-red-500"
                                            : "border-athens-gray"
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        width={64}
                                        height={64}
                                        alt={`thumbnail ${index + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* تفاصيل المنتج */}
                <div className="flex-1 flex flex-col gap-4">
                    <p className="text-pale-sky text-xs font-medium uppercase tracking-wider">
                        {product.category.name}
                    </p>
                    <h1 className="text-xl lg:text-2xl font-bold leading-tight">
                        {product.title}
                    </h1>
                    <p className="text-xl lg:text-2xl font-semibold text-shark">
                        ${product.price}
                    </p>
                    <p className="text-pale-sky text-sm leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button
                            className="font-medium sm:flex-3 text-sm border border-athens-gray
                            py-2.5 cursor-pointer rounded-md flex items-center justify-center
                            gap-2 shadow-xs bg-red-500 text-white"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {isInCart ? "Added to Cart" : "Add to Cart"}
                        </button>
                        <button
                            className="font-medium sm:flex-1 text-sm border border-athens-gray
                            py-2.5 sm:py-0 cursor-pointer rounded-md shadow-xs"
                            onClick={() => router.push("/cart")}
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