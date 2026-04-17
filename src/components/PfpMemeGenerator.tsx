import { useState, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = "idle" | "uploaded" | "generating" | "done" | "error";

interface CostumePreset {
  id: string;
  label: string;
  emoji: string;
  prompt: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
 
const COSTUME_PRESETS: CostumePreset[] = [
  {
    id: "police",
    label: "Police Officer",
    emoji: "👮",
    prompt:
      "wearing a realistic police officer uniform with badge, tactical vest labeled POLICE, and a police cap, photorealistic, highly detailed costume, same subject, same background",
  },
  {
    id: "nasa",
    label: "NASA Astronaut",
    emoji: "🚀",
    prompt:
      "wearing a NASA white spacesuit with NASA logo patch, clear astronaut helmet, photorealistic, highly detailed costume, same subject, same background",
  },
  {
    id: "military",
    label: "Military General",
    emoji: "🎖️",
    prompt:
      "wearing a military general uniform with gold medals, epaulettes, and military cap, photorealistic, highly detailed costume, same subject, same background",
  },
  {
    id: "swat",
    label: "SWAT",
    emoji: "🛡️",
    prompt:
      "wearing full black SWAT tactical gear, helmet, vest labeled SWAT, photorealistic, highly detailed costume, same subject, same background",
  },
  {
    id: "firefighter",
    label: "Firefighter",
    emoji: "🔥",
    prompt:
      "wearing a firefighter uniform with yellow reflective stripes, red helmet, axe in hand, photorealistic, highly detailed costume, same subject, same background",
  },
  {
    id: "pilot",
    label: "Pilot",
    emoji: "✈️",
    prompt:
      "wearing a commercial airline pilot uniform, navy blazer with gold stripes, pilot cap, photorealistic, highly detailed costume, same subject, same background",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function generateWithFal(
  imageDataUrl: string,
  prompt: string,
  apiKey: string,
  strength: number
): Promise<string> {
  const response = await fetch(
    "https://fal.run/fal-ai/flux/dev/image-to-image",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${apiKey}`,
      },
      body: JSON.stringify({
        image_url: imageDataUrl,
        prompt,
        strength,
        num_images: 1,
        image_size: "square_hd",
        num_inference_steps: 28,
        guidance_scale: 3.5,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as { detail?: string })?.detail || `fal.ai error ${response.status}`);
  }

  const data = await response.json();
  const url = data?.images?.[0]?.url;
  if (!url) throw new Error("No image returned from fal.ai");
  return url;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PfpMemeGenerator() {
  const fileInputId = "pfp-ai-upload";

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [strength, setStrength] = useState(0.85);
  const [downloaded, setDownloaded] = useState(false);

  const resultRef = useRef<HTMLImageElement>(null);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResultUrl(null);
    setError(null);
    setStage("uploaded");
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
    e.target.value = "";
  };

  const handleGenerate = async () => {
    if (!file || !import.meta.env.VITE_FAL_KEY) return;
    const prompt = useCustom
      ? customPrompt.trim()
      : COSTUME_PRESETS.find((p) => p.id === selectedPreset)?.prompt ?? "";
    if (!prompt) return;

    setStage("generating");
    setError(null);
    setResultUrl(null);

    try {
      const base64 = await fileToBase64(file);
      const url = await generateWithFal(base64, prompt, import.meta.env.VITE_FAL_KEY ?? "", strength);
      setResultUrl(url);
      setStage("done");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStage("error");
    }
  };

  const handleDownload = async () => {
    if (!resultUrl) return;
    try {
      const res = await fetch(resultUrl);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "my-ai-pfp.png";
      a.click();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch {
      window.open(resultUrl, "_blank");
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setStage("idle");
    setError(null);
    setSelectedPreset(null);
    setCustomPrompt("");
    setUseCustom(false);
    setDownloaded(false);
  };

  const canGenerate =
    !!file &&
    (useCustom ? !!customPrompt.trim() : !!selectedPreset) &&
    stage !== "generating";

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div id="meme" className="min-h-screen pt-[4rem] md:pt-[8rem] bg-transparent text-black dark:text-white flex flex-col items-center justify-start px-4 py-10">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1
          className="text-4xl font-black tracking-tight mb-2 text-black dark:text-white"
          style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
        >
          🐶🚀 $ASTEROID PFP MEME
        </h1>
        <p className="text-black/50 dark:text-white/40 text-sm mt-10">
          Upload a photo · Pick a costume · Let do the magic
        </p>
      </div>

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">

        {/* ── Left: Image panels ── */}
        <div className="flex flex-col gap-4 items-center">

          <div className="block md:flex gap-4 items-end">
            {/* Original */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-black/50 dark:text-white/40 uppercase tracking-widest font-bold">Original</span>
              <div
                className="w-[315px] h-[315px] md:w-[250px] md:h-[250px] lg:h-[310px] lg:w-[310px] rounded-2xl border-2 border-black/10 dark:border-white/10 overflow-hidden flex items-center justify-center bg-black/5 dark:bg-[#12121f]"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Original" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-black/30 dark:text-white/20">
                    <span className="text-4xl">🖼️</span>
                    <span className="text-xs">No image yet</span>
                  </div>
                )}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex place-self-center items-center text-black/30 dark:text-white/20 text-3xl pb-6">→</div>

            {/* Result */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-black/50 dark:text-white/40 uppercase tracking-widest font-bold">Result</span>
              <div
                className="w-[315px] h-[315px] md:w-[250px] md:h-[250px] lg:h-[310px] lg:w-[310px] rounded-2xl border-2 overflow-hidden flex items-center justify-center relative transition-colors duration-300 bg-black/5 dark:bg-[#12121f]"
                style={{
                  borderColor: stage === "done" ? "#6366f1" : undefined,
                }}
              >
                {stage !== "done" && (
                  <div className={`absolute inset-0 border-2 rounded-2xl pointer-events-none ${stage === "done" ? "border-indigo-500" : "border-black/10 dark:border-white/10"}`} />
                )}
                {stage === "generating" && (
                  <div className="flex flex-col items-center gap-3 text-black/50 dark:text-white/60">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-center px-4 leading-relaxed">
                      AI is dressing<br />your photo...
                    </span>
                  </div>
                )}
                {stage === "done" && resultUrl && (
                  <img ref={resultRef} src={resultUrl} alt="AI Result" className="w-full h-full object-cover" />
                )}
                {stage === "error" && (
                  <div className="flex flex-col items-center gap-2 text-red-500 px-3 text-center">
                    <span className="text-3xl">⚠️</span>
                    <span className="text-xs leading-relaxed">{error}</span>
                  </div>
                )}
                {(stage === "idle" || stage === "uploaded") && (
                  <div className="flex flex-col items-center gap-2 text-black/30 dark:text-white/20">
                    <span className="text-4xl">✨</span>
                    <span className="text-xs">Result appears here</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action row */}
          <div className="flex gap-3 my-[2rem] w-full md:w-[440px]">
            <label
              htmlFor={fileInputId}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-bold text-sm text-center cursor-pointer text-white"
            >
              {file ? "Change Photo" : "Upload Photo"}
            </label>
            <input
              id={fileInputId}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            <button
              onClick={handleDownload}
              disabled={stage !== "done"}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition ${
                stage === "done"
                  ? downloaded
                    ? "bg-green-500 text-white"
                    : "bg-yellow-400 hover:bg-yellow-300 text-black"
                  : "bg-black/10 dark:bg-white/10 text-black/30 dark:text-white/30 cursor-not-allowed"
              }`}
            >
              {downloaded ? "Saved!" : "Download"}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition text-sm font-bold text-black dark:text-white"
              title="Reset"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* ── Right: Controls ── */}
        <div className="flex-1 flex flex-col gap-5">

          {/* Costume picker */}
          <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 border border-black/10 dark:border-white/10">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/40">
                🎽 Costume Style
              </label>
              <button
                onClick={() => setUseCustom((v) => !v)}
                className={`text-xs px-3 py-1 rounded-lg font-bold transition border ${
                  useCustom
                    ? "bg-indigo-600 border-indigo-400 text-white"
                    : "bg-black/10 dark:bg-white/10 border-black/10 dark:border-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black dark:text-white"
                }`}
              >
                ✏️ Custom prompt
              </button>
            </div>

            {!useCustom ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COSTUME_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-sm font-semibold transition ${
                      selectedPreset === preset.id
                        ? "bg-indigo-600 border-indigo-400 text-white"
                        : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white"
                    }`}
                  >
                    <span className="text-2xl">{preset.emoji}</span>
                    <span className="text-xs">{preset.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. wearing a chef's uniform with a tall white hat, photorealistic, same subject, same background..."
                rows={3}
                className="w-full bg-black/5 dark:bg-white/10 rounded-xl px-4 py-2.5 text-black dark:text-white placeholder-black/30 dark:placeholder-white/20 outline-none border border-black/10 dark:border-white/10 focus:border-indigo-400 transition text-sm resize-none"
              />
            )}
          </div>

          {/* Strength slider */}
          <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 border border-black/10 dark:border-white/10">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/40">
                🎚️ Transformation Strength
              </label>
              <span className="text-xs text-indigo-600 dark:text-indigo-300 font-mono font-bold">
                {Math.round(strength * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              value={Math.round(strength * 100)}
              onChange={(e) => setStrength(Number(e.target.value) / 100)}
              className="w-full accent-indigo-500"
            />
            <div className="flex justify-between text-black/30 dark:text-white/20 text-xs mt-1">
              <span>Subtle (keep face)</span>
              <span>Full redraw</span>
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={`w-full py-4 rounded-2xl font-black text-lg tracking-wide transition ${
              canGenerate
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-900/30"
                : "bg-black/10 dark:bg-white/10 text-black/30 dark:text-white/30 cursor-not-allowed"
            }`}
            style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
          >
            {stage === "generating" ? "⏳ Generating..." : "✨ Generate PFP"}
          </button>

          {/* Tips */}
          <div className="rounded-2xl p-4 border border-black/10 dark:border-white/5">
            <p className="text-xs text-black/40 dark:text-white/30 font-bold uppercase tracking-widest mb-2">💡 Tips</p>
            <ul className="text-xs text-black/40 dark:text-white/25 space-y-1 list-disc list-inside">
              <li>Clear photos with good lighting work best</li>
              <li>Subject should be centered and visible</li>
              <li>Lower strength preserves the face better</li>
              <li>Each generation costs ~$0.03–0.05 on fal.ai</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}