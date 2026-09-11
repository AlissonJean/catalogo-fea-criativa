export default function ProdutoCard({ nome, preco, imagem, mensagemWhatsApp }) {
  return (
    <article className="rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-200">
      
      {/* Área da Imagem (Fundo mais claro) */}
      <div className="w-full h-64 bg-gray-50 flex items-center justify-center p-4">
        <img 
          src={imagem} 
          alt={nome} 
          className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300" 
        />
      </div>
      
      {/* Área de Informações (Fundo Escuro e Texto Centralizado) */}
      {/* Usando uma cor escura neutra. Se preferir a cor da sua marca, troque 'bg-[#2D2D2D]' por 'bg-marca-secundaria' */}
      <div className="bg-[#2D2D2D] p-5 flex flex-col flex-grow items-center text-center">
        
        <h2 className="text-lg font-bold text-white mb-2 leading-tight">
          {nome}
        </h2>
        
        {/* Preço em destaque com a cor primária */}
        <p className="text-xl font-black text-marca-primaria mb-6">
          R$ {preco}
        </p>
        
        {/* Container dos botões: Grid divide exatamente meio a meio (grid-cols-2) */}
        <div className="mt-auto w-full grid grid-cols-2 gap-3">
          
          {/* Botão Detalhes (Estilo Outline) */}
          <button 
            onClick={() => alert("O modal com cores e tamanhos será implementado aqui!")}
            className="border border-gray-400 text-gray-200 hover:bg-gray-100 hover:text-gray-900 font-semibold py-2 px-2 rounded-xl text-sm transition-colors duration-200"
          >
            Detalhes
          </button>
          
          {/* Botão Encomendar (WhatsApp) */}
          <a 
            href={mensagemWhatsApp} 
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2 px-2 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors duration-200"
            target="_blank" 
            rel="noreferrer"
          >
            <i className="fab fa-whatsapp text-lg"></i> 
            Encomendar
          </a>
          
        </div>
      </div>

    </article>
  );
}