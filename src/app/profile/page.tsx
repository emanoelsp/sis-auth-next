'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Perfil do Usuário</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => auth.signOut().then(() => router.push('/login'))} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
        Sair
      </button>
    </div>
  );
}
