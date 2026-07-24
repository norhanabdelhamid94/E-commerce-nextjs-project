
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

       useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(filterProduct(searchTerm));
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm, dispatch])
    return (
        <header
            className="sticky top-0 z-10 backdrop-blur w-full
            flex justify-between py-6 px-20 border-b border-athens-gray"
        >
            <Link href="/" className="flex gap-2">
                <Package className="text-red-500" />
                <span>TechStore</span>
            </Link>
            <div className="flex gap-4 items-center">
                {showSearchBar ?
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-4
                        w-4 text-santas-gray"
                        />
                        <input
                            className="outline-none w-80 border border-athens-gray py-2
                        pl-8 rounded-md text-sm"
                            placeholder="Search products..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    : null}

                <Link href="/cart" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {totalQuantity > 0 ? (
                        <Badge className="bg-red-500 h-5 w-5 text-white 
                    text-center text-xs absolute -top-3.5 -right-4">{totalQuantity}</Badge>) : null}
                </Link>
            </div>
        </header>
    )
}
