import formatCEP from '@/utils/formatCEP';

interface SearchResultProps {
  results: { 
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
  }[];
}

export default function SearchResult({ results }: SearchResultProps) {
  const sortedResults = results.sort((a, b) => a.cep.localeCompare(b.cep));

  return (
    <div className="mt-6">
      <table className="border-collapse min-w-full max-w-full table-auto">
        <thead>
          <tr className="bg-white">
            <th className="border p-2 text-black">CEP</th>
            <th className="border p-2 text-black">Logradouro</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map((result, index) => (
            <tr key={index} className="bg-black">
              <td className="border p-2">{formatCEP(result.cep)}</td>
              <td className="border p-2">{result.logradouro} - Bairro {result.bairro} - {result.cidade}/{result.uf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
