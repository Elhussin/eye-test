import {
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { FiMail } from "react-icons/fi";



export const URLDATA = [
    { "path": "/", "name": "Home", },
    { "path": "/auth/login", "name": "Login", },
    { "path": "/auth/register", "name": "Register", },
    { "path": "/profile", "name": "Profile", },
    { "path": "/admin", "name": "Admin", },
    { "path": "/prescriptions", "name": "Prescriptions", },
    { "path": "/about", "name": "About", },
    { "path": "/contact", "name": "Contact", },
    { "path": "/users", "name": "Users", },
    { "path": "/tenants", "name": "Tenants", },
    { "path": "/groups", "name": "Groups", },
    { "path": "/crm", "name": "CRM", },
    { "path": "/products/supplier", "name": "Suppliers", },
  ]

export const navUrl=[
  {"path": "/", "name": "Home", },
  {"path": "/about", "name": "About", },
  {"path": "/contact", "name": "Contact", },
  {"path": "/privacy", "name": "Privacy", },
  {"path": "/terms", "name": "Terms", },
  {"path": "/faq", "name": "FAQ", },
  {"path": "/auth/register", "name": "Register", },  
]


export const socialLinks = [
  { url: "https://www.linkedin.com/in/elhusseini2023/", icon: FaLinkedin, name: "LinkedIn" },
  { url: "https://www.github.com/Elhussin/", icon: FaGithub, name: "GitHub" },
  { url: "https://wa.me/+966540919725", icon: FaWhatsapp, name: "WhatsApp" },
  { url: "https://www.facebook.com/hasin.taha/", icon: FaFacebook, name: "Facebook" },
  { url: "https://www.tiktok.com/", icon: FaTiktok, name: "TikTok" },
  { url: "https://www.youtube.com/@hussaintaha9184", icon: FaYoutube, name: "YouTube" },
  { url: "https://www.instagram.com/hasin.taha/", icon: FaInstagram, name: "Instagram" },
  { url: "https://www.twitter.com/Hasintaha/", icon: FaXTwitter, name: "X (Twitter)" },
  { url: "mailto:hasin3112@gmail.com", icon: FiMail, name: "Email" },
];

export const otherLinks = [
  { path: "/support", name: "Support" },
  { path: "/careers", name: "Careers" },
  { path: "/blog", name: "Blog" },
];

type MaterialKey = string

export const materials: Record<MaterialKey, { name: string; index: number; abbe: number; density: number }>  = {
    '1.49': { name: 'Hard Resin (CR-39)', index: 1.49, abbe: 58, density: 1.32 },
    '1.53': { name: 'Trivex', index: 1.53, abbe: 43, density: 1.11 },
    '1.56': { name: '1.56 Mid-Index', index: 1.56, abbe: 37 ,density: 1.25 },
    '1.59': { name: 'Polycarbonate', index: 1.59, abbe: 30, density: 1.20 },
    '1.60': { name: '1.60 Mid-Index', index: 1.60, abbe: 41, density: 1.32 }, 
    '1.67': { name: '1.67 Hi-Index', index: 1.67, abbe: 32, density: 1.35 }, 
    '1.70': { name: '1.70 Hi-Index', index: 1.70, abbe: 36, density: 1.40 }, 
    '1.74': { name: '1.74 Hi-Index', index: 1.74, abbe: 33, density: 1.47 }, 
    '1.76': { name: '1.76 Hi-Index', index: 1.76, abbe: 32, density: 1.47 }, 
    '1.50-glass': { name: 'Crown Glass', index: 1.52, abbe: 59, density: 2.54 }, 
    '1.60-glass': { name: '1.6 Glass', index: 1.60, abbe: 42, density: 2.68 }, 
    '1.70-glass': { name: '1.7 Glass', index: 1.70, abbe: 41, density: 2.97 }, 
    '1.80-glass': { name: '1.8 Glass', index: 1.80, abbe: 34, density: 3.60 }, 
    '1.90-glass': { name: '1.9 Lantal', index: 1.90, abbe: 31, density: 4.30 } 
};


export const categorizedMaterials = Object.entries(materials).reduce((acc, [key, value]) => {
    // تحديد نوع العدسة بناءً على المفتاح
    const category = key.includes('glass') ? 'Glass Lenses' : 'Plastic Lenses';
    
    // تنسيق النص للعرض
    const displayText = `${value.name} - ${value.index}`;
    
    // تجميع البيانات
    acc[category].push({ key , displayText });
    return acc;
}, { 'Plastic Lenses': [], 'Glass Lenses': [] } as any);