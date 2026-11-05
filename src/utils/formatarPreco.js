const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatarPreco = (precoCentavos) => {
  if (precoCentavos === null || precoCentavos === undefined) {
    return 'Preço sob consulta';
  }

  return formatadorMoeda.format(precoCentavos / 100);
};
