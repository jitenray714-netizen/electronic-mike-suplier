import React from 'react';
import { Mic2, ShieldCheck, Truck } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-zinc-950 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-8 text-center">About Us</h1>
        
        <div className="bg-zinc-900 border border-emerald-900/30 rounded-xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Welcome to Electronic Mike Suplier</h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Founded with a passion for pristine audio, Electronic Mike Suplier is your premier local destination for high-fidelity microphones, speakers, and audio mixing equipment. Whether you are a budding podcaster, a professional studio engineer, or an audiophile, we provide the gear you need to capture and output sound beautifully.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Our mission is simple: offer the best quality audio equipment at affordable prices while delivering unparalleled customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-zinc-900/50 rounded-lg border border-zinc-800">
            <ShieldCheck size={40} className="mx-auto text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Quality Assured</h3>
            <p className="text-zinc-400 text-sm">Every product is tested and verified for professional standards.</p>
          </div>
          <div className="text-center p-6 bg-zinc-900/50 rounded-lg border border-zinc-800">
            <Truck size={40} className="mx-auto text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Fast Delivery</h3>
            <p className="text-zinc-400 text-sm">Quick and safe delivery options to your doorstep.</p>
          </div>
          <div className="text-center p-6 bg-zinc-900/50 rounded-lg border border-zinc-800">
            <Mic2 size={40} className="mx-auto text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Expert Advice</h3>
            <p className="text-zinc-400 text-sm">Our team of audio professionals is here to guide your setup.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
