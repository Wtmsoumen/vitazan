import { api, getResponseData, type ApiEnvelope } from "./api";
import { endpoints } from "./endpoints";

export interface NavLink {
  name: string;
  link: string;
}

export interface HeaderData {
  logo?: string | null;
  logo_url?: string | null;
  nav_links?: NavLink[];
  phone?: string | null;
  email?: string | null;
}

export interface FooterData {
  logo?: string | null;
  logo_url?: string | null;
  footer_logo?: string | null;
  footer_logo_url?: string | null;
  description?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  social_facebook?: string | null;
  social_twitter?: string | null;
  social_instagram?: string | null;
  social_linkedin?: string | null;
  footer_links?: { label: string; url: string }[];
}

export interface PageItem {
  id: number;
  page_name: string;
  page_title: string;
  slug: string;
  display_in: number;
  status: number;
  body?: string | null;
  meta_title?: string | null;
  meta_keyword?: string | null;
  meta_description?: string | null;
  menu_order?: number;
}

export interface PageSection {
  id: number;
  section_type: number;
  title?: string | null;
  sub_title?: string | null;
  body?: string | null;
  btn_text?: string | null;
  btn_url?: string | null;
  image?: string | null;
  image2?: string | null;
  image_url?: string | null;
  image2_url?: string | null;
}

export interface PageDetail extends PageItem {
  sections?: PageSection[];
}

export async function fetchHeader(): Promise<HeaderData | null> {
  try {
    const res: any = await api<ApiEnvelope<HeaderData>>(endpoints.getHeader);
    return res;
  } catch {
    return null;
  }
}

export async function fetchFooter(): Promise<FooterData | null> {
  try {
    const res: any = await api<ApiEnvelope<FooterData>>(endpoints.getFooter);
    return res;
  } catch {
    return null;
  }
}

export async function fetchPages(): Promise<PageItem[]> {
  try {
    const res: any = await api<ApiEnvelope<PageItem[]>>(endpoints.getPages);
    return res;
  } catch {
    return [];
  }
}

export async function fetchPageDetails(slug: string): Promise<PageDetail | null> {
  try {
    const res: any = await api<ApiEnvelope<PageDetail>>(endpoints.getPageDetails, {
      params: { slug },
    });
    return res;
  } catch {
    return null;
  }
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  image_url?: string | null;
}

export interface ProductExtra {
  id: number;
  product_id: number;
  type: number;
  title?: string | null;
  image?: string | null;
  image2?: string | null;
  body?: string | null;
  btn_url?: string | null;
  btn_text?: string | null;
  rank: number;
  status: number;
}

export interface ProductGallery {
  id: number;
  parent_id: number;
  file: string;
  type: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  body?: string | null;
  image?: string | null;
  image_url?: string | null;
  meta_title?: string | null;
  meta_keyword?: string | null;
  meta_description?: string | null;
  regular_price?: string | null;
  sale_price?: string | null;
  stock_quantity?: number;
  status?: number;
  category?: ProductCategory[];
  extra?: ProductExtra[];
  gallery?: ProductGallery[];
}

export interface PaginatedProducts {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: string | null;
  path: string;
  per_page: number;
  prev_page_url?: string | null;
  to: number;
  total: number;
}

export async function fetchProducts(params?: Record<string, string>): Promise<PaginatedProducts | null> {
  try {
    const res: any = await api<ApiEnvelope<PaginatedProducts>>(endpoints.getProducts, {
      params,
    });
    return res?.response_data || res;
  } catch {
    return null;
  }
}

export async function fetchProductDetails(slug: string): Promise<Product | null> {
  try {
    const res: any = await api<ApiEnvelope<Product>>(endpoints.getProductDetails, {
      params: { slug },
    });
    return res?.response_data || res;
  } catch {
    return null;
  }
}
