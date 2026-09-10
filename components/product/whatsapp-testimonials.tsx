import Image from "next/image";

const testimonials = [
  {
    src: "/images/testimonials/wa-testimonial-1.png",
    alt: "رسالة واتساب من زبونة توصلات بالمنتج",
    caption: "زبونة توصلات بالطلب — «شوية شكراً»",
  },
  {
    src: "/images/testimonials/wa-testimonial-2.png",
    alt: "رسالة واتساب: Oui + Merci",
    caption: "زبون توصل — «Oui / Merci»",
  },
  {
    src: "/images/testimonials/wa-testimonial-3.png",
    alt: "رسالة واتساب: مزيان، بعد التأقلم",
    caption: "زبونة توصلات — «اه مزيان شكراً»",
  },
];

export function WhatsAppTestimonials() {
  return (
    <section className="container py-8 sm:py-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-3 py-1 text-xs font-black text-[#128C7E] sm:text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-[#25D366]" aria-hidden />
          آراء حقيقية من زبائن VORLAY
        </p>
        <h2 className="mt-3 text-2xl font-black text-brand-ink sm:text-3xl">
          رسائل زبائن توصلو بالمنتج
        </h2>
        <p className="mt-2 text-sm text-brand-muted sm:text-base">
          صور مباشرة من محادثات واتساب — بلا أرقام ولا أسماء كاملة، غير باش تشوف الردود
          الحقيقية.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <figure
            key={item.src}
            className="overflow-hidden rounded-2xl border border-brand-primary/10 bg-white shadow-soft"
          >
            <div className="relative w-full">
              <Image
                src={item.src}
                alt={item.alt}
                width={768}
                height={718}
                className="h-auto w-full"
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <figcaption className="px-4 py-3 text-center text-xs font-bold text-brand-muted sm:text-sm">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
