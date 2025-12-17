import React, { useState } from 'react';
import { Mail, Rocket, Sparkles, ArrowRight, Instagram } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6b4d5e] via-[#8b6d7f] to-[#6b4d5e] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl w-full text-center space-y-12 animate-fade-in mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-brand-cream/10 rounded-2xl backdrop-blur-sm mb-6">
              <Rocket className="h-12 w-12 text-brand-cream" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-brand-cream tracking-tight mb-8">
              CAREERZ.AZ
            </h1>
            
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-cream/90 tracking-tight">
                Coming Soon
              </h2>
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
                <p className="text-xl sm:text-2xl md:text-3xl text-brand-cream/90 font-light">
                  Something Amazing is on the Way
                </p>
                <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-lg sm:text-xl text-brand-cream/80 leading-relaxed">
              Explore careers through <span className="font-semibold text-brand-cream">real work experience</span>. 
              Build job-ready skills with free virtual work simulations designed by Azerbaijan's top employers.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-semibold text-brand-cream mb-4">
                Be the First to Know
              </h2>
              <p className="text-brand-cream/70 mb-6">
                Join our waitlist and get early access when we launch
              </p>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cream transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-brand-cream text-brand-purple px-8 py-4 rounded-xl font-semibold hover:bg-white transition transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Notify Me</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              ) : (
                <div className="bg-green-500/20 border border-green-400/50 rounded-xl p-4 text-brand-cream">
                  <p className="font-semibold">🎉 Thank you! We'll keep you updated.</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-brand-cream mb-2">200+</div>
              <div className="text-brand-cream/70 text-sm">Job Simulators</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-brand-cream mb-2">50+</div>
              <div className="text-brand-cream/70 text-sm">Partner Companies</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-brand-cream mb-2">100%</div>
              <div className="text-brand-cream/70 text-sm">Free Forever</div>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center w-full space-y-4 pb-8">
          <div className="flex items-center justify-center space-x-2">
            <a 
              href="https://instagram.com/careerz.az" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-brand-cream/70 hover:text-brand-cream transition group"
            >
              <Instagram className="h-5 w-5 group-hover:scale-110 transition" />
              <span className="text-sm font-medium">@careerz.az</span>
            </a>
          </div>
          <p className="text-brand-cream/60 text-sm">
            © 2026 Careerz.az - Career Exploration Platform
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
