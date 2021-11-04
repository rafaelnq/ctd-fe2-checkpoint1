const lista = document.querySelector('.js-lista');
const detalhes = document.querySelector('.js-detalhes');
const botaoAdd = document.querySelector('.js-botao-add');
const modal = document.querySelector('.js-modal');
const formulario = document.querySelector('.js-formulario');
const campoNome = formulario.elements.nome;
const campoAnimal = formulario.elements.animal;
const campoImagem = formulario.elements.imagem;
const campoDescricao = formulario.elements.descricao;

const state = {
  animais: [
    {
      id: 1,
      nome: 'Tom',
      animal: 'Gato',
      imagem: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg',
      descricao: 'Apenas uma descrição para teste. TODO: Trocar.',
    },
    {
      id: 2,
      nome: 'Bob',
      animal: 'Cachorro',
      imagem: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg',
      descricao: 'Apenas uma descrição para teste. TODO: Trocar.',
    },
    {
      id: 3,
      nome: 'Castanha',
      animal: 'Hamster',
      imagem: 'https://cdn.pixabay.com/photo/2018/12/16/16/48/hamster-3878853_960_720.jpg',
      descricao: 'Apenas uma descrição para teste. TODO: Trocar.',
    },
  ],
  animalSelecionado: 1,
};

function templatePreview() {
  if (state.animais.length === 0) {
    return '<p>Ainda não há animais cadastrados!</p>';
  }

  return state.animais
    .map(
      (animal) => `<li">
        <div class="animal-preview ${
          state.animalSelecionado === animal.id ? 'is-selected' : ''
        }"  data-id="${animal.id}">
          <img src="${animal.imagem}" />
          <p>${animal.nome}</p>
        </div>
      </li>`
    )
    .join('');
}

function templateDetalhes() {
  const animal = state.animais.find((animal) => animal.id === state.animalSelecionado);
  if (!animal) return '';

  return `
    <div class="animal-detalhes">
      <img src="${animal.imagem}" />
      <h3>${animal.nome}</h3>
      <p>${animal.animal}</p>
      <p>${animal.descricao}</p>
    </div>
  `;
}

function render() {
  lista.innerHTML = templatePreview();
  detalhes.innerHTML = templateDetalhes();
}

document.addEventListener('DOMContentLoaded', render);

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const novoId = state.animais.length + 1;

  state.animais.push({
    id: novoId,
    nome: campoNome.value,
    animal: campoAnimal.value,
    imagem: campoImagem.value,
    descricao: campoDescricao.value,
  });

  campoNome.value = '';
  campoAnimal.value = '';
  campoImagem.value = '';
  campoDescricao.value = '';

  campoNome.focus();
  modal.classList.remove('is-open');
  state.animalSelecionado = novoId;

  render();
});

botaoAdd.addEventListener('click', () => modal.classList.add('is-open'));

modal.addEventListener('click', (event) => {
  if (event.target.matches('.js-modal')) {
    modal.classList.remove('is-open');
  }
});

lista.addEventListener('click', (event) => {
  if (!event.target.closest('.animal-preview')) return;

  state.animalSelecionado = +event.target.closest('.animal-preview').dataset.id;
  render();
});
