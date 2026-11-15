import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Check, FileDown, FileText, Headphones, Layers3, Menu, Minus, Plus, Search,
  ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles, Truck, X, Zap,
} from 'lucide-react'
import { categories, connections, products, projects, series, solutions } from './mockData'

const money = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

function Logo({ onClick, inverse = false }) {
  return (
    <button onClick={onClick} className="flex shrink-0 items-center text-left" aria-label="LINA JSC — Trang chủ">
      <img src="/logo-lina-jsc.png" alt="LINA JSC" className={`object-contain ${inverse ? 'h-[124px] w-[96px] p-1' : 'h-20 w-16'}`} />
    </button>
  )
}

function Header({ page, setPage, query, setQuery, cartCount, openCart, openQuote }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const nav = [['Trang chủ', 'home'], ['Sản phẩm', 'catalog'], ['Giải pháp', 'solutions'], ['Dự án', 'projects'], ['Tài liệu kỹ thuật', 'documents']]
  const go = (key) => { setPage(key); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="container-wide flex h-[88px] items-center justify-between gap-5">
        <Logo onClick={() => go('home')} />
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, key]) => <button key={key} onClick={() => go(key)} className={`relative py-7 text-[13px] font-semibold transition-colors ${page === key ? 'text-brand-700' : 'text-slate-600 hover:text-brand-700'}`}>{label}{page === key && <span className="absolute bottom-0 left-0 h-[2px] w-full bg-brand-accent" />}</button>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <label className="flex h-10 w-44 items-center gap-2 border-b border-slate-200 text-slate-400 focus-within:border-brand-500 xl:w-52">
            <Search size={16} />
            <input value={query} onChange={(e) => { setQuery(e.target.value); if (e.target.value) setPage('catalog') }} placeholder="Tên sản phẩm, SKU..." className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400" />
          </label>
          <button onClick={openCart} aria-label="Mở giỏ hàng" className="relative grid h-10 w-10 place-items-center text-slate-700 hover:text-brand-700">
            <ShoppingBag size={19} strokeWidth={1.7} />{cartCount > 0 && <span className="absolute right-0 top-0 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-brand-accent px-1 text-[9px] font-bold text-white">{cartCount}</span>}
          </button>
          <button onClick={openQuote} className="btn-primary h-10 px-4 text-[11px] font-semibold">Yêu cầu báo giá <ArrowRight size={14} /></button>
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <button onClick={openCart} className="relative grid h-10 w-10 place-items-center"><ShoppingBag size={19} />{cartCount > 0 && <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-brand-accent px-1 text-[9px] text-white">{cartCount}</span>}</button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="grid h-10 w-10 place-items-center" aria-label="Mở menu">{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
      {mobileOpen && <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg md:hidden">
        <label className="mb-3 flex h-10 items-center gap-2 border-b border-slate-200 text-slate-400"><Search size={16} /><input value={query} onChange={(e) => { setQuery(e.target.value); setPage('catalog') }} placeholder="Tìm sản phẩm, mã SKU..." className="w-full bg-transparent text-sm outline-none" /></label>
        {nav.map(([label, key]) => <button key={key} onClick={() => go(key)} className="block w-full border-b border-slate-100 py-3 text-left text-sm font-medium">{label}</button>)}
        <button onClick={() => { setMobileOpen(false); openQuote() }} className="btn-primary mt-4 w-full py-3 text-sm">Yêu cầu khảo sát & báo giá</button>
      </div>}
    </header>
  )
}

function SectionHeading({ eyebrow, title, description, action }) {
  return <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow mb-3">{eyebrow}</p><h2 className="display-title text-3xl font-bold text-slate-900 md:text-[38px]">{title}</h2>{description && <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>}</div>{action}</div>
}

function ProductCard({ product, onOpen, onAdd }) {
  const lowest = Math.min(...product.variants.map((v) => v.retail_price))
  const highest = Math.max(...product.variants.map((v) => v.retail_price))
  return <article className="product-card group overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-soft">
    <button onClick={() => onOpen(product)} className="relative block aspect-[1.15/1] w-full overflow-hidden bg-[#f3f5f4] text-left">
      <img src={product.image} alt={product.name} className="product-image h-full w-full object-cover" loading="lazy" />
      <span className={`absolute left-3 top-3 px-2.5 py-1 text-[9px] font-bold tracking-[.12em] ${product.type === 'smart' ? 'bg-brand-700 text-white' : 'bg-white/95 text-slate-600'}`}>{product.type === 'smart' ? 'SMART' : 'CƠ TRUYỀN THỐNG'}</span>
      <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white text-brand-800 opacity-0 shadow transition-opacity group-hover:opacity-100"><ArrowUpRight size={17} /></span>
    </button>
    <div className="p-4">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{product.series} <span className="px-1 text-slate-300">/</span> {product.category}</p>
      <button onClick={() => onOpen(product)} className="min-h-[44px] text-left font-display text-[14px] font-bold leading-5 text-slate-800 hover:text-brand-700">{product.name}</button>
      <p className="mt-3 text-[14px] font-bold text-brand-800">{lowest === highest ? money(lowest) : `${money(lowest)} – ${money(highest)}`}</p>
      <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
        <button onClick={() => onOpen(product)} className="btn-outline h-9 flex-1 text-[11px] font-semibold">Xem chi tiết</button>
        <button onClick={() => onAdd(product)} className="btn-primary h-9 w-10" aria-label={`Thêm ${product.name} vào giỏ`}><Plus size={16} /></button>
      </div>
    </div>
  </article>
}

