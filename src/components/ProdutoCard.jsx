export default function ProdutoCard({ nome, preco, imagem, mensagemWhatsApp }) {
  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      
      {/* Imagem do Produto: Usando o object-contain que você já conhecia, mas via Tailwind */}
      <div className="w-full h-64 bg-white p-4">
        <img 
          src={imagem} 
          alt={nome} 
          className="w-full h-full object-contain" 
        />
      </div>
      
      {/* Área de Informações */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
          {nome}
        </h2>
        
        <p className="text-2xl font-black text-marca-primaria mb-5">
          R$ {preco}
        </p>
        
        {/* Botão do WhatsApp fixado sempre no final do card (mt-auto) */}
        <a 
          href={mensagemWhatsApp} 
          className="mt-auto bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
          target="_blank" 
          rel="noreferrer"
        >
          <i className="fab fa-whatsapp text-xl"></i> 
          Encomendar
        </a>
      </div>

    </article>
  );
}