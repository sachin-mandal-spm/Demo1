import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/auth.store';
import { LoginRequest } from '../types/auth';
import { cn } from '../lib/utils';

export const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (data: LoginRequest) => {
        setIsLoading(true);
        setError('');
        try {
            await login(data);
            navigate('/');
        } catch (err) {
            setError('Invalid username or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left Side - Hero Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-slate-900/40 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20" />

                <div className="relative z-20 text-white p-12 max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-primary-600/20 rounded-xl backdrop-blur-sm border border-primary-500/30">
                                <Building2 className="w-8 h-8 text-primary-400" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">SPM Associates</h1>
                        </div>

                        <h2 className="text-5xl font-bold mb-6 leading-tight">
                            Build the Future <br />
                            <span className="text-primary-400">With Confidence</span>
                        </h2>

                        <p className="text-slate-400 text-lg leading-relaxed">
                            Manage your construction projects, workforce, and finances with an enterprise-grade solution designed for scale.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
                        <p className="mt-2 text-slate-600">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        {...register('username', { required: 'Username is required' })}
                                        className={cn(
                                            "input-field pl-10",
                                            errors.username && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                        )}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                {errors.username && (
                                    <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="password"
                                        {...register('password', { required: 'Password is required' })}
                                        className={cn(
                                            "input-field pl-10",
                                            errors.password && "border-red-500 focus:ring-red-500 focus:border-red-500"
                                        )}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary flex items-center justify-center gap-2 py-2.5 text-base"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500">
                        Don't have an account?{' '}
                        <a href="#" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                            Contact Administrator
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
