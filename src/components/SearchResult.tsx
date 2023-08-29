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
  return (
    <div className="mt-6">
      {results.map((result, index) => (
        <div key={index} className="border p-2 rounded mb-2">
          <p>CEP: {formatCEP(result.cep)}</p>
          <p>
            {result.logradouro}, {result.bairro} - {result.cidade}/{result.uf}
          </p>
        </div>
      ))}
    </div>
  );
}
