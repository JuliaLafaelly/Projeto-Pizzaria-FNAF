const formularioPedido = document.querySelector('#form-pedido');

if (formularioPedido) {
  const parametros = new URLSearchParams(window.location.search);
  const seletorPizza = formularioPedido.querySelector('#pizza');
  const confirmacao = document.querySelector('#confirmacao-pedido');

  const pizzaSolicitada = parametros.get('pizza');

  if (
    seletorPizza &&
    pizzaSolicitada &&
    [...seletorPizza.options].some((opcao) => opcao.value === pizzaSolicitada)
  ) {
    seletorPizza.value = pizzaSolicitada;
  }

  formularioPedido.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!formularioPedido.reportValidity()) return;

    const dados = new FormData(formularioPedido);

    confirmacao.textContent =
      `Formulário preenchido, ${dados.get('nome')}. ` +
      'Este site ainda não está conectado a um serviço de pedidos; ' +
      'seu pedido não foi enviado à pizzaria.';

    confirmacao.hidden = false;
  });
}

const campoPesquisa = document.querySelector('#pesquisa');

if (campoPesquisa) {
  const cardsHome = [...document.querySelectorAll('#cardapio .card')];
  const cardsMenu = [...document.querySelectorAll('#lista-pizzas .Pizzaria.lista')];
  const cards = [...cardsHome, ...cardsMenu];
  const avisoSemResultados = document.querySelector('#sem-resultados');

  if (cards.length > 0) {
    campoPesquisa.addEventListener('input', () => {
      const termo = campoPesquisa.value.trim().toLocaleLowerCase('pt-BR');
      let quantidadeVisivel = 0;

      cards.forEach((card) => {
        const corresponde = card.textContent
          .toLocaleLowerCase('pt-BR')
          .includes(termo);

        card.hidden = !corresponde;
        if (corresponde) quantidadeVisivel += 1;
      });

      if (avisoSemResultados) {
        avisoSemResultados.hidden = quantidadeVisivel > 0;
      }
    });
  }
}