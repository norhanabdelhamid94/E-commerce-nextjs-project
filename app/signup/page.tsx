"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signUpFunction } from "@/store/authSlice";
// import { registerFunction } from "@/store/authSlice"; // ✅ هنعملها دلوقتي

const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, loading, error } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            router.push("/login");
        }
    }, [user, router]);

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        setPasswordMismatch(false);

        dispatch(
            signUpFunction({
                name,
                email,
                password,
                avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
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
                        اتسوقي أحدث المنتجات التقنية في مكان واحد
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
                <h1 className="text-2xl font-semibold">إنشاء حساب جديد</h1>
                <p className="text-sm text-gray-500 mb-6">
                    سجلي بياناتك عشان تبدئي التسوق
                </p>

                <form onSubmit={handleSignUp} className="flex flex-col">
                    <div className="flex flex-col gap-1 mb-4">
                        <label className="text-sm text-gray-600">
                            اسم المستخدم
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="border rounded-md px-4 py-2 outline-none"
                        />
                    </div>

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

                    <div className="flex flex-col gap-1 mb-4">
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

                    <div className="flex flex-col gap-1 mb-2">
                        <label className="text-sm text-gray-600">
                            تأكيد كلمة المرور
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="border rounded-md px-4 py-2 outline-none"
                        />
                    </div>
                    {passwordMismatch && (
                        <p className="text-sm text-red-600 mb-4">
                            كلمة المرور غير متطابقة
                        </p>
                    )}

                    {error && (
                        <p className="text-sm text-red-600 mb-4">{error}</p>
                    )}
                       <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-500 text-white rounded-md py-2 cursor-pointer hover:bg-red-600 w-full mb-4 mt-4 disabled:opacity-50"
                    >
                        {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                        عندك حساب بالفعل؟{" "}
                        <a href="/login" className="text-red-600">
                            سجلي دخول
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;