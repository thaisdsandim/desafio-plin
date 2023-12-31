interface InputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

export default function Input({ id, label, type, name, value, onChange, required }: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-white mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="w-full p-2 border rounded-lg text-black"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