function HomePage({ setPage, openProduct, addToCart, setActiveSolution }) {
  const [tab, setTab] = useState('all')
  const featured = products.filter((p) => tab === 'all' || p.type === tab).slice(0, 4)
  const targetCards = [
    { title: 'Khách sạn', desc: 'Trải nghiệm lưu trú thông minh', id: 'hotel', image: solutions[0].image },
    { title: 'Tòa nhà thương mại', desc: 'Vận hành hiệu quả cùng BMS', id: 'building', image: solutions[2].image },
    { title: 'Biệt thự', desc: 'Không gian sống cá nhân hóa', id: 'villa', image: solutions[1].image },
    { title: 'Căn hộ', desc: 'Tiện nghi trong từng chạm', id: 'apartment', image: solutions[3].image },
  ]
  return <main className="fade-in">
    <section className="relative min-h-[600px] overflow-hidden bg-brand-900 md:min-h-[650px]">
      <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90" alt="Không gian sống hiện đại tích hợp nhà thông minh" className="absolute inset-0 h-full w-full object-cover opacity-[.57]" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/65 to-brand-800/10" />
      <div className="container-wide relative flex min-h-[600px] items-center py-16 md:min-h-[650px]">
        <div className="max-w-[660px] text-white">
          <div className="mb-6 inline-flex items-center gap-2 border border-white/25 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-white/85"><span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> Công nghệ cho không gian sống tốt hơn</div>
          <h1 className="display-title max-w-[650px] text-[44px] font-semibold leading-[1.12] md:text-[66px]">Chạm vào tương lai.<br /><span className="font-normal text-brand-accent">Sống trọn tiện nghi.</span></h1>
          <p className="mt-6 max-w-[490px] text-[15px] leading-7 text-white/75">Thiết bị điện tinh tuyển và giải pháp thông minh liền mạch cho công trình hiện đại — từ căn hộ đến khách sạn, tòa nhà.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => setPage('solutions')} className="btn-primary h-12 px-6 text-sm font-semibold">Khám phá giải pháp <ArrowRight size={16} /></button>
            <button onClick={() => setPage('catalog')} className="flex h-12 items-center gap-2 border border-white/45 px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-800">Mua thiết bị <ArrowUpRight size={16} /></button>
          </div>
          <div className="mt-14 flex gap-8 border-t border-white/20 pt-6 sm:gap-14">
            {[['15+', 'năm kinh nghiệm'], ['120+', 'dự án triển khai'], ['24/7', 'đồng hành kỹ thuật']].map(([value, label]) => <div key={label}><p className="font-display text-xl font-bold text-white">{value}</p><p className="mt-1 text-[10px] text-white/60">{label}</p></div>)}
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-[max(24px,calc((100vw-1240px)/2))] hidden items-center gap-3 text-[10px] uppercase tracking-[.16em] text-white/75 md:flex"><span className="h-px w-12 bg-white/50" /> Thiết kế cho trải nghiệm</div>
    </section>

    <section className="container-wide py-20 md:py-24">
      <SectionHeading eyebrow="Giải pháp theo không gian" title="Công nghệ phù hợp từng công trình" description="Từ một căn hộ tiện nghi đến hệ thống quản lý tòa nhà — giải pháp được thiết kế theo đúng cách bạn vận hành." action={<button onClick={() => setPage('solutions')} className="hidden items-center gap-2 pb-1 text-xs font-bold text-brand-700 sm:flex">Tìm hiểu giải pháp <ArrowRight size={15} /></button>} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {targetCards.map((card, i) => <button onClick={() => { setActiveSolution(card.id); setPage('solutions') }} key={card.id} className="group relative h-[260px] overflow-hidden bg-slate-300 text-left">
          <img src={card.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101d22]/85 via-[#101d22]/15 to-transparent" />
          <span className="absolute left-4 top-4 text-xs font-semibold tracking-[.16em] text-white/70">0{i + 1}</span>
          <div className="absolute bottom-5 left-5 right-5 text-white"><h3 className="font-display text-xl font-bold">{card.title}</h3><div className="mt-1 flex items-center justify-between"><span className="text-xs text-white/75">{card.desc}</span><ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div></div>
        </button>)}
      </div>
    </section>

    <section className="bg-[#f7f8f6] py-20 md:py-24">
      <div className="container-wide">
        <SectionHeading eyebrow="Thiết bị tuyển chọn" title="Tinh tế trong từng chi tiết" description="Thiết kế đồng bộ, cấu hình linh hoạt và tiêu chuẩn kỹ thuật phù hợp cho công trình chuyên nghiệp." action={<button onClick={() => setPage('catalog')} className="hidden items-center gap-2 text-xs font-bold text-brand-700 sm:flex">Tất cả sản phẩm <ArrowRight size={15} /></button>} />
        <div className="mb-6 flex gap-2 overflow-auto">
          {[['all', 'Tất cả'], ['smart', 'Thiết bị thông minh'], ['conventional', 'Thiết bị cơ truyền thống']].map(([value, label]) => <button key={value} onClick={() => setTab(value)} className={`whitespace-nowrap border px-4 py-2 text-xs font-semibold transition-colors ${tab === value ? 'border-brand-700 bg-brand-700 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-500'}`}>{label}</button>)}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{featured.map((product) => <ProductCard key={product.id} product={product} onOpen={openProduct} onAdd={addToCart} />)}</div>
      </div>
    </section>

    <section className="container-wide grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-24">
      <div className="relative h-[390px] overflow-hidden bg-slate-200"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85" alt="Không gian kiến trúc tinh giản" className="h-full w-full object-cover" /><div className="absolute bottom-5 left-5 bg-white px-5 py-4 shadow-soft"><p className="eyebrow">Giải pháp đồng bộ</p><p className="mt-1 font-display text-lg font-bold text-brand-800">Từ thiết kế đến vận hành</p></div></div>
      <div><p className="eyebrow mb-3">Đối tác công trình</p><h2 className="display-title text-3xl font-bold leading-tight text-slate-900 md:text-[40px]">Kỹ thuật vững vàng.<br />Trải nghiệm tinh tế.</h2><p className="mt-5 text-sm leading-7 text-slate-500">LINA JSC đồng hành cùng chủ đầu tư, đơn vị tư vấn và nhà thầu từ khâu khảo sát, thiết kế hệ thống đến cấu hình, bàn giao và hỗ trợ vận hành.</p>
        <div className="mt-7 space-y-4">{[['Tương thích tiêu chuẩn quốc tế', 'IEC, KNX và các giao thức mở phổ biến'], ['Thiết kế linh hoạt', 'Tối ưu theo công năng và quy mô từng dự án'], ['Đồng hành kỹ thuật', 'Hỗ trợ xuyên suốt vòng đời công trình']].map(([title, desc]) => <div key={title} className="flex gap-3"><span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-brand-50 text-brand-700"><Check size={15} /></span><div><p className="text-sm font-bold text-slate-800">{title}</p><p className="mt-1 text-xs text-slate-500">{desc}</p></div></div>)}</div>
        <button onClick={() => setPage('projects')} className="btn-primary mt-8 h-11 px-5 text-xs font-semibold">Khám phá dự án <ArrowRight size={15} /></button>
      </div>
    </section>

    <section className="bg-brand-800 py-16 text-white"><div className="container-wide flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><p className="eyebrow !text-brand-accent">Bắt đầu từ ý tưởng của bạn</p><h2 className="display-title mt-3 text-3xl font-bold md:text-[38px]">Cùng kiến tạo công trình thông minh.</h2><p className="mt-3 text-sm text-white/65">Chuyên gia LINA JSC sẵn sàng tư vấn giải pháp phù hợp.</p></div><button onClick={() => window.dispatchEvent(new Event('open-quote'))} className="flex h-12 items-center gap-3 bg-white px-6 text-sm font-bold text-brand-800 hover:bg-brand-50">Yêu cầu khảo sát <ArrowRight size={16} /></button></div></section>
  </main>
}

function ProductFilter({ filters, setFilters, mobile = false, onClose }) {
  const toggleArray = (key, value) => setFilters((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((v) => v !== value) : [...current[key], value] }))
  const checkGroup = (title, items, key) => <div className="border-b border-slate-100 py-5"><p className="mb-3 text-xs font-bold text-slate-800">{title}</p><div className="space-y-2.5">{items.map((item) => <label key={item} className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-600"><input type="checkbox" checked={filters[key].includes(item)} onChange={() => toggleArray(key, item)} className="h-3.5 w-3.5 accent-brand-700" />{item}</label>)}</div></div>
  return <div className={mobile ? 'h-full overflow-auto bg-white p-5' : ''}>
    {mobile && <div className="mb-5 flex items-center justify-between"><p className="font-display text-lg font-bold">Bộ lọc</p><button onClick={onClose}><X size={19} /></button></div>}
    <div className="flex items-center justify-between border-b border-slate-100 pb-4"><p className="text-sm font-bold text-slate-900">Bộ lọc sản phẩm</p><button onClick={() => setFilters({ type: 'all', categories: [], series: [], connections: [], maxPrice: 10000000 })} className="text-[10px] font-semibold text-brand-600">Xóa lọc</button></div>
    <div className="border-b border-slate-100 py-5"><p className="mb-3 text-xs font-bold text-slate-800">Loại thiết bị</p><div className="space-y-2.5">{[['all', 'Tất cả thiết bị'], ['smart', 'Thông minh (Smart)'], ['conventional', 'Cơ truyền thống']].map(([value, label]) => <label key={value} className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-600"><input name={mobile ? 'type-mob' : 'type'} type="radio" checked={filters.type === value} onChange={() => setFilters((f) => ({ ...f, type: value }))} className="accent-brand-700" />{label}</label>)}</div></div>
    {checkGroup('Danh mục', categories, 'categories')}
    {checkGroup('Dòng sản phẩm', series, 'series')}
    {filters.type !== 'conventional' && checkGroup('Chuẩn kết nối', connections, 'connections')}
    <div className="py-5"><p className="mb-3 text-xs font-bold text-slate-800">Khoảng giá tối đa</p><input type="range" min="100000" max="10000000" step="100000" value={filters.maxPrice} onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))} className="w-full accent-brand-700" /><div className="mt-2 flex justify-between text-[10px] text-slate-500"><span>100.000đ</span><span>{money(filters.maxPrice)}</span></div></div>
    {mobile && <button onClick={onClose} className="btn-primary mt-2 h-11 w-full text-sm font-semibold">Xem kết quả</button>}
  </div>
}

function CatalogPage({ openProduct, addToCart, query }) {
  const [filters, setFilters] = useState({ type: 'all', categories: [], series: [], connections: [], maxPrice: 10000000 })
  const [sort, setSort] = useState('featured')
  const [mobileFilter, setMobileFilter] = useState(false)
  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      const matchQuery = !query || `${p.name} ${p.id} ${p.series} ${p.variants.map((v) => v.sku).join(' ')}`.toLowerCase().includes(query.toLowerCase())
      return matchQuery && (filters.type === 'all' || p.type === filters.type) && (!filters.categories.length || filters.categories.includes(p.category)) && (!filters.series.length || filters.series.includes(p.series)) && (!filters.connections.length || filters.connections.includes(p.connection)) && Math.min(...p.variants.map((v) => v.retail_price)) <= filters.maxPrice
    })
    if (sort === 'price-low') list.sort((a, b) => Math.min(...a.variants.map((v) => v.retail_price)) - Math.min(...b.variants.map((v) => v.retail_price)))
    if (sort === 'price-high') list.sort((a, b) => Math.max(...b.variants.map((v) => v.retail_price)) - Math.max(...a.variants.map((v) => v.retail_price)))
    return list
  }, [filters, query, sort])
  return <main className="fade-in bg-[#fbfcfb]">
    <div className="container-wide py-9 md:py-12"><div className="mb-9"><p className="eyebrow mb-2">Danh mục thiết bị</p><h1 className="display-title text-3xl font-bold text-slate-900 md:text-[42px]">Thiết bị điện & nhà thông minh</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">Tìm thiết bị phù hợp cho công trình với lựa chọn thông minh và cơ truyền thống đồng bộ.</p></div>
      <div className="flex items-center justify-between border-y border-slate-200 py-3 lg:hidden"><span className="text-xs text-slate-600">{filtered.length} sản phẩm</span><button onClick={() => setMobileFilter(true)} className="flex items-center gap-2 text-xs font-semibold"><SlidersHorizontal size={15} /> Bộ lọc</button></div>
      <div className="grid gap-8 pt-5 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block"><ProductFilter filters={filters} setFilters={setFilters} /></aside>
        <div><div className="mb-5 hidden items-center justify-between lg:flex"><p className="text-xs text-slate-500"><b className="text-slate-800">{filtered.length}</b> sản phẩm phù hợp</p><label className="flex items-center gap-2 text-xs text-slate-500">Sắp xếp theo <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none"><option value="featured">Nổi bật</option><option value="price-low">Giá thấp đến cao</option><option value="price-high">Giá cao đến thấp</option></select></label></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id} product={product} onOpen={openProduct} onAdd={addToCart} />)}</div>
          {filtered.length === 0 && <div className="border border-dashed border-slate-300 py-20 text-center"><Search className="mx-auto text-slate-300" size={32} /><p className="mt-4 font-semibold text-slate-700">Chưa tìm thấy sản phẩm phù hợp</p><p className="mt-1 text-xs text-slate-500">Thử thay đổi từ khóa hoặc điều chỉnh bộ lọc.</p></div>}
        </div>
      </div>
    </div>
    {mobileFilter && <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 lg:hidden" onClick={() => setMobileFilter(false)}><div className="h-full w-[min(360px,90vw)] shadow-2xl" onClick={(e) => e.stopPropagation()}><ProductFilter filters={filters} setFilters={setFilters} mobile onClose={() => setMobileFilter(false)} /></div></div>}
  </main>
}

