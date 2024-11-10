'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Custom404() {
    const router = useRouter();

    React.useEffect(() => {
        router.push('/');
    }, [router]);

    return null;
}
