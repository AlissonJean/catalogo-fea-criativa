import { useState } from 'react';
import ProdutoCard from './components/ProdutoCard';

// 1. Nossa lista de produtos (Array de objetos)
const listaDeProdutos = [
  {
    id: 1,
    nome: "Kit Nossa Senhora",
    preco: "45,00",
    imagem: "/imagens/produtos/kit-nossa-senhora.jpg",
    mensagem: "Olá! Tenho interesse no Vaso Decorativo Low Poly."
  },
  {
    id: 2,
    nome: "Dragão Articulado",
    preco: "85,00",
    imagem: "/imagens/produtos/dragao-articulado.jpg",
    mensagem: "Olá! Tenho interesse no Dragão Articulado."
  },
  {
    id: 3,
    nome: "Suporte para Fone de Ouvido",
    preco: "60,00",
    imagem: "/imagens/produtos/suporte-para-fone.jpg",
    mensagem: "Olá! Tenho interesse no Suporte para Fone."
  },
  {
    id: 4,
    nome: "Vaso decorativo",
    preco: "60,00",
    imagem: "/imagens/produtos/vaso-decorativo-low-poly.jpg",
    mensagem: "Olá! Tenho interesse no vaso."
  }
];

export default function App() {
  // 1. Criamos o "estado" para guardar o que o usuário digita
  const [termoBusca, setTermoBusca] = useState("");

  // 2. Filtramos a lista baseada no que foi digitado (ignorando maiúsculas/minúsculas)
  const produtosFiltrados = listaDeProdutos.filter((produto) =>
    produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

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

      {/* 4. Trocamos 'listaDeProdutos' por 'produtosFiltrados' no .map */}
      <main className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <ProdutoCard 
              key={produto.id} 
              nome={produto.nome} 
              preco={produto.preco} 
              imagem={produto.imagem}
              mensagemWhatsApp={`https://wa.me/5531999999999?text=${encodeURIComponent(produto.mensagem)}`} 
            />
          ))
        ) : (
          /* Mensagem caso o cliente digite algo que não existe */
          <p className="col-span-full text-center text-gray-500 mt-10 text-lg">
            Nenhum produto encontrado com "{termoBusca}".
          </p>
        )}
      </main>
    </div>
  );
}