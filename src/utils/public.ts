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

function extractArrayPayload(value: unknown): unknown[] | null {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return null;

  const record = value as Record<string, unknown>;
  for (const key of ["response_data", "data", "pages", "items", "results"]) {
    const candidate = record[key];
    if (Array.isArray(candidate)) return candidate;
    const nested = extractArrayPayload(candidate);
    if (nested) return nested;
  }

  return null;
}

function extractObjectPayload(value: unknown, keys: string[]): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if ("slug" in record || "page_title" in record) return record;

  for (const key of keys) {
    const nested = extractObjectPayload(record[key], keys);
    if (nested) return nested;
  }

  return null;
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
    const response = await api<ApiEnvelope<unknown>>(endpoints.getPages);
    const payload = getResponseData(response) ?? response;
    const pages = extractArrayPayload(payload);
    return (pages ?? []).filter(
      (page): page is PageItem =>
        !!page && typeof page === "object" && typeof (page as PageItem).slug === "string",
    );
  } catch {
    return [];
  }
}

export async function fetchPageDetails(slug: string): Promise<PageDetail | null> {
  try {
    const response = await api<ApiEnvelope<unknown>>(endpoints.getPageDetails, {
      params: { slug },
    });
    const payload = getResponseData(response) ?? response;
    return extractObjectPayload(payload, ["response_data", "data", "page", "item"]) as PageDetail | null;
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
