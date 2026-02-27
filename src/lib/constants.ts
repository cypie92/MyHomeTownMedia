export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { value: 12, suffix: "+", label: "Years of Proven Expertise" },
  { value: 30, suffix: "+", label: "Social Media Platforms Mastered" },
  { value: 3000, suffix: "+", label: "Satisfied Clients" },
  { value: 10000, suffix: "+", label: "High-Impact Campaigns Delivered" },
];

export const AIDA_STEPS = [
  {
    letter: "A",
    title: "Awareness",
    tagline: "What is this?",
    heading: "Content That Captivates",
    description:
      "High-impact photos, videos, reels, and short films designed to captivate viewers and spark interest in your brand.",
    formats: ["Photo", "Video", "Reel", "Short Film"],
  },
  {
    letter: "I",
    title: "Interest",
    tagline: "I'm curious to know more",
    heading: "Traffic & Awareness That Scales",
    description:
      "Leverage our powerful media platforms to reach millions across Malaysia — fast, targeted, and effective.",
    formats: ["Social Posts", "Live Streams", "Stories"],
  },
  {
    letter: "D",
    title: "Desire",
    tagline: "I want it",
    heading: "Leads & Engagement That Matter",
    description:
      "Boost interaction through tailored content, smart storytelling, and strategic calls-to-action that drive audience response.",
    formats: ["Campaigns", "CTAs", "Storytelling"],
  },
  {
    letter: "A",
    title: "Action",
    tagline: "I'm getting it",
    heading: "Turn Interest Into Impact",
    description:
      "Maximizing exposure and engagement — increasing the chances of measurable results that support your business goals.",
    formats: ["Conversions", "Walk-ins", "Registrations"],
  },
];

export const DIFFERENTIATORS = [
  {
    title: "Passionate Crew",
    description: "Content creators who never stop delivering — our team lives and breathes digital storytelling.",
    icon: "crew",
  },
  {
    title: "Instant Credibility",
    description: "An established, trusted audience ready to engage with your brand from day one.",
    icon: "credibility",
  },
  {
    title: "Fan Base & Community",
    description: "Your brand amplified by voices that matter — backed by 9 million followers across Malaysia.",
    icon: "community",
  },
];

export const TEAM_MEMBERS = [
  { name: "Jess", handle: "@jess.mhm", role: "Host", bio: "Energetic storyteller with a knack for going viral", image: "/hosts/1.png" },
  { name: "Emily", handle: "@emily.mhm", role: "Host", bio: "Brand voice specialist & on-camera natural", image: "/hosts/2.png" },
  { name: "Wei Kei", handle: "@weikei.mhm", role: "Host", bio: "Creative director of all things content", image: "/hosts/3.png" },
  { name: "Pika Pink", handle: "@pikapink.mhm", role: "Host", bio: "Live streaming queen across platforms", image: "/hosts/4.png" },
  { name: "Zi Qi", handle: "@ziqi.mhm", role: "Host", bio: "Turning brands into household names", image: "/hosts/5.png" },
  { name: "Ern Ern", handle: "@ernern.mhm", role: "Host", bio: "Master of short-form viral content", image: "/hosts/6.png" },
  { name: "Jia Xin", handle: "@jiaxin.mhm", role: "Host", bio: "Audience engagement & community builder", image: "/hosts/7.png" },
  { name: "Kar Sing", handle: "@karsing.mhm", role: "Host", bio: "The voice behind our biggest campaigns", image: "/hosts/8.png" },
  { name: "Kelvy", handle: "@kelvy.mhm", role: "Host", bio: "Bringing brands to life one reel at a time", image: "/hosts/9.png" },
  { name: "Yong Er", handle: "@yonger.mhm", role: "Host", bio: "Connecting brands with audiences", image: "/hosts/10.png" },
];

export interface StateData {
  name: string;
  nameMY: string;
  facebook: string | null;
  instagram: string | null;
}

export const STATES_DATA: Record<string, StateData> = {
  perlis: { name: "Perlis", nameMY: "玻璃市", facebook: "Perlis My Hometown 我来自玻璃市", instagram: null },
  kedah: { name: "Kedah", nameMY: "吉打", facebook: "Kedah My Hometown 我来自吉打", instagram: "Kedah My Hometown 我来自吉打" },
  penang: { name: "Penang", nameMY: "槟城", facebook: "Penang My Hometown 我来自槟城", instagram: "Penang My Hometown 我来自槟城" },
  perak: { name: "Perak", nameMY: "霹雳", facebook: "Perak My Hometown 我来自霹雳", instagram: "Perak My Hometown 我来自霹雳" },
  kelantan: { name: "Kelantan", nameMY: "吉兰丹", facebook: "Kelantan My Hometown 我来自吉兰丹", instagram: null },
  terengganu: { name: "Terengganu", nameMY: "登嘉楼", facebook: "Terengganu My Hometown 我来自登嘉楼", instagram: null },
  pahang: { name: "Pahang", nameMY: "彭亨", facebook: "Pahang My Hometown 我来自彭亨", instagram: null },
  selangor: { name: "Selangor", nameMY: "雪兰莪", facebook: "Selangor My Hometown 我来自雪兰莪", instagram: null },
  kl: { name: "Kuala Lumpur", nameMY: "吉隆坡", facebook: null, instagram: "KL My Hometown 我来自吉隆坡" },
  nSembilan: { name: "Negeri Sembilan", nameMY: "森美兰", facebook: "Negeri Sembilan My Hometown 我来自森美兰", instagram: null },
  melaka: { name: "Melaka", nameMY: "马六甲", facebook: "Melaka My Hometown 我来自马六甲", instagram: null },
  johor: { name: "Johor", nameMY: "柔佛", facebook: "Johor My Hometown 我来自柔佛", instagram: "Johor My Hometown 我来自柔佛" },
  sabah: { name: "Sabah", nameMY: "沙巴", facebook: "Sabah My Hometown 我来自沙巴", instagram: null },
  sarawak: { name: "Sarawak", nameMY: "砂拉越", facebook: "Sarawak My Hometown 我来自砂拉越", instagram: "Sarawak My Hometown 我来自砂拉越" },
};

export const NATIONAL_PAGES = [
  { platform: "facebook", name: "I'm Malaysian 我是马来西亚人" },
  { platform: "facebook", name: "LiveLah by My Hometown Media" },
  { platform: "instagram", name: "My Hometown Media" },
  { platform: "instagram", name: "I'm Malaysian 我是马来西亚人" },
  { platform: "tiktok", name: "My Hometown Media" },
  { platform: "tiktok", name: "My Hometown Media TikTok Shop" },
  { platform: "xhs", name: "My Hometown Media 小红书" },
  { platform: "xhs", name: "走遍马来西亚" },
];

export const CLIENT_LOGOS = [
  "Brand Partner 1",
  "Brand Partner 2",
  "Brand Partner 3",
  "Brand Partner 4",
  "Brand Partner 5",
  "Brand Partner 6",
  "Brand Partner 7",
  "Brand Partner 8",
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/my_hometown_media", icon: "instagram" },
  { label: "TikTok", href: "https://tiktok.com/@myhometownmediaofficial", icon: "tiktok" },
  { label: "Facebook", href: "https://facebook.com/ImMalaysianOnline", icon: "facebook" },
];

export const CONTACT_INFO = {
  whatsapp: "https://wa.me/60136688181",
  email: "marketing@mlbs.com.my",
  website: "www.mlbs.com.my",
  address: "G-01, The Leafz @ Sungai Besi, Jalan Hang Tuah 2, Taman Salak Selatan, 57100 Kuala Lumpur",
};
