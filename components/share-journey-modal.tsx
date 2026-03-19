"use client";

import { useEffect, useRef } from "react";
import { Download, Share2, X } from "lucide-react";
import type { Snapshot } from "@/lib/vaulted";

// ─── Canvas drawing ───────────────────────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawShareCard(canvas: HTMLCanvasElement, snapshots: Snapshot[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const W = 1200;
  const H = 630;
  canvas.width = W;
  canvas.height = H;

  // ── Background ───────────────────────────────────────────────────────────
  ctx.fillStyle = "#07110d";
  ctx.fillRect(0, 0, W, H);

  // Top-left radial emerald glow
  const grd1 = ctx.createRadialGradient(280, 80, 0, 280, 80, 520);
  grd1.addColorStop(0, "rgba(16,185,129,0.20)");
  grd1.addColorStop(1, "rgba(16,185,129,0)");
  ctx.fillStyle = grd1;
  ctx.fillRect(0, 0, W, H);

  // Bottom-right subtle glow
  const grd2 = ctx.createRadialGradient(1000, 570, 0, 1000, 570, 380);
  grd2.addColorStop(0, "rgba(16,185,129,0.07)");
  grd2.addColorStop(1, "rgba(16,185,129,0)");
  ctx.fillStyle = grd2;
  ctx.fillRect(0, 0, W, H);

  // ── Badge pill ───────────────────────────────────────────────────────────
  const badgeLabel = "🔒  PRIVACY-FIRST NET WORTH TRACKER";
  ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
  const badgeTextW = ctx.measureText(badgeLabel).width;
  const badgeW = badgeTextW + 32;
  const bx = 60;
  const by = 46;
  const bh = 28;

  roundRect(ctx, bx, by, badgeW, bh, 14);
  ctx.fillStyle = "rgba(52,211,153,0.12)";
  ctx.fill();
  ctx.strokeStyle = "rgba(52,211,153,0.28)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#6ee7b7";
  ctx.fillText(badgeLabel, bx + 16, by + 18);

  // ── Headline ─────────────────────────────────────────────────────────────
  ctx.font = "bold 64px -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
  ctx.fillStyle = "#f8fafc";
  ctx.fillText("My net worth journey", 60, 158);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const sorted = [...snapshots].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const rawPct =
    first.netWorthUSD !== 0
      ? ((last.netWorthUSD - first.netWorthUSD) / Math.abs(first.netWorthUSD)) * 100
      : last.netWorthUSD > 0
        ? 100
        : 0;

  // Cap display at ±9999%
  const displayPct = Math.max(-9999, Math.min(9999, rawPct));
  const isPositive = displayPct >= 0;
  const pctText = `${isPositive ? "+" : ""}${displayPct % 1 === 0 ? displayPct.toFixed(0) : displayPct.toFixed(1)}%`;

  const msPerMonth = 1000 * 60 * 60 * 24 * 30.44;
  const monthsDiff = Math.max(
    1,
    Math.round(
      (new Date(last.date).getTime() - new Date(first.date).getTime()) / msPerMonth,
    ),
  );

  const durationText =
    monthsDiff === 1
      ? "in 1 month"
      : monthsDiff < 24
        ? `in ${monthsDiff} months`
        : `in ${Math.round(monthsDiff / 12)} years`;

  // Big percentage
  ctx.font = "bold 100px -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
  ctx.fillStyle = isPositive ? "#34d399" : "#fb7185";
  ctx.fillText(pctText, 60, 278);

  // Duration label
  ctx.font = "500 36px -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText(durationText, 62, 328);

  // ── Trend line ────────────────────────────────────────────────────────────
  const chartX = 60;
  const chartY = 380;
  const chartW = 600;
  const chartH = 155;

  const values = sorted.map((s) => s.netWorthUSD);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const valRange = maxVal === minVal ? 1 : maxVal - minVal;
  // Add 8% padding top & bottom so line isn't clipped at edge
  const pad = valRange * 0.12;

  const pts = values.map((v, i) => ({
    x: chartX + (i / (values.length <= 1 ? 1 : values.length - 1)) * chartW,
    y: chartY + chartH - ((v - (minVal - pad)) / (valRange + pad * 2)) * chartH,
  }));

  // Area gradient fill
  const areaGrd = ctx.createLinearGradient(0, chartY, 0, chartY + chartH);
  areaGrd.addColorStop(0, "rgba(16,185,129,0.32)");
  areaGrd.addColorStop(1, "rgba(16,185,129,0.02)");

  ctx.beginPath();
  ctx.moveTo(pts[0].x, chartY + chartH);
  ctx.lineTo(pts[0].x, pts[0].y);

  if (pts.length === 1) {
    ctx.lineTo(pts[0].x + chartW, pts[0].y);
    ctx.lineTo(pts[0].x + chartW, chartY + chartH);
  } else {
    for (let i = 1; i < pts.length; i++) {
      const cx = (pts[i - 1].x + pts[i].x) / 2;
      ctx.bezierCurveTo(cx, pts[i - 1].y, cx, pts[i].y, pts[i].x, pts[i].y);
    }
    ctx.lineTo(pts[pts.length - 1].x, chartY + chartH);
  }

  ctx.closePath();
  ctx.fillStyle = areaGrd;
  ctx.fill();

  // Stroke line
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);

  if (pts.length > 1) {
    for (let i = 1; i < pts.length; i++) {
      const cx = (pts[i - 1].x + pts[i].x) / 2;
      ctx.bezierCurveTo(cx, pts[i - 1].y, cx, pts[i].y, pts[i].x, pts[i].y);
    }
  }

  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 3.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  // Dot at end of line
  const endPt = pts[pts.length - 1];
  // Outer glow ring
  ctx.beginPath();
  ctx.arc(endPt.x, endPt.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(52,211,153,0.22)";
  ctx.fill();
  // Inner dot
  ctx.beginPath();
  ctx.arc(endPt.x, endPt.y, 5.5, 0, Math.PI * 2);
  ctx.fillStyle = "#34d399";
  ctx.fill();

  // Snapshot count (right-aligned, near chart)
  ctx.font = "500 20px -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
  ctx.fillStyle = "#334155";
  ctx.textAlign = "right";
  ctx.fillText(
    `${snapshots.length} snapshot${snapshots.length !== 1 ? "s" : ""}`,
    chartX + chartW,
    chartY - 10,
  );
  ctx.textAlign = "left";

  // ── Right-side card ───────────────────────────────────────────────────────
  // A subtle info panel on the right for whitespace balance
  const cardX = 730;
  const cardY = 200;
  const cardW = 410;
  const cardH = 300;

  roundRect(ctx, cardX, cardY, cardW, cardH, 24);
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Inside the card
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.fillText("GROWTH", cardX + 28, cardY + 44);

  ctx.font = "bold 64px -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
  ctx.fillStyle = isPositive ? "#34d399" : "#fb7185";
  ctx.fillText(pctText, cardX + 28, cardY + 116);

  ctx.font = "500 18px -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
  ctx.fillStyle = "#475569";
  ctx.fillText(durationText, cardX + 30, cardY + 148);

  // Divider inside card
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cardX + 28, cardY + 170);
  ctx.lineTo(cardX + cardW - 28, cardY + 170);
  ctx.stroke();

  // Snapshot info rows
  const rowY1 = cardY + 204;
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.fillText("Snapshots taken", cardX + 28, rowY1);
  ctx.textAlign = "right";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText(String(snapshots.length), cardX + cardW - 28, rowY1);
  ctx.textAlign = "left";

  const rowY2 = cardY + 234;
  ctx.fillStyle = "#64748b";
  const dateOptions: Intl.DateTimeFormatOptions = { month: "short", year: "numeric" };
  const firstLabel = new Intl.DateTimeFormat(undefined, dateOptions).format(new Date(first.date));
  const lastLabel = new Intl.DateTimeFormat(undefined, dateOptions).format(new Date(last.date));
  ctx.fillText("Period", cardX + 28, rowY2);
  ctx.textAlign = "right";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText(`${firstLabel} → ${lastLabel}`, cardX + cardW - 28, rowY2);
  ctx.textAlign = "left";

  const rowY3 = cardY + 264;
  ctx.fillStyle = "#64748b";
  ctx.fillText("Amounts hidden", cardX + 28, rowY3);
  ctx.textAlign = "right";
  ctx.fillStyle = "#34d399";
  ctx.fillText("Privacy-first 🔒", cardX + cardW - 28, rowY3);
  ctx.textAlign = "left";

  // ── Bottom watermark ──────────────────────────────────────────────────────
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, H - 64);
  ctx.lineTo(W - 60, H - 64);
  ctx.stroke();

  ctx.font = "500 20px -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif";
  ctx.fillStyle = "#475569";
  ctx.fillText("Tracked privately with Vaulted", 60, H - 34);

  ctx.textAlign = "right";
  ctx.fillStyle = "#34d399";
  ctx.fillText("vaultedworth.com", W - 60, H - 34);
  ctx.textAlign = "left";
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ShareJourneyModalProps {
  dark: boolean;
  snapshots: Snapshot[];
  onClose: () => void;
}

