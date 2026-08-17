import { useState, useRef } from "react";
import {
  ShoppingBag, User, X, ChevronLeft, ChevronRight, Plus, Minus,
  MapPin, Upload, Check, LogIn, Package, Copy, ArrowRight, Info,
  ChevronDown, ImageIcon, Truck, CircleCheck, ShieldCheck, LayoutDashboard, ClipboardList, Boxes, LogOut, Search, Eye, Settings, CircleDollarSign, Bell, Tag, Users, BarChart3, Megaphone, Store, CreditCard, Palette, Save, RefreshCw, PlusCircle, Trash2, Pencil
} from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap');`;

const img = (seed) => `https://picsum.photos/seed/${seed}/700/700`;

const PRODUCTS = [
  {
    id: 1,
    name: "เสื้อฮู้ดปักลาย Ocean",
    roundNo: 2,
    close: "24 ส.ค. 2569",
    arrival: "15 ก.ย. 2569",
    price: 890,
    deposit: 300,
    sold: 38,
    limit: 50,
    desc: "เสื้อฮู้ดผ้าหนานุ่ม ปักลายคลื่นทะเลที่หน้าอก ตัดเย็บละเอียด ใส่สบาย เก็บอุณหภูมิดี ใส่ได้ทุกฤดู",
    images: [img("ocean-hoodie-1"), img("ocean-hoodie-2"), img("ocean-hoodie-3")],
    variantGroups: [
      { label: "ไซซ์", options: ["S", "M", "L", "XL"] },
      { label: "สี", options: ["ครีม", "เทาถ่าน"] },
    ],
  },
  {
    id: 2,
    name: "กระเป๋าผ้าแคนวาส Tokyo Trip",
    roundNo: 1,
    close: "18 ส.ค. 2569",
    arrival: "5 ก.ย. 2569",
    price: 450,
    deposit: 150,
    sold: 50,
    limit: 50,
    desc: "กระเป๋าผ้าแคนวาสหนา 12 ออนซ์ พิมพ์ลายเก็บภาพทริปโตเกียว จุของได้เยอะ สายเย็บสองชั้นทนทาน",
    images: [img("tokyo-bag-1"), img("tokyo-bag-2"), img("tokyo-bag-3")],
    variantGroups: [{ label: "สี", options: ["ครีม", "กากี"] }],
  },
  {
    id: 3,
    name: "เคสมือถือลาย Retro Cat",
    roundNo: 4,
    close: "30 ส.ค. 2569",
    arrival: "20 ก.ย. 2569",
    price: 290,
    deposit: 100,
    sold: 12,
    limit: 80,
    desc: "เคสซิลิโคนกันกระแทก ลายแมวสไตล์ retro พิมพ์คมชัดไม่ลอกไม่จาง กันรอยขีดข่วนกล้อง",
    images: [img("retro-cat-1"), img("retro-cat-2"), img("retro-cat-3")],
    variantGroups: [{ label: "รุ่นมือถือ", options: ["iPhone 15", "iPhone 14", "iPhone 13"] }],
  },
  {
    id: 4,
    name: "สมุดโน้ตปกหนัง Little Forest",
    roundNo: 1,
    close: "28 ส.ค. 2569",
    arrival: "12 ก.ย. 2569",
    price: 220,
    deposit: 0,
    sold: 5,
    limit: 60,
    desc: "สมุดโน้ตปกหนัง PU กระดาษถนอมสายตา 160 หน้า เย็บกี่อย่างดี เปิดแบนราบเขียนง่าย",
    images: [img("forest-notebook-1"), img("forest-notebook-2"), img("forest-notebook-3")],
    variantGroups: [{ label: "สี", options: ["น้ำตาล", "เขียวมอส", "ดำ"] }],
  },
];

const BANK_INFO = {
  bank: "ธนาคารกสิกรไทย (KBank)",
  accName: "ร้าน พรีออเดอร์.ช็อป",
  accNo: "123-4-56789-0",
  promptpay: "081-234-5678",
};

const MOCK_MY_ORDERS = [
  { id: "OD-1042", round: "เสื้อฮู้ด Ocean รอบ 2", amount: 890, paid: 445, status: "deposit_paid" },
  { id: "OD-1038", round: "เคส Retro Cat", amount: 290, paid: 290, status: "shipped" },
];

const MOCK_ADMIN_ORDERS = [
  { id: "OD-1042", customer: "คุณลูกค้า", phone: "081-234-5678", product: "เสื้อฮู้ดปักลาย Ocean", amount: 930, paid: 445, status: "deposit_paid", created: "17 ส.ค. 2569 18:42" },
  { id: "OD-1041", customer: "นภัส", phone: "089-321-4567", product: "กระเป๋าผ้าแคนวาส Tokyo Trip", amount: 490, paid: 490, status: "pending", created: "17 ส.ค. 2569 17:58" },
  { id: "OD-1040", customer: "ธนกร", phone: "086-555-0192", product: "เคสมือถือลาย Retro Cat", amount: 330, paid: 330, status: "shipped", created: "17 ส.ค. 2569 16:20" },
  { id: "OD-1039", customer: "พิมพ์ชนก", phone: "082-741-2033", product: "สมุดโน้ตปกหนัง Little Forest", amount: 260, paid: 260, status: "completed", created: "16 ส.ค. 2569 20:11" },
];

const ADMIN_STATUS_OPTIONS = ["pending", "deposit_paid", "paid", "shipped", "completed"];
const DEFAULT_STORE_SETTINGS = {
  storeName: "พรีออเดอร์.ช็อป",
  tagline: "สั่งจองง่าย ติดตามได้ทุกขั้นตอน",
  announcement: "เปิดรับพรีออเดอร์รอบใหม่ทุกสัปดาห์",
  phone: "081-234-5678",
  line: "@preorder.shop",
  shipping: 40,
  freeShipping: 1200,
  bankName: BANK_INFO.bank,
  accountName: BANK_INFO.accName,
  accountNo: BANK_INFO.accNo,
  promptpay: BANK_INFO.promptpay,
  primaryColor: "#D7FF1E",
  accentColor: "#0E0E0E",
  footerText: "© 2026 พรีออเดอร์.ช็อป · สั่งซื้อออนไลน์อย่างเป็นระบบ",
  maintenance: false,
};

const MOCK_CUSTOMERS = [
  { id: "CU-001", name: "คุณลูกค้า", phone: "081-234-5678", orders: 4, spent: 2820, joined: "12 ส.ค. 2569" },
  { id: "CU-002", name: "นภัส", phone: "089-321-4567", orders: 2, spent: 980, joined: "15 ส.ค. 2569" },
  { id: "CU-003", name: "ธนกร", phone: "086-555-0192", orders: 3, spent: 1470, joined: "10 ส.ค. 2569" },
];

const MOCK_COUPONS = [
  { code: "WELCOME50", type: "ส่วนลดบาท", value: 50, used: 8, limit: 100, active: true },
  { code: "ROUND10", type: "ส่วนลด %", value: 10, used: 12, limit: 50, active: true },
];

const MOCK_SECURITY_LOGS = [
  { id: "SEC-1004", time: "17 ส.ค. 2569 19:12:41", ip: "203.0.113.24", country: "TH", action: "Login failed", reason: "รหัสผ่านไม่ถูกต้อง 5 ครั้ง", severity: "high", blocked: true },
  { id: "SEC-1003", time: "17 ส.ค. 2569 18:57:03", ip: "198.51.100.17", country: "TH", action: "Rate limit", reason: "ส่งคำขอถี่ผิดปกติ", severity: "medium", blocked: true },
  { id: "SEC-1002", time: "17 ส.ค. 2569 18:31:20", ip: "192.0.2.88", country: "TH", action: "Admin access denied", reason: "พยายามเข้าหน้า Admin โดยไม่มีสิทธิ์", severity: "high", blocked: true },
  { id: "SEC-1001", time: "17 ส.ค. 2569 17:46:09", ip: "198.51.100.44", country: "TH", action: "Login failed", reason: "บัญชีไม่ถูกต้อง", severity: "low", blocked: false },
];

const MOCK_NOTIFICATIONS = [
  { id: "NT-01", title: "มีสินค้าใหม่เข้า", body: "เสื้อฮู้ดปักลาย Ocean รอบใหม่เปิดรับแล้ว", time: "เมื่อ 3 นาทีที่แล้ว", type: "product", read: false },
  { id: "NT-02", title: "มีออเดอร์ใหม่", body: "OD-1042 ถูกสร้างและรอตรวจสอบยอดชำระ", time: "เมื่อ 8 นาทีที่แล้ว", type: "order", read: false },
  { id: "NT-03", title: "แจ้งเตือนความปลอดภัย", body: "ตรวจพบการเข้าสู่ระบบ Admin ผิดพลาดหลายครั้ง", time: "เมื่อ 25 นาทีที่แล้ว", type: "security", read: true },
];


