'use client';
import React from 'react';
import { makeAutoObservable } from 'mobx';
import {  observer } from 'mobx-react-lite';

class Counter {
    count = 0;

    constructor() {
        makeAutoObservable(this);
    }

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }
}

const counter = new Counter();

const Home: React.FC = () => {
    return (
        <div>
            <button onClick={() => { counter.increment(); console.log(counter) }}>increment</button>
            <h1>{counter.count}</h1>
            <button onClick={() => { counter.decrement(); }}>decrement</button>
        </div>
    );
}

export default observer(Home);
