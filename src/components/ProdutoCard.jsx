import { useEffect, useId, useRef, useState } from 'react';
import Icone from './Icone';

export default function ProdutoCard({ nome, precoFormatado, imagem, categoria, personalizavel, detalhes, mensagemWhatsApp }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemAberta, setImagemAberta] = useState(false);
  const [zoomImagem, setZoomImagem] = useState(1);
  const [posicaoImagem, setPosicaoImagem] = useState({ x: 0, y: 0 });
  const ponteirosRef = useRef(new Map());
  const gestoRef = useRef(null);
  const tituloModalId = useId();
  const dialogRef = useRef(null);
  const acionadorRef = useRef(null);

  const abrirImagem = () => {
    setZoomImagem(1);
    setPosicaoImagem({ x: 0, y: 0 });
    ponteirosRef.current.clear();
    setImagemAberta(true);
  };

  const iniciarGestoImagem = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    ponteirosRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (ponteirosRef.current.size === 2) {
      const [a, b] = ponteirosRef.current.values();
      gestoRef.current = {
        tipo: 'pinça',
        distancia: Math.hypot(a.x - b.x, a.y - b.y),
        zoom: zoomImagem,
      };
    } else {
      gestoRef.current = {
        tipo: 'arrastar',
        x: event.clientX,
        y: event.clientY,
        posicao: posicaoImagem,
      };
    }
  };

  const moverGestoImagem = (event) => {
    if (!ponteirosRef.current.has(event.pointerId)) return;
    ponteirosRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (ponteirosRef.current.size >= 2) {
      const [a, b] = ponteirosRef.current.values();
      const distanciaAtual = Math.hypot(a.x - b.x, a.y - b.y);
      const gesto = gestoRef.current;
      if (gesto?.tipo === 'pinça' && gesto.distancia > 0) {
        setZoomImagem(Math.min(5, Math.max(1, gesto.zoom * distanciaAtual / gesto.distancia)));
      }
      return;
    }

    const gesto = gestoRef.current;
    if (gesto?.tipo === 'arrastar' && zoomImagem > 1) {
      setPosicaoImagem({
        x: gesto.posicao.x + event.clientX - gesto.x,
        y: gesto.posicao.y + event.clientY - gesto.y,
      });
    }
  };

  const encerrarGestoImagem = (event) => {
    ponteirosRef.current.delete(event.pointerId);
    gestoRef.current = null;
    if (ponteirosRef.current.size === 1) {
      const [ponteiro] = ponteirosRef.current.values();
      gestoRef.current = {
        tipo: 'arrastar',
        x: ponteiro.x,
        y: ponteiro.y,
        posicao: posicaoImagem,
      };
    }
  };

  useEffect(() => {
    if (!imagemAberta) return undefined;
    const tratarEscape = (event) => {
      if (event.key === 'Escape') setImagemAberta(false);
    };
    document.addEventListener('keydown', tratarEscape);
    return () => document.removeEventListener('keydown', tratarEscape);
  }, [imagemAberta]);

  const abrirModal = (event) => {
    acionadorRef.current = event.currentTarget;
    setModalAberto(true);
  };

  useEffect(() => {
    if (!modalAberto) return undefined;

    const elementoAcionador = acionadorRef.current;
    const dialog = dialogRef.current;
    dialog?.querySelector('button')?.focus();

    const tratarTeclado = (event) => {
      if (event.key === 'Escape') {
        setModalAberto(false);
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;

      const elementosFocaveis = dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const primeiro = elementosFocaveis[0];
      const ultimo = elementosFocaveis[elementosFocaveis.length - 1];

      if (!primeiro) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && document.activeElement === primeiro) {
        event.preventDefault();
        ultimo.focus();
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener('keydown', tratarTeclado);
    return () => {
      document.removeEventListener('keydown', tratarTeclado);
      elementoAcionador?.focus();
    };
  }, [modalAberto]);

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-texto/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex h-80 items-center justify-center overflow-hidden bg-fundo p-2">
        <button type="button" onClick={abrirImagem} className="flex h-full w-full cursor-zoom-in items-center justify-center focus-visible:outline-offset-[-4px]" aria-label={`Ampliar imagem de ${nome}`}><img
          src={imagem}
          alt={nome}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        /></button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {(categoria || personalizavel) && (
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {categoria && (
              <span className="w-fit rounded-full bg-marca-terciaria/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-texto">
                {categoria}
              </span>
            )}
            {personalizavel && (
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#E4F6F4] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#48A1A1]">
                <Icone nome="personalizavel" className="h-3 w-3 shrink-0" />
                Personalizável
              </span>
            )}
          </div>
        )}
        <h2 className="text-base font-bold leading-tight text-texto">
          {nome}
        </h2>
        <p className="mt-1 leading-relaxed text-texto/70">{detalhes?.descricao}</p>
        <div className="mt-3 flex flex-col gap-3">
          <p className="text-xl font-black text-texto">
            {precoFormatado}
          </p>
          <div className="grid w-full grid-cols-2 gap-2">
            <button
              type="button"
              onClick={abrirModal}
              className="flex min-w-0 items-center justify-center rounded-xl border border-marca-secundaria bg-white px-2 py-2 text-marca-secundaria transition-colors duration-200 hover:border-marca-secundaria hover:bg-marca-secundaria/10 hover:text-marca-secundaria"
              aria-label={`Ver detalhes de ${nome}`}
              title="Ver detalhes"
            >
              <Icone nome="detalhes" className="h-4 w-4 shrink-0" />
              <span className="ml-2 truncate text-sm font-semibold">Detalhes</span>
            </button>
            <a
              href={mensagemWhatsApp}
              className="flex min-w-0 items-center justify-center gap-2 rounded-xl bg-marca-primaria px-2 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-marca-primaria/90"
              target="_blank"
              rel="noreferrer"
              aria-label={`Pedir ${nome} pelo WhatsApp`}
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                <Icone nome="whatsapp" className="h-4 w-4" />
              </span>
              <span className="truncate">Pedir</span>
            </a>
          </div>
        </div>
        </div>
      </article>

      {imagemAberta && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-gray-950/90 p-4"
          role="presentation"
          onClick={() => setImagemAberta(false)}
          onWheel={(event) => {
            event.preventDefault();
            setZoomImagem((zoom) => Math.min(5, Math.max(1, zoom + (event.deltaY < 0 ? 0.25 : -0.25))));
            if (zoomImagem <= 1 && event.deltaY > 0) setPosicaoImagem({ x: 0, y: 0 });
          }}
        >
          <section
            className="relative flex h-full w-full touch-none items-center justify-center overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={`Imagem ampliada de ${nome}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setImagemAberta(false)}
              className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-texto shadow-lg sm:right-4 sm:top-4"
              aria-label="Fechar imagem"
            >
              <Icone nome="fechar" className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white p-2 shadow-lg" aria-label="Controles de zoom">
              <button type="button" onClick={() => setZoomImagem((zoom) => Math.max(1, zoom - 0.25))} className="h-10 w-10 rounded-full text-xl font-bold text-texto hover:bg-fundo" aria-label="Reduzir zoom">−</button>
              <button type="button" onClick={() => { setZoomImagem(1); setPosicaoImagem({ x: 0, y: 0 }); }} className="min-w-14 rounded-full px-2 py-2 text-sm font-semibold text-texto hover:bg-fundo" aria-label="Redefinir zoom">{Math.round(zoomImagem * 100)}%</button>
              <button type="button" onClick={() => setZoomImagem((zoom) => Math.min(5, zoom + 0.25))} className="h-10 w-10 rounded-full text-xl font-bold text-texto hover:bg-fundo" aria-label="Ampliar zoom">+</button>
            </div>
            <div
              className="flex h-[calc(100dvh-8rem)] w-full touch-none items-center justify-center"
              onPointerDown={iniciarGestoImagem}
              onPointerMove={moverGestoImagem}
              onPointerUp={encerrarGestoImagem}
              onPointerCancel={encerrarGestoImagem}
              style={{ transform: `translate(${posicaoImagem.x}px, ${posicaoImagem.y}px) scale(${zoomImagem})`, transformOrigin: 'center' }}
            >
            <img
              src={imagem}
              alt={nome}
              className="max-h-full max-w-full select-none object-contain"
              draggable="false"
            />
            </div>
          </section>
        </div>
      )}

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
            aria-labelledby={tituloModalId}
            tabIndex={-1}
            ref={dialogRef}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalAberto(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-texto/70 shadow-sm transition-colors hover:bg-marca-terciaria/10 hover:text-texto"
              aria-label="Fechar detalhes"
              title="Fechar"
            >
              <Icone nome="fechar" className="h-5 w-5" />
            </button>

            <div className="flex h-64 items-center justify-center bg-fundo p-4 sm:h-72">
              <img src={imagem} alt={nome} className="max-h-full max-w-full object-contain" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {categoria && (
                  <span className="rounded-full bg-marca-terciaria/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-texto">
                    {categoria}
                  </span>
                )}
                <span className="text-xl font-black text-texto">{precoFormatado}</span>
              </div>
              <h2 id={tituloModalId} className="text-2xl font-black text-texto">
                {nome}
              </h2>
              <p className="mt-3 leading-relaxed text-texto/70">{detalhes?.descricao}</p>

              <dl className="mt-6 grid gap-3 border-t border-texto/10 pt-5 sm:grid-cols-3">
                <div className="rounded-2xl bg-fundo p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-texto/75">Material</dt>
                  <dd className="mt-1 font-semibold text-texto">{detalhes?.material || 'Consulte disponibilidade'}</dd>
                </div>
                <div className="rounded-2xl bg-fundo p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-texto/75">Tamanho</dt>
                  <dd className="mt-1 font-semibold text-texto">{detalhes?.tamanho || 'Consulte disponibilidade'}</dd>
                </div>
                <div className="rounded-2xl bg-fundo p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-texto/75">Cor</dt>
                  <dd className="mt-1 font-semibold text-texto">{detalhes?.cor || 'Consulte disponibilidade'}</dd>
                </div>
              </dl>

              <a
                href={mensagemWhatsApp}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-marca-primaria px-4 py-3 font-bold text-white transition-colors hover:bg-marca-primaria/90"
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  <Icone nome="whatsapp" className="h-5 w-5" />
                </span>
                Tenho interesse
              </a>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
