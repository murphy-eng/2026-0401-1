import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Phone, Mail, MapPin, Globe, Search, Cpu, Zap, Activity, Monitor, Wifi, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Components ---

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-secondary text-white p-3 rounded-full shadow-lg hover:bg-secondary/90 transition-all"
        >
          <ChevronRight className="-rotate-90" size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首頁', href: '#' },
    { name: '關於瑞芯', href: '#about' },
    { name: '代理產品', href: '#products' },
    { name: '解決方案', href: '#solutions' },
    { name: '最新消息', href: '#news' },
    { name: '聯絡我們', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-300",
      scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-2xl font-bold tracking-tighter flex items-center">
              <span className={cn("text-primary", !scrolled && "text-white")}>EM</span>
              <span className={cn("text-secondary")}>TAK</span>
              <span className={cn("ml-2 text-lg font-medium", scrolled ? "text-slate-800" : "text-white")}>瑞芯科技</span>
            </div>
          </div>

          {/* Desktop Menu - Right Aligned */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-semibold uppercase tracking-wider transition-colors duration-200",
                  scrolled ? "text-slate-700 hover:text-primary" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
              </a>
            ))}
            <button className={cn(
              "p-2 rounded-full transition-colors",
              scrolled ? "text-primary hover:bg-slate-100" : "text-white hover:bg-white/10"
            )}>
              <Search size={20} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-md",
                scrolled ? "text-slate-700" : "text-white"
              )}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/tech/1920/1080"
          alt="Technology Background"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-1 w-12 bg-secondary"></div>
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Established 2023</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            瑞芯科技 <br />
            <span className="text-secondary">EM</span>TAK
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            致力於各類半導體及電子零組件銷售、通路與技術支援服務。
            透過與原廠間緊密合作，提供具有市場競爭力的產品線與最適當的解決方案。
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#products" className="btn-primary flex items-center space-x-2 py-4 px-8 text-lg font-bold">
              <span>瀏覽產品線</span>
              <ChevronRight size={20} />
            </a>
            <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all py-4 px-8 text-lg font-bold rounded">
              聯絡我們
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-primary/10 skew-x-12 transform translate-x-1/2 z-0"></div>
    </section>
  );
};

