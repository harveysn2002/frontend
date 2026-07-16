"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const STORAGE_KEY = "vorlay-offer-deadline";
const OFFER_MS = 48 * 60 * 60 * 1000;

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getDeadline(): number {
  if (typeof window === "undefined") return Date.now() + OFFER_MS;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  const now = Date.now();

  if (stored) {
    const deadline = Number(stored);
    if (Number.isFinite(deadline) && deadline > now) return deadline;
  }

  const next = now + OFFER_MS;
  window.localStorage.setItem(STORAGE_KEY, String(next));
  return next;
}

function calcLeft(deadline: number): TimeLeft {
  const diff = Math.max(0, deadline - Date.now());
  const totalSec = Math.floor(diff / 1000);
  return {
    hours: Math.floor(totalSec / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  };
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-[3.25rem] flex-col items-center sm:min-w-[3.75rem]">
      <span className="flex h-11 w-full items-center justify-center rounded-xl bg-[#1a2e2a] text-lg font-black tabular-nums text-[#E8C872] shadow-inner sm:h-12 sm:text-xl">
        {value}
      </span>
      <span className="mt-1 text-[10px] font-bold text-white/70 sm:text-[11px]">{label}</span>
    </div>
  );
}

export function OfferCountdown() {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const deadline = getDeadline();
    setLeft(calcLeft(deadline));

    const id = window.setInterval(() => {
      const next = calcLeft(deadline);
      if (next.hours === 0 && next.minutes === 0 && next.seconds === 0) {
        const refreshed = Date.now() + OFFER_MS;
        window.localStorage.setItem(STORAGE_KEY, String(refreshed));
        setLeft(calcLeft(refreshed));
        return;
      }
      setLeft(next);
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  if (!left) {
    return (
      <div className="mt-4 h-[5.5rem] animate-pulse rounded-2xl bg-gradient-to-l from-[#1a2e2a] to-[#1f3832]" />
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-l from-[#1a2e2a] via-[#1f3832] to-[#243f38] p-3.5 shadow-[0_10px_28px_rgba(26,46,42,0.28)] sm:p-4">
      <div className="flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8C872] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E8C872]" />
        </span>
        <p className="flex items-center gap-1.5 text-[12px] font-black text-[#E8C872] sm:text-sm">
          <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
          العرض الحالي كينتهي فـ:
        </p>
      </div>

      <div className="mt-3 flex items-end justify-center gap-2 sm:gap-2.5" dir="ltr">
        <TimeBlock value={pad(left.hours)} label="ساعة" />
        <span className="mb-5 text-lg font-black text-[#E8C872]/80">:</span>
        <TimeBlock value={pad(left.minutes)} label="دقيقة" />
        <span className="mb-5 text-lg font-black text-[#E8C872]/80">:</span>
        <TimeBlock value={pad(left.seconds)} label="ثانية" />
      </div>

      <p className="mt-2.5 text-center text-[10px] font-semibold text-white/55 sm:text-[11px]">
        الثمن الحالي محدود — بعد النهاية كيرجع الثمن العادي
      </p>
    </div>
  );
}
