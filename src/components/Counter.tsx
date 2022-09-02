import {useState} from 'react';

export default function Counter({ initialValue }: { initialValue?: number}) {
  const [count, setCount] = useState(initialValue || 0);

  return (
    <div className="flex items-center font-mono gap-1">
      <span className="text-xl mr-2">{count}</span>
      <button className="text-sm p-1 bg-green-500 text-black leading-none rounded" onClick={() => setCount(count + 1)}>+</button>
      <button className="text-sm p-1 bg-green-500 disabled:bg-green-500/50 text-black leading-none rounded" disabled={count <= 0} onClick={() => setCount(Math.max(0, count - 1))}>-</button>
    </div>
  )
}