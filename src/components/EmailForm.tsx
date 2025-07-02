import React from 'react';
import { Mail, CheckCircle, ArrowRight, AlertCircle, Sparkles, Gift, Users, Star } from 'lucide-react';

interface EmailFormProps {
  email: string;
  isSubmitted: boolean;
  isLoading: boolean;
  error: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export function EmailForm({
  email,
  isSubmitted,
  isLoading,
  error,
  onEmailChange,
  onSubmit,
  className = ""
}: EmailFormProps) {
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {!isSubmitted ? (
        <div className="space-y-8">
          {/* Main form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl blur opacity-20"></div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 z-10" />
                  <input
                    type="email"
                    value={email}
                    onChange={onEmailChange}
                    placeholder="Din e-postadresse"
                    className="relative w-full pl-12 pr-4 py-5 text-gray-900 bg-white/95 backdrop-blur-sm rounded-2xl border-0 shadow-xl focus:ring-4 focus:ring-orange-200 focus:outline-none text-lg font-medium placeholder-gray-500 transition-all duration-200"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !email}
                className="group relative px-8 py-5 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-200 focus:outline-none shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
                
                <div className="relative flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Melder på...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      Meld deg på venteliste
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </div>
            
            {error && (
              <div className="relative">
                <div className="absolute inset-0 bg-red-100 rounded-2xl blur opacity-50"></div>
                <div className="relative flex items-start p-5 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-2xl">
                  <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium">Oops! Noe gikk galt</p>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </form>

          {/* Benefits section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-blue-100/50 rounded-3xl blur opacity-30"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-4">
                  <Gift className="w-4 h-4 mr-2" />
                  Eksklusivt for venteliste-medlemmer
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Få disse fordelene når du melder deg på
                </h3>
                <p className="text-gray-600 text-lg">
                  Som en av de første får du tilgang til spesielle fordeler og premier
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Benefit 1 */}
                <div className="group text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Tidlig tilgang</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Få tilgang til appen 2 uker før offentlig lansering og test alle funksjoner først
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="group text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Bonus startpoeng</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Start med 500 ekstra poeng og få en fordel i konkurransen om de første premiene
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="group text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">VIP-status</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Få spesielle utfordringer, høyere belønninger og eksklusivt VIP-merke i appen
                  </p>
                </div>
              </div>

              {/* Additional perks */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-700 font-medium mb-4">Pluss disse ekstra fordelene:</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                      ✨ Eksklusiv tilgang til alle funksjoner
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      🎯 Eksklusiv tilgang til beta-funksjoner
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      🏆 Mulighet til å vinne lanserings-premier
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-6 text-emerald-100 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">1000+ allerede påmeldt</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">Lanseres snart</span>
              </div>
            </div>
            <p className="text-emerald-200 text-sm">
              Ingen spam, kun oppdateringer om lansering og eksklusivt innhold. Avmeld når som helst.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Success glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-emerald-200 rounded-3xl blur opacity-30"></div>
          
          <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200 overflow-hidden">
            {/* Success header */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Velkommen til Utforsk! 🎉</h3>
              <p className="text-emerald-100 text-lg">
                Du er nå offisielt på ventelisten og vil få tidlig tilgang til appen
              </p>
            </div>

            {/* Success content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Hva skjer nå?</h4>
                <p className="text-gray-600 leading-relaxed">
                  Vi sender deg en e-post med alle detaljene om lansering og dine eksklusivt fordeler
                </p>
              </div>

              {/* Next steps */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Sjekk e-posten din</h5>
                    <p className="text-gray-600 text-sm">Vi sender deg en velkomst-e-post med alle detaljene</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Få tidlig tilgang</h5>
                    <p className="text-gray-600 text-sm">Du får tilgang til beta-versjonen 2 uker før lansering</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Start utforskningen</h5>
                    <p className="text-gray-600 text-sm">Begynn å samle poeng og konkurrer om de første premiene</p>
                  </div>
                </div>
              </div>

              {/* Share section */}
              <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-2">Del med venner og få bonuspoeng! 🚀</h5>
                <p className="text-gray-600 text-sm mb-4">
                  For hver venn som melder seg på gjennom din anbefaling får du 100 ekstra startpoeng
                </p>
                <div className="flex justify-center space-x-3">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                    Del på Facebook
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                    Del på WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}