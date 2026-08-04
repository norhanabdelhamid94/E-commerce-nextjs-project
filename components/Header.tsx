
'use client';
import { Badge } from '@/shared/ui/Badge'
import { filterProduct } from '@/store/cartSlice';
import { useAppSelector } from '@/store/hooks';
import { Package, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';



export const Header = () => {
    const pathname = usePathname();
    const showSearchBar = pathname === '/'
    const items = useAppSelector((state) => state.cart.items)
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("")

    const totalQuantity = items.reduce((acc, curr) => curr.quantity + acc, 0)
    const hideHeaderRoutes = ["/login", "/signup"];
    const shouldHideHeader = hideHeaderRoutes.includes(pathname);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(filterProduct(searchTerm));
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm, dispatch])
      if (shouldHideHeader) {
        return null; 
    }
    return (
     <header
    className="sticky top-0 z-10 backdrop-blur w-full
    flex flex-col sm:flex-row sm:justify-between sm:items-center 
    gap-3 sm:gap-0 py-4 px-4 sm:px-8 lg:px-20 border-b border-athens-gray bg-white"
>
    <div className="flex justify-between items-center w-full sm:w-auto">
        <Link href="/" className="flex gap-2 items-center">
            <Package className="text-red-500" />
            <span>TechStore</span>
        </Link>

        {/* أيقونة الكارت بجانب اللوجو على الموبايل بس */}
        <Link href="/cart" className="relative sm:hidden">
            <ShoppingCart className="h-5 w-5" />
            {totalQuantity > 0 ? (
                <Badge className="bg-red-500 h-5 w-5 text-white text-center text-xs absolute -top-3.5 -right-4">
                    {totalQuantity}
                </Badge>
            ) : null}
        </Link>
    </div>

    <div className="flex gap-4 items-center w-full sm:w-auto">
        {showSearchBar ? (
            <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-santas-gray" />
                <input
                    className="outline-none w-full sm:w-64 lg:w-80 border border-athens-gray py-2
                    pl-8 rounded-md text-sm"
                    placeholder="Search products..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        ) : null}

        {/* أيقونة الكارت على الديسكتوب/التابلت بس */}
        <Link href="/cart" className="relative hidden sm:block">
            <ShoppingCart className="h-5 w-5" />
            {totalQuantity > 0 ? (
                <Badge className="bg-red-500 h-5 w-5 text-white text-center text-xs absolute -top-3.5 -right-4">
                    {totalQuantity}
                </Badge>
            ) : null}
        </Link>
    </div>
</header>
    )
}
