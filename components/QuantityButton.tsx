import { addToCart, removeFromCart } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hooks";
import { IProduct } from "@/types/product";
import { Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";



const QuantityButton = ({ product }: { product: IProduct }) => {
    const dispatch = useDispatch();

    const items = useAppSelector((state) => state.cart.items);

    const selectedItem = items.find((item) => item.product.id === product.id);

    const handleMinusButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(removeFromCart({ productId: product.id, quantity: 1 }))
    }
    const handleAddButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(addToCart({ product, quantity: 1 }))
    }
    return (
        <div className="rounded-lg border border-athens-gray flex items-center
        justify-between max-w-28">
            <button
                className="font-medium text-xs rounded-md w-9 h-9
                cursor-pointer flex justify-center items-center hover:bg-red-500
                hover:text-white rounded-r-none"
                onClick={handleMinusButton}
            >
                <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 tabular-nums text-base font-medium text-center">{selectedItem?.quantity}</span>
            <button
                className="font-medium text-xs rounded-md w-9 h-9
                cursor-pointer flex justify-center items-center hover:bg-red-500
                hover:text-white rounded-l-none"
                onClick={handleAddButton}
            >
                <Plus className="h-4 w-4" />
            </button>
        </div>
    );
};

export default QuantityButton;