const BrandMarquee = () => {
  const brands = [
    { name: 'AOS', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=AOS' },
    { name: 'AMAZING', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=AMAZING' },
    { name: 'AME', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=AME' },
    { name: 'ASIX', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=ASIX' },
    { name: 'AUO', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=AUO' },
    { name: 'BAYHUB', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=BAYHUB' },
    { name: 'BITEK', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=BITEK' },
    { name: 'CHIPLUS', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=CHIPLUS' },
  ];

  // Duplicate for seamless loop
  const marqueeBrands = [...brands, ...brands, ...brands];

  return (
    <div className="bg-white py-10 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs text-center">合作原廠品牌</h4>
      </div>
      <div className="relative flex">
        <div className="flex space-x-12 animate-marquee whitespace-nowrap">
          {marqueeBrands.map((brand, idx) => (
            <div key={`${brand.name}-${idx}`} className="flex items-center justify-center w-40 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img src={brand.logo} alt={brand.name} className="h-10 object-contain" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductLines = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [activeInitial, setActiveInitial] = useState('ALL');

  const tabs = ['全部', '類比應用', '通訊應用', '計算機應用', '消費性電子應用', '顯示器應用', 'LED應用', '車載應用'];
  const initials = [
    { label: 'A B C D E', value: 'ABCDE' },
    { label: 'F G H I J', value: 'FGHIJ' },
    { label: 'K L M N O', value: 'KLMNO' },
    { label: 'P Q R S T', value: 'PQRST' },
    { label: 'U V W X Y Z', value: 'UVWXYZ' },
  ];

  const brands = [
    { name: 'ALPHA & OMEGA', cnName: '萬有半導體', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=AOS', category: '類比應用', initial: 'A' },
    { name: 'AMAZING', cnName: '晶焱科技', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=AMAZING', category: '類比應用', initial: 'A' },
    { name: 'AME', cnName: '安茂微電子', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=AME', category: '類比應用', initial: 'A' },
    { name: 'ASIX', cnName: '亞信電子', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=ASIX', category: '通訊應用', initial: 'A' },
    { name: 'AUO', cnName: '友達', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=AUO', category: '顯示器應用', initial: 'A' },
    { name: 'BAYHUB', cnName: '倍昊電子', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=BAYHUB', category: '計算機應用', initial: 'B' },
    { name: 'BITEK', cnName: '碩頡科技', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=BITEK', category: '顯示器應用', initial: 'B' },
    { name: 'CHIPLUS', cnName: '晶發半導體', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=CHIPLUS', category: '計算機應用', initial: 'C' },
    { name: 'TECHCORE', cnName: '芯核科技', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=TECHCORE', category: '車載應用', initial: 'T' },
    { name: 'POWERELEC', cnName: '電力電子', logo: 'https://placehold.jp/24/004a99/ffffff/200x80.png?text=POWERELEC', category: 'LED應用', initial: 'P' },
  ];

  const filteredBrands = brands.filter(brand => {
    const categoryMatch = activeTab === '全部' || brand.category === activeTab;
    const initialMatch = activeInitial === 'ALL' || activeInitial.includes(brand.initial);
    return categoryMatch && initialMatch;
  });

  return (
    <section id="products" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">代理產品線</h2>
          <div className="h-1.5 w-20 bg-secondary mx-auto mb-6"></div>
        </div>

        {/* Filters - Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === tab 
                  ? "bg-[#C40031] text-white shadow-md" 
                  : "bg-white text-slate-600 hover:bg-slate-100"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters - Alphabetical */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-slate-200 pb-8">
          <button 
            onClick={() => setActiveInitial('ALL')}
            className={cn("text-sm font-bold transition-colors", activeInitial === 'ALL' ? "text-[#C40031]" : "text-slate-400 hover:text-slate-600")}
          >
            ALL
          </button>
          {initials.map(group => (
            <button
              key={group.value}
              onClick={() => setActiveInitial(group.value)}
              className={cn(
                "text-sm font-bold tracking-widest transition-colors",
                activeInitial === group.value ? "text-[#C40031]" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {group.label}
            </button>
          ))}
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBrands.map((brand) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={brand.name}
                className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center group hover:shadow-md transition-all"
              >
                <div className="h-20 flex items-center justify-center mb-6">
                  <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-slate-400 text-xs font-medium uppercase tracking-wider">{brand.name}</h4>
                  <p className="text-slate-500 text-sm font-bold">{brand.cnName}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://picsum.photos/seed/office/800/600"
                alt="EMTAK Office"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-8 border-white/30 w-[110%] h-[110%] rounded-2xl pointer-events-none"></div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">關於瑞芯科技</h2>
            <div className="h-1.5 w-20 bg-secondary mb-8"></div>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                EMTAK 瑞芯科技 成立於2023年，致力於各類半導體及電子零組件銷售、通路、技術支援等服務。
              </p>
              <p>
                我們秉持著為客戶服務的精神，進一步了解客戶的需求，配合客戶的需求，滿足客戶的需求。透過與原廠間緊密合作關係提供具有市場競爭力的產品線。
              </p>
              <p>
                針對各市場領域的產品提供最適當的解決方案與快速技術服務，助力客戶能在最短的時間推出終端產品。
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="border-l-4 border-primary pl-4">
                <div className="text-3xl font-bold text-primary">2023</div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">成立年份</div>
              </div>
              <div className="border-l-4 border-secondary pl-4">
                <div className="text-3xl font-bold text-secondary">100%</div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">客戶滿意度</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">與我們聯繫</h2>
            <div className="h-1.5 w-20 bg-secondary mb-8"></div>
            <p className="text-slate-400 mb-10 text-lg">
              如果您對我們的產品有任何疑問，或需要技術支援，歡迎隨時與我們聯繫。
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-3 rounded-lg text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">電話</h4>
                  <p className="text-slate-400">(02) 7752-2536 #178</p>
                  <p className="text-slate-400">0911-553-390</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-3 rounded-lg text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">電子郵件</h4>
                  <p className="text-slate-400">Kevin_chou@emtak-tech.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-3 rounded-lg text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">辦公地址</h4>
                  <p className="text-slate-400">台灣台北市 (請洽專員)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">發送訊息</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">姓名</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900"
                    placeholder="您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">公司名稱</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900"
                    placeholder="您的公司"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">電子郵件</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">訊息內容</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900"
                  placeholder="請輸入您的需求..."
                ></textarea>
              </div>
              <button type="submit" className="w-full btn-secondary py-4 text-lg font-bold">
                提交表單
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold tracking-tighter flex items-center">
            <span className="text-primary">EM</span>
            <span className="text-secondary">TAK</span>
            <span className="ml-2 text-lg font-medium text-white">瑞芯科技</span>
          </div>
          <div className="flex space-x-8 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">隱私政策</a>
            <a href="#" className="hover:text-white transition-colors">服務條款</a>
            <a href="#" className="hover:text-white transition-colors">網站地圖</a>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} EMTAK 瑞芯科技股份有限公司. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

const Solutions = () => {
  const solutions = [
    { title: '工業控制', desc: '提供高穩定性、長壽命的電子元件，適用於自動化設備與工控系統。', icon: 'Industrial' },
    { title: '消費電子', desc: '針對穿戴裝置、智慧家電提供低功耗、高效能的解決方案。', icon: 'Consumer' },
    { title: '車用電子', desc: '符合車規認證的關鍵零組件，助力智慧座艙與輔助駕駛系統。', icon: 'Automotive' },
    { title: '物聯網 (IoT)', desc: '完整的無線通訊與感測技術，實現萬物互聯的智慧場景。', icon: 'IoT' },
  ];

  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">解決方案</h2>
            <div className="h-1.5 w-20 bg-secondary mb-6"></div>
            <p className="text-slate-600 max-w-xl">
              瑞芯科技不僅提供零組件，更致力於為客戶提供完整的技術解決方案，縮短研發週期。
            </p>
          </div>
          <a href="#" className="btn-primary py-3 px-8 text-sm font-bold uppercase tracking-widest">
            查看所有方案
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((sol, idx) => (
            <div key={sol.title} className="group relative overflow-hidden rounded-2xl bg-slate-50 p-8 border border-slate-100 hover:bg-primary transition-all duration-500">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <span className="text-primary font-bold group-hover:text-white">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors">{sol.title}</h3>
                <p className="text-slate-500 group-hover:text-white/80 transition-colors leading-relaxed">
                  {sol.desc}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 text-slate-200/20 text-8xl font-black group-hover:text-white/10 transition-colors">
                {sol.icon[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const News = () => {
  const news = [
    { date: '2024-03-15', category: '產品消息', title: '瑞芯科技正式代理 Brand X 全系列感測器產品', img: 'https://picsum.photos/seed/news1/400/250' },
    { date: '2024-02-28', category: '企業動態', title: '瑞芯科技參加 2024 台北國際電子展', img: 'https://picsum.photos/seed/news2/400/250' },
    { date: '2024-01-10', category: '技術支援', title: '關於智慧家居解決方案的技術研討會圓滿結束', img: 'https://picsum.photos/seed/news3/400/250' },
  ];

  return (
    <section id="news" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">最新消息</h2>
          <div className="h-1.5 w-20 bg-secondary mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <time className="text-sm text-slate-400 font-medium mb-2 block">{item.date}</time>
                <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <a href="#" className="text-primary font-bold text-sm flex items-center space-x-1">
                  <span>閱讀全文</span>
                  <ChevronRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-secondary selection:text-white scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <BrandMarquee />
        <ProductLines />
        <Solutions />
        <About />
        <News />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
