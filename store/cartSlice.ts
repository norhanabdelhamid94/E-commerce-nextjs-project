
""
import { IProduct } from "@/types/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartItem {
    product: IProduct;
    quantity: number;
}

interface ICartState {
    items: ICartItem[];
    products: IProduct[];
    filteredProducts: IProduct[];
    selectedProduct: IProduct | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ICartState = {
    items: [],
    products: [],
    filteredProducts: [],
    selectedProduct: null,
    status: "idle",
    error: null,
};


export const fetchProductById = createAsyncThunk(
    "cart/fetchProductById",
    async (id: string) => {
        const response = await fetch(
            `https://api.escuelajs.co/api/v1/products/${id}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }

        const data: IProduct = await response.json();        
        return data;
    }
);

export const fetchProducts = createAsyncThunk(
    "cart/fetchProducts",
    async () => {
        const response = await fetch(
            "https://api.escuelajs.co/api/v1/products",
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data: IProduct[] = await response.json();        
        return data;
    }
);

const cartSlice = createSlice({
    initialState,
    name: 'cart',
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity } = action.payload;
            const existingItemIndex = state.items.findIndex(
                (item) => item.product.id === product.id
            );

            if (existingItemIndex >= 0) {
                state.items[existingItemIndex].quantity += quantity;
            } else {
                state.items.push({ product, quantity });
            }
        },
        removeFromCart: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingItemIndex = state.items.findIndex(
                (item) => item.product.id === productId
            );
            if (existingItemIndex === 1) return;

            const existingItem = state.items[existingItemIndex];
            if (existingItem.quantity > quantity) {
                existingItem.quantity -= quantity;
            } else {
                state.items.splice(existingItemIndex, 1);
            }
        },
        filterProduct: (state, action: PayloadAction<string>) => {
            const searchTerm = action.payload;

             state.filteredProducts = state.products.filter((item) =>
                item.title?.toLowerCase().includes(searchTerm) ||
                item.category?.name?.toLowerCase().includes(searchTerm)
            );
        },
    },

        extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
                state.filteredProducts = action.payload; 
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Something went wrong";
            })

            .addCase(fetchProductById.pending, (state) => {
            state.status = "loading";
            state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Product not found";
            });
   },
});

export const { addToCart, removeFromCart, filterProduct } = cartSlice.actions;
export default cartSlice.reducer;