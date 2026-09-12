export type Content = {
  meta: { title: string; description: string };
  nav: {
    results: string;
    method: string;
    process: string;
    care: string;
    price: string;
    faq: string;
    menu: string;
    close: string;
    language: string;
    home: string;
  };
  actions: {
    consult: string;
    calculate: string;
    book: string;
    whatsapp: string;
    call: string;
    directions: string;
    discover: string;
    allResults: string;
    mobileConsult: string;
    mobilePrice: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    note: string;
    photoCaption: string;
    details: [string, string, string];
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    before: string;
    after: string;
    photo: string;
    video: string;
    application: string;
    previous: string;
    next: string;
    open: string;
    close: string;
    note: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    lead: string;
    paragraphs: string[];
    points: { title: string; text: string }[];
  };
  planning: {
    eyebrow: string;
    title: string;
    description: string;
    weightsTitle: string;
    weightsNote: string;
    facts: { title: string; text: string }[];
    videoTitle: string;
    videoDescription: string;
  };
  suitability: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
    note: string;
  };
  hair: {
    eyebrow: string;
    title: string;
    description: string;
    groups: string[];
    note: string;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { title: string; text: string }[];
  };
  price: {
    eyebrow: string;
    title: string;
    description: string;
    factors: string[];
    note: string;
    calculatorLanguages: string;
  };
  care: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; text: string }[];
    renewalTitle: string;
    renewalText: string;
    videoTitle: string;
    videoDescription: string;
    videoNote: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    groups: { title: string; items: { q: string; a: string }[] }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    addressTitle: string;
    hoursTitle: string;
    hours: string;
    sunday: string;
    bookingNote: string;
  };
  footer: {
    tagline: string;
    brand: string;
    rights: string;
    source: string;
    backTop: string;
    social: string;
    privacy: string;
  };
  ui: {
    play: string;
    videoLanguage: string;
    videoUnsupported: string;
    skip: string;
    more: string;
    less: string;
    loading: string;
  };
};
