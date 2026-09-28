import Image from "next/image";

const testimonials = [
  {
    src: "/images/testimonials/wa-testimonial-1.png",
    alt: "رسالة واتساب من زبونة توصلات بالمنتج",
    width: 768,
    height: 718,
  },
  {
    src: "/images/testimonials/wa-testimonial-2.png",
    alt: "رسالة واتساب من زبون",
    width: 768,
    height: 718,
  },
  {
    src: "/images/testimonials/wa-testimonial-3.png",
    alt: "رسالة واتساب من زبونة",
    width: 768,
    height: 718,
  },
  {
    src: "/images/testimonials/wa-testimonial-4.png",
    alt: "محادثة مع زبون عاود طلب المنتج لخوه",
    width: 700,
    height: 1768,
  },
];

export function WhatsAppTestimonials() {
  return (
    <section id="wa-testimonials" className="container scroll-mt-24 py-8 sm:py-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-3 py-1 text-xs font-black text-[#128C7E] sm:text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-[#25D366]" aria-hidden />
          آراء حقيقية من زبائن VORLAY
        </p>
        <h2 className="mt-3 text-2xl font-black text-brand-ink sm:text-3xl">
          رسائل زبائن توصلو بالمنتج
        </h2>
      </div>

      <div className="mt-6 grid items-start gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((item) => (
          <div
            key={item.src}
            className={`overflow-hidden rounded-2xl border border-brand-primary/10 bg-white shadow-soft ${
              item.height > item.width ? "mx-auto w-full max-w-xs sm:max-w-none" : ""
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="h-auto w-full"
              quality={90}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
