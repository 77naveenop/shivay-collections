# Shivay Collections (shivaycollections.com)

A high-performance modern e-commerce web application for **Shivay Collections** (`https://shivaycollections.com`). 

Featuring:
- **Curated Multi-Category Catalog**:
  - **Women's Wear**: Handloom Banarasi Silk Sarees, Embroidered Chanderi Anarkalis, Western Floral Dresses, Linen Co-ords, Designer Lehengas.
  - **Men's Collection**: Pure Raw Silk Festive Kurtas, Jacquard Bandhgalas, Egyptian Giza Cotton Formal Shirts, Supima Pique Polos, Comfort Flex Chinos.
  - **Kids & Teens (All Ages)**: Boys Brocade Kurta Sets, Girls Party Tulle Gowns, Infant Organic Rompers, Youth Graphic Tracksuits.
  - **Luxury Cosmetics & Skincare**: 24K Gold Collagen Radiance Serums, Velvet Matte Lipsticks, Kannauj Steam-Distilled Rose Mists, Royal Oud Perfumes, Ayurvedic Kajal.
- **Indian Payment Methods**:
  - Razorpay UPI (Google Pay, PhonePe, Paytm, BHIM)
  - Debit/Credit Cards (RuPay, Visa, MasterCard) & NetBanking
  - Cash on Delivery (COD) with PIN code verification
- **E-Commerce Features**:
  - Live search with instant filtering & sorting
  - Interactive Shopping Bag drawer with free delivery meter
  - Discount coupons (`SHIVAY10`, `FESTIVE500`, `WELCOME200`)
  - Multi-step Indian checkout with state & 6-digit PIN validation
  - Real-time Order Tracking & Timeline
  - Admin Portal with Revenue Analytics, Inventory Manager & Order Status modifier
  - Domain Setup Guide with ready-to-copy DNS records for `shivaycollections.com`

---

## 🚀 Quick Start (Local Run)

1. Open a terminal in this project folder:
   ```bash
   cd C:\Users\navee\.gemini\antigravity\scratch\shivaycollections
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open in your browser:
   ```
   http://localhost:3000
   ```

---

## 🌐 Connecting Domain: `shivaycollections.com`

1. Go to your domain registrar (GoDaddy, Hostinger, Namecheap, BigRock):
2. In **DNS Management**, add the following records:
   - **A Record**:
     - Host: `@`
     - Points to: `76.76.21.21` (Vercel Anycast IP)
   - **CNAME Record**:
     - Host: `www`
     - Points to: `cname.vercel-dns.com`
3. In your Vercel/Netlify dashboard, add `shivaycollections.com` under Project Domains.
4. SSL will automatically be provisioned within 15-30 minutes.

---

## 💳 Integrating Live Razorpay Payment Gateway

1. Register at [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Go to **Settings > API Keys** and generate **Key ID**.
3. Add it to `.env`:
   ```env
   VITE_RAZORPAY_KEY_ID="rzp_live_xxxxxxxxxxxx"
   ```
4. All customer UPI and card payments will directly settle into your Indian bank account!
