import React, { useState, useCallback } from 'react';
import { 
  MapPin, 
  Trophy, 
  Users, 
  Heart, 
  Mail, 
  Camera,
  Star,
  Settings,
  Sparkles,
  Target,
  Gift
} from 'lucide-react';
import { useWaitlist } from './hooks/useWaitlist';
import { EmailForm } from './components/EmailForm';
import { AdminPage } from './pages/AdminPage';
import { AdminLogin } from './components/AdminLogin';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const { addToWaitlist, isLoading, error, clearError } = useWaitlist();

  // Updated admin password
  const ADMIN_PASSWORD = 'Svampebob100!';

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    clearError();
    const result = await addToWaitlist(email);
    
    if (result.success) {
      setIsSubmitted(true);
      setEmail('');
    }
  }, [email, addToWaitlist, clearError]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleAdminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setAdminError(null);
    } else {
      setAdminError('Feil passord. Prøv igjen.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setShowAdmin(false);
    setAdminError(null);
  };

  // Show admin login if admin panel is requested but user is not authenticated
  if (showAdmin && !isAdminAuthenticated) {
    return <AdminLogin onLogin={handleAdminLogin} error={adminError} />;
  }

  // Show admin panel if authenticated
  if (showAdmin && isAdminAuthenticated) {
    return <AdminPage onBack={handleAdminLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50 to-amber-50">
      {/* Admin Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setShowAdmin(true)}
          className="group p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
          title="Admin panel"
        >
          <Settings className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-colors" />
        </button>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-amber-200/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-700 to-emerald-800">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-12">
              {/* Enhanced logo with glow effect */}
              <div className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <MapPin className="relative w-12 h-12 text-white" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
              
              <h1 className="text-6xl font-bold text-white sm:text-7xl lg:text-8xl mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                  Utforsk
                </span>
              </h1>
              
              <p className="max-w-4xl mx-auto text-xl text-emerald-100 sm:text-2xl lg:text-3xl leading-relaxed font-light">
                Oppdag nye steder i nærmiljøet ditt – få daglige oppgaver, tjen poeng og vinn premier!
              </p>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center space-x-8 mt-8 text-emerald-200">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-medium">1000+ påmeldt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium">Lanseres snart</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span className="text-sm font-medium">Gratis å bruke</span>
                </div>
              </div>
            </div>

            {/* Email Signup Form */}
            <EmailForm
              email={email}
              isSubmitted={isSubmitted}
              isLoading={isLoading}
              error={error}
              onEmailChange={handleEmailChange}
              onSubmit={handleSubmit}
              className="mt-16"
            />
          </div>
        </div>
        
        {/* Enhanced decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-stone-50" viewBox="0 0 1440 64" fill="currentColor">
            <path d="M0,64 C360,0 720,0 1080,32 C1200,40 1320,48 1440,64 L1440,64 L0,64 Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-6">
            <Target className="w-4 h-4 mr-2" />
            Hvorfor velge oss?
          </div>
          <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl mb-6 tracking-tight">
            En helt ny måte å utforske på
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kombinerer gamification med lokal oppdagelse for en unik opplevelse som belønner nysgjerrighet.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 - Enhanced */}
          <div className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Daglige oppgaver</h3>
              <p className="text-gray-600 leading-relaxed">
                Få spennende oppgaver som tilpasses hvor du er. Oppdage nye steder du aldri har vært før.
              </p>
            </div>
          </div>

          {/* Feature 2 - Enhanced */}
          <div className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vinn premier</h3>
              <p className="text-gray-600 leading-relaxed">
                Konkurrer om pengepremier og andre belønninger. Jo mer du utforsker, jo mer kan du vinne.
              </p>
            </div>
          </div>

          {/* Feature 3 - Enhanced */}
          <div className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lokal konkurranse</h3>
              <p className="text-gray-600 leading-relaxed">
                Sammenlign poeng med venner og naboer via leaderboard. Se hvem som utforsker mest!
              </p>
            </div>
          </div>

          {/* Feature 4 - Enhanced */}
          <div className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Støtt en god sak</h3>
              <p className="text-gray-600 leading-relaxed">
                En del av premien doneres til ideelle organisasjoner. Utforsk og gjør en forskjell samtidig.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Enhanced */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 via-stone-100 to-orange-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Slik fungerer det
            </div>
            <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl mb-6 tracking-tight">
              Kom i gang på få minutter
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              En enkel prosess som tar deg fra påmelding til din første utforskningsoppgave
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1 - Enhanced */}
            <div className="group flex items-start space-x-8 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Meld deg på venteliste</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Registrer din e-postadresse og bli varslet når appen lanseres. Du får også eksklusiv tilgang til beta-versjonen.
                </p>
              </div>
              <div className="flex-shrink-0 p-4 bg-emerald-100 rounded-2xl group-hover:bg-emerald-200 transition-colors">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            {/* Step 2 - Enhanced */}
            <div className="group flex items-start space-x-8 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Motta daglige oppgaver basert på lokasjon</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Få personlige oppgaver tilpasset området ditt og interessene dine. Hver oppgave er unik og spennende.
                </p>
              </div>
              <div className="flex-shrink-0 p-4 bg-orange-100 rounded-2xl group-hover:bg-orange-200 transition-colors">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            {/* Step 3 - Enhanced */}
            <div className="group flex items-start space-x-8 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Ta bilde og last opp for å fullføre oppgaven</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Dokumenter oppdagelsen din og del den med fellesskapet. Dine bilder inspirerer andre til å utforske.
                </p>
              </div>
              <div className="flex-shrink-0 p-4 bg-blue-100 rounded-2xl group-hover:bg-blue-200 transition-colors">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {/* Step 4 - Enhanced */}
            <div className="group flex items-start space-x-8 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Tjen poeng, konkurrer og vinn premier</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Samle poeng, klatre på leaderboard og vinn fantastiske premier. Hver utforskning bringer deg nærmere seieren.
                </p>
              </div>
              <div className="flex-shrink-0 p-4 bg-purple-100 rounded-2xl group-hover:bg-purple-200 transition-colors">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 px-4 bg-gradient-to-r from-emerald-600 via-green-700 to-emerald-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-6 animate-pulse" />
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
              Klar til å starte utforskningsreisen?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Bli en av de første til å oppleve Utforsk. Registrer deg på ventelisten i dag og få eksklusiv tilgang!
            </p>
          </div>
          
          <EmailForm
            email={email}
            isSubmitted={isSubmitted}
            isLoading={isLoading}
            error={error}
            onEmailChange={handleEmailChange}
            onSubmit={handleSubmit}
          />
          
          <p className="text-emerald-200 text-sm mt-6">
            Ingen spam, kun oppdateringer om lansering og eksklusivt innhold.
          </p>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500 to-orange-500"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold">Utforsk</h3>
            </div>
            
            <div className="mb-12">
              <p className="text-gray-400 mb-6 text-lg">
                Har du spørsmål? Ta kontakt med oss:
              </p>
              <a 
                href="mailto:kontakt@utforsk.org" 
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                kontakt@utforsk.org
              </a>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <p className="text-gray-400">
                  © 2025 Utforsk. All rights reserved.
                </p>
                <div className="flex space-x-8">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">
                    Personvern
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">
                    Vilkår
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">
                    Om oss
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;