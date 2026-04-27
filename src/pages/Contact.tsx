import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you shortly.');
  };

  return (
    <div className="bg-zinc-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-4">Contact Us</h1>
          <p className="text-lg text-zinc-400">Have questions? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="bg-zinc-900 border border-emerald-900/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-6">Store Information</h2>
              <div className="space-y-6 text-zinc-300">
                <div className="flex items-start gap-4">
                  <MapPin className="text-emerald-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">Address</h3>
                    <p>TOWN: GOLAKGANJ BAZAR<br/>DISTRICT: DHUBRI<br/>STATE: ASSAM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-emerald-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">Phone</h3>
                    <p>+91 9957201721<br/>+91 8638173157<br/>+91 6002726641</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-emerald-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">Email</h3>
                    <p>jitenray714@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-emerald-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">Hours</h3>
                    <p>
                      SUNDAY: 9AM - 9PM<br/>
                      MONDAY: 9AM - 9PM<br/>
                      TUESDAY: 9AM - 9PM<br/>
                      WEDNESDAY: OFF DAY<br/>
                      THURSDAY: 9AM - 9PM<br/>
                      FRIDAY: 9AM - 9PM<br/>
                      SATURDAY: 9AM - 9PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-zinc-800 h-64 rounded-lg flex items-center justify-center border border-zinc-700 overflow-hidden relative">
              {/* Simulate embedded map */}
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Map Location" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center">
                 <span className="bg-zinc-900 px-4 py-2 rounded text-sm text-emerald-400 font-bold border border-emerald-900">Map View Available in Store</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-900 border border-emerald-900/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-emerald-50 mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-50 mb-2">Phone Structure</label>
                <input 
                  type="tel" 
                  required
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Your Phone Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-50 mb-2">Message</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-emerald-500 text-zinc-950 font-bold py-3 rounded shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
