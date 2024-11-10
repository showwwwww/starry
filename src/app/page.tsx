'use client';
import React from 'react';
import * as THREE from 'three';
import useWatchResize from '@hooks/useWatchResize';

let renderer: THREE.WebGLRenderer | null = null;
let camera: THREE.PerspectiveCamera | null = null;

export default function Home() {
    const ref = React.useRef<HTMLDivElement>(null);

    useWatchResize(ref, ({ width, height }) => {
        if (!renderer || !camera) return;
        renderer.setSize( width, height );
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    React.useEffect(() => {
        if (ref.current?.hasChildNodes()) return;
        renderer = new THREE.WebGLRenderer();
        camera = new THREE.PerspectiveCamera( 75, 1000 / 800, 0.1, 1000 );
        const scene = new THREE.Scene();
        ref.current?.appendChild( renderer.domElement );

        const gemotry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(gemotry, material);
        scene.add(cube);

        camera.position.z = 5;

        function animate() {
            if (!renderer || !camera) return;
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);
    }, []);
    
    return (
        <div className='w-screen h-screen absolute' ref={ref}/>
    );
}
