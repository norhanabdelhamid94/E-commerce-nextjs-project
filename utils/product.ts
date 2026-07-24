import { IProduct } from "@/types/product";

const PRODUCTS: IProduct[] = [
    {
        id: "1",
        name: "Wireless Noise-Cancelling Headphones",
        description:
            "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.",
        price: 249.99,
        image:
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80",
        category: "Audio",
    },
    {
        id: "2",
        name: "Mechanical Gaming Keyboard",
        description:
            "RGB backlit mechanical keyboard with hot-swappable switches, aluminum frame, and dedicated media controls.",
        price: 129.99,
        image:
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80",
        category: "Accessories",
    },
    {
        id: "3",
        name: "4K Ultra HD Webcam2",
        description:
            "Professional 4K webcam with auto-focus, built-in ring light, and dual noise-cancelling microphones.",
        price: 89.99,
        image:
            "https://images.unsplash.com/photo-1762681290673-ba1ad4ea0875?w=500&q=80",
        category: "Accessories",
    },
    {
        id: "4",
        name: "4K Ultra HD Webcam",
        description:
            "Professional 4K webcam with auto-focus, built-in ring light, and dual noise-cancelling microphones.",
        price: 89.99,
        image:
            "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&q=80",
        category: "Accessories",
    },
    {
        id: "5",
        name: "Portable SSD 1TB",
        description:
            "Ultra-fast portable SSD with 1TB storage, USB-C connectivity, and shock-resistant aluminum housing.",
        price: 119.99,
        image:
            "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&q=80",
        category: "Storage",
    },
    {
        id: "6",
        name: "Smart Fitness Watch",
        description:
            "Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and a 7-day battery life.",
        price: 199.99,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        category: "Wearables",
    },
    {
        id: "7",
        name: "Bluetooth Portable Speaker",
        description:
            "Compact waterproof Bluetooth speaker with 360° sound, 20-hour playtime, and built-in power bank.",
        price: 79.99,
        image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
        category: "Audio",
    },
    {
        id: "8",
        name: "Curved Gaming Monitor 27\"",
        description:
            "Immersive 27-inch curved gaming monitor with 165Hz refresh rate, 1ms response time, QHD resolution, and AMD FreeSync.",
        price: 349.99,
        image:
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
        category: "Monitors",
    },
];

const findProductById = (id: string) => {
    return PRODUCTS.find((product) => product.id === id);
};

export { PRODUCTS, findProductById };