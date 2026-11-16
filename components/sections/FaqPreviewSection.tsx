import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { discoverBySlug } from "@/lib/discover";
import { pageContainer, sectionStackClass, sectionYClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function FaqPreviewSection() {
  const page = discoverBySlug("faqs");
  const lines = page?.lines ?? [];
  const questions: { question: string; answer: string }[] = [];
  for (let index = 0; index < lines.length - 1 && questions.length < 3; index += 1) {
    const line = lines[index];
    const next = lines[index + 1];
    if (line.endsWith("?") && next && !next.endsWith("?")) {
      questions.push({ question: line, answer: next });
    }
  }

  if (!questions.length) return null;

  return (
    <section
      aria-labelledby="faq-preview-heading"
      className={cn("border-b border-border", sectionYClass)}
    >
      <div className={pageContainer(sectionStackClass)}>
        <SectionHeader
          eyebrow="FAQs"
          title="A few answers before you order"
          subtitle="Shipping, returns, and product questions are collected in the help center."
          titleId="faq-preview-heading"
          action={
            <Link
              href="/faqs"
              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              All FAQs
            </Link>
          }
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {questions.map((block) => (
              <article key={block.question} className="surface-card h-full p-6">
                <h3 className="text-lg tracking-tight">{block.question}</h3>
                <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-muted-foreground">
                  {block.answer}
                </p>
              </article>
          ))}
        </div>
      </div>
    </section>
  );
}
