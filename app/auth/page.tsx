'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { 
  Mail, 
  Lock, 
  Phone, 
  User, 
  Shield, 
  ArrowRight, 
  Loader2,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  // Real-time validation
  useEffect(() => {
    if (touched.email) validateEmail(formData.email);
    if (touched.phone) validatePhone(formData.phone);
    if (touched.password) validatePassword(formData.password);
    if (touched.confirmPassword) validateConfirmPassword(formData.confirmPassword, formData.password);
    if (!isLogin && touched.fullName) validateFullName(formData.fullName);
  }, [formData, touched, isLogin]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
    } else if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phone && !isLogin) {
      setErrors(prev => ({ ...prev, phone: 'Phone number is required' }));
    } else if (phone && !phoneRegex.test(phone)) {
      setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }));
    } else {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
    } else if (password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
    } else if (!isLogin && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setErrors(prev => ({ ...prev, password: 'Password must contain uppercase, lowercase and number' }));
    } else {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const validateConfirmPassword = (confirm: string, password: string) => {
    if (!isLogin && confirm !== password) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const validateFullName = (name: string) => {
    if (!isLogin && !name) {
      setErrors(prev => ({ ...prev, fullName: 'Full name is required' }));
    } else {
      setErrors(prev => ({ ...prev, fullName: undefined }));
    }
  };

  // Always force login mode for admin
  useEffect(() => {
    if (isAdmin && !isLogin) {
      setIsLogin(true);
    }
  }, [isAdmin, isLogin]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    const allFields = isLogin 
      ? ['email', 'password']
      : ['fullName', 'email', 'phone', 'password', 'confirmPassword'];
    
    const touchedFields = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(touchedFields);

    // Validate all fields
    validateEmail(formData.email);
    validatePassword(formData.password);
    
    if (!isLogin) {
      validateFullName(formData.fullName);
      validatePhone(formData.phone);
      validateConfirmPassword(formData.confirmPassword, formData.password);
    }

    // Check if there are any errors
    if (Object.values(errors).some(error => error !== undefined)) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      if (isAdmin) {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: formData.email, 
            password: formData.password 
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        localStorage.setItem('admin', JSON.stringify(data.admin));
        router.push('/admin/dashboard');
      } else {
        if (isLogin) {
          await signIn(formData.email, formData.password);
        } else {
          await signUp(formData.email, formData.password, formData.fullName, formData.phone);
        }
        router.push('/dashboard');
      }
    } catch (err: any) {
      setErrors({ email: err.message });
    } finally {
      setLoading(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <Section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl"
      >
        {/* Glass morphism card */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20"
            animate={{
              x: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <div className="relative p-8">
            <div className="flex justify-start mb-4">
              <Link href="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
                <ArrowLeft className="w-4 h-4" />
                <span className="underline">Home</span>
              </Link>
            </div>
            {/* Header with animated icons */}
            <motion.div 
              className="text-center mb-8"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              <motion.div
                className="inline-flex p-3 bg-blue-600/20 rounded-2xl mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {isAdmin ? (
                  <Shield className="w-8 h-8 text-blue-400" />
                ) : (
                  <User className="w-8 h-8 text-blue-400" />
                )}
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {isAdmin ? 'Admin Access' : (isLogin ? 'Welcome Back' : 'Create Account')}
              </h1>
              <p className="text-slate-400 mt-2">
                {isAdmin 
                  ? 'Secure admin portal' 
                  : (isLogin ? 'Sign in to continue' : 'Join our community today')}
              </p>
            </motion.div>

            {/* User/Admin Toggle with animations */}
            <div className="flex justify-center gap-3 mb-8">
              {['User', 'Admin'].map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setIsAdmin(type === 'Admin')}
                  className={`relative px-6 py-2 rounded-full font-medium transition-all ${
                    (type === 'Admin' ? isAdmin : !isAdmin)
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {(type === 'Admin' ? isAdmin : !isAdmin) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{type}</span>
                </motion.button>
              ))}
            </div>

            {/* Error message with animation */}
            <AnimatePresence>
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400"
                >
                  <XCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.email}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name - only for signup */}
              <AnimatePresence>
                {!isLogin && !isAdmin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <motion.input
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none transition-all ${
                          errors.fullName && touched.fullName
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-slate-700 focus:border-blue-600'
                        }`}
                        variants={inputVariants}
                        whileFocus="focus"
                      />
                    </div>
                    {errors.fullName && touched.fullName && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-1 ml-3"
                      >
                        {errors.fullName}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <motion.input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none transition-all ${
                    errors.email && touched.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-slate-700 focus:border-blue-600'
                  }`}
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </div>

              {/* Phone - only for signup */}
              <AnimatePresence>
                {!isLogin && !isAdmin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <motion.input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none transition-all ${
                          errors.phone && touched.phone
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-slate-700 focus:border-blue-600'
                        }`}
                        variants={inputVariants}
                        whileFocus="focus"
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-1 ml-3"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <motion.input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 bg-slate-900/50 border rounded-lg focus:outline-none transition-all ${
                    errors.password && touched.password
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-slate-700 focus:border-blue-600'
                  }`}
                  variants={inputVariants}
                  whileFocus="focus"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Confirm Password - only for signup */}
              <AnimatePresence>
                {!isLogin && !isAdmin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <motion.input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 bg-slate-900/50 border rounded-lg focus:outline-none transition-all ${
                          errors.confirmPassword && touched.confirmPassword
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-slate-700 focus:border-blue-600'
                        }`}
                        variants={inputVariants}
                        whileFocus="focus"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-1 ml-3"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password strength indicator - only for signup */}
              {!isLogin && !isAdmin && formData.password && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="flex gap-1">
                    {['Length', 'Uppercase', 'Lowercase', 'Number'].map((criteria, index) => {
                      const isMet = 
                        (criteria === 'Length' && formData.password.length >= 8) ||
                        (criteria === 'Uppercase' && /[A-Z]/.test(formData.password)) ||
                        (criteria === 'Lowercase' && /[a-z]/.test(formData.password)) ||
                        (criteria === 'Number' && /\d/.test(formData.password));
                      
                      return (
                        <motion.div
                          key={criteria}
                          className={`flex-1 h-1 rounded-full ${
                            isMet ? 'bg-green-500' : 'bg-slate-600'
                          }`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: index * 0.1 }}
                        />
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-400">
                    Password must contain at least 8 characters, uppercase, lowercase and number
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Toggle between login/signup - Hide for admin, and prevent admin from switching to signup */}
            {!isAdmin && (
              <motion.p 
                className="text-center mt-6 text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <motion.button
                  onClick={() => {
                    setIsLogin((prev) => !prev);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      password: '',
                      confirmPassword: ''
                    });
                    setErrors({});
                    setTouched({});
                  }}
                  className="text-blue-400 ml-2 hover:text-blue-300 font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </motion.button>
              </motion.p>
            )}
            {/* Social Login - Removed for all users */}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}