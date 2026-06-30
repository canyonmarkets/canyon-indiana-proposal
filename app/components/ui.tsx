import type { Tag as TagType } from '@/app/data/proposal';

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="reveal max-w-3xl">
      <p className="eyebrow text-ember-500">{eyebrow}</p>
      <h2 className="display mt-4 text-4xl font-bold leading-tight text-steel-50 sm:text-5xl">{title}</h2>
      {sub && <p className="mt-5 text-lg leading-relaxed text-steel-300">{sub}</p>}
    </div>
  );
}

export function Tag({ tag }: { tag: TagType }) {
  if (tag === 'live') {
    return (
      <span className="tag tag-live">
        <span className="livedot" /> Shipped &amp; running
      </span>
    );
  }
  return <span className="tag tag-proposed">Proposed for this contract</span>;
}
