interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalPageProps {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <main className="min-h-[55vh] bg-[#f7f9f6] px-4 py-10 sm:px-8 sm:py-14 md:px-16 md:py-20">
      <article className="mx-auto max-w-4xl rounded-3xl border border-[#e5ebe5] bg-white p-6 shadow-sm sm:p-10 md:p-14">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink">Vitazan · Placeholder content</p>
        <h1 className="mt-3 font-display text-3xl text-[#123f38] sm:text-4xl md:text-5xl">{title}</h1>
        <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
          Sample content for page layout and navigation only. This placeholder has not been reviewed or approved as official company policy.
        </p>
        <p className="mt-7 text-base leading-7 text-gray-600">{intro}</p>

        <div className="mt-10 space-y-8">
          {sections.map((section, index) => (
            <section key={section.title} className="border-t border-gray-100 pt-6">
              <h2 className="font-display text-xl text-[#123f38] sm:text-2xl">
                <span className="mr-3 text-sm font-semibold text-pink">{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-gray-600 sm:text-base">{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
