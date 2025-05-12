'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const githubProvider = new GithubAuthProvider();

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push('/profile');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      router.push('/profile');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 m-2" />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="border p-2 m-2" />
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded m-2">Entrar</button>
      <button onClick={handleGitHubLogin} className="bg-gray-800 text-white px-4 py-2 rounded m-2">Entrar com GitHub</button>
    </div>
  );
}