export function ShareJourneyModal({
  dark,
  snapshots,
  onClose,
}: ShareJourneyModalProps) {
  const fullCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const hasEnoughSnapshots = snapshots.length >= 2;

  useEffect(() => {
    if (!hasEnoughSnapshots) return;
    const full = fullCanvasRef.current;
    const preview = previewCanvasRef.current;
    if (!full || !preview) return;

    drawShareCard(full, snapshots);

    // Scale down to preview
    const pCtx = preview.getContext("2d");
    if (!pCtx) return;
    pCtx.clearRect(0, 0, preview.width, preview.height);
    pCtx.drawImage(full, 0, 0, preview.width, preview.height);
  }, [hasEnoughSnapshots, snapshots]);

  const handleDownload = () => {
    const full = fullCanvasRef.current;
    if (!full) return;
    const url = full.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "vaulted-journey.png";
    link.click();
  };

  const panelCls = dark
    ? "rounded-3xl border border-white/8 bg-[#07110d] shadow-[0_20px_70px_rgba(0,0,0,0.5)] w-full max-w-2xl overflow-hidden"
    : "rounded-3xl border border-emerald-100 bg-white shadow-[0_20px_60px_rgba(16,185,129,0.08)] w-full max-w-2xl overflow-hidden";

  const headerBorderCls = dark ? "border-white/10" : "border-slate-100";
  const subTextCls = dark ? "text-slate-400" : "text-slate-500";
  const closeBtnCls = dark
    ? "rounded-2xl p-2 transition hover:bg-white/10 text-slate-400 hover:text-slate-100"
    : "rounded-2xl p-2 transition hover:bg-slate-100 text-slate-500 hover:text-slate-700";
  const emptyBgCls = dark ? "bg-white/5" : "bg-slate-50";
  const emptyTitleCls = dark ? "text-slate-200" : "text-slate-700";
  const cancelBtnCls = dark
    ? "inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
    : "inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className={panelCls}>
        {/* Header */}
        <div
          className={`flex items-center justify-between border-b px-5 py-4 ${headerBorderCls}`}
        >
          <div>
            <h2 className="text-lg font-semibold">Share your journey</h2>
            <p className={`text-sm ${subTextCls}`}>
              Your progress, without the numbers. Privacy-first.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close"
            className={closeBtnCls}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {hasEnoughSnapshots ? (
            <>
              {/* Hidden full-size canvas (1200×630) for download */}
              <canvas ref={fullCanvasRef} className="hidden" />

              {/* Visible preview (600×315) */}
              <canvas
                ref={previewCanvasRef}
                width={600}
                height={315}
                className="w-full rounded-2xl"
                style={{ imageRendering: "auto" }}
              />

              <p className={`mt-3 text-xs ${subTextCls}`}>
                Downloads at 1200×630 — perfect for Twitter, Instagram, or LinkedIn.
              </p>

              <div className="mt-4 flex justify-end gap-3">
                <button onClick={onClose} type="button" className={cancelBtnCls}>
                  Cancel
                </button>
                <button
                  onClick={handleDownload}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-400"
                >
                  <Download className="h-4 w-4" /> Download PNG
                </button>
              </div>
            </>
          ) : (
            <div className={`rounded-2xl p-10 text-center ${emptyBgCls}`}>
              <Share2
                className={`mx-auto mb-4 h-12 w-12 ${dark ? "text-slate-600" : "text-slate-300"}`}
              />
              <p className={`font-semibold ${emptyTitleCls}`}>Not enough data yet</p>
              <p className={`mt-2 text-sm ${subTextCls}`}>
                Take at least 2 monthly snapshots to share your journey.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
