import { useState } from 'react';

export default function Counter({ initialValue }: { initialValue?: number }) {
  const [count, setCount] = useState(initialValue || 0);

  return (
    <div className="flex items-center gap-1 font-mono">
      <span className="mr-2 text-xl">{count}</span>
      <button
        className="rounded bg-green-500 p-1 text-sm leading-none text-black"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
      <button
        className="rounded bg-green-500 p-1 text-sm leading-none text-black disabled:bg-green-500/50"
        disabled={count <= 0}
        onClick={() => setCount(Math.max(0, count - 1))}
      >
        -
      </button>
    </div>
  );
}
