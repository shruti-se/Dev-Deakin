import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        setError('');

        if (!firstName.trim() || !lastName.trim()) {
            setError('Please enter your first and last name.');
            return;
        }

        if (password.length < 6) {
            setError('Password must contain at least 6 characters.');
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                password
            );

            await setDoc(doc(db, 'users', userCredential.user.uid), {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                plan: 'Free',
                createdAt: serverTimestamp()
            });

            navigate('/login');
        } catch (err) {
            console.error('Signup error:', err);

            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already registered. Please log in.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else if (err.code === 'auth/weak-password') {
                setError('Please choose a stronger password.');
            } else {
                setError('Unable to create your account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

                <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
                    Create an Account
                </h2>

                <p className="mb-8 text-center text-gray-500">
                    Join the DEV@Deakin community
                </p>

                <form onSubmit={handleSignup} className="space-y-5">

                    <div>
                        <label
                            htmlFor="firstName"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            First Name
                        </label>

                        <input
                            id="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#00A6D6] focus:ring-2 focus:ring-[#00A6D6]/20"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Last Name
                        </label>

                        <input
                            id="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#00A6D6] focus:ring-2 focus:ring-[#00A6D6]/20"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="signupEmail"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Email Address
                        </label>

                        <input
                            id="signupEmail"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#00A6D6] focus:ring-2 focus:ring-[#00A6D6]/20"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="signupPassword"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="signupPassword"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#00A6D6] focus:ring-2 focus:ring-[#00A6D6]/20"
                            minLength={6}
                            required
                        />
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-[#00A6D6] px-4 py-3 font-semibold text-white transition hover:bg-[#008DB8] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-semibold text-[#00A6D6] hover:text-[#008DB8]"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Signup;
