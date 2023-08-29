interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  label: string;
}

export default function Button({ type, label }: ButtonProps) {
  return (
    <button
      type={type}
      className="bg-white hover:bg-gray-500 text-black font-bold py-2 px-4 mb-2 rounded"
    >
      {label}
    </button>
  );
}
