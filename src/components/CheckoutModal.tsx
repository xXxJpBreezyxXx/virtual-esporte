'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, CreditCard, QrCode, Loader2, CheckCircle2, Truck, ArrowRight, ArrowLeft, User, MapPin, MessageCircle, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    gallery?: string[];
  } | null;
}

export default function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [validGallery, setValidGallery] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    taxId: '',
    phone: '',
    size: 'M',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [showFreeShipping, setShowFreeShipping] = useState(false);
  const [isBrazilCEP, setIsBrazilCEP] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter gallery to only images that exist
  useEffect(() => {
    if (!product?.gallery || product.gallery.length === 0) {
      setValidGallery([]);
      return;
    }

    const checkImages = async () => {
      const valid: string[] = [];
      for (const src of product.gallery!) {
        try {
          const res = await fetch(src, { method: 'HEAD' });
          if (res.ok) valid.push(src);
        } catch {
          // Image doesn't exist, skip
        }
      }
      setValidGallery(valid);
    };

    checkImages();
  }, [product?.gallery]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setGalleryIndex(0);
      setLightboxOpen(false);
    }
  }, [isOpen]);

  if (!product) return null;

  // Only show gallery images (real photos). Fallback to product.image if no gallery exists.
  const allImages = validGallery.length > 0
    ? validGallery
    : [product.image];

  const hasCarousel = allImages.length > 1;

  const prevImage = () => setGalleryIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  const nextImage = () => setGalleryIndex((prev) => (prev + 1) % allImages.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
          size: formData.size,
          customer: {
            name: formData.name,
            email: formData.email,
            taxId: formData.taxId,
            phone: formData.phone,
            address: {
              cep: formData.cep,
              street: formData.address,
              number: formData.number,
              complement: formData.complement,
              neighborhood: formData.neighborhood,
              city: formData.city,
              state: formData.state,
            }
          },
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Erro ao processar pagamento. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const canProceedToStep2 = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.taxId.replace(/\D/g, '').length === 11 && formData.phone.replace(/\D/g, '').length >= 10;

  const goToStep2 = () => {
    if (canProceedToStep2) {
      setStep(2);
    }
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      const masked = value.replace(/(\d{5})(\d{3})/, '$1-$2');
      setFormData(prev => ({ ...prev, cep: masked }));

      if (value.length === 8) {
        setLoadingCEP(true);
        try {
          const res = await fetch(`https://viacep.com.br/ws/${value}/json/`);
          const data = await res.json();
          if (!data.erro) {
            setFormData(prev => ({
              ...prev,
              address: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf
            }));
            setIsBrazilCEP(true);
            setShowFreeShipping(true);
          } else {
            setIsBrazilCEP(false);
            setShowFreeShipping(false);
          }
        } catch (err) {
          console.error("CEP fetch error", err);
          setIsBrazilCEP(false);
        } finally {
          setLoadingCEP(false);
        }
      }
    }
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      setFormData(prev => ({ ...prev, taxId: value }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length > 9) {
        value = `${value.slice(0, 9)}-${value.slice(9)}`;
      }
      setFormData(prev => ({ ...prev, phone: value }));
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C9A84C]/50 transition-colors text-sm";
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1";

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[95vh] bg-[#0A192F] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Side: Product Info + Carousel */}
              <div className="md:w-2/5 bg-[#0D213F] p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                
                {/* Image Carousel */}
                <div className="relative w-full aspect-square mb-4 rounded-2xl overflow-hidden group max-h-[220px] md:max-h-[280px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={galleryIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={allImages[galleryIndex]}
                        alt={`${product.name} - Foto ${galleryIndex + 1}`}
                        fill
                        className="object-cover cursor-pointer"
                        onClick={() => setLightboxOpen(true)}
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Zoom hint */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>

                  {/* Carousel arrows */}
                  {hasCarousel && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Carousel Dots */}
                {hasCarousel && (
                  <div className="flex gap-1.5 mb-3">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGalleryIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${galleryIndex === idx ? 'bg-[#C9A84C] w-5' : 'bg-white/30 hover:bg-white/50'}`}
                      />
                    ))}
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bebas-neue text-white mb-2 tracking-wide uppercase">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-2xl sm:text-3xl font-bold text-[#3CAC3B]">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mb-4">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <QrCode className="w-4 h-4 text-[#3CAC3B]" /> PIX
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <CreditCard className="w-4 h-4 text-[#3CAC3B]" /> Cartão
                    </div>
                  </div>

                  {/* WhatsApp tracking notice */}
                  <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-xl px-4 py-3">
                    <div className="flex items-center justify-center gap-2 text-[#C9A84C] text-xs font-bold">
                      <MessageCircle className="w-4 h-4" />
                      <span>Código de Rastreio enviado via WhatsApp</span>
                    </div>
                  </div>

                  {/* Step Indicator */}
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className={`flex items-center gap-1.5 text-xs font-bold ${step === 1 ? 'text-[#C9A84C]' : 'text-gray-500'}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors ${step === 1 ? 'border-[#C9A84C] bg-[#C9A84C]/20' : 'border-gray-600 bg-gray-700'}`}>
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="hidden sm:inline">Dados</span>
                    </div>
                    <div className={`w-8 h-[2px] ${step === 2 ? 'bg-[#C9A84C]' : 'bg-gray-700'}`} />
                    <div className={`flex items-center gap-1.5 text-xs font-bold ${step === 2 ? 'text-[#C9A84C]' : 'text-gray-500'}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors ${step === 2 ? 'border-[#C9A84C] bg-[#C9A84C]/20' : 'border-gray-600 bg-gray-700'}`}>
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span className="hidden sm:inline">Endereço</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Form Steps */}
              <div className="md:w-3/5 p-6 sm:p-10 overflow-y-auto max-h-[60vh] md:max-h-none">
                <AnimatePresence mode="wait">
                  {/* ==================== STEP 1: Personal Data ==================== */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Dados Pessoais</h2>
                        <p className="text-gray-400 text-sm">Preencha seus dados para o envio e contato.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>Nome Completo</label>
                            <input required type="text" name="name" placeholder="Ex: João Silva" value={formData.name} onChange={handleChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>E-mail</label>
                            <input required type="email" name="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} className={inputClass} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>CPF</label>
                            <input required type="text" name="taxId" placeholder="000.000.000-00" value={formData.taxId} onChange={handleCPFChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>WhatsApp / Celular</label>
                            <input required type="tel" name="phone" placeholder="(11) 99999-9999" value={formData.phone} onChange={handlePhoneChange} className={inputClass} />
                          </div>
                        </div>

                        {/* Size Selector */}
                        <div>
                          <label className={labelClass}>Tamanho</label>
                          <div className="flex gap-3">
                            {['P', 'M', 'G', 'GG'].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, size: s }))}
                                className={`flex-1 py-3 rounded-xl border transition-all font-bold text-sm ${
                                  formData.size === s
                                    ? 'bg-[#C9A84C] border-[#C9A84C] text-black shadow-[0_0_20px_rgba(201,168,76,0.3)]'
                                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={goToStep2}
                          disabled={!canProceedToStep2}
                          className="w-full bg-[#C9A84C] hover:bg-[#D4B85C] disabled:bg-gray-700 disabled:text-gray-500 text-[#020F2A] font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-2 shadow-xl"
                        >
                          <span>Próximo: Endereço de Entrega</span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ==================== STEP 2: Address ==================== */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="mb-6">
                        <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm mb-3">
                          <ArrowLeft className="w-4 h-4" />
                          <span>Voltar aos Dados Pessoais</span>
                        </button>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Endereço de Entrega</h2>
                        <p className="text-gray-400 text-sm">Informe o CEP para preenchimento automático.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence>
                          {showFreeShipping && isBrazilCEP && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                              <div className="bg-[#009C3B]/15 border border-[#009C3B]/30 rounded-xl px-4 py-3 flex items-center justify-center gap-2">
                                <Truck className="w-5 h-5 text-[#009C3B]" />
                                <span className="text-[#3CAC3B] font-bold text-sm">🎉 FRETE GRÁTIS para o Brasil! Entrega garantida.</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className={labelClass}>CEP</label>
                            <div className="relative">
                              <input required type="text" name="cep" placeholder="00000-000" value={formData.cep} onChange={handleCEPChange} className={inputClass} />
                              {loadingCEP && <div className="absolute right-3 top-3"><Loader2 className="w-5 h-5 animate-spin text-[#C9A84C]" /></div>}
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label className={labelClass}>Endereço (Rua/Avenida)</label>
                            <input required type="text" name="address" placeholder="Ex: Av. Paulista" value={formData.address} onChange={handleChange} className={inputClass} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className={labelClass}>Número</label>
                            <input required type="text" name="number" placeholder="123" value={formData.number} onChange={handleChange} className={inputClass} />
                          </div>
                          <div className="sm:col-span-2">
                            <label className={labelClass}>Complemento (opcional)</label>
                            <input type="text" name="complement" placeholder="Ex: Apto 42, Bloco B" value={formData.complement} onChange={handleChange} className={inputClass} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className={labelClass}>Bairro</label>
                            <input required type="text" name="neighborhood" placeholder="Bairro" value={formData.neighborhood} onChange={handleChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Cidade</label>
                            <input required type="text" name="city" placeholder="Cidade" value={formData.city} onChange={handleChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>UF</label>
                            <input required type="text" name="state" placeholder="SP" maxLength={2} value={formData.state} onChange={handleChange} className={`${inputClass} uppercase`} />
                          </div>
                        </div>

                        <div className={`rounded-xl px-4 py-3 text-center text-sm font-semibold ${isBrazilCEP ? 'bg-[#009C3B]/10 border border-[#009C3B]/20 text-[#3CAC3B]' : 'bg-white/5 border border-white/10 text-gray-400'}`}>
                          {isBrazilCEP ? (
                            <span className="flex items-center justify-center gap-2"><Truck className="w-4 h-4" /> Frete: <strong className="text-white">GRÁTIS</strong></span>
                          ) : (
                            <span>Preencha o CEP para calcular o frete</span>
                          )}
                        </div>

                        {error && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                            {error}
                          </motion.div>
                        )}

                        <button type="submit" disabled={loading} className="w-full bg-[#E61D25] hover:bg-[#FF1F29] disabled:bg-gray-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-2 shadow-xl">
                          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><ShoppingBag className="w-5 h-5" /> Prosseguir para Pagamento</>}
                        </button>

                        <p className="text-[10px] text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#3CAC3B]" /> Checkout Seguro via AbacatePay
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== LIGHTBOX ==================== */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
              className="absolute inset-0 bg-black/95"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative max-w-3xl max-h-[90vh] w-full"
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative w-full h-[60vh] md:h-[80vh]">
                <Image
                  src={allImages[galleryIndex]}
                  alt={`${product.name} - Ampliada`}
                  fill
                  className="object-contain rounded-2xl"
                  sizes="100vw"
                />
              </div>
              {hasCarousel && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black transition-colors"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black transition-colors"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGalleryIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${galleryIndex === idx ? 'bg-[#C9A84C] w-7' : 'bg-white/40'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
