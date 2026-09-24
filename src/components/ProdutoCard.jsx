import { useEffect, useState } from 'react';

export default function ProdutoCard({ nome, preco, imagem, categoria, detalhes, mensagemWhatsApp }) {
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (!modalAberto) return undefined;

    const fecharComEscape = (event) => {
      if (event.key === 'Escape') setModalAberto(false);
    };

    document.addEventListener('keydown', fecharComEscape);
    return () => document.removeEventListener('keydown', fecharComEscape);
  }, [modalAberto]);

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex h-80 items-center justify-center overflow-hidden bg-gray-50 p-2">
        <img
          src={imagem}
          alt={nome}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        {categoria && (
          <span className="mb-2 w-fit rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-600">
            {categoria}
          </span>
        )}
        <h2 className="min-h-12 text-base font-bold leading-tight text-gray-800">
          {nome}
        </h2>
        <div className="mt-3 flex flex-col gap-3">
          <p className="text-xl font-black text-gray-900">
            <span className="mr-1 text-xs font-medium text-gray-500">R$</span>
            {preco}
          </p>
          <div className="grid w-full grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setModalAberto(true)}
              className="flex min-w-0 items-center justify-center rounded-xl border border-gray-300 px-2 py-2 text-gray-600 transition-colors duration-200 hover:border-marca-primaria hover:bg-gray-50 hover:text-gray-900"
              aria-label={`Ver detalhes de ${nome}`}
              title="Ver detalhes"
            >
              <i className="fas fa-circle-info text-base"></i>
              <span className="ml-2 truncate text-sm font-semibold">Detalhes</span>
            </button>
            <a
              href={mensagemWhatsApp}
              className="flex min-w-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-2 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#128C7E]"
              target="_blank"
              rel="noreferrer"
              aria-label={`Adicionar ${nome}`}
            >
              <i className="fab fa-whatsapp text-base"></i>
              <span className="truncate">Adicionar</span>
            </a>
          </div>
        </div>
        </div>
      </article>

      {modalAberto && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setModalAberto(false)}
        >
          <section
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`produto-${nome}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalAberto(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Fechar detalhes"
              title="Fechar"
            >
              <i className="fas fa-xmark"></i>
            </button>

            <div className="flex h-64 items-center justify-center bg-gray-50 p-4 sm:h-72">
              <img src={imagem} alt={nome} className="max-h-full max-w-full object-contain" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {categoria && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-600">
                    {categoria}
                  </span>
                )}
                <span className="text-xl font-black text-gray-900">R$ {preco}</span>
              </div>
              <h2 id={`produto-${nome}`} className="text-2xl font-black text-gray-900">
                {nome}
              </h2>
              <p className="mt-3 leading-relaxed text-gray-600">{detalhes?.descricao}</p>

              <dl className="mt-6 grid gap-3 border-t border-gray-200 pt-5 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">Material</dt>
                  <dd className="mt-1 font-semibold text-gray-800">{detalhes?.material || 'Consulte disponibilidade'}</dd>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">Tamanho</dt>
                  <dd className="mt-1 font-semibold text-gray-800">{detalhes?.tamanho || 'Consulte disponibilidade'}</dd>
                </div>
              </dl>

              <a
                href={mensagemWhatsApp}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white transition-colors hover:bg-[#128C7E]"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp text-lg"></i>
                Tenho interesse
              </a>
            </div>
          </section>
        </div>
      )}
    </>
  );
}