const statusMap = {
  pending: { label: "รอตรวจสลิป", cls: "amber" },
  deposit_paid: { label: "มัดจำแล้ว", cls: "amber" },
  paid: { label: "จ่ายครบ", cls: "volt" },
  shipped: { label: "จัดส่งแล้ว", cls: "ink" },
  completed: { label: "สำเร็จ", cls: "steel" },
};

function StatusPill({ status }) {
  const s = statusMap[status] || statusMap.pending;
  return <span className={`pill pill-${s.cls}`}>{s.label}</span>;
}

function Carousel({ images, idx, setIdx, height = 320 }) {
  const go = (d) => setIdx((idx + d + images.length) % images.length);
  return (
    <div className="carousel" style={{ height }}>
      <img src={images[idx]} alt="" className="carousel-img" />
      <button className="carousel-arrow left" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="ก่อนหน้า">
        <ChevronLeft size={16} />
      </button>
      <button className="carousel-arrow right" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="ถัดไป">
        <ChevronRight size={16} />
      </button>
      <div className="carousel-counter mono">{String(idx + 1).padStart(2, "0")}/{String(images.length).padStart(2, "0")}</div>
      <div className="carousel-dots">
        {images.map((_, i) => (
          <span key={i} className={`dot ${i === idx ? "dot-active" : ""}`} onClick={(e) => { e.stopPropagation(); setIdx(i); }} />
        ))}
      </div>
    </div>
  );
}

function QtyStepper({ qty, setQty, min = 1 }) {
  return (
    <div className="qty-stepper">
      <button onClick={() => setQty(Math.max(min, qty - 1))}><Minus size={13} /></button>
      <span className="mono">{qty}</span>
      <button onClick={() => setQty(qty + 1)}><Plus size={13} /></button>
    </div>
  );
}

