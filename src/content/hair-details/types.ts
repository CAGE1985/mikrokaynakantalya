export type HairDetail = {
  id: string;
  name: string;
  title: string;
  intro: string[];
  featuresTitle: string;
  features: { title: string; paragraphs: string[] }[];
  closingTitle: string;
  closing: string[];
};

export type HairDetails = {
  detailsLabel: string;
  closeLabel: string;
  groups: HairDetail[];
};
