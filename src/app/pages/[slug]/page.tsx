import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPageDetails, fetchPages } from "@/utils/public";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages = await fetchPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchPageDetails(slug);
  if (!page) return {};
  return {
    title: page.meta_title || page.page_title,
    description: page.meta_description ?? undefined,
    keywords: page.meta_keyword ?? undefined,
  };
}

const UPLOAD_BASE = "https://vitazan.webtechnomind.in/public/uploads/";

function resolveUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) return url;
  return `${UPLOAD_BASE}${url}`;
}

export default async function PageDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = await fetchPageDetails(slug);
  if (!page || page.status === 0) notFound();

  return (
    <main className="mx-auto max-w-[1600px] px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[140px] py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-semibold text-black mb-8">{page.page_title}</h1>

      {page.body && (
        <div
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
      )}

      {page.sections && page.sections.length > 0 && (
        <div className="mt-12 space-y-16">
          {page.sections.map((section) => (
            <section key={section.id} className="flex flex-col md:flex-row gap-8 items-start">
              {resolveUrl(section.image_url || section.image) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolveUrl(section.image_url || section.image)!}
                  alt={section.title ?? ""}
                  className="w-full md:w-1/2 rounded-xl object-cover"
                />
              )}
              <div className="flex-1">
                {section.title && <h2 className="text-2xl font-semibold text-black mb-3">{section.title}</h2>}
                {section.sub_title && <p className="text-lg text-gray-600 mb-4">{section.sub_title}</p>}
                {section.body && (
                  <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.body }} />
                )}
                {resolveUrl(section.image2_url || section.image2) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resolveUrl(section.image2_url || section.image2)!}
                    alt={section.title ?? ""}
                    className="mt-4 w-full rounded-xl object-cover"
                  />
                )}
                {section.btn_text && section.btn_url && (
                  <a
                    href={section.btn_url}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-sm font-medium text-white hover:bg-teal/90"
                  >
                    {section.btn_text}
                  </a>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