export default function PreorderStore() {
  const [view, setView] = useState("home"); // home | orders | checkout-address | checkout-payment | success
  const [cardIdx, setCardIdx] = useState({});
  const [activeProduct, setActiveProduct] = useState(null);
  const [modalIdx, setModalIdx] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [modalQty, setModalQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [guideOpen, setGuideOpen] = useState(true);
  const [address, setAddress] = useState({ name: "", phone: "", line: "", subdistrict: "", district: "", province: "", zip: "" });
  const [slipFile, setSlipFile] = useState(null);
  const [copied, setCopied] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);
  const [myOrders, setMyOrders] = useState(MOCK_MY_ORDERS);
  const [adminOrders, setAdminOrders] = useState(MOCK_ADMIN_ORDERS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminSearch, setAdminSearch] = useState("");
  const [adminToast, setAdminToast] = useState("");
  const [storeSettings, setStoreSettings] = useState(DEFAULT_STORE_SETTINGS);
  const [adminCustomers] = useState(MOCK_CUSTOMERS);
  const [adminCoupons, setAdminCoupons] = useState(MOCK_COUPONS);
  const [securityLogs, setSecurityLogs] = useState(MOCK_SECURITY_LOGS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [security2FA, setSecurity2FA] = useState(true);
  const [securityLockout, setSecurityLockout] = useState(true);
  const [securityRateLimit, setSecurityRateLimit] = useState(true);
  const [adminSection, setAdminSection] = useState("dashboard");
  const [editingProduct, setEditingProduct] = useState(null);
  const fileRef = useRef(null);

  const getCardIdx = (id) => cardIdx[id] || 0;
  const setCardIdxFor = (id, v) => setCardIdx((prev) => ({ ...prev, [id]: v }));

  const openProduct = (p) => {
    setActiveProduct(p);
    setModalIdx(getCardIdx(p.id));
    setModalQty(1);
    const initial = {};
    p.variantGroups.forEach((g) => (initial[g.label] = null));
    setSelectedVariants(initial);
  };

  const canAddToCart = activeProduct && activeProduct.variantGroups.every((g) => selectedVariants[g.label]);

  const addToCart = () => {
    if (!activeProduct || !canAddToCart) return;
    const variantLabel = activeProduct.variantGroups.map((g) => selectedVariants[g.label]).join(" / ");
    const key = `${activeProduct.id}-${variantLabel}`;
    setCart((prev) => {
      const existing = prev.find((c) => c.key === key);
      if (existing) return prev.map((c) => (c.key === key ? { ...c, qty: c.qty + modalQty } : c));
      return [...prev, { key, productId: activeProduct.id, name: activeProduct.name, price: activeProduct.price, variantLabel, qty: modalQty, image: activeProduct.images[0] }];
    });
    setActiveProduct(null);
    setCartOpen(true);
  };

  const updateCartQty = (key, qty) => {
    if (qty <= 0) return setCart((prev) => prev.filter((c) => c.key !== key));
    setCart((prev) => prev.map((c) => (c.key === key ? { ...c, qty } : c)));
  };

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping = cart.length ? (cartTotal >= storeSettings.freeShipping ? 0 : storeSettings.shipping) : 0;
  const grandTotal = cartTotal + shipping;

  const startCheckout = () => {
    setCartOpen(false);
    if (!user) { setShowLogin(true); return; }
    setView("checkout-address");
  };

  const doLogin = () => {
    if (!loginPhone.trim() || !loginPass.trim()) return;
    setUser({ name: "คุณลูกค้า", phone: loginPhone });
    setShowLogin(false);
    if (cart.length) setView("checkout-address");
  };

  const submitAddress = () => {
    if (!address.name.trim() || !address.phone.trim() || !address.line.trim() || !address.province.trim() || !address.zip.trim()) return;
    setView("checkout-payment");
  };

  const copyAcc = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const confirmPayment = () => {
    const id = "OD-" + Math.floor(1000 + Math.random() * 9000);
    setLastOrderId(id);
    setMyOrders((prev) => [{ id, round: cart.map((c) => c.name).join(", "), amount: grandTotal, paid: slipFile ? grandTotal : 0, status: slipFile ? "pending" : "pending" }, ...prev]);
    setCart([]);
    setSlipFile(null);
    setView("success");
  };

  const guideSteps = [
    { title: "เลือกสินค้า & ตัวเลือก", desc: "เลือกไซซ์ สี หรือรุ่นที่ต้องการ แล้วกดเพิ่มลงตะกร้า" },
    { title: "กรอกที่อยู่จัดส่ง", desc: "ใส่ชื่อผู้รับและที่อยู่ให้ครบ ระบบจะใช้จัดส่งเมื่อของถึง" },
    { title: "โอนเงิน & แนบสลิป", desc: "โอนตามยอดที่แจ้ง แล้วอัปโหลดสลิปยืนยันการชำระ" },
    { title: "รอแอดมินตรวจสอบ", desc: "ติดตามสถานะออเดอร์ได้ที่เมนู “ออเดอร์ของฉัน” ตลอดเวลา" },
  ];

  const adminLogin = () => {
    // Demo-only authentication. Replace with a real server-side auth flow in production.
    if (adminUser.trim().toLowerCase() === "admin" && adminPass === "admin123") {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminSection("dashboard");
      setView("admin");
      setAdminToast("เข้าสู่ระบบแอดมินสำเร็จ");
      setTimeout(() => setAdminToast(""), 2200);
    } else {
      addNotification("แจ้งเตือนความปลอดภัย", "มีความพยายามเข้าสู่ระบบ Admin แต่ข้อมูลไม่ถูกต้อง", "security");
      setAdminToast("ชื่อผู้ใช้หรือรหัสผ่านแอดมินไม่ถูกต้อง");
      setTimeout(() => setAdminToast(""), 2200);
    }
  };

  const updateAdminOrderStatus = (id, status) => {
    setAdminOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    setMyOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    setAdminToast(`อัปเดต ${id} เป็น “${statusMap[status]?.label || status}” แล้ว`);
    setTimeout(() => setAdminToast(""), 2200);
  };

  const adminStats = {
    orders: adminOrders.length,
    pending: adminOrders.filter((o) => o.status === "pending").length,
    revenue: adminOrders.reduce((s, o) => s + o.paid, 0),
    shipped: adminOrders.filter((o) => o.status === "shipped" || o.status === "completed").length,
  };

  const saveStoreSettings = () => {
    setAdminToast("บันทึกการตั้งค่าร้านเรียบร้อยแล้ว");
    setTimeout(() => setAdminToast(""), 2200);
  };

  const toggleCoupon = (code) => {
    setAdminCoupons((prev) => prev.map((c) => c.code === code ? { ...c, active: !c.active } : c));
  };

  const deleteCoupon = (code) => {
    setAdminCoupons((prev) => prev.filter((c) => c.code !== code));
  };

  const addNotification = (title, body, type = "system") => {
    setNotifications((prev) => [{
      id: `NT-${Date.now()}`,
      title,
      body,
      time: "เมื่อสักครู่นี้",
      type,
      read: false
    }, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const blockSecurityIp = (id) => {
    setSecurityLogs((prev) => prev.map((log) => log.id === id ? { ...log, blocked: true } : log));
    setAdminToast("บันทึก IP นี้เป็นรายการบล็อกแล้ว (Demo)");
    setTimeout(() => setAdminToast(""), 2000);
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const filteredAdminOrders = adminOrders.filter((o) =>
    [o.id, o.customer, o.phone, o.product].join(" ").toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'IBM Plex Sans Thai', sans-serif" }} className="w-full min-h-[700px] bg-[#F4F4F0] text-[#0E0E0E] relative">
      <style>{`
        ${FONT_IMPORT}
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .disp { font-family: 'Oswald', sans-serif; text-transform: uppercase; letter-spacing: 0.06em; }

        .pill { display:inline-flex; align-items:center; padding:4px 11px; border-radius:2px; font-size:12px; font-weight:600; border:1.5px solid transparent; }
        .pill-red { background:#0E0E0E; color:#FF3B2F; border-color:#FF3B2F; }
        .pill-amber { background:#0E0E0E; color:#FF8A00; border-color:#FF8A00; }
        .pill-volt { background:#D7FF1E; color:#0E0E0E; }
        .pill-ink { background:#0E0E0E; color:#F4F4F0; }
        .pill-steel { background:transparent; color:#6E7066; border-color:#C7C8C0; }

        .card { background:#FFFFFF; border:2px solid #0E0E0E; border-radius:2px; }
        .btn-primary { background:#0E0E0E; color:#F4F4F0; border-radius:2px; padding:10px 18px; font-size:13px; font-weight:600; display:inline-flex; align-items:center; justify-content:center; gap:6px; border:2px solid #0E0E0E; letter-spacing:0.02em; cursor:pointer; }
        .btn-primary:hover { background:#D7FF1E; color:#0E0E0E; border-color:#0E0E0E; }
        .btn-primary:disabled { opacity:0.35; cursor:not-allowed; }
        .btn-primary:disabled:hover { background:#0E0E0E; color:#F4F4F0; }
        .btn-ghost { background:transparent; color:#0E0E0E; border:2px solid #0E0E0E; border-radius:2px; padding:8px 14px; font-size:13px; font-weight:600; display:inline-flex; align-items:center; gap:6px; cursor:pointer; }
        .btn-ghost:hover { background:#0E0E0E; color:#F4F4F0; }
        .input { border:2px solid #0E0E0E; border-radius:2px; padding:9px 11px; font-size:13px; background:#fff; width:100%; }
        .input:focus { outline:2px solid #D7FF1E; outline-offset:1px; }

        .bar-track { width:100%; height:7px; background:#E5E6DE; border-radius:2px; overflow:hidden; display:block; border:1px solid #0E0E0E; }
        .bar-fill { height:100%; background:#D7FF1E; }
        .eyebrow { font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:0.08em; color:#6E7066; }

        .carousel { position:relative; width:100%; overflow:hidden; background:#E5E6DE; border-bottom:2px solid #0E0E0E; }
        .carousel-img { width:100%; height:100%; object-fit:cover; display:block; }
        .carousel-arrow { position:absolute; top:50%; transform:translateY(-50%); width:30px; height:30px; background:#F4F4F0; border:2px solid #0E0E0E; border-radius:2px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
        .carousel-arrow:hover { background:#D7FF1E; }
        .carousel-arrow.left { left:8px; } .carousel-arrow.right { right:8px; }
        .carousel-counter { position:absolute; top:8px; right:8px; background:#0E0E0E; color:#D7FF1E; font-size:10px; font-weight:700; padding:3px 7px; border-radius:2px; }
        .carousel-dots { position:absolute; bottom:8px; left:0; right:0; display:flex; justify-content:center; gap:5px; }
        .dot { width:6px; height:6px; border-radius:50%; background:#F4F4F0; border:1.5px solid #0E0E0E; cursor:pointer; }
        .dot-active { background:#D7FF1E; }

        .chip { border:2px solid #0E0E0E; border-radius:2px; padding:7px 13px; font-size:13px; font-weight:600; cursor:pointer; background:#fff; }
        .chip:hover { background:#F4F4F0; }
        .chip-active { background:#0E0E0E; color:#D7FF1E; }

        .qty-stepper { display:inline-flex; align-items:center; border:2px solid #0E0E0E; border-radius:2px; }
        .qty-stepper button { width:30px; height:30px; display:flex; align-items:center; justify-content:center; cursor:pointer; background:#fff; }
        .qty-stepper button:hover { background:#F4F4F0; }
        .qty-stepper span { width:32px; text-align:center; font-weight:600; font-size:13px; }

        .overlay { position:absolute; inset:0; background:rgba(14,14,14,0.55); z-index:40; display:flex; }
        .drawer { margin-left:auto; width:380px; max-width:92%; background:#F4F4F0; height:100%; border-left:2px solid #0E0E0E; display:flex; flex-direction:column; }
        .modal-wrap { margin:auto; width:640px; max-width:94%; max-height:88%; overflow:auto; background:#fff; border:2px solid #0E0E0E; border-radius:2px; }
        .login-wrap { margin:auto; width:360px; max-width:92%; background:#fff; border:2px solid #0E0E0E; border-radius:2px; }

        .navlink { font-size:13px; font-weight:600; color:#0E0E0E; cursor:pointer; padding:8px 4px; border-bottom:2px solid transparent; }
        .navlink:hover { border-bottom:2px solid #D7FF1E; }

        .step-badge { width:26px; height:26px; border-radius:50%; border:2px solid #0E0E0E; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; flex-shrink:0; }
        .step-badge-done { background:#D7FF1E; }

        .dropzone { border:2px dashed #0E0E0E; border-radius:2px; padding:22px; text-align:center; cursor:pointer; background:#fff; }
        .dropzone:hover { background:#F4F4F0; }

        .product-card { background:#fff; border:2px solid #0E0E0E; border-radius:2px; cursor:pointer; display:flex; flex-direction:column; }
        .product-card:hover .carousel-img { transform:scale(1.04); }
        .carousel-img { transition: transform .35s ease; }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0E0E0E] sticky top-0 z-30">
        <div className="cursor-pointer" onClick={() => setView("home")}>
          <div className="disp text-[9px] text-[#D7FF1E] font-semibold mb-0.5">Preorder Shop</div>
          <div className="text-[18px] font-bold text-[#F4F4F0]">{storeSettings.storeName}</div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span className="navlink text-[#F4F4F0]" onClick={() => setView("home")}>หน้าร้าน</span>
          <span className="navlink text-[#F4F4F0]" onClick={() => { setView("home"); setGuideOpen(true); }}>วิธีสั่งซื้อ</span>
          <span className="navlink text-[#F4F4F0]" onClick={() => setView("orders")}>ออเดอร์ของฉัน</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="relative w-9 h-9 flex items-center justify-center border-2 border-[#D7FF1E] rounded-sm text-[#D7FF1E]" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={16} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-[#D7FF1E] text-[#0E0E0E] text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">{cart.reduce((s, c) => s + c.qty, 0)}</span>}
          </button>
          {isAdmin && (
            <button className="btn-ghost !border-[#D7FF1E] !text-[#D7FF1E] !py-1.5" onClick={() => setView("admin")}>
              <ShieldCheck size={14} /> แอดมิน {unreadNotifications > 0 && <span className="ml-1 inline-flex min-w-4 h-4 px-1 items-center justify-center bg-[#D7FF1E] text-[#0E0E0E] text-[9px] border border-[#0E0E0E]">{unreadNotifications}</span>}
            </button>
          )}
          {user ? (
            <div className="flex items-center gap-1.5 text-[#F4F4F0] text-[12px] font-medium pl-1">
              <User size={14} className="text-[#D7FF1E]" /> {user.phone}
            </div>
          ) : (
            <button className="btn-ghost !border-[#D7FF1E] !text-[#D7FF1E]" onClick={() => setShowLogin(true)}>
              <LogIn size={14} /> เข้าสู่ระบบ
            </button>
          )}
        </div>
      </div>

      {storeSettings.maintenance && (
        <div className="mx-6 mt-4 card p-3 flex items-center gap-2 bg-[#FFF3CD]">
          <Bell size={15}/>
          <span className="text-[12px] font-semibold">ร้านอยู่ในโหมดปรับปรุงชั่วคราว — ลูกค้าอาจไม่สามารถสั่งซื้อได้</span>
        </div>
      )}

      {/* HOME */}
      {view === "home" && (
        <div className="p-6">
          {/* Hero */}
          <div className="card p-5 mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ background: "#0E0E0E", color: "#F4F4F0" }}>
            <div>
              <div className="disp text-[10px] text-[#D7FF1E] mb-1.5">New rounds every week</div>
              <div className="text-[24px] font-bold leading-tight mb-1">{storeSettings.tagline}</div>
              <div className="text-[13px] text-[#B8B9AF]">{storeSettings.announcement}</div>
            </div>
            <button className="btn-primary !bg-[#D7FF1E] !text-[#0E0E0E] !border-[#D7FF1E] whitespace-nowrap" onClick={() => setGuideOpen(true)}>
              <Info size={14} /> ดูวิธีสั่งซื้อ
            </button>
          </div>

          {/* Guide */}
          <div className="card mb-6 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 cursor-pointer" onClick={() => setGuideOpen((v) => !v)}>
              <div className="flex items-center gap-2">
                <div className="h-[3px] w-5 bg-[#D7FF1E]" />
                <span className="text-[14px] font-bold">วิธีสั่งซื้อสินค้า</span>
              </div>
              <ChevronDown size={16} className={`transition-transform ${guideOpen ? "rotate-180" : ""}`} />
            </div>
            {guideOpen && (
              <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                {guideSteps.map((s, i) => (
                  <div key={i} className="flex gap-2.5">
                    <span className="mono text-[11px] font-bold text-[#6E7066] pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="text-[13px] font-bold mb-0.5">{s.title}</div>
                      <div className="text-[12px] text-[#6E7066] leading-snug">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="section-head flex items-baseline gap-2 mb-4">
            <span className="eyebrow">รอบเปิดขายตอนนี้ /</span>
            <h2 className="text-[19px] font-bold">สินค้าพรีออเดอร์</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCTS.map((p) => {
              const idx = getCardIdx(p.id);
              const pct = Math.min(100, (p.sold / p.limit) * 100);
              const full = p.sold >= p.limit;
              return (
                <div key={p.id} className="product-card" onClick={() => openProduct(p)}>
                  <Carousel images={p.images} idx={idx} setIdx={(v) => setCardIdxFor(p.id, typeof v === "function" ? v(idx) : v)} height={190} />
                  <div className="p-3.5 flex flex-col gap-2 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-[13.5px] font-bold leading-snug">{p.name}</div>
                      <span className={`pill ${full ? "pill-red" : "pill-volt"} shrink-0`}>{full ? "เต็มแล้ว" : `รอบ ${p.roundNo}`}</span>
                    </div>
                    <div className="text-[12px] text-[#6E7066]">ปิดรอบ {p.close} · ของถึง {p.arrival}</div>
                    <div>
                      <div className="flex justify-between mono text-[11px] font-semibold mb-1">
                        <span>{p.sold}/{p.limit} จอง</span><span>{Math.round(pct)}%</span>
                      </div>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${pct}%`, background: full ? "#FF3B2F" : "#D7FF1E" }} /></div>
                    </div>
                    <div className="flex items-center justify-between pt-1 mt-auto">
                      <span className="mono font-bold text-[15px]">฿{p.price.toLocaleString()}</span>
                      <button className="btn-ghost !py-1.5 !px-3" onClick={(e) => { e.stopPropagation(); openProduct(p); }}>เลือกตัวเลือก</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TRUST + FOOTER */}
      {view === "home" && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="card p-4 flex gap-3">
              <div className="w-9 h-9 border-2 border-[#0E0E0E] bg-[#D7FF1E] flex items-center justify-center"><ShieldCheck size={17} /></div>
              <div><div className="text-[13px] font-bold">ชำระเงินอย่างเป็นระบบ</div><div className="text-[11.5px] text-[#6E7066]">มีเลขออเดอร์และประวัติการชำระทุกคำสั่งซื้อ</div></div>
            </div>
            <div className="card p-4 flex gap-3">
              <div className="w-9 h-9 border-2 border-[#0E0E0E] flex items-center justify-center"><CircleDollarSign size={17} /></div>
              <div><div className="text-[13px] font-bold">ตรวจสอบสลิปโดยแอดมิน</div><div className="text-[11.5px] text-[#6E7066]">ทุกยอดชำระผ่านขั้นตอนตรวจสอบก่อนยืนยัน</div></div>
            </div>
            <div className="card p-4 flex gap-3">
              <div className="w-9 h-9 border-2 border-[#0E0E0E] flex items-center justify-center"><Truck size={17} /></div>
              <div><div className="text-[13px] font-bold">ติดตามสถานะได้</div><div className="text-[11.5px] text-[#6E7066]">ดูสถานะออเดอร์ได้ตลอดจากบัญชีของคุณ</div></div>
            </div>
          </div>
          <div className="border-t-2 border-[#0E0E0E] pt-4 flex flex-col md:flex-row justify-between gap-2">
            <div className="text-[11px] text-[#6E7066]">{storeSettings.footerText}</div>
            <button className="text-[11px] font-semibold underline" onClick={() => setShowAdminLogin(true)}>สำหรับเจ้าของร้าน · Admin</button>
          </div>
        </div>
      )}

      {/* ADMIN */}
      {view === "admin" && isAdmin && (
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5">
            <div>
              <div className="eyebrow">BACK OFFICE / CONTROL CENTER</div>
              <h2 className="text-[22px] font-bold">{storeSettings.storeName}</h2>
              <div className="text-[12px] text-[#6E7066]">จัดการร้าน ออเดอร์ ลูกค้า สินค้า โปรโมชั่น และการตั้งค่าจากระบบเดียว</div>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost" onClick={() => setView("home")}>ดูหน้าร้าน</button>
              <button className="btn-primary" onClick={() => { setIsAdmin(false); setView("home"); }}><LogOut size={14}/> ออกจากระบบ</button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <div className="card p-4"><div className="text-[11px] text-[#6E7066]">ออเดอร์ทั้งหมด</div><div className="mono text-[24px] font-bold">{adminStats.orders}</div><div className="text-[10px] text-[#6E7066]">เดือนนี้</div></div>
            <div className="card p-4"><div className="text-[11px] text-[#6E7066]">รอตรวจสอบ</div><div className="mono text-[24px] font-bold text-[#FF8A00]">{adminStats.pending}</div><div className="text-[10px] text-[#6E7066]">ต้องดำเนินการ</div></div>
            <div className="card p-4"><div className="text-[11px] text-[#6E7066]">ยอดรับชำระ</div><div className="mono text-[24px] font-bold">฿{adminStats.revenue.toLocaleString()}</div><div className="text-[10px] text-[#6E7066]">จากออเดอร์ตัวอย่าง</div></div>
            <div className="card p-4"><div className="text-[11px] text-[#6E7066]">ส่ง/สำเร็จ</div><div className="mono text-[24px] font-bold">{adminStats.shipped}</div><div className="text-[10px] text-[#6E7066]">ติดตามต่อได้</div></div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {[
              ["dashboard", "ภาพรวม", LayoutDashboard],
              ["orders", "ออเดอร์", ClipboardList],
              ["products", "สินค้า", Boxes],
              ["customers", "ลูกค้า", Users],
              ["coupons", "คูปอง", Tag],
              ["notifications", "แจ้งเตือน", Bell],
              ["security", "ความปลอดภัย", ShieldCheck],
              ["settings", "ตั้งค่าร้าน", Settings],
            ].map(([tab, label, Icon]) => (
              <button key={tab} className={adminSection === tab ? "btn-primary" : "btn-ghost"} onClick={() => setAdminSection(tab)}>
                <Icon size={14}/> {label}
              </button>
            ))}
          </div>

          {adminSection === "dashboard" && (
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="card p-5 lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-[14px] font-bold">ออเดอร์ล่าสุด</div><div className="text-[11px] text-[#6E7066]">รายการที่ควรตรวจสอบก่อน</div></div>
                  <button className="btn-ghost !py-1.5" onClick={() => setAdminSection("orders")}>ดูทั้งหมด</button>
                </div>
                <div className="space-y-2">
                  {adminOrders.slice(0, 4).map((o) => (
                    <div key={o.id} className="border-2 border-[#0E0E0E] p-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div><div className="mono text-[12px] font-bold">{o.id}</div><div className="text-[12px] font-semibold">{o.customer} · {o.product}</div></div>
                      <div className="flex items-center gap-2"><StatusPill status={o.status}/><span className="mono text-[12px]">฿{o.amount.toLocaleString()}</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-5">
                <div className="text-[14px] font-bold mb-3">ทางลัด</div>
                <div className="grid gap-2">
                  <button className="btn-ghost justify-start" onClick={() => setAdminSection("orders")}><ClipboardList size={14}/> ตรวจออเดอร์</button>
                  <button className="btn-ghost justify-start" onClick={() => setAdminSection("products")}><PlusCircle size={14}/> เพิ่ม/แก้สินค้า</button>
                  <button className="btn-ghost justify-start" onClick={() => setAdminSection("coupons")}><Tag size={14}/> จัดการโปรโมชั่น</button>
                  <button className="btn-ghost justify-start" onClick={() => setAdminSection("settings")}><Settings size={14}/> ตั้งค่าร้าน</button>
                </div>
              </div>
            </div>
          )}

          {adminSection === "orders" && (
            <div className="card overflow-hidden">
              <div className="p-4 border-b-2 border-[#0E0E0E] flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
                <div><div className="text-[14px] font-bold">จัดการออเดอร์</div><div className="text-[11px] text-[#6E7066]">เปลี่ยนสถานะเพื่อให้ลูกค้าติดตามได้</div></div>
                <div className="relative md:w-[320px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7066]"/>
                  <input className="input !pl-9" value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} placeholder="เลขออเดอร์ / ลูกค้า / เบอร์ / สินค้า"/>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[900px]">
                  <thead className="bg-[#F4F4F0] border-b-2 border-[#0E0E0E]">
                    <tr><th className="p-3 text-[11px]">ออเดอร์</th><th className="p-3 text-[11px]">ลูกค้า</th><th className="p-3 text-[11px]">สินค้า</th><th className="p-3 text-[11px]">ยอด</th><th className="p-3 text-[11px]">สถานะ</th><th className="p-3 text-[11px]">จัดการ</th></tr>
                  </thead>
                  <tbody>
                    {filteredAdminOrders.map((o) => (
                      <tr key={o.id} className="border-b border-[#E5E6DE]">
                        <td className="p-3"><div className="mono text-[12px] font-bold">{o.id}</div><div className="text-[10px] text-[#6E7066]">{o.created}</div></td>
                        <td className="p-3"><div className="text-[12px] font-semibold">{o.customer}</div><div className="mono text-[10px] text-[#6E7066]">{o.phone}</div></td>
                        <td className="p-3 text-[12px]">{o.product}</td>
                        <td className="p-3"><div className="mono text-[12px] font-bold">฿{o.amount.toLocaleString()}</div><div className="text-[10px] text-[#6E7066]">จ่าย ฿{o.paid.toLocaleString()}</div></td>
                        <td className="p-3"><StatusPill status={o.status}/></td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <select className="input !w-auto !py-1.5 !pr-8" value={o.status} onChange={(e) => updateAdminOrderStatus(o.id, e.target.value)}>
                              {ADMIN_STATUS_OPTIONS.map((s) => <option key={s} value={s}>{statusMap[s].label}</option>)}
                            </select>
                            <button className="btn-ghost !p-2" title="ดูรายละเอียด"><Eye size={14}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adminSection === "products" && (
            <div>
              <div className="flex justify-between items-center mb-3"><div><div className="text-[14px] font-bold">สินค้า</div><div className="text-[11px] text-[#6E7066]">แก้ชื่อ ราคา รอบขาย สต๊อก และตัวเลือกสินค้า</div></div><button className="btn-primary" onClick={() => { setEditingProduct({ id: Date.now(), name: "สินค้าใหม่", price: 0, sold: 0, limit: 100 }); addNotification("มีสินค้าใหม่เข้า", "มีการเพิ่มสินค้าใหม่จากหลังบ้าน", "product"); setAdminToast("สร้างแบบฟอร์มสินค้าใหม่"); setTimeout(() => setAdminToast(""), 1800); }}><PlusCircle size={14}/> เพิ่มสินค้า</button></div>
              {editingProduct && (
                <div className="card p-4 mb-4">
                  <div className="text-[13px] font-bold mb-3">{editingProduct.id && editingProduct.id > 100 ? "เพิ่มสินค้า" : "แก้ไขสินค้า"}</div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="md:col-span-2"><label className="text-[11px] font-semibold">ชื่อสินค้า</label><input className="input mt-1" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}/></div>
                    <div><label className="text-[11px] font-semibold">ราคา</label><input type="number" className="input mt-1" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}/></div>
                  </div>
                  <div className="flex gap-2 mt-3"><button className="btn-primary" onClick={() => { setEditingProduct(null); setAdminToast("บันทึกสินค้าแล้ว (Demo)"); setTimeout(() => setAdminToast(""), 1800); }}><Save size={14}/> บันทึก</button><button className="btn-ghost" onClick={() => setEditingProduct(null)}>ยกเลิก</button></div>
                </div>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {PRODUCTS.map((p) => (
                  <div key={p.id} className="card overflow-hidden">
                    <img src={p.images[0]} className="w-full h-[150px] object-cover border-b-2 border-[#0E0E0E]" />
                    <div className="p-3">
                      <div className="text-[12.5px] font-bold mb-1">{p.name}</div>
                      <div className="mono font-bold text-[14px] mb-1">฿{p.price.toLocaleString()}</div>
                      <div className="flex justify-between text-[11px] text-[#6E7066]"><span>ขายแล้ว {p.sold}</span><span>โควตา {p.limit}</span></div>
                      <div className="bar-track mt-2"><div className="bar-fill" style={{width: `${Math.min(100, p.sold / p.limit * 100)}%`}} /></div>
                      <button className="btn-ghost w-full mt-3" onClick={() => setEditingProduct({...p})}><Pencil size={13}/> แก้ไขสินค้า</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminSection === "customers" && (
            <div className="card overflow-hidden">
              <div className="p-4 border-b-2 border-[#0E0E0E]"><div className="text-[14px] font-bold">ลูกค้า</div><div className="text-[11px] text-[#6E7066]">ดูประวัติการซื้อและมูลค่าการสั่งซื้อ</div></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                  <thead className="bg-[#F4F4F0] border-b-2 border-[#0E0E0E]"><tr><th className="p-3 text-left text-[11px]">ลูกค้า</th><th className="p-3 text-left text-[11px]">เบอร์</th><th className="p-3 text-left text-[11px]">ออเดอร์</th><th className="p-3 text-left text-[11px]">ใช้จ่าย</th><th className="p-3 text-left text-[11px]">สมัครเมื่อ</th></tr></thead>
                  <tbody>{adminCustomers.map((c) => <tr key={c.id} className="border-b border-[#E5E6DE]"><td className="p-3 text-[12px] font-semibold">{c.name}</td><td className="p-3 mono text-[11px]">{c.phone}</td><td className="p-3 mono text-[12px]">{c.orders}</td><td className="p-3 mono text-[12px] font-bold">฿{c.spent.toLocaleString()}</td><td className="p-3 text-[11px] text-[#6E7066]">{c.joined}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          )}

          {adminSection === "coupons" && (
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="card p-5">
                <div className="text-[14px] font-bold mb-3">โปรโมชั่น / คูปอง</div>
                <div className="space-y-2">
                  {adminCoupons.map((c) => (
                    <div key={c.code} className="border-2 border-[#0E0E0E] p-3 flex items-center justify-between gap-2">
                      <div><div className="mono font-bold text-[12px]">{c.code}</div><div className="text-[11px] text-[#6E7066]">{c.type} {c.value} · ใช้แล้ว {c.used}/{c.limit}</div></div>
                      <div className="flex gap-1"><button className="btn-ghost !p-2" onClick={() => toggleCoupon(c.code)}>{c.active ? "เปิด" : "ปิด"}</button><button className="btn-ghost !p-2 !text-[#FF3B2F]" onClick={() => deleteCoupon(c.code)}><Trash2 size={13}/></button></div>
                    </div>
                  ))}
                </div>
                <button className="btn-primary mt-3" onClick={() => { setAdminCoupons([...adminCoupons, {code: `NEW${adminCoupons.length+1}`, type: "ส่วนลดบาท", value: 50, used: 0, limit: 100, active: true}]); }}><PlusCircle size={14}/> เพิ่มคูปอง</button>
              </div>
              <div className="card p-5">
                <div className="text-[14px] font-bold mb-2">สิ่งที่ตั้งค่าได้</div>
                <ul className="text-[12px] text-[#6E7066] space-y-2 list-disc pl-4">
                  <li>โค้ดส่วนลดและจำนวนสิทธิ์</li>
                  <li>ส่วนลดเป็นบาทหรือเปอร์เซ็นต์</li>
                  <li>เปิด/ปิดโปรโมชั่น</li>
                  <li>เตรียมต่อยอดเป็นวันหมดอายุและขั้นต่ำการสั่งซื้อ</li>
                </ul>
              </div>
            </div>
          )}

          {adminSection === "notifications" && (
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="card overflow-hidden">
                <div className="p-4 border-b-2 border-[#0E0E0E] flex items-center justify-between">
                  <div><div className="text-[14px] font-bold">ศูนย์แจ้งเตือน</div><div className="text-[11px] text-[#6E7066]">แจ้งเตือนสินค้าใหม่ ออเดอร์ และเหตุการณ์สำคัญ</div></div>
                  <span className="mono text-[11px]">{unreadNotifications} ยังไม่อ่าน</span>
                </div>
                <div>
                  {notifications.map((n) => (
                    <button key={n.id} onClick={() => markNotificationRead(n.id)} className={`w-full text-left p-4 border-b border-[#E5E6DE] flex gap-3 ${n.read ? "" : "bg-[#F4F4F0]"}`}>
                      <div className="w-8 h-8 border-2 border-[#0E0E0E] flex items-center justify-center shrink-0">
                        {n.type === "security" ? <ShieldCheck size={14}/> : n.type === "order" ? <ClipboardList size={14}/> : <Boxes size={14}/>}
                      </div>
                      <div className="min-w-0"><div className="text-[12px] font-bold">{n.title} {!n.read && <span className="inline-block w-2 h-2 rounded-full bg-[#D7FF1E] border border-[#0E0E0E] ml-1"/>}</div><div className="text-[11px] text-[#6E7066]">{n.body}</div><div className="text-[10px] text-[#9A9B92] mt-1">{n.time}</div></div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="card p-5">
                <div className="text-[14px] font-bold mb-1">ตั้งค่าการแจ้งเตือนสินค้าใหม่</div>
                <div className="text-[11px] text-[#6E7066] mb-4">เปิดไว้เพื่อให้ Admin เห็นทันทีเมื่อมีการเพิ่มสินค้า</div>
                <label className="flex items-center justify-between gap-3 p-3 border-2 border-[#0E0E0E]">
                  <span className="text-[12px] font-semibold">แจ้งเตือนเมื่อมีสินค้าใหม่</span>
                  <input type="checkbox" checked={notificationEnabled} onChange={(e) => setNotificationEnabled(e.target.checked)}/>
                </label>
                <button className="btn-primary mt-3" onClick={() => { if (notificationEnabled) addNotification("ทดสอบแจ้งเตือน", "ระบบแจ้งเตือนสินค้าใหม่ทำงานแล้ว", "product"); setAdminToast("ส่งการแจ้งเตือนทดสอบแล้ว"); setTimeout(() => setAdminToast(""), 1800); }}><Bell size={14}/> ทดสอบแจ้งเตือน</button>
              </div>
            </div>
          )}

          {adminSection === "security" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="card p-4"><div className="text-[11px] text-[#6E7066]">เหตุการณ์ล่าสุด</div><div className="mono text-[24px] font-bold">{securityLogs.length}</div></div>
                <div className="card p-4"><div className="text-[11px] text-[#6E7066]">ระดับสูง</div><div className="mono text-[24px] font-bold">{securityLogs.filter(x => x.severity === "high").length}</div></div>
                <div className="card p-4"><div className="text-[11px] text-[#6E7066]">ถูกบล็อก</div><div className="mono text-[24px] font-bold">{securityLogs.filter(x => x.blocked).length}</div></div>
                <div className="card p-4"><div className="text-[11px] text-[#6E7066]">2FA</div><div className="mono text-[24px] font-bold">{security2FA ? "ON" : "OFF"}</div></div>
              </div>

              <div className="card p-5">
                <div className="flex items-center gap-2 mb-1"><ShieldCheck size={16}/><div className="text-[14px] font-bold">การป้องกันระบบ</div></div>
                <div className="text-[11px] text-[#6E7066] mb-4">ตั้งค่าการป้องกันพื้นฐานสำหรับระบบหลังบ้าน</div>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    ["2FA สำหรับ Admin", security2FA, setSecurity2FA],
                    ["ล็อกบัญชีเมื่อเดารหัสผิด", securityLockout, setSecurityLockout],
                    ["Rate limit / ป้องกันคำขอถี่", securityRateLimit, setSecurityRateLimit],
                  ].map(([label, value, setter]) => (
                    <label key={label} className="border-2 border-[#0E0E0E] p-3 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold">{label}</span><input type="checkbox" checked={value} onChange={(e) => setter(e.target.checked)}/>
                    </label>
                  ))}
                </div>
              </div>

              <div className="card overflow-hidden">
                <div className="p-4 border-b-2 border-[#0E0E0E]">
                  <div className="text-[14px] font-bold">Security Audit Log</div>
                  <div className="text-[11px] text-[#6E7066]">เก็บเฉพาะข้อมูลที่จำเป็นต่อการตรวจสอบเหตุการณ์ เช่น IP, เวลา, ประเทศโดยประมาณ และเหตุการณ์ที่เกิดขึ้น</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[980px] text-left">
                    <thead className="bg-[#F4F4F0] border-b-2 border-[#0E0E0E]">
                      <tr><th className="p-3 text-[11px]">เวลา</th><th className="p-3 text-[11px]">IP</th><th className="p-3 text-[11px]">ประเทศ</th><th className="p-3 text-[11px]">เหตุการณ์</th><th className="p-3 text-[11px]">รายละเอียด</th><th className="p-3 text-[11px]">ระดับ</th><th className="p-3 text-[11px]">การจัดการ</th></tr>
                    </thead>
                    <tbody>
                      {securityLogs.map((log) => (
                        <tr key={log.id} className="border-b border-[#E5E6DE]">
                          <td className="p-3 mono text-[10px]">{log.time}</td>
                          <td className="p-3 mono text-[11px] font-bold">{log.ip}</td>
                          <td className="p-3 mono text-[11px]">{log.country}</td>
                          <td className="p-3 text-[11px] font-semibold">{log.action}</td>
                          <td className="p-3 text-[11px] text-[#6E7066]">{log.reason}</td>
                          <td className="p-3"><span className={`inline-flex px-2 py-1 border border-[#0E0E0E] text-[10px] font-bold ${log.severity === "high" ? "bg-[#FFB4AB]" : log.severity === "medium" ? "bg-[#FFF3CD]" : "bg-[#E7E7E2]"}`}>{log.severity.toUpperCase()}</span></td>
                          <td className="p-3">{log.blocked ? <span className="text-[10px] font-bold">BLOCKED</span> : <button className="btn-ghost !py-1.5" onClick={() => blockSecurityIp(log.id)}>บล็อก IP</button>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card p-4 bg-[#F4F4F0]">
                <div className="text-[11px] font-bold mb-1">หมายเหตุด้านความปลอดภัย</div>
                <div className="text-[10.5px] text-[#6E7066]">
                  IP ที่แสดงในตัวอย่างเป็นข้อมูลจำลอง ระบบจริงควรบันทึกจาก Server-side log และจำกัดสิทธิ์ผู้ที่ดูข้อมูลนี้
                  พร้อมกำหนดระยะเวลาเก็บข้อมูลและปฏิบัติตามกฎหมาย/นโยบายความเป็นส่วนตัวที่เกี่ยวข้อง
                </div>
              </div>
            </div>
          )}

          {adminSection === "settings" && (
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4"><Store size={16}/><div><div className="text-[14px] font-bold">ข้อมูลร้าน</div><div className="text-[11px] text-[#6E7066]">แก้ข้อความที่แสดงบนหน้าร้าน</div></div></div>
                <div className="grid gap-3">
                  {[
                    ["storeName", "ชื่อร้าน"], ["tagline", "ข้อความหลัก"], ["announcement", "ประกาศหน้าร้าน"],
                    ["phone", "เบอร์ติดต่อ"], ["line", "LINE / ช่องทางติดต่อ"], ["footerText", "ข้อความท้ายเว็บ"]
                  ].map(([key, label]) => <div key={key}><label className="text-[11px] font-semibold">{label}</label><input className="input mt-1" value={storeSettings[key]} onChange={(e) => setStoreSettings({...storeSettings, [key]: e.target.value})}/></div>)}
                </div>
              </div>

              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4"><CreditCard size={16}/><div><div className="text-[14px] font-bold">การชำระเงินและจัดส่ง</div><div className="text-[11px] text-[#6E7066]">ตั้งค่าตัวเลขที่ใช้คำนวณหน้าชำระเงิน</div></div></div>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    ["shipping", "ค่าส่งปกติ"], ["freeShipping", "ส่งฟรีเมื่อครบ"],
                    ["bankName", "ธนาคาร"], ["accountName", "ชื่อบัญชี"], ["accountNo", "เลขบัญชี"], ["promptpay", "PromptPay"]
                  ].map(([key, label]) => <div key={key}><label className="text-[11px] font-semibold">{label}</label><input className="input mt-1" value={storeSettings[key]} onChange={(e) => setStoreSettings({...storeSettings, [key]: e.target.value})}/></div>)}
                </div>
              </div>

              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4"><Palette size={16}/><div><div className="text-[14px] font-bold">หน้าตาและโหมดร้าน</div><div className="text-[11px] text-[#6E7066]">เตรียมไว้สำหรับปรับธีมจากหลังบ้าน</div></div></div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div><label className="text-[11px] font-semibold">สีหลัก</label><input className="input mt-1" value={storeSettings.primaryColor} onChange={(e) => setStoreSettings({...storeSettings, primaryColor: e.target.value})}/></div>
                  <div><label className="text-[11px] font-semibold">สีเข้ม</label><input className="input mt-1" value={storeSettings.accentColor} onChange={(e) => setStoreSettings({...storeSettings, accentColor: e.target.value})}/></div>
                </div>
                <label className="flex items-center gap-2 mt-4 text-[12px] font-semibold"><input type="checkbox" checked={storeSettings.maintenance} onChange={(e) => setStoreSettings({...storeSettings, maintenance: e.target.checked})}/> เปิดโหมดปรับปรุงร้าน</label>
              </div>

              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4"><ShieldCheck size={16}/><div><div className="text-[14px] font-bold">ความปลอดภัยและความน่าเชื่อถือ</div><div className="text-[11px] text-[#6E7066]">สิ่งที่ควรเชื่อมต่อก่อนเปิดขายจริง</div></div></div>
                <div className="space-y-2 text-[12px] text-[#6E7066]">
                  <div className="p-3 border-2 border-[#0E0E0E]">✓ Authentication ฝั่ง Server</div>
                  <div className="p-3 border-2 border-[#0E0E0E]">✓ Database สำหรับออเดอร์/ลูกค้า</div>
                  <div className="p-3 border-2 border-[#0E0E0E]">✓ Cloud storage สำหรับสลิป</div>
                  <div className="p-3 border-2 border-[#0E0E0E]">✓ HTTPS + validation + audit log</div>
                </div>
              </div>

              <div className="lg:col-span-2 flex gap-2">
                <button className="btn-primary" onClick={saveStoreSettings}><Save size={14}/> บันทึกทุกการตั้งค่า</button>
                <button className="btn-ghost" onClick={() => { setStoreSettings(DEFAULT_STORE_SETTINGS); setAdminToast("คืนค่าเริ่มต้นแล้ว"); setTimeout(() => setAdminToast(""), 1800); }}><RefreshCw size={14}/> คืนค่าเริ่มต้น</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ORDERS */}
      {view === "orders" && (
        <div className="p-6">
          <div className="section-head flex items-baseline gap-2 mb-4">
            <span className="eyebrow">ประวัติ /</span>
            <h2 className="text-[19px] font-bold">ออเดอร์ของฉัน</h2>
          </div>
          {!user ? (
            <div className="card p-8 text-center">
              <Package size={26} className="mx-auto mb-2 text-[#6E7066]" />
              <div className="text-[14px] font-semibold mb-1">เข้าสู่ระบบเพื่อดูออเดอร์ของคุณ</div>
              <button className="btn-primary mt-2 mx-auto" onClick={() => setShowLogin(true)}><LogIn size={14} /> เข้าสู่ระบบ</button>
            </div>
          ) : (
            <div className="card overflow-hidden">
              {myOrders.map((o, i) => (
                <div key={o.id} className={`flex items-center justify-between p-4 ${i !== myOrders.length - 1 ? "border-b-2 border-[#E5E6DE]" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="mono text-[12px] font-bold text-[#6E7066]">{o.id}</span>
                    <span className="text-[13px] font-medium">{o.round}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="mono text-[12px]">฿{o.paid.toLocaleString()} / ฿{o.amount.toLocaleString()}</span>
                    <StatusPill status={o.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CHECKOUT ADDRESS */}
      {view === "checkout-address" && (
        <div className="p-6 max-w-[560px] mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <div className="step-badge step-badge-done"><Check size={13} /></div>
            <div className="h-[2px] w-8 bg-[#0E0E0E]" />
            <div className="step-badge" style={{ background: "#D7FF1E" }}>2</div>
            <div className="h-[2px] w-8 bg-[#C7C8C0]" />
            <div className="step-badge">3</div>
            <span className="text-[12px] text-[#6E7066] ml-2">ที่อยู่จัดส่ง</span>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4"><MapPin size={16} /><span className="text-[14px] font-bold">ที่อยู่สำหรับจัดส่ง</span></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2"><label className="text-[11px] font-semibold text-[#6E7066]">ชื่อ-นามสกุลผู้รับ</label><input className="input mt-1" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} placeholder="เช่น สมหญิง ใจดี" /></div>
              <div className="col-span-2"><label className="text-[11px] font-semibold text-[#6E7066]">เบอร์โทรศัพท์</label><input className="input mt-1" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} placeholder="08X-XXX-XXXX" /></div>
              <div className="col-span-2"><label className="text-[11px] font-semibold text-[#6E7066]">ที่อยู่ (บ้านเลขที่ ถนน ซอย)</label><textarea className="input mt-1" rows={2} value={address.line} onChange={(e) => setAddress({ ...address, line: e.target.value })} placeholder="เลขที่ 12/3 ถนน..." /></div>
              <div><label className="text-[11px] font-semibold text-[#6E7066]">ตำบล/แขวง</label><input className="input mt-1" value={address.subdistrict} onChange={(e) => setAddress({ ...address, subdistrict: e.target.value })} /></div>
              <div><label className="text-[11px] font-semibold text-[#6E7066]">อำเภอ/เขต</label><input className="input mt-1" value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} /></div>
              <div><label className="text-[11px] font-semibold text-[#6E7066]">จังหวัด</label><input className="input mt-1" value={address.province} onChange={(e) => setAddress({ ...address, province: e.target.value })} /></div>
              <div><label className="text-[11px] font-semibold text-[#6E7066]">รหัสไปรษณีย์</label><input className="input mt-1" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} /></div>
            </div>
            <div className="flex gap-2 mt-5">
              <button className="btn-ghost" onClick={() => setView("home")}>ย้อนกลับ</button>
              <button className="btn-primary flex-1" onClick={submitAddress}>ไปหน้าชำระเงิน <ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT PAYMENT */}
      {view === "checkout-payment" && (
        <div className="p-6 max-w-[560px] mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <div className="step-badge step-badge-done"><Check size={13} /></div>
            <div className="h-[2px] w-8 bg-[#0E0E0E]" />
            <div className="step-badge step-badge-done"><Check size={13} /></div>
            <div className="h-[2px] w-8 bg-[#0E0E0E]" />
            <div className="step-badge" style={{ background: "#D7FF1E" }}>3</div>
            <span className="text-[12px] text-[#6E7066] ml-2">ชำระเงิน</span>
          </div>

          <div className="card p-4 mb-4">
            <div className="text-[13px] font-bold mb-2.5">สรุปยอดสั่งซื้อ</div>
            {cart.length === 0 ? (
              <div className="text-[12px] text-[#6E7066]">ไม่มีสินค้าในตะกร้า</div>
            ) : cart.map((c) => (
              <div key={c.key} className="flex justify-between text-[12.5px] py-1.5 border-b border-[#E5E6DE] last:border-0">
                <span>{c.name} <span className="text-[#6E7066]">({c.variantLabel}) x{c.qty}</span></span>
                <span className="mono">฿{(c.price * c.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between text-[12.5px] pt-2 text-[#6E7066]"><span>ค่าจัดส่ง</span><span className="mono">฿{shipping}</span></div>
            <div className="flex justify-between text-[15px] font-bold pt-2 mt-1 border-t-2 border-[#0E0E0E]"><span>ยอดรวม</span><span className="mono">฿{grandTotal.toLocaleString()}</span></div>
          </div>

          <div className="card p-4 mb-4">
            <div className="text-[13px] font-bold mb-3">โอนเงินผ่านบัญชีธนาคาร</div>
            <div className="bg-[#0E0E0E] text-[#F4F4F0] rounded-sm p-3.5 mb-2">
              <div className="text-[11px] text-[#B8B9AF] mb-0.5">{BANK_INFO.bank}</div>
              <div className="text-[13px] font-semibold mb-2">{BANK_INFO.accName}</div>
              <div className="flex items-center justify-between">
                <span className="mono text-[17px] font-bold text-[#D7FF1E]">{BANK_INFO.accNo}</span>
                <button onClick={copyAcc} className="flex items-center gap-1 text-[11px] font-semibold bg-[#F4F4F0] text-[#0E0E0E] px-2.5 py-1.5 rounded-sm">
                  <Copy size={12} /> {copied ? "คัดลอกแล้ว" : "คัดลอก"}
                </button>
              </div>
            </div>
            <div className="text-[11.5px] text-[#6E7066]">หรือสแกน PromptPay เบอร์ {BANK_INFO.promptpay}</div>
            <div className="w-[110px] h-[110px] mx-auto mt-2.5 border-2 border-[#0E0E0E] rounded-sm flex flex-col items-center justify-center gap-1 bg-[repeating-linear-gradient(45deg,#0E0E0E_0,#0E0E0E_2px,transparent_2px,transparent_9px)]">
              <div className="bg-[#F4F4F0] px-2 py-1 text-[9px] font-bold mono">PromptPay QR</div>
            </div>
          </div>

          <div className="card p-4 mb-4">
            <div className="text-[13px] font-bold mb-3">แนบสลิปการโอนเงิน</div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => setSlipFile(e.target.files?.[0] || null)} />
            {slipFile ? (
              <div className="flex items-center justify-between border-2 border-[#0E0E0E] rounded-sm p-3">
                <div className="flex items-center gap-2 text-[12.5px] font-medium"><ImageIcon size={15} /> {slipFile.name}</div>
                <button className="text-[#FF3B2F]" onClick={() => setSlipFile(null)}><X size={16} /></button>
              </div>
            ) : (
              <div className="dropzone" onClick={() => fileRef.current?.click()}>
                <Upload size={20} className="mx-auto mb-1.5 text-[#6E7066]" />
                <div className="text-[12.5px] font-semibold">แตะเพื่ออัปโหลดรูปสลิป</div>
                <div className="text-[11px] text-[#6E7066] mt-0.5">รองรับไฟล์ JPG, PNG</div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button className="btn-ghost" onClick={() => setView("checkout-address")}>ย้อนกลับ</button>
            <button className="btn-primary flex-1" disabled={!slipFile || cart.length === 0} onClick={confirmPayment}>ยืนยันการชำระเงิน <ArrowRight size={14} /></button>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {view === "success" && (
        <div className="p-10 max-w-[440px] mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[#D7FF1E] border-2 border-[#0E0E0E] flex items-center justify-center mx-auto mb-4">
            <CircleCheck size={30} />
          </div>
          <div className="text-[19px] font-bold mb-1.5">สั่งซื้อสำเร็จแล้ว</div>
          <div className="text-[13px] text-[#6E7066] mb-4">แอดมินกำลังตรวจสอบสลิปของคุณ เลขที่ออเดอร์คือ</div>
          <div className="mono text-[20px] font-bold bg-[#0E0E0E] text-[#D7FF1E] py-2.5 rounded-sm mb-6">{lastOrderId}</div>
          <div className="flex gap-2">
            <button className="btn-ghost flex-1" onClick={() => setView("home")}>กลับหน้าร้าน</button>
            <button className="btn-primary flex-1" onClick={() => setView("orders")}><Truck size={14} /> ดูสถานะออเดอร์</button>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {activeProduct && (
        <div className="overlay" onClick={() => setActiveProduct(null)}>
          <div className="modal-wrap" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end p-2"><button onClick={() => setActiveProduct(null)}><X size={18} /></button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-2 pb-2">
              <Carousel images={activeProduct.images} idx={modalIdx} setIdx={setModalIdx} height={300} />
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <div className="text-[16px] font-bold leading-snug mb-1">{activeProduct.name}</div>
                  <div className="text-[12px] text-[#6E7066]">รอบ {activeProduct.roundNo} · ปิดรอบ {activeProduct.close} · ของถึง {activeProduct.arrival}</div>
                </div>
                <div className="mono font-bold text-[20px]">฿{activeProduct.price.toLocaleString()}</div>
                <div className="text-[12.5px] text-[#6E7066] leading-relaxed">{activeProduct.desc}</div>
                {activeProduct.variantGroups.map((g) => (
                  <div key={g.label}>
                    <div className="text-[12px] font-bold mb-1.5">{g.label}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {g.options.map((opt) => (
                        <span key={opt} className={`chip ${selectedVariants[g.label] === opt ? "chip-active" : ""}`} onClick={() => setSelectedVariants({ ...selectedVariants, [g.label]: opt })}>{opt}</span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[12px] font-semibold text-[#6E7066]">จำนวน</span>
                  <QtyStepper qty={modalQty} setQty={setModalQty} />
                </div>
                <button className="btn-primary mt-1" disabled={!canAddToCart} onClick={addToCart}>
                  <ShoppingBag size={14} /> {canAddToCart ? "เพิ่มลงตะกร้า" : "เลือกตัวเลือกให้ครบ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b-2 border-[#0E0E0E]">
              <div className="text-[15px] font-bold flex items-center gap-2"><ShoppingBag size={16} /> ตะกร้าของฉัน</div>
              <button onClick={() => setCartOpen(false)}><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center text-[13px] text-[#6E7066] pt-10">ยังไม่มีสินค้าในตะกร้า</div>
              ) : cart.map((c) => (
                <div key={c.key} className="flex gap-3 mb-3.5 pb-3.5 border-b border-[#E5E6DE] last:border-0">
                  <img src={c.image} className="w-16 h-16 object-cover border-2 border-[#0E0E0E] rounded-sm" />
                  <div className="flex-1">
                    <div className="text-[12.5px] font-semibold leading-snug">{c.name}</div>
                    <div className="text-[11px] text-[#6E7066] mb-1.5">{c.variantLabel}</div>
                    <div className="flex items-center justify-between">
                      <QtyStepper qty={c.qty} setQty={(v) => updateCartQty(c.key, v)} min={0} />
                      <span className="mono text-[12.5px] font-bold">฿{(c.price * c.qty).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t-2 border-[#0E0E0E]">
                <div className="flex justify-between text-[14px] font-bold mb-3"><span>ยอดรวม</span><span className="mono">฿{cartTotal.toLocaleString()}</span></div>
                <button className="btn-primary w-full" onClick={startCheckout}>ไปชำระเงิน <ArrowRight size={14} /></button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADMIN LOGIN MODAL */}
      {showAdminLogin && (
        <div className="overlay" onClick={() => setShowAdminLogin(false)}>
          <div className="login-wrap" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end p-2"><button onClick={() => setShowAdminLogin(false)}><X size={18}/></button></div>
            <div className="px-6 pb-6">
              <div className="w-10 h-10 border-2 border-[#0E0E0E] bg-[#D7FF1E] flex items-center justify-center mb-3"><ShieldCheck size={19}/></div>
              <div className="text-[17px] font-bold mb-1">เข้าสู่ระบบแอดมิน</div>
              <div className="text-[12px] text-[#6E7066] mb-4">สำหรับผู้ดูแลร้านเท่านั้น</div>
              <label className="text-[11px] font-semibold text-[#6E7066]">ชื่อผู้ใช้</label>
              <input className="input mt-1 mb-3" value={adminUser} onChange={(e) => setAdminUser(e.target.value)} placeholder="Admin username"/>
              <label className="text-[11px] font-semibold text-[#6E7066]">รหัสผ่าน</label>
              <input type="password" className="input mt-1 mb-4" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} placeholder="••••••••"/>
              <button className="btn-primary w-full" onClick={adminLogin}><LogIn size={14}/> เข้าสู่ระบบหลังร้าน</button>
              <div className="mt-3 p-2.5 bg-[#F4F4F0] border border-[#C7C8C0] text-[10.5px] text-[#6E7066]">
                Demo: <b>admin</b> / <b>admin123</b> — ต้องเปลี่ยนเป็นระบบยืนยันตัวตนจริงก่อนใช้งานจริง
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="overlay" onClick={() => setShowLogin(false)}>
          <div className="login-wrap" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end p-2"><button onClick={() => setShowLogin(false)}><X size={18} /></button></div>
            <div className="px-6 pb-6">
              <div className="text-[17px] font-bold mb-1">เข้าสู่ระบบ</div>
              <div className="text-[12px] text-[#6E7066] mb-4">เข้าสู่ระบบเพื่อสั่งซื้อและติดตามออเดอร์ของคุณ</div>
              <label className="text-[11px] font-semibold text-[#6E7066]">เบอร์โทรศัพท์</label>
              <input className="input mt-1 mb-3" value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} placeholder="08X-XXX-XXXX" />
              <label className="text-[11px] font-semibold text-[#6E7066]">รหัสผ่าน</label>
              <input type="password" className="input mt-1 mb-4" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="••••••••" />
              <button className="btn-primary w-full" onClick={doLogin}><LogIn size={14} /> เข้าสู่ระบบ</button>
              <div className="text-center text-[11.5px] text-[#6E7066] mt-3">ยังไม่มีบัญชี? <span className="font-semibold text-[#0E0E0E] cursor-pointer">สมัครสมาชิก</span></div>
            </div>
          </div>
        </div>
      )}

      {adminToast && (
        <div className="fixed bottom-5 right-5 z-[100] bg-[#0E0E0E] text-[#F4F4F0] border-2 border-[#D7FF1E] px-4 py-3 shadow-lg text-[12px] font-semibold">
          <span className="text-[#D7FF1E] mr-1">✓</span>{adminToast}
        </div>
      )}
    </div>
  );
}
