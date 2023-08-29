const formatCEP = (cep: string): string => {
  const cleanedCEP = cep.replace(/\D/g, '');
  const formattedCEP = cleanedCEP.replace(/(\d{5})(\d{3})/, '$1-$2');

  return formattedCEP;
};

export default formatCEP;
