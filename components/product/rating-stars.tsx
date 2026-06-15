export function RatingStars({ count = "الدفع عند الاستلام • تأكيد الطلب بالهاتف" }: { count?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-brand-muted">
      <span>{count}</span>
    </div>
  );
}
