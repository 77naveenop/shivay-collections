import React, { useState } from 'react';
import { Globe, Server, ShieldCheck, Check, Copy, ExternalLink, Zap, ArrowRight, HelpCircle } from 'lucide-react';

export const DomainSetupGuide = () => {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider border border-brand-400/30">
            <Globe className="w-3.5 h-3.5" />
            <span>Custom Domain Setup</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-black">
            Connecting <span className="text-brand-400">shivaycollections.com</span>
          </h1>

          <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
            Follow these simple steps to connect your registered domain <strong>shivaycollections.com</strong> (from GoDaddy, Namecheap, Hostinger, or Google Domains) to this live modern e-commerce web application.
          </p>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Step-by-Step DNS Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Step 1: DNS Records Table */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">
              1
            </span>
            <h3>Add DNS Records at Your Domain Registrar</h3>
          </div>

          <p className="text-xs text-stone-500 leading-relaxed">
            Log in to where you purchased <strong>shivaycollections.com</strong> (e.g., GoDaddy, Hostinger, Namecheap) and navigate to <strong>DNS Management</strong>:
          </p>

          <div className="space-y-3 pt-1">
            {/* Record 1 */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <div className="flex justify-between items-center text-stone-500 font-medium">
                <span>Apex Domain (Root)</span>
                <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">A Record</span>
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-stone-800 pt-1">
                <div>
                  <span className="text-[10px] text-stone-400 block font-sans">Type</span>
                  <strong>A</strong>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block font-sans">Host / Name</span>
                  <strong>@</strong>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block font-sans">Points To</span>
                    <strong>76.76.21.21</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('76.76.21.21', 'a-record')}
                    className="p-1 text-stone-400 hover:text-stone-800"
                    title="Copy IP"
                  >
                    {copiedKey === 'a-record' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Record 2 */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <div className="flex justify-between items-center text-stone-500 font-medium">
                <span>WWW Subdomain</span>
                <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded text-[10px]">CNAME Record</span>
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-stone-800 pt-1">
                <div>
                  <span className="text-[10px] text-stone-400 block font-sans">Type</span>
                  <strong>CNAME</strong>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block font-sans">Host / Name</span>
                  <strong>www</strong>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block font-sans">Target</span>
                    <strong className="truncate max-w-[90px]">cname.vercel-dns.com</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard('cname.vercel-dns.com', 'cname-record')}
                    className="p-1 text-stone-400 hover:text-stone-800"
                    title="Copy CNAME"
                  >
                    {copiedKey === 'cname-record' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Hosting & Deployment Options */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">
              2
            </span>
            <h3>Deploy Store in 1-Click to Vercel / Netlify</h3>
          </div>

          <p className="text-xs text-stone-500 leading-relaxed">
            This repository is production-ready. You can deploy it for free with automatic SSL certificates and global CDN delivery:
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <span className="font-bold text-stone-800 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Vercel (Recommended for Next/React)
              </span>
              <p className="text-stone-500 text-[11px]">
                Run `npm i -g vercel` then `vercel` in this folder, or connect your GitHub repo at vercel.com. Enter `shivaycollections.com` in Project Settings &gt; Domains.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <span className="font-bold text-stone-800 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Automatic Free SSL (HTTPS)
              </span>
              <p className="text-stone-500 text-[11px]">
                Once DNS records are verified, Let’s Encrypt SSL is issued automatically. Your visitors will see the secure lock icon 🔒 on `https://shivaycollections.com`.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Step 3: Razorpay Payment Gateway Live Keys */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">
            3
          </span>
          <h3>Razorpay Live Gateway Credentials (.env)</h3>
        </div>

        <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
          To receive real payments directly to your Indian bank account via UPI, Cards, and NetBanking, create a free account at <strong>razorpay.com</strong>, complete instant KYC, and paste your Key ID in the `.env` file:
        </p>

        <div className="p-4 rounded-2xl bg-stone-900 text-stone-200 font-mono text-xs flex items-center justify-between">
          <code>
            VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxx<br />
            VITE_STORE_DOMAIN=https://shivaycollections.com
          </code>
          <button
            onClick={() => copyToClipboard('VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxx\nVITE_STORE_DOMAIN=https://shivaycollections.com', 'env')}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white transition shrink-0 ml-4"
            title="Copy ENV variables"
          >
            {copiedKey === 'env' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

    </div>
  );
};
