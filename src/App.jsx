import { useRef, useState } from 'react';
import ProdutoCard from './components/ProdutoCard';

// 1. Nossa lista de produtos (Array de objetos)
const listaDeProdutos = [
  {
    id: 1,
    nome: "Kit Nossa Senhora",
    preco: "74,90",
    imagem: "./imagens/produtos/kit-nossa-senhora.jpg",
    categoria: "Religioso",
    descricao: "Kit decorativo religioso para presentear ou compor ambientes de oração.",
    material: "Filamento PLA",
    tamanho: "Consulte as medidas disponíveis",
    mensagem: "Olá! Tenho interesse no Kit Nossa Senhora."
  },
  {
    id: 2,
    nome: "Santo Expedito",
    preco: "49,90",
    imagem: "./imagens/produtos/Santo-Expedito.jpg",
    categoria: "Religioso",
    descricao: "Peça decorativa de Santo Expedito com acabamento feito sob encomenda.",
    material: "Filamento PLA",
    tamanho: "Consulte as medidas disponíveis",
    mensagem: "Olá! Tenho interesse no Santo Expedito."
  },
  {
    id: 3,
    nome: "Logomarca FeA Criativa",
    preco: "0,00",
    imagem: "./imagens/Logo-fea.jpg",
    categoria: "Decoração",
    descricao: "Modelo demonstrativo da identidade visual FeA Criativa.",
    material: "Consulte opções de material",
    tamanho: "Consulte as medidas disponíveis",
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
  const categoriasRef = useRef(null);

  const moverCategorias = (direcao) => {
    categoriasRef.current?.scrollBy({ left: direcao * 120, behavior: 'smooth' });
  };

  // 3. Filtramos a lista baseada no que foi digitado (ignorando maiúsculas/minúsculas)
  const produtosFiltrados = listaDeProdutos.filter((produto) => {
    const matchBusca = produto.nome.toLowerCase().includes(termoBusca.toLowerCase());
    const matchCategoria = categoriaSelecionada === "Todos" || produto.categoria === categoriaSelecionada;
    
    return matchBusca && matchCategoria;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-10">

      <header
        className="relative h-72 sticky top-0 z-50 overflow-hidden bg-gray-900 shadow-md md:h-[26rem]"
      >
        <picture className="absolute inset-0">
          <source media="(max-width: 984px)" srcSet="./imagens/banner-fea-mobile.png" />
          <img
            src="./imagens/banner-fea.png"
            alt=""
            className="h-full w-full object-cover object-[center_75%]"
          />
        </picture>
        <div className="absolute inset-0 bg-black/10" aria-hidden="true"></div>
        <div className="container relative z-10 mx-auto flex h-full items-end justify-end px-4 pb-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar peças..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full rounded-xl border border-transparent bg-white py-2 pl-4 pr-10 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-marca-primaria"
            />
            <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </header>

      {/* 4. Menu de Categorias (Logo abaixo do cabeçalho) */}
      {/* 4. Menu de Categorias (Estilo Minimalista com Linhas) */}
      {/* 4. Menu de Categorias (Limitado ao tamanho do Container) */}
      <nav className="container mx-auto px-4 mt-6 mb-8">
        <div className="flex w-full items-center border-y border-gray-300 bg-transparent py-3">
          <button
            type="button"
            onClick={() => moverCategorias(-1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marca-secundaria text-lg font-bold text-white md:hidden"
            aria-label="Ver categorias anteriores"
            title="Categorias anteriores"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <ul ref={categoriasRef} className="scrollbar-hide flex min-w-0 flex-1 items-center justify-start overflow-x-auto scroll-smooth whitespace-nowrap divide-x-2 divide-gray-300 md:justify-center">
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

          <button
            type="button"
            onClick={() => moverCategorias(1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marca-secundaria text-lg font-bold text-white md:hidden"
            aria-label="Ver mais categorias"
            title="Mais categorias"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </nav>

      {/* 4. Trocamos 'listaDeProdutos' por 'produtosFiltrados' no .map */}
      <main className="container mx-auto grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <ProdutoCard 
              key={produto.id} 
              nome={produto.nome} 
              preco={produto.preco} 
              imagem={produto.imagem}
              categoria={produto.categoria}
              detalhes={{
                descricao: produto.descricao,
                material: produto.material,
                tamanho: produto.tamanho,
              }}
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