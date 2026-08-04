"use client";

import { loginFunction } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { accessToken, error } = useAppSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (accessToken) {
            router.push("/");
        }
    }, [accessToken, router]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            loginFunction({
                email,
                password,
            })
        );
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="flex-1 flex flex-col justify-between p-8 bg-red-500">
                <div className="flex items-center gap-2">
                    <Package className="text-white" />
                    <span className="text-white font-medium">TechStore</span>
                </div>
                <div>
                    <p className="text-2xl font-medium text-white mb-2">
                        اتسوق أحدث المنتجات التقنية في مكان واحد
                    </p>
                    <p className="text-sm text-red-100">
                        آلاف المنتجات، أسعار منافسة، توصيل سريع
                    </p>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-6 h-1 rounded-full bg-white"></div>
                    <div className="w-2 h-1 rounded-full bg-red-300"></div>
                    <div className="w-2 h-1 rounded-full bg-red-300"></div>
                </div>
            </div>

            <div className="flex-1 bg-white flex flex-col justify-center p-12">
                <h1 className="text-2xl font-semibold">تسجيل الدخول</h1>
                <p className="text-sm text-gray-500 mb-6">
                    ادخلي بياناتك عشان تكمّلي التسوق
                </p>

                <form onSubmit={handleLogin} className="flex flex-col">
                    <div className="flex flex-col gap-1 mb-4">
                        <label className="text-sm text-gray-600">
                            البريد الالكتروني
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="border rounded-md px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1 mb-2">
                        <label className="text-sm text-gray-600">
                            كلمة المرور
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="border rounded-md px-4 py-2 outline-none"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-600 mb-4">
                            الإيميل أو كلمة المرور غير صحيحة
                        </p>
                    )}
                    <a href="#" className="text-sm text-red-600 text-left mb-6">
                        نسيتي كلمة المرور؟
                    </a>

                    <button
                        type="submit"
                        className="bg-red-500 text-white rounded-md py-2 cursor-pointer hover:bg-red-600 w-full mb-4"
                    >
                        تسجيل الدخول
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                        معندكيش حساب؟{" "}
                        <a href="/signup" className="text-red-600">
                            اعملي حساب جديد
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;