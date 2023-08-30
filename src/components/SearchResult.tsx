interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface SearchResultProps {
  results: {
    address_components: AddressComponent[];
    formatted_address: string;
  }[];
}

export default function SearchResult({ results }: SearchResultProps) {
  console.log(results);
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
          {results.map((result, index) => {
            const longName = result.address_components[6]?.long_name || result.address_components[5]?.long_name || '';
            return (
              <tr key={index} className="bg-black">
                <td className="border p-2">{longName}</td>
                <td className="border p-2">{result.formatted_address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
