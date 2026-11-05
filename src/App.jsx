import { useEffect, useRef, useState } from 'react';
import ProdutoCard from './components/ProdutoCard';
import Icone from './components/Icone';
import { listaDeProdutos } from './data/produtos';
import { telefoneWhatsApp } from './config/loja';
import { formatarPreco } from './utils/formatarPreco';
import { bannerNovidade } from './config/bannerNovidade';

// Lista de categorias que aparecerão nos botões
const categorias = ["Todos", ...new Set(listaDeProdutos.map((produto) => produto.categoria))];

const criarLinkWhatsApp = (produto) => {
  const mensagem = `Olá! Tenho interesse em ${produto.nome}, anunciado por ${formatarPreco(produto.precoCentavos)}.`;
  return `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
};

const normalizarTexto = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function App() {
  // 1. Criamos o "estado" para guardar o que o usuário digita
  const [termoBusca, setTermoBusca] = useState("");
  // 2. Novo estado para a categoria (o padrão é mostrar "Todos")
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [bannerAberto, setBannerAberto] = useState(bannerNovidade.ativo);
  const categoriasRef = useRef(null);

  useEffect(() => {
    if (!bannerAberto) return undefined;
    const fecharComEscape = (event) => {
      if (event.key === 'Escape') setBannerAberto(false);
    };
    document.addEventListener('keydown', fecharComEscape);
    return () => document.removeEventListener('keydown', fecharComEscape);
  }, [bannerAberto]);

  const moverCategorias = (direcao) => {
    categoriasRef.current?.scrollBy({ left: direcao * 120, behavior: 'smooth' });
  };

  const consulta = normalizarTexto(termoBusca.trim());
  const produtosFiltrados = listaDeProdutos.filter((produto) => {
    const textoProduto = normalizarTexto(`${produto.nome} ${produto.categoria} ${produto.descricao}`);
    const matchBusca = textoProduto.includes(consulta);
    const matchCategoria = categoriaSelecionada === "Todos" || produto.categoria === categoriaSelecionada;

    return matchBusca && matchCategoria;
  });

  return (
    <div className="bg-fundo min-h-screen pb-10">

      {bannerNovidade.ativo && bannerAberto && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-950/75 p-3 backdrop-blur-sm sm:p-6"
          role="presentation"
          onClick={() => setBannerAberto(false)}
        >
          <section
            className="relative flex max-h-[94dvh] w-fit max-w-[94vw] items-center justify-center overflow-hidden rounded-2xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={bannerNovidade.descricao}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setBannerAberto(false)}
              className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-texto shadow-md transition-colors hover:bg-white"
              aria-label="Fechar banner de novidade"
              title="Fechar"
            >
              <Icone nome="fechar" className="h-5 w-5" />
            </button>
            <img
              src={bannerNovidade.imagem}
              alt={bannerNovidade.descricao}
              className="block max-h-[90dvh] max-w-[94vw] object-contain"
              onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
            />
          </section>
        </div>
      )}

      <header
        className="relative h-72 sticky top-0 z-50 overflow-hidden bg-marca-terciaria shadow-md md:h-[26rem]"
      >
        <picture className="absolute inset-0">
          <source media="(max-width: 984px)" srcSet="./imagens/banner-fea-mobile.jpg" />
          <img
            src="./imagens/banner-fea.jpg"
            fetchPriority="high"
            alt=""
            className="h-full w-full object-cover object-[center_75%]"
          />
        </picture>
        <div className="absolute inset-0 bg-black/10" aria-hidden="true"></div>
        <div className="container relative z-10 mx-auto flex h-full items-end justify-end px-4 pb-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              aria-label="Buscar produtos por nome, categoria ou descrição"
              placeholder="Buscar produtos..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full rounded-xl border border-transparent bg-white py-2 pl-4 pr-10 text-texto shadow-sm focus:outline-none focus:ring-2 focus:ring-marca-primaria"
            />
            <Icone nome="busca" className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-texto/50" />
          </div>
        </div>
      </header>

      {/* 4. Menu de Categorias (Logo abaixo do cabeçalho) */}
      {/* 4. Menu de Categorias (Estilo Minimalista com Linhas) */}
      {/* 4. Menu de Categorias (Limitado ao tamanho do Container) */}
      <nav className="container mx-auto px-4 mt-6 mb-8" aria-label="Categorias de produtos">
        <div className="flex w-full items-center border-y border-texto/20 bg-transparent py-3">
          <button
            type="button"
            onClick={() => moverCategorias(-1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marca-secundaria text-lg font-bold text-texto md:hidden"
            aria-label="Ver categorias anteriores"
            title="Categorias anteriores"
          >
            <Icone nome="anterior" className="h-4 w-4" />
          </button>

          <ul ref={categoriasRef} className="scrollbar-hide flex min-w-0 flex-1 items-center justify-start overflow-x-auto scroll-smooth whitespace-nowrap divide-x-2 divide-texto/20 md:justify-center">
            {categorias.map((cat) => (
              <li key={cat} className="px-4 first:pl-2 last:pr-2">
                <button
                  type="button"
                  aria-pressed={categoriaSelecionada === cat}
                  onClick={() => setCategoriaSelecionada(cat)}
                  className={`font-semibold text-sm uppercase tracking-wide transition-colors ${
                    categoriaSelecionada === cat
                      ? "text-texto underline decoration-marca-primaria decoration-2 underline-offset-4"
                      : "text-texto/75 hover:text-texto"
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
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marca-secundaria text-lg font-bold text-texto md:hidden"
            aria-label="Ver mais categorias"
            title="Mais categorias"
          >
            <Icone nome="proxima" className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* 4. Trocamos 'listaDeProdutos' por 'produtosFiltrados' no .map */}
      <main className="container mx-auto grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <h1 className="sr-only">Catálogo de produtos</h1>
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <ProdutoCard
              key={produto.id}
              nome={produto.nome}
              precoFormatado={formatarPreco(produto.precoCentavos)}
              imagem={produto.imagem}
              categoria={produto.categoria}
              personalizavel={produto.personalizavel}
              detalhes={{
                descricao: produto.descricao,
                material: produto.material,
                tamanho: produto.tamanho,
                cor: produto.cor,
              }}
              mensagemWhatsApp={criarLinkWhatsApp(produto)}
            />
          ))
        ) : (
          /* Mensagem caso o cliente digite algo que não existe */
          <p className="col-span-full text-center text-texto/75 mt-10 text-lg">
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
