import { useState } from 'react';
import ProdutoCard from './components/ProdutoCard';

// 1. Nossa lista de produtos (Array de objetos)
const listaDeProdutos = [
  {
    id: 1,
    nome: "Kit Nossa Senhora",
    preco: "74,90",
    imagem: "./imagens/produtos/kit-nossa-senhora.jpg",
    categoria: "Religioso",
    mensagem: "Olá! Tenho interesse no Kit Nossa Senhora."
  },
  {
    id: 2,
    nome: "Santo Expedito",
    preco: "49,90",
    imagem: "./imagens/produtos/Santo-Expedito.jpg",
    categoria: "Religioso",
    mensagem: "Olá! Tenho interesse no Santo Expedito."
  },
  {
    id: 3,
    nome: "Logomarca FeA Criativa",
    preco: "0,00",
    imagem: "./imagens/Logo-fea.jpg",
    categoria: "Decoração",
    mensagem: "Olá! Tenho interesse na Logomarca FeA Criativa."
  }
];

// Lista de categorias que aparecerão nos botões
const categorias = ["Todos", "Religioso", "Decoração", "Geek", "Acessórios"];

export default function App() {
  // 1. Criamos o "estado" para guardar o que o usuário digita
  const [termoBusca, setTermoBusca] = useState("");
  // 2. Novo estado para a categoria (o padrão é mostrar "Todos")
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  // 3. Filtramos a lista baseada no que foi digitado (ignorando maiúsculas/minúsculas)
  const produtosFiltrados = listaDeProdutos.filter((produto) => {
    const matchBusca = produto.nome.toLowerCase().includes(termoBusca.toLowerCase());
    const matchCategoria = categoriaSelecionada === "Todos" || produto.categoria === categoriaSelecionada;
    
    return matchBusca && matchCategoria;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-10">

      {/* Cabeçalho Atualizado com Flexbox */}
      <header className="bg-marca-secundaria text-white shadow-md mb-8 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* 1. Logo à esquerda (ou no topo no celular) */}
          <h1 className="text-3xl font-bold text-marca-primaria whitespace-nowrap">
            FeA Criativa
          </h1>

          {/* 2. Área central: Onde no futuro entrarão os menus das coleções */}
          <div className="hidden md:flex flex-1 justify-center w-full">
            {/* Espaço reservado. Ex: <button>Decoração</button> <button>Geek</button> */}
          </div>

          {/* 3. Barra de Pesquisa à direita (canto superior) */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Buscar peças..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-xl border border-transparent bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-marca-primaria shadow-sm"
            />
            <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

        </div>
      </header>

      {/* 4. Menu de Categorias (Logo abaixo do cabeçalho) */}
      {/* 4. Menu de Categorias (Estilo Minimalista com Linhas) */}
      {/* 4. Menu de Categorias (Limitado ao tamanho do Container) */}
      <nav className="container mx-auto px-4 mt-6 mb-8">
        <div className="w-full border-y border-gray-300 py-3 bg-transparent">
          
          <ul className="flex justify-center items-center overflow-x-auto whitespace-nowrap divide-x-2 divide-gray-300 scrollbar-hide">
            {categorias.map((cat) => (
              <li key={cat} className="px-4 first:pl-2 last:pr-2">
                <button
                  onClick={() => setCategoriaSelecionada(cat)}
                  className={`font-semibold text-sm uppercase tracking-wide transition-colors ${
                    categoriaSelecionada === cat
                      ? "text-marca-primaria" 
                      : "text-gray-500 hover:text-gray-900" 
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          
        </div>
      </nav>

      {/* 4. Trocamos 'listaDeProdutos' por 'produtosFiltrados' no .map */}
      <main className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <ProdutoCard 
              key={produto.id} 
              nome={produto.nome} 
              preco={produto.preco} 
              imagem={produto.imagem}
              mensagemWhatsApp={`https://wa.me/5531973576633?text=${encodeURIComponent(produto.mensagem)}`} 
            />
          ))
        ) : (
          /* Mensagem caso o cliente digite algo que não existe */
          <p className="col-span-full text-center text-gray-500 mt-10 text-lg">
            {termoBusca !== "" ? (
              <>Nenhum produto encontrado com <strong>"{termoBusca}"</strong>.</>
            ) : (
              <>Nenhum produto encontrado nesta categoria.</>
            )}
          </p>
        )}
      </main>
    </div>
  );
}