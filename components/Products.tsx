"use client";
import { addToCart, fetchProducts, fetchTotalProductsCount, setPage } from "@/store/cartSlice";
import { IProduct } from "@/types/product";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import QuantityButton from "./QuantityButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const Products = () => {
    const { filteredProducts, status, error, items, currentPage, hasMore, totalProducts } = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch();
    const router = useRouter()
    const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

    const totalPages = Math.ceil(totalProducts / 12);
    const getVisiblePages = () => { 
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxVisible + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };
    useEffect(() => {
        dispatch(fetchProducts(currentPage));
    }, [dispatch, currentPage]);

    useEffect(() => {
        dispatch(fetchTotalProductsCount()); // ✅ ضيفي الـ useEffect ده
    }, [dispatch]);
    const handleAddToCart = (
        e: React.MouseEvent<HTMLButtonElement>,
        product: IProduct,
    ) => {
        e.stopPropagation();
        dispatch(addToCart({ product, quantity: 1 }));
    }

    if (status === "loading") {
        return <p className="text-center py-10">Loading products...</p>;
    }

    if (status === "failed") {
        return <p className="text-center py-10 text-red-500">{error}</p>;
    }

    const handleProductClick = (id: any) => {
        router.push(`/product/${id}`)
    }
    const handleNextPage = () => {
        dispatch(setPage(currentPage + 1));
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setPage(currentPage - 1));
        }
    };
    return (
        <div className="py-6 px-4 md:px-8 lg:px-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-6 w-full">
                {filteredProducts.map((product, index) => (
                    <div
                        key={product.id}
                        className="rounded-lg shadow-sm border border-athens-gray
                        overflow-hidden flex flex-col cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                    >
                        <div className="aspect-square">
                            <Image
                                src={
                                    failedImages[product.id]
                                        ? "/placeholder-image.svg"
                                        : product.images?.[0] || "/placeholder-image.svg"
                                }
                                width={200}
                                height={200}
                                alt={product.title}
                                className="object-cover h-full w-full"
                                onError={() =>
                                    setFailedImages((prev) => ({ ...prev, [product.id]: true }))
                                }
                                priority={index < 4}
                            />
                        </div>
                        <div className='p-4 flex flex-col grow justify-between'>
                            <div className="flex flex-col gap-1.5">
                                <p
                                    className="text-pale-sky text-xs font-medium 
                                uppercase
                                tracking-wider">
                                    {product.category.name}
                                </p>
                                <h3 className="font-medium leading-tight text-base">
                                    {product.title}</h3>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 mt-4">
                                <p className="text-lg font-semibold text-shark">
                                    ${product.price}
                                </p>
                                {items.some((item) => item.product.id === product.id) ? (
                                    <QuantityButton product={product} />
                                ) : (
                                    <button
                                        className="w-full lg:w-auto font-medium text-sm px-3 border
                                                    border-athens-gray py-2 cursor-pointer
                                                    rounded-md flex items-center justify-center gap-2"
                                        onClick={(e) => handleAddToCart(e, product)}
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filteredProducts.length === 0 ? (
                <div className="flex flex-col gap-4 items-center py-8">
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-pale-sky">
                        Try adjusting your search to find what &apos;re looking for.
                    </p>
                </div>
            ) : null}

            <div className="flex justify-center items-center gap-2 mt-10">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border border-athens-gray cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed hover:bg-athens-gray"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                {getVisiblePages().map((page) => (
                    <button
                        key={page}
                        onClick={() => dispatch(setPage(page))}
                        className={`w-9 h-9 rounded-md text-sm font-medium cursor-pointer ${currentPage === page
                                ? "bg-red-500 text-white"
                                : "border border-athens-gray hover:bg-athens-gray"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={handleNextPage}
                    disabled={!hasMore}
                    className="p-2 rounded-md border border-athens-gray cursor-pointer
                    disabled:opacity-40 disabled:cursor-not-allowed hover:bg-athens-gray"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Products;