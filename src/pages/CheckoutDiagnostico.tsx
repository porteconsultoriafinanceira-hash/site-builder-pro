import { useEffect, useState } from "react";
import { Loader2, Shield, Lock, CheckCircle, Sparkles, Award, Target, Zap, Star, Gem, Rocket, Gift } from "lucide-react";
import logo from "@/assets/logo.png";

const CheckoutDiagnostico = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1); // Para animação progressiva

  useEffect(() => {
    // Animação de etapas
    const interval = setInterval(() => {
      setStep((prev) => (prev % 3) + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initiateCheckout = async () => {
      const email = sessionStorage.getItem("userEmail");
      
      if (!email) {
        setError("Ops! Algo deu errado. Vamos recomeçar?");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            product: "diagnostico",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
            return;
          }
        }

        setTimeout(() => {
          window.location.href = "/diagnostico?status=approved";
        }, 2000);

      } catch (err) {
        setTimeout(() => {
          window.location.href = "/diagnostico?status=approved";
        }, 2000);
      }
    };

    initiateCheckout();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-azul-profundo/5 to-verde-seguranca/5 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg border border-verde-seguranca/20 text-center">
          <div className="relative">
            <Sparkles className="w-12 h-12 text-amarelo-conquista mx-auto mb-4 animate-pulse" />
            <img src={logo} alt="Logo" className="h-14 mx-auto mb-6" />
          </div>
          <h2 className="text-2xl font-bold text-azul-profundo mb-4">
            🎈 Quase lá!
          </h2>
          <p className="text-cinza-escuro mb-6">{error}</p>
          <a
            href="/diagnosticoform"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-verde-seguranca to-azul-profundo text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <Rocket className="w-5 h-5" />
            Voltar e continuar minha jornada
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-profundo/10 via-white to-verde-seguranca/10 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-verde-seguranca/30">
        
        {/* Cabeçalho lúdico */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <div className="absolute -top-4 -right-4">
              <Sparkles className="w-8 h-8 text-amarelo-conquista animate-bounce" />
            </div>
            <img src={logo} alt="Logo" className="h-16 mx-auto mb-6 transform hover:scale-105 transition-transform duration-300" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-azul-profundo mb-4">
            <span className="inline-flex items-center gap-2">
              🎯 Parabéns!
              <Star className="w-8 h-8 text-amarelo-conquista fill-amarelo-conquista animate-spin-slow" />
            </span>
          </h1>
          
          <p className="text-xl text-cinza-escuro mb-2">
            Você encontrou o caminho para sua <span className="font-bold text-verde-seguranca">libertação financeira</span>!
          </p>
          <div className="inline-flex items-center gap-2 bg-azul-profundo/10 px-4 py-2 rounded-full">
            <Gift className="w-5 h-5 text-verde-seguranca" />
            <span className="text-sm font-semibold text-azul-profundo">
              Oferta especial ativada com sucesso!
            </span>
          </div>
        </div>

        {/* Conteúdo principal com estilo lúdico */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Lado esquerdo - Benefícios */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-azul-profundo/5 to-verde-seguranca/5 p-6 rounded-2xl border border-azul-profundo/20">
              <h3 className="text-xl font-bold text-azul-profundo mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-amarelo-conquista" />
                O que você vai conquistar:
              </h3>
              
              <div className="space-y-4">
                <div className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-500 ${step === 1 ? 'bg-white shadow-md scale-[1.02]' : 'bg-transparent'}`}>
                  <div className="flex-shrink-0 w-8 h-8 bg-verde-seguranca/20 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-verde-seguranca" />
                  </div>
                  <div>
                    <h4 className="font-bold text-cinza-escuro">Mapa Detector de Abusos</h4>
                    <p className="text-sm text-cinza-medio">Encontre cobranças escondidas como um caça-tesouros!</p>
                  </div>
                </div>
                
                <div className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-500 ${step === 2 ? 'bg-white shadow-md scale-[1.02]' : 'bg-transparent'}`}>
                  <div className="flex-shrink-0 w-8 h-8 bg-azul-profundo/20 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-azul-profundo" />
                  </div>
                  <div>
                    <h4 className="font-bold text-cinza-escuro">Kit Poder de Ação</h4>
                    <p className="text-sm text-cinza-medio">Modelos prontos que funcionam como superpoderes!</p>
                  </div>
                </div>
                
                <div className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-500 ${step === 3 ? 'bg-white shadow-md scale-[1.02]' : 'bg-transparent'}`}>
                  <div className="flex-shrink-0 w-8 h-8 bg-amarelo-conquista/20 rounded-full flex items-center justify-center">
                    <Gem className="w-4 h-4 text-amarelo-conquista" />
                  </div>
                  <div>
                    <h4 className="font-bold text-cinza-escuro">Guia do Herói Financeiro</h4>
                    <p className="text-sm text-cinza-medio">Passo a passo ilustrado e descomplicado!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emojis flutuantes */}
            <div className="flex justify-center gap-4 text-2xl">
              <span className="animate-bounce">💰</span>
              <span className="animate-bounce delay-100">📉</span>
              <span className="animate-bounce delay-200">🎉</span>
              <span className="animate-bounce delay-300">🛡️</span>
            </div>
          </div>

          {/* Lado direito - Checkout */}
          <div className="bg-gradient-to-b from-azul-profundo to-azul-profundo/90 text-white p-7 rounded-2xl shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">OFERTA ESPECIAL</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Seu Kit Salva-Dívidas</h3>
              <p className="text-white/80 mb-6">Tudo que você precisa em um só lugar!</p>
              
              {/* Preço com destaque lúdico */}
              <div className="relative mb-6">
                <div className="absolute -inset-4 bg-gradient-to-r from-amarelo-conquista/20 to-verde-seguranca/20 rounded-2xl blur-md"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <div className="text-5xl font-black mb-2">R$ 47</div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm line-through opacity-60">De R$ 197</span>
                    <span className="bg-amarelo-conquista text-azul-profundo text-xs font-bold px-3 py-1 rounded-full">
                      ECONOMIZE 76%
                    </span>
                  </div>
                  <p className="text-xs mt-2 opacity-80">Menos de R$ 1,60 por dia!</p>
                </div>
              </div>
            </div>

            {/* Status do pagamento */}
            <div className="bg-white/10 p-5 rounded-xl mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Loader2 className="w-6 h-6 text-verde-seguranca animate-spin" />
                <span className="font-semibold">Preparando seu acesso VIP...</span>
              </div>
              
              {/* Barra de progresso estilizada */}
              <div className="relative h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="absolute h-full w-full bg-gradient-to-r from-verde-seguranca via-amarelo-conquista to-verde-seguranca animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Selos de confiança melhorados */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-verde-seguranca/10 to-emerald-100 p-4 rounded-xl border border-verde-seguranca/30 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
              <Shield className="w-6 h-6 text-verde-seguranca" />
            </div>
            <span className="font-semibold text-sm text-azul-profundo">Seguro</span>
            <span className="text-xs text-cinza-medio">100% Protegido</span>
          </div>
          
          <div className="bg-gradient-to-r from-azul-profundo/10 to-blue-50 p-4 rounded-xl border border-azul-profundo/30 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
              <Lock className="w-6 h-6 text-azul-profundo" />
            </div>
            <span className="font-semibold text-sm text-azul-profundo">Criptografado</span>
            <span className="text-xs text-cinza-medio">Mercado Pago</span>
          </div>
          
          <div className="bg-gradient-to-r from-amarelo-conquista/10 to-yellow-50 p-4 rounded-xl border border-amarelo-conquista/30 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
              <CheckCircle className="w-6 h-6 text-amarelo-conquista" />
            </div>
            <span className="font-semibold text-sm text-azul-profundo">Garantia</span>
            <span className="text-xs text-cinza-medio">7 Dias</span>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/10 to-purple-50 p-4 rounded-xl border border-purple-500/30 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
              <Rocket className="w-6 h-6 text-purple-500" />
            </div>
            <span className="font-semibold text-sm text-azul-profundo">Acesso Imediato</span>
            <span className="text-xs text-cinza-medio">Após Pagamento</span>
          </div>
        </div>

        {/* Rodapé motivacional */}
        <div className="mt-10 text-center">
          <p className="text-cinza-medio text-sm italic">
            ⭐ "Você está a um clique de transformar sua relação com o banco!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDiagnostico;
