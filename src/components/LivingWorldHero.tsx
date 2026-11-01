import { useEffect, useRef, useState } from "react";
import { buildAurumDocument } from "../lib/aurum";
import { HERO_MARKUP } from "../lib/heroMarkup";
import "../shaders/threeui.css";

type LiquidMetalPayload = {
  liquidMetalButton?: {
    type?: string;
    source?: string;
  };
};

export function LivingWorldHero({ onBook }: { onBook: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [srcDoc] = useState<string>(() => buildAurumDocument(HERO_MARKUP));

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const frame = iframeRef.current;
      if (!frame || event.source !== frame.contentWindow) return;
      const data = event.data as LiquidMetalPayload | null;
      if (data?.liquidMetalButton?.type !== "activate") return;
      if (data.liquidMetalButton.source !== "explore") return;
      onBook();
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onBook]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <iframe
        ref={iframeRef}
        className="aurum-hero-frame"
        title="AURUM — A stay refined, after dark"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={srcDoc}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
