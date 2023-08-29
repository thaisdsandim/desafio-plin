interface FileInputProps {
  id: string;
  label: string;
  onFileChange: (file: File | null) => void;
}

export default function FileInput({ id, label, onFileChange }: FileInputProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-white mb-2">
        {label}
      </label>
      <input
        type="file"
        id={id}
        onChange={handleFileChange}
        accept=".pdf"
      />
    </div>
  );
}