function ProductDetail({ product, close, addToCart, addToQuote, openProduct }) {
  const [buttonCount, setButtonCount] = useState(product.variants.find((v) => v.buttons)?.buttons || null)
  const [color, setColor] = useState(product.variants[0].color)
  const [base, setBase] = useState(product.variants[0].base)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('specs')
  const [added, setAdded] = useState(false)
  const buttons = [...new Set(product.variants.map((v) => v.buttons).filter(Boolean))]
  const colors = [...new Set(product.variants.map((v) => v.color))]
  const bases = [...new Set(product.variants.map((v) => v.base))]
  const variant = product.variants.find((v) => v.buttons === buttonCount && v.color === color && v.base === base) || product.variants.find((v) => v.color === color) || product.variants[0]
  const related = product.related_products.map((id) => products.find((p) => p.id === id)).filter(Boolean)
  const change = (key, value) => {
    if (key === 'buttons') setButtonCount(value)
    if (key === 'color') setColor(value)
    if (key === 'base') setBase(value)
  }
  return <main className="fade-in bg-white">
    <div className="container-wide py-6"><button onClick={close} className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-700"><ArrowLeft size={15} /> Quay lại danh mục</button>
      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        <div><div className="relative aspect-square overflow-hidden bg-[#f3f5f4]"><img src={product.image} alt={product.name} className="h-full w-full object-cover" /><span className="absolute left-4 top-4 bg-brand-700 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white">{product.type === 'smart' ? 'SMART' : 'CƠ TRUYỀN THỐNG'}</span></div><div className="mt-3 grid grid-cols-4 gap-3">{[product.image, product.image, product.image, product.image].map((src, i) => <div key={i} className={`aspect-square overflow-hidden border ${i === 0 ? 'border-brand-700' : 'border-slate-100'}`}><img src={src} className="h-full w-full object-cover" alt={`${product.name} góc nhìn ${i + 1}`} /></div>)}</div></div>
        <div className="pt-1"><p className="eyebrow">{product.series} <span className="px-1">/</span> {product.category}</p><h1 className="display-title mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-[38px]">{product.name}</h1><p className="mt-4 text-sm leading-7 text-slate-500">{product.description}</p>
          <div className="mt-6 border-y border-slate-100 py-5"><p className="text-2xl font-bold text-brand-800">{money(variant.retail_price)}</p><p className="mt-1 text-xs text-slate-400">Giá dự án từ <b className="text-slate-600">{money(variant.project_price)}</b> · SKU: {variant.sku}</p></div>
          {buttons.length > 0 && <div className="mt-5"><p className="mb-3 text-xs font-bold text-slate-800">Số nút / hạt</p><div className="flex gap-2">{buttons.map((n) => <button onClick={() => change('buttons', n)} key={n} className={`grid h-10 w-10 place-items-center border text-xs font-semibold ${buttonCount === n ? 'border-brand-700 bg-brand-700 text-white' : 'border-slate-200 text-slate-600'}`}>{n}</button>)}</div></div>}
          <div className="mt-5"><p className="mb-3 text-xs font-bold text-slate-800">Màu sắc: <span className="font-normal text-slate-500">{color}</span></p><div className="flex gap-3">{colors.map((c) => <button onClick={() => change('color', c)} key={c} title={c} className={`grid h-9 w-9 place-items-center rounded-full border ${color === c ? 'border-brand-700 ring-2 ring-brand-100 ring-offset-1' : 'border-slate-200'}`}><span className="h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: { 'Trắng': '#f5f5f2', 'Đen': '#25292b', 'Vàng Champagne': '#c6ad82', 'Xám': '#9da2a3' }[c] }} /></button>)}</div></div>
          {bases.length > 1 && <div className="mt-5"><p className="mb-3 text-xs font-bold text-slate-800">Chuẩn đế</p><div className="flex gap-2">{bases.map((b) => <button onClick={() => change('base', b)} key={b} className={`border px-4 py-2 text-xs ${base === b ? 'border-brand-700 bg-brand-50 font-semibold text-brand-800' : 'border-slate-200 text-slate-600'}`}>{b}</button>)}</div></div>}
          <div className="mt-6 flex items-center gap-3"><div className="flex h-11 items-center border border-slate-200"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid h-10 w-9 place-items-center text-slate-500"><Minus size={14} /></button><span className="w-7 text-center text-xs font-semibold">{quantity}</span><button onClick={() => setQuantity(quantity + 1)} className="grid h-10 w-9 place-items-center text-slate-500"><Plus size={14} /></button></div><button onClick={() => { addToCart(product, variant, quantity); setAdded(true); setTimeout(() => setAdded(false), 1800) }} className="btn-primary h-11 flex-1 text-sm font-semibold">{added ? <><Check size={16} /> Đã thêm vào giỏ</> : <><ShoppingBag size={16} /> Thêm vào giỏ hàng</>}</button></div>
          <button onClick={() => addToQuote(product, variant, quantity)} className="btn-outline mt-3 h-11 w-full text-sm font-semibold">Thêm vào danh sách dự toán dự án <ArrowRight size={15} /></button>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5 text-center text-[10px] text-slate-500"><span className="flex flex-col items-center gap-2"><ShieldCheck size={18} className="text-brand-600" /> Bảo hành chính hãng</span><span className="flex flex-col items-center gap-2"><BadgeCheck size={18} className="text-brand-600" /> Tiêu chuẩn chất lượng</span><span className="flex flex-col items-center gap-2"><Truck size={18} className="text-brand-600" /> Giao hàng toàn quốc</span></div>
        </div>
      </div>
      <div className="mt-16 border-t border-slate-200">
        <div className="flex gap-6 overflow-x-auto border-b border-slate-200">{[['specs', 'Thông số kỹ thuật'], ['docs', 'Tài liệu kỹ thuật'], ['warranty', 'Chính sách bảo hành']].map(([key, label]) => <button onClick={() => setActiveTab(key)} key={key} className={`whitespace-nowrap border-b-2 py-4 text-xs font-semibold ${activeTab === key ? 'border-brand-700 text-brand-700' : 'border-transparent text-slate-500'}`}>{label}</button>)}</div>
        <div className="max-w-3xl py-7">
          {activeTab === 'specs' && <div className="divide-y divide-slate-100">{Object.entries(product.specifications).map(([label, value]) => <div key={label} className="grid grid-cols-[150px_1fr] gap-4 py-3 text-xs"><span className="text-slate-500">{label}</span><span className="font-medium text-slate-800">{value}</span></div>)}</div>}
          {activeTab === 'docs' && <div className="space-y-2">{[['Datasheet sản phẩm', 'PDF · 1.8 MB'], ['Sơ đồ đấu dây', 'PDF · 920 KB'], ['Bản vẽ kỹ thuật CAD', 'DWG · 2.4 MB']].map(([name, meta]) => <div key={name} className="flex items-center justify-between border border-slate-100 p-4"><span className="flex items-center gap-3"><FileText size={18} className="text-brand-600" /><span><b className="block text-xs">{name}</b><small className="mt-1 block text-[10px] text-slate-400">{meta}</small></span></span><button onClick={() => alert('Tài liệu đang được cập nhật. Vui lòng liên hệ LINA JSC để nhận bản mới nhất.')} className="text-brand-700"><FileDown size={17} /></button></div>)}</div>}
          {activeTab === 'warranty' && <div className="flex gap-3 bg-brand-50 p-5 text-sm leading-6 text-slate-600"><ShieldCheck className="mt-1 shrink-0 text-brand-700" size={20} /><p>Sản phẩm được bảo hành chính hãng 24 tháng kể từ ngày mua. Hỗ trợ kỹ thuật và bảo trì được thực hiện bởi đội ngũ chuyên viên LINA JSC. Điều kiện bảo hành áp dụng theo chính sách dành cho từng dòng sản phẩm.</p></div>}
        </div>
      </div>
      {related.length > 0 && <section className="border-t border-slate-100 py-12"><SectionHeading eyebrow="Hoàn thiện giải pháp" title="Thường được mua cùng" /><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={item} onOpen={openProduct} onAdd={addToCart} />)}</div></section>}
    </div>
  </main>
}

