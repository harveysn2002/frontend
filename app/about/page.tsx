import Link from "next/link";
import { Button } from "@/components/ui/button";
import { nicheCopy } from "@/config/niche-copy";

export const metadata = {
  title: nicheCopy.about.metaTitle,
};

export default function AboutPage() {
  const { about } = nicheCopy;

  return (
    <div className="container py-14">
      <section className="glass-card rounded-[3rem] p-8 md:p-12">
        <h1 className="text-5xl font-black">{about.heading}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-9 text-brand-muted">{about.body}</p>
      </section>
      <section className="mt-10 grid gap-5 md:grid-cols-4">
        {about.values.map((value) => (
          <div key={value} className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">{value}</h2>
            <p className="mt-3 text-brand-muted">{about.valueNote}</p>
          </div>
        ))}
      </section>
      <div className="mt-10">
        <Link href="/collections">
          <Button>شوف المجموعة</Button>
        </Link>
      </div>
    </div>
  );
}