function SolutionsPage({ activeSolution, setActiveSolution, openProduct, addToCart, openQuote }) {
  const [zoneIndex, setZoneIndex] = useState(0)
  const solution = solutions.find((s) => s.id === activeSolution) || solutions[0]
  const select = (id) => { setActiveSolution(id); setZoneIndex(0) }
  return <main className="fade-in">
    <section className="relative h-[400px] overflow-hidden bg-brand-800"><img src={solution.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45 transition-opacity duration-500" /><div className="absolute inset-0 bg-gradient-to-r from-brand-800/95 via-brand-800/70 to-transparent" /><div className="container-wide relative flex h-full items-center"><div className="max-w-2xl text-white"><p className="eyebrow !text-brand-accent">Giải pháp hệ thống · {solution.en}</p><h1 className="display-title mt-3 text-4xl font-bold md:text-5xl">{solution.title}</h1><p className="mt-4 max-w-xl text-sm leading-7 text-white/75">{solution.description}</p><button onClick={openQuote} className="mt-7 flex h-11 items-center gap-2 bg-white px-5 text-xs font-bold text-brand-800">Tư vấn giải pháp này <ArrowRight size={15} /></button></div></div></section>
    <section className="container-wide py-12">
      <div className="flex gap-2 overflow-x-auto border-b border-slate-200">{solutions.map((s) => <button onClick={() => select(s.id)} key={s.id} className={`whitespace-nowrap border-b-2 px-4 py-3 text-xs font-semibold ${solution.id === s.id ? 'border-brand-700 text-brand-700' : 'border-transparent text-slate-500'}`}>{s.short}</button>)}</div>
      <div className="grid gap-10 py-12 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="eyebrow">Hệ thống kết nối</p><h2 className="display-title mt-3 text-3xl font-bold leading-tight">Một hệ thống.<br />Mọi thứ phối hợp.</h2><p className="mt-4 text-sm leading-7 text-slate-500">Thiết bị tại từng khu vực kết nối về bộ điều khiển trung tâm, để hệ thống tự động vận hành theo ngữ cảnh và luôn sẵn sàng mở rộng.</p>
          <div className="mt-7 space-y-3">{[['01', 'Thiết bị đầu cuối', 'Công tắc, cảm biến và thiết bị điều khiển'], ['02', 'Kết nối & tự động hóa', 'KNX, Zigbee, Wi-Fi theo thiết kế hệ thống'], ['03', 'Quản lý tập trung', 'Giám sát, thiết lập ngữ cảnh và tối ưu năng lượng']].map(([no, title, desc]) => <div key={no} className="flex gap-4 border border-slate-100 p-4"><span className="font-display text-sm font-bold text-brand-accent">{no}</span><span><b className="block text-xs text-slate-800">{title}</b><small className="mt-1 block text-[11px] text-slate-500">{desc}</small></span></div>)}</div>
        </div>
        <div className="relative flex min-h-[380px] flex-col items-center justify-center bg-[#f5f7f6] p-6">
          <div className="grid w-full max-w-[460px] grid-cols-3 gap-3">
            {['Chiếu sáng', 'Rèm cửa', 'Điều hòa'].map((name, i) => <div key={name} className="border border-slate-200 bg-white p-4 text-center shadow-sm"><span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">{i === 0 ? <Zap size={17} /> : i === 1 ? <Layers3 size={17} /> : <Sparkles size={17} />}</span><p className="mt-2 text-[10px] font-semibold">{name}</p></div>)}
          </div><div className="my-4 flex w-full max-w-[460px] items-center justify-center"><span className="h-px flex-1 bg-slate-300" /><span className="mx-3 text-[9px] font-semibold uppercase tracking-widest text-slate-400">KNX · Zigbee · Wi-Fi</span><span className="h-px flex-1 bg-slate-300" /></div>
          <div className="flex h-[92px] w-full max-w-[300px] flex-col items-center justify-center bg-brand-800 text-white"><span className="text-[10px] uppercase tracking-[.16em] text-brand-accent">LINA JSC</span><p className="mt-1 text-sm font-bold">Bộ điều khiển trung tâm</p></div>
          <div className="my-4 h-6 w-px bg-slate-300" />
          <div className="grid w-full max-w-[460px] grid-cols-3 gap-3">{['Điều khiển', 'Cảm biến', 'Ứng dụng'].map((name) => <div key={name} className="border border-brand-100 bg-white px-2 py-3 text-center text-[10px] font-semibold text-brand-700">{name}</div>)}</div>
          <p className="absolute bottom-3 right-4 text-[9px] text-slate-400">Sơ đồ nguyên lý tham khảo</p>
        </div>
      </div>
      <div className="grid gap-3 border-y border-slate-100 py-6 sm:grid-cols-3">{[['Tiết kiệm năng lượng', 'Tự động hóa theo hiện diện và lịch trình'], ['Quản lý tập trung', 'Vận hành thống nhất mọi khu vực'], ['Trải nghiệm sang trọng', 'Điều khiển trực quan, dễ sử dụng']].map(([t, d]) => <div key={t} className="flex gap-3 p-3"><span className="grid h-8 w-8 shrink-0 place-items-center bg-brand-50 text-brand-700"><Check size={15} /></span><span><b className="text-xs">{t}</b><small className="mt-1 block text-[10px] text-slate-500">{d}</small></span></div>)}</div>
      <section className="py-12"><SectionHeading eyebrow="Phân bổ theo khu vực" title="Thiết bị gợi ý cho từng không gian" description="Chọn khu vực để xem cấu hình tham khảo. Số lượng thực tế sẽ được tối ưu sau khi khảo sát mặt bằng." /><div className="grid gap-7 lg:grid-cols-[240px_1fr]">
        <div className="flex gap-2 overflow-auto lg:block lg:space-y-1">{solution.zones.map((zone, i) => <button onClick={() => setZoneIndex(i)} key={zone.name} className={`whitespace-nowrap px-4 py-3 text-left text-xs font-semibold lg:block lg:w-full ${zoneIndex === i ? 'bg-brand-800 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>{zone.name}</button>)}</div>
        <div className="border border-slate-200 p-5 md:p-7"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-display text-xl font-bold text-slate-900">{solution.zones[zoneIndex].name}</h3><p className="mt-2 text-xs text-slate-500">{solution.zones[zoneIndex].description}</p></div><button onClick={openQuote} className="btn-primary h-10 px-4 text-[11px] font-semibold">Nhận báo giá trọn gói <ArrowRight size={14} /></button></div>
          <div className="mt-6 divide-y divide-slate-100">{solution.zones[zoneIndex].devices.map((entry) => { const p = products.find((item) => item.id === entry.productId); return p && <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><button onClick={() => openProduct(p)} className="flex items-center gap-3 text-left"><img src={p.image} alt="" className="h-14 w-14 object-cover" /><span><b className="block text-xs text-slate-800">{p.name}</b><small className="mt-1 block text-[10px] text-slate-500">{p.series} · {p.connection}</small></span></button><div className="flex items-center gap-4"><span className="text-xs font-semibold text-slate-600">{entry.quantity}</span><button onClick={() => addToCart(p)} className="btn-outline flex h-8 items-center gap-1.5 px-3 text-[10px] font-semibold"><Plus size={13} /> Thêm</button></div></div> })}</div>
        </div>
      </div></section>
    </section>
  </main>
}

function ProjectsPage() {
  return <main className="fade-in bg-[#fbfcfb]"><div className="container-wide py-12 md:py-16"><SectionHeading eyebrow="Dấu ấn LINA JSC" title="Công trình tiêu biểu" description="Những không gian được hoàn thiện bằng giải pháp thiết bị điện và tự động hóa đồng bộ." /><div className="grid gap-5 sm:grid-cols-2">{projects.map((project, i) => <article key={project.name} className="group bg-white"><div className="relative h-[280px] overflow-hidden"><img src={project.image} alt={project.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute left-4 top-4 bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-brand-800">{project.type}</span><span className="absolute bottom-4 right-4 text-sm font-semibold text-white">0{i + 1}</span><div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" /></div><div className="flex items-end justify-between p-5"><div><h2 className="font-display text-lg font-bold text-slate-900">{project.name}</h2><p className="mt-2 flex items-center gap-2 text-xs text-slate-500">{project.location} <span>·</span> {project.scale}</p></div><ArrowUpRight size={18} className="text-brand-700" /></div></article>)}</div></div></main>
}

function DocumentsPage() {
  const docs = [['Công tắc cảm ứng Luxury Glass', 'Datasheet · PDF · 1.8 MB', 'Sản phẩm'], ['Bộ điều khiển KNX 4 kênh', 'Bản vẽ CAD · DWG · 2.4 MB', 'Bản vẽ kỹ thuật'], ['Ổ cắm thông minh Zigbee', 'Sơ đồ đấu dây · PDF · 920 KB', 'Sản phẩm'], ['Hướng dẫn thiết kế hệ thống KNX', 'Tài liệu kỹ thuật · PDF · 4.2 MB', 'Giải pháp'], ['Hồ sơ năng lực LINA JSC', 'Company profile · PDF · 6.1 MB', 'Doanh nghiệp']]
  return <main className="fade-in bg-[#fbfcfb]"><div className="container-wide py-12 md:py-16"><SectionHeading eyebrow="Trung tâm tài liệu" title="Tài liệu kỹ thuật" description="Datasheet, bản vẽ CAD và tài liệu triển khai hỗ trợ đội ngũ thiết kế, thi công." /><div className="max-w-4xl border-y border-slate-200">{docs.map(([title, meta, type]) => <div key={title} className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white px-4 py-5"><div className="flex items-center gap-4"><span className="grid h-11 w-11 place-items-center bg-brand-50 text-brand-700"><FileText size={20} /></span><span><span className="block text-sm font-bold text-slate-800">{title}</span><small className="mt-1 block text-[11px] text-slate-500">{meta}</small></span></div><div className="flex items-center gap-4"><span className="text-[10px] text-slate-400">{type}</span><button onClick={() => alert('Tài liệu đang được cập nhật. Vui lòng liên hệ LINA JSC để nhận bản mới nhất.')} className="btn-outline flex h-9 items-center gap-2 px-3 text-[10px] font-semibold"><FileDown size={14} /> Tải về</button></div></div>)}</div></div></main>
}

function CartDrawer({ cart, close, updateQuantity, removeItem, goCheckout, openProduct }) {
  const total = cart.reduce((sum, item) => sum + item.variant.retail_price * item.quantity, 0)
  return <div className="fixed inset-0 z-[60] flex justify-end bg-slate-900/45" onClick={close}><aside onClick={(e) => e.stopPropagation()} className="flex h-full w-full max-w-[470px] flex-col bg-white shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5"><span><span className="font-display text-lg font-bold">Giỏ hàng</span><small className="ml-2 text-xs text-slate-400">({cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)</small></span><button onClick={close} className="grid h-9 w-9 place-items-center hover:bg-slate-50"><X size={20} /></button></div>
    <div className="flex-1 overflow-auto px-6">{cart.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingBag size={35} className="text-slate-300" /><p className="mt-4 font-semibold text-slate-700">Giỏ hàng đang trống</p><p className="mt-1 text-xs text-slate-500">Khám phá thiết bị phù hợp với công trình của bạn.</p><button onClick={close} className="btn-primary mt-5 h-10 px-5 text-xs font-semibold">Tiếp tục mua sắm</button></div> : <div className="divide-y divide-slate-100">{cart.map((item) => <div key={item.key} className="flex gap-4 py-5"><button onClick={() => { close(); openProduct(item.product) }} className="h-[88px] w-[88px] shrink-0 bg-slate-100"><img src={item.product.image} className="h-full w-full object-cover" alt={item.product.name} /></button><div className="min-w-0 flex-1"><p className="line-clamp-2 text-xs font-bold text-slate-800">{item.product.name}</p><p className="mt-1 text-[10px] text-slate-500">{item.variant.color}{item.variant.buttons ? ` · ${item.variant.buttons} nút` : ''} · {item.variant.base}</p><p className="mt-2 text-xs font-bold text-brand-800">{money(item.variant.retail_price)}</p><div className="mt-2 flex items-center justify-between"><div className="flex h-7 items-center border border-slate-200"><button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="grid h-6 w-7 place-items-center"><Minus size={12} /></button><span className="w-6 text-center text-[10px]">{item.quantity}</span><button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="grid h-6 w-7 place-items-center"><Plus size={12} /></button></div><button onClick={() => removeItem(item.key)} className="text-[10px] text-slate-400 hover:text-red-600">Xóa</button></div></div></div>)}</div>}</div>
    {cart.length > 0 && <div className="border-t border-slate-200 px-6 py-5"><div className="flex justify-between text-sm font-bold"><span>Tạm tính</span><span>{money(total)}</span></div><p className="mt-2 text-[10px] text-slate-400">Phí vận chuyển sẽ được xác nhận khi hoàn tất đơn hàng.</p><button onClick={goCheckout} className="btn-primary mt-5 h-12 w-full text-sm font-semibold">Tiến hành thanh toán <ArrowRight size={16} /></button></div>}
  </aside></div>
}

function CheckoutPage({ cart, setPage, clearCart }) {
  const [payment, setPayment] = useState('cod')
  const [submitted, setSubmitted] = useState(false)
  const [orderId] = useState(`LM${Date.now().toString().slice(-8)}`)
  const total = cart.reduce((sum, item) => sum + item.variant.retail_price * item.quantity, 0)
  if (submitted) return <main className="fade-in grid min-h-[70vh] place-items-center px-5"><div className="max-w-md text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check size={31} /></span><p className="eyebrow mt-6">Đặt hàng thành công</p><h1 className="display-title mt-2 text-3xl font-bold">Cảm ơn bạn đã tin chọn LINA JSC.</h1><p className="mt-4 text-sm leading-6 text-slate-500">Mã đơn hàng <b className="text-slate-800">{orderId}</b>. Chuyên viên sẽ liên hệ xác nhận trong thời gian sớm nhất.</p><button onClick={() => { clearCart(); setPage('home') }} className="btn-primary mt-7 h-11 px-6 text-sm font-semibold">Về trang chủ</button></div></main>
  return <main className="fade-in bg-[#fbfcfb]"><div className="container-wide py-10"><button onClick={() => setPage('catalog')} className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500"><ArrowLeft size={14} /> Tiếp tục mua sắm</button><p className="eyebrow">Hoàn tất đơn hàng</p><h1 className="display-title mt-2 text-3xl font-bold">Thông tin thanh toán</h1><form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr]"><div className="space-y-6"><section className="border border-slate-200 bg-white p-5 md:p-7"><h2 className="font-display text-lg font-bold">Thông tin giao hàng</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{[['Họ và tên', 'Nguyễn Văn An', 'text'], ['Số điện thoại', '09xx xxx xxx', 'tel'], ['Email', 'email@example.com', 'email'], ['Tỉnh / Thành phố', 'TP. Hồ Chí Minh', 'text']].map(([label, placeholder, type]) => <label key={label} className="text-xs font-semibold text-slate-700">{label}<input required type={type} placeholder={placeholder} className="mt-2 h-11 w-full border border-slate-200 px-3 text-sm font-normal outline-none focus:border-brand-500" /></label>)}</div><label className="mt-4 block text-xs font-semibold text-slate-700">Địa chỉ nhận hàng<input required placeholder="Số nhà, đường, phường / xã..." className="mt-2 h-11 w-full border border-slate-200 px-3 text-sm font-normal outline-none focus:border-brand-500" /></label><label className="mt-4 block text-xs font-semibold text-slate-700">Ghi chú<textarea rows="3" placeholder="Ghi chú cho đơn hàng (không bắt buộc)" className="mt-2 w-full border border-slate-200 p-3 text-sm font-normal outline-none focus:border-brand-500" /></label></section>
      <section className="border border-slate-200 bg-white p-5 md:p-7"><h2 className="font-display text-lg font-bold">Phương thức thanh toán</h2><div className="mt-4 space-y-2">{[['cod', 'Thanh toán khi nhận hàng (COD)'], ['bank', 'Chuyển khoản ngân hàng'], ['vnpay', 'Thanh toán qua VNPay']].map(([value, label]) => <label key={value} className={`flex cursor-pointer items-center gap-3 border p-4 text-xs ${payment === value ? 'border-brand-700 bg-brand-50/50' : 'border-slate-200'}`}><input type="radio" name="payment" value={value} checked={payment === value} onChange={() => setPayment(value)} className="accent-brand-700" /><span className="font-semibold">{label}</span></label>)}</div></section></div>
      <aside className="h-fit border border-slate-200 bg-white p-5 md:p-7"><h2 className="font-display text-lg font-bold">Đơn hàng của bạn</h2><div className="mt-4 divide-y divide-slate-100">{cart.map((item) => <div key={item.key} className="flex justify-between gap-3 py-3 text-xs"><span className="max-w-[220px] text-slate-600">{item.product.name} × {item.quantity}<small className="mt-1 block text-[10px] text-slate-400">{item.variant.sku}</small></span><b className="whitespace-nowrap text-slate-800">{money(item.variant.retail_price * item.quantity)}</b></div>)}</div><div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-sm font-bold"><span>Tổng cộng</span><span className="text-brand-800">{money(total)}</span></div><button disabled={!cart.length} className="btn-primary mt-5 h-12 w-full text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40">Đặt hàng <ArrowRight size={16} /></button><p className="mt-3 text-center text-[10px] text-slate-400">Thông tin của bạn được bảo mật an toàn.</p></aside>
    </form></div></main>
}

function ConsultationModal({ close, quoteItems }) {
  const [sent, setSent] = useState(false)
  const [reference, setReference] = useState('')
  const onSubmit = (e) => { e.preventDefault(); setReference(`QT${Date.now().toString().slice(-7)}`); setSent(true) }
  return <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/55 p-4" onClick={close}><div onClick={(e) => e.stopPropagation()} className="relative my-auto w-full max-w-[650px] bg-white shadow-2xl">
    <button onClick={close} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center bg-white/90 text-slate-600"><X size={19} /></button>
    {sent ? <div className="px-7 py-16 text-center md:px-12"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check size={27} /></span><p className="eyebrow mt-6">Đã tiếp nhận yêu cầu</p><h2 className="display-title mt-2 text-2xl font-bold">Cảm ơn bạn đã kết nối với LINA JSC.</h2><p className="mt-3 text-sm leading-6 text-slate-500">Mã yêu cầu <b className="text-slate-800">{reference}</b>. Đội ngũ tư vấn sẽ liên hệ trong một ngày làm việc.</p><button onClick={close} className="btn-primary mt-7 h-10 px-6 text-xs font-semibold">Đóng</button></div> : <><div className="bg-brand-800 px-7 py-8 text-white md:px-10"><p className="eyebrow !text-brand-accent">Tư vấn dự án · B2B</p><h2 className="display-title mt-2 text-2xl font-bold md:text-[30px]">Cùng thiết kế giải pháp phù hợp.</h2><p className="mt-2 max-w-lg text-xs leading-5 text-white/65">Chia sẻ thông tin công trình để chuyên gia LINA JSC chuẩn bị tư vấn và dự toán sát thực tế.</p></div>
      <form onSubmit={onSubmit} className="grid gap-4 p-7 md:grid-cols-2 md:p-10">
        <label className="text-xs font-semibold">Họ và tên<input required placeholder="Tên người liên hệ" className="mt-2 h-10 w-full border border-slate-200 px-3 text-sm font-normal outline-none focus:border-brand-500" /></label>
        <label className="text-xs font-semibold">Số điện thoại<input required type="tel" placeholder="09xx xxx xxx" className="mt-2 h-10 w-full border border-slate-200 px-3 text-sm font-normal outline-none focus:border-brand-500" /></label>
        <label className="text-xs font-semibold">Loại công trình<select defaultValue="" required className="mt-2 h-10 w-full border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-500"><option value="" disabled>Chọn loại công trình</option><option>Khách sạn</option><option>Biệt thự</option><option>Tòa nhà thương mại</option><option>Căn hộ</option></select></label>
        <label className="text-xs font-semibold">Quy mô dự án<input required placeholder="VD: 50 phòng, 300 m²" className="mt-2 h-10 w-full border border-slate-200 px-3 text-sm font-normal outline-none focus:border-brand-500" /></label>
        <label className="text-xs font-semibold md:col-span-2">Hệ thống quan tâm<select defaultValue="Smart toàn diện" className="mt-2 h-10 w-full border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-500"><option>Smart toàn diện</option><option>Kết hợp cơ & thông minh</option><option>Điện cơ đồng bộ</option></select></label>
        <label className="text-xs font-semibold md:col-span-2">Ghi chú / bản vẽ<textarea rows="3" defaultValue={quoteItems.length ? `Quan tâm dự toán: ${quoteItems.map((item) => `${item.product.name} (${item.variant.sku}) × ${item.quantity}`).join('; ')}` : ''} placeholder="Mô tả nhu cầu hoặc ghi chú về bản vẽ..." className="mt-2 w-full border border-slate-200 p-3 text-sm font-normal outline-none focus:border-brand-500" /></label>
        <button className="btn-primary h-11 text-xs font-semibold md:col-span-2">Gửi yêu cầu tư vấn <ArrowRight size={15} /></button>
      </form></>}
  </div></div>
}

function Footer({ setPage, openQuote }) {
  return <footer className="bg-brand-900 text-white"><div className="container-wide grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:py-14">
    <div><Logo onClick={() => setPage('home')} inverse /><p className="mt-5 max-w-[260px] text-xs leading-6 text-white/55">Giải pháp điện thông minh và thiết bị điện cao cấp cho công trình hiện đại.</p><div className="mt-5 flex items-center gap-2 text-[10px] text-white/50"><Headphones size={14} /> Tư vấn thiết kế & triển khai dự án</div></div>
    <div><p className="text-xs font-bold uppercase tracking-widest text-white/85">Khám phá</p><div className="mt-5 space-y-3">{[['Sản phẩm', 'catalog'], ['Giải pháp', 'solutions'], ['Dự án tiêu biểu', 'projects'], ['Tài liệu kỹ thuật', 'documents']].map(([label, key]) => <button key={key} onClick={() => { setPage(key); window.scrollTo(0, 0) }} className="block text-left text-xs text-white/55 hover:text-white">{label}</button>)}</div></div>
    <div><p className="text-xs font-bold uppercase tracking-widest text-white/85">Đồng hành</p><div className="mt-5 space-y-3"><button onClick={openQuote} className="block text-xs text-white/55 hover:text-white">Tư vấn dự án</button><button onClick={openQuote} className="block text-xs text-white/55 hover:text-white">Đăng ký khảo sát</button><button onClick={() => setPage('documents')} className="block text-xs text-white/55 hover:text-white">Hỗ trợ kỹ thuật</button></div></div>
    <div><p className="text-xs font-bold uppercase tracking-widest text-white/85">Liên hệ</p><p className="mt-5 text-xs leading-6 text-white/55">Liên hệ LINA JSC để được tư vấn<br />khảo sát và lập dự toán công trình.</p></div>
  </div><div className="border-t border-white/10"><div className="container-wide flex flex-wrap justify-between gap-3 py-4 text-[10px] text-white/40"><span>© 2026 LINA JSC. All rights reserved.</span><span>Giải pháp điện cho công trình hiện đại.</span></div></div></footer>
}

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeSolution, setActiveSolution] = useState('hotel')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteItems, setQuoteItems] = useState([])
  const [toast, setToast] = useState('')
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2400) }
  const addToCart = (product, variant = product.variants[0], quantity = 1) => {
    const key = `${product.id}-${variant.sku}`
    setCart((items) => {
      const existing = items.find((item) => item.key === key)
      return existing ? items.map((item) => item.key === key ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { key, product, variant, quantity }]
    })
    showToast('Đã thêm sản phẩm vào giỏ hàng')
  }
  const addToQuote = (product, variant, quantity) => {
    setQuoteItems((items) => [...items, { product, variant, quantity }])
    setSelectedProduct(null)
    setQuoteOpen(true)
  }
  const updateQuantity = (key, quantity) => setCart((items) => quantity <= 0 ? items.filter((item) => item.key !== key) : items.map((item) => item.key === key ? { ...item, quantity } : item))
  const openProduct = (product) => { setSelectedProduct(product); window.scrollTo(0, 0) }
  const selectPage = (nextPage) => { setSelectedProduct(null); setPage(nextPage); window.scrollTo(0, 0) }
  const openQuote = () => setQuoteOpen(true)
  useEffect(() => {
    const handler = () => setQuoteOpen(true)
    window.addEventListener('open-quote', handler)
    return () => window.removeEventListener('open-quote', handler)
  }, [])
  let content
  if (selectedProduct) content = <ProductDetail key={selectedProduct.id} product={selectedProduct} close={() => setSelectedProduct(null)} addToCart={addToCart} addToQuote={addToQuote} openProduct={openProduct} />
  else if (page === 'catalog') content = <CatalogPage openProduct={openProduct} addToCart={addToCart} query={query} />
  else if (page === 'solutions') content = <SolutionsPage activeSolution={activeSolution} setActiveSolution={setActiveSolution} openProduct={openProduct} addToCart={addToCart} openQuote={openQuote} />
  else if (page === 'projects') content = <ProjectsPage />
  else if (page === 'documents') content = <DocumentsPage />
  else if (page === 'checkout') content = <CheckoutPage cart={cart} setPage={selectPage} clearCart={() => setCart([])} />
  else content = <HomePage setPage={selectPage} openProduct={openProduct} addToCart={addToCart} setActiveSolution={setActiveSolution} />
  return <div className="min-h-screen">
    <div className="bg-brand-800 text-white"><div className="container-wide flex h-8 items-center justify-between text-[9px] tracking-wide text-white/70 sm:text-[10px]"><span>Giải pháp điện thông minh cho công trình hiện đại</span><span className="hidden sm:inline">Đối tác thiết kế & triển khai công trình</span></div></div>
    <Header page={selectedProduct ? 'catalog' : page} setPage={selectPage} query={query} setQuery={setQuery} cartCount={cartCount} openCart={() => setCartOpen(true)} openQuote={openQuote} />
    {content}
    {page !== 'checkout' && <Footer setPage={selectPage} openQuote={openQuote} />}
    {cartOpen && <CartDrawer cart={cart} close={() => setCartOpen(false)} updateQuantity={updateQuantity} removeItem={(key) => updateQuantity(key, 0)} goCheckout={() => { setCartOpen(false); selectPage('checkout') }} openProduct={openProduct} />}
    {quoteOpen && <ConsultationModal close={() => setQuoteOpen(false)} quoteItems={quoteItems} />}
    {toast && <div className="fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-2 bg-brand-800 px-5 py-3 text-xs font-semibold text-white shadow-xl"><Check size={15} />{toast}</div>}
  </div>
}
