"use client";
import {
  ArrowDownIcon,
  BadgeHelpIcon,
  Bolt,
  BracesIcon,
  ChartArea,
  ChartAreaIcon,
  ChevronUpIcon,
  CircleDotIcon,
  GitBranch,
  GitBranchIcon,
  HandHelping,
  Home,
  HomeIcon,
  Icon,
  Layers,
  LayersIcon,
  Layout,
  LayoutIcon,
  Link,
  LinkIcon,
  LogOut,
  LogOutIcon,
  LucideIcon,
  Mic,
  MicIcon,
  MicOff,
  MicOffIcon,
  MonitorUp,
  MonitorUpIcon,
  MoreHorizontal,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  MoveDown,
  MoveUp,
  Music,
  MusicIcon,
  PauseIcon,
  Pin,
  PinIcon,
  Radio,
  RadioIcon,
  ScreenShareIcon,
  ScrollTextIcon,
  Settings,
  SettingsIcon,
  Smile,
  SmileIcon,
  Sparkle,
  SparkleIcon,
  SquareTextIcon,
  Subscript,
  SubscriptIcon,
  TextIcon,
  Upload,
  UserPlusIcon,
  Users,
  UsersIcon,
  Video,
  VideoIcon,
  VideoOff,
  VideoOffIcon,
  Videotape,
  X,
  XIcon,
} from "lucide-react";
/**
 * Tailwind v4 setup (globals.css): paste your --color-* variables inside @theme.
 *
 *   @import "tailwindcss";
 *   @theme {
 *     --color-ink-black-100: #000407;
 *     ... all 27 tokens (ink-black, deep-space-blue, yale-blue, 100–900)
 *   }
 *
 * That gives you bg-ink-black-100, text-yale-blue-900, ring-yale-blue-300, etc.
 * Tailwind v3: put the same hex values under theme.extend.colors instead.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@repo/ui/components/button";
import useMedia from "app/hooks/useMedia";

// function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
//   return (
//     <div name={name} ></div>
//   );
// }

type Tab =
  | "people"
  | "chat"
  | "stream"
  | "brand"
  | "text"
  | "media"
  | "settings"
  | "help";
const RAIL: [Tab, LucideIcon, string][] = [
  ["people", UsersIcon, "People"],
  ["chat", ChartAreaIcon, "Chat"],
  ["stream", RadioIcon, "Stream"],
  ["brand", GitBranchIcon, "Brand"],
  ["text", TextIcon, "Text"],
  ["media", MusicIcon, "Media"],
  ["settings", SettingsIcon, "Settings"],
  ["help", BadgeHelpIcon, "Help"],
];
type Msg = { who: string; text: string; me?: boolean };

const fmt = (t: number) =>
  `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;

function Ctl({
  icon,
  label,
  onClick,
  caret,
  className = "",
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  caret?: boolean;
  className?: string;
}) {
  return (
    <Button
      variant={"myButton"}
      onClick={onClick}
      className={`size-18 bg-transparent border-none relative flex min-w-16 shrink-0 flex-col items-center gap-1 rounded-[10px] px-3 py-[9px] text-xs hover:bg-yale-blue-200 font-light ${className}`}
    >
      {icon}
      <span>{label}</span>
      {caret && (
        <ChevronUpIcon
          name="up"
          className="absolute right-1.5 top-0.5 size-4 text-yale-blue-900/60"
        />
      )}
    </Button>
  );
}

function Meter({
  on,
  vol,
  onVol,
}: {
  on: boolean;
  vol: number;
  onVol: (v: number) => void;
}) {
  const [level, setLevel] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () =>
        setLevel(on ? Math.round(((15 + Math.random() * 45) * vol) / 100) : 0),
      130,
    );
    return () => clearInterval(id);
  }, [on, vol]);
  return (
    <div className="relative flex items-center">
      <div className="absolute inset-x-0 h-1 overflow-hidden rounded bg-yale-blue-300">
        <i
          className="block h-full bg-emerald-400 transition-[width] duration-100"
          style={{ width: `${level}%` }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={vol}
        aria-label="Input volume"
        onChange={(e) => onVol(+e.target.value)}
        className="relative h-5 w-full appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-yale-blue-700
          [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yale-blue-900
          [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-yale-blue-900"
      />
    </div>
  );
}

function Tile({
  Icon,
  label,
  badge,
  onClick,
}: {
  Icon: LucideIcon;
  label: string;
  badge?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={"myButton"}
      onClick={onClick}
      className="relative flex flex-col items-center h-20 text-xs gap-2"
    >
      {badge && (
        <em className="absolute right-2 top-2 grid size-6 place-items-center rounded-md bg-yale-blue-500">
          <div className="bolt" />
        </em>
      )}
      <Icon />
      {label}
    </Button>
  );
}

function Chat({ msgs, onSend }: { msgs: Msg[]; onSend: (t: string) => void }) {
  const [text, setText] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ block: "end" }), [msgs]);
  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };
  return (
    <>
      <div className="flex flex-1 flex-col gap-2.5 overflow-auto">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`max-w-[90%] rounded-[10px] px-3 py-2.5 ${m.me ? "self-end bg-yale-blue-500" : "bg-yale-blue-200"}`}
          >
            <small className="block text-xs text-yale-blue-900/60">
              {m.who}
            </small>
            {m.text}
          </div>
        ))}
        <div ref={end} />
      </div>
      <div className="mt-3.5 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message everyone"
          aria-label="Message"
          className="min-w-0 flex-1 rounded-[10px] border border-yale-blue-300 bg-ink-black-400 px-3 py-[11px] outline-none focus:border-yale-blue-700"
        />
        <button
          onClick={send}
          className="rounded-[10px] bg-yale-blue-700 px-4 font-semibold text-ink-black-100 hover:bg-yale-blue-800"
        >
          Send
        </button>
      </div>
    </>
  );
}

export default function Studio() {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [rec, setRec] = useState(false);
  const [t, setT] = useState(0);
  const [tab, setTab] = useState<Tab>("people");
  const [open, setOpen] = useState(true);
  const [vol, setVol] = useState(100);
  const [toast, setToast] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      who: "Studio",
      text: "Say hi — only people in this studio can see chat.",
    },
  ]);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const {
    streamCamera,
    streamScreen,
    initRecorder,
    recorderRef,
    startNewRecording,
  } = useMedia();

  useEffect(() => {
    if (!localVideoRef.current) return;
    streamCamera(cam, mic).then(async(feed) => {
      if (!localVideoRef.current) return;
      localVideoRef.current.srcObject = feed;
      localStreamRef.current = feed;
    });
    return () => {
      localStreamRef.current?.getTracks().forEach(track=>track.stop())
    }
  }, []);
  const toggleCam = (enabled: boolean) => {
    setCam(enabled);
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];
    if(videoTrack)
    videoTrack.enabled = enabled;
  }
  const toggleMic = (enabled: boolean) => {
    setMic(enabled)
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if(audioTrack)
    audioTrack.enabled = enabled;
  }
  const say = (m: string) => {
    setToast(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 1800);
  };

  useEffect(() => {
    if (!rec) return;
    const id = setInterval(() => setT((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, [rec]);

  const toggleRec = async () => {
    if (!rec) setT(0);
    if (rec) {
      setRec(false);
      recorderRef.current?.stop();
    } else {
      setRec(true);
      if (!localStreamRef.current) return;
      await initRecorder(localStreamRef.current);
      console.log("recorder", recorderRef.current);
      startNewRecording();
    }
    say(rec ? "Recording saved" : "Recording started");
  };
  const pickTab = (next: Tab) => {
    if (open && tab === next) setOpen(false);
    else {
      setTab(next);
      setOpen(true);
    }
  };

  const title = RAIL.find(([k]) => k === tab)![2];

  return (
    <div className="flex h-dvh flex-col bg-ink-black-100 font-livvic text-sm text-yale-blue-900 ">
      <main className="relative flex min-h-0 flex-1 flex-col gap-3 p-3 md:flex-row">
        {/* stage */}
        <section aria-label="preview" className="group relative flex-1">
          <div className="flex gap-2 h-full w-full flex-col">
            {/* top bar */}
            <header className="flex items-center gap-4">
              <button
                aria-label="Home"
                className="grid size-9 place-items-center rounded-[10px] hover:bg-yale-blue-200 ml-1"
              >
                <HomeIcon />
              </button>
              <span className="text-[17px] text-yale-blue-900/60">
                Untitled Recording
              </span>
              {rec && (
                <span className="flex items-center gap-2 font-semibold tabular-nums text-red-300">
                  <i className="size-2 animate-pulse rounded-full bg-red-500 motion-reduce:animate-none" />
                  {fmt(t)}
                </span>
              )}
              <span className="flex-1" />
              <button
                onClick={() => pickTab("stream")}
                className="flex items-center gap-2 rounded-[10px] border border-yale-blue-300 bg-ink-black-400 px-4 py-2.5 font-semibold hover:bg-yale-blue-200"
              >
                <RadioIcon /> Live stream
              </button>
            </header>
            {/* Video / avatar area */}
            <div className="relative min-h-0 flex-1">

                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  className={`${cam?"block":"hidden"} h-full w-full  object-cover rounded-lg`}
                />
              {!cam  &&
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid aspect-square w-[clamp(88px,14vw,140px)] place-items-center rounded-full bg-yale-blue-400 text-[clamp(36px,6vw,60px)] font-semibold">
                    A
                  </span>
                </div>
              }

              {/* Overlay buttons (pin, sparkle, more) */}
              <div className="absolute inset-0 flex items-start justify-center gap-2.5 pt-3.5 opacity-100 transition-opacity md:items-center md:pt-0 md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100">
                {(
                  [
                    { icon: PinIcon, key: "pin" },
                    { icon: SparkleIcon, key: "sparkle" },
                    { icon: MoreHorizontalIcon, key: "more" },
                  ] as { icon: LucideIcon; key: string }[]
                ).map((N) => (
                  <Button
                    variant={"myButton"}
                    key={N.key}
                    aria-label={N.key}
                    onClick={() => say(`${N.key} (demo)`)}
                    className="grid size-[45px]  place-items-center "
                  >
                    <N.icon />
                  </Button>
                ))}
              </div>

              {/* Name label */}
              <div className="absolute bottom-3.5 left-[18px] text-[22px] font-medium [text-shadow:0_1px_6px_#000]">
                ayush
              </div>
            </div>

            {/* Bottom control bar – now part of the flex column */}
            <div className="grid grid-cols-[auto_1fr] items-center px-5 py-3 md:grid-cols-[1fr_auto_1fr]">
              <div className="hidden md:block">
                <Ctl
                  icon={<LayersIcon />}
                  label="Scenes"
                  onClick={() => say("Scenes coming soon")}
                />
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto md:overflow-visible">
                <Button
                  variant={"myButton"}
                  onClick={toggleRec}
                  className={`size-18 border-none font-light shrink-0 flex-col items-center rounded-[10px] px-4 py-[15px] text-xs ${
                    rec
                      ? "bg-yale-blue-400 text-yale-blue-900"
                      : "bg-red-500 text-white hover:bg-red-400"
                  }`}
                >
                  {rec ? (
                    <PauseIcon
                      fill="currentColor"
                      className="block size-4 rounded-[3px] text-red-500"
                    />
                  ) : (
                    <CircleDotIcon
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      aria-hidden
                    />
                  )}
                  {rec ? "Stop" : "Record"}
                </Button>

                <Ctl
                  caret
                  label="Audio"
                  onClick={() => toggleMic(!mic)}
                  icon={
                    mic ? (
                      <MicIcon strokeWidth={1.5} />
                    ) : (
                      <MicOffIcon className="text-red-500" strokeWidth={1.5} />
                    )
                  }
                />
                <Ctl
                  caret
                  label="Video"
                  onClick={() => toggleCam(!cam)}
                  icon={
                    cam ? (
                      <VideoIcon strokeWidth={1.5} />
                    ) : (
                      <VideoOffIcon
                        strokeWidth={1.5}
                        className="text-red-500"
                      />
                    )
                  }
                />
                <Ctl
                  caret
                  label="Share"
                  icon={<MonitorUpIcon />}
                  onClick={() => say("Screen sharing needs a live session")}
                />
                <Ctl
                  label="React"
                  icon={<SmileIcon strokeWidth={1.5} />}
                  onClick={() => say("Reaction sent")}
                />
                <Ctl
                  caret
                  label="Script"
                  icon={<SquareTextIcon strokeWidth={1.5} />}
                  onClick={() => say("Script opened")}
                />
                <Ctl
                  label="Layout"
                  icon={<LayoutIcon strokeWidth={1.5} />}
                  onClick={() => say("Layout changed")}
                />
                <Ctl
                  label="Leave"
                  className="text-red-300"
                  icon={<LogOutIcon strokeWidth={1.5} />}
                  onClick={() => say("You left the studio (demo)")}
                />
              </div>
            </div>
          </div>
        </section>
        {/* side panel */}
        {open && (
          <aside
            aria-live="polite"
            className="absolute inset-x-3 bottom-3 top-[60px] z-10 flex flex-col overflow-auto rounded-[18px] border border-yale-blue-400 bg-deep-space-blue-300 p-5 md:static md:w-1/4 md:shrink-0"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">{title}</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close panel"
                className="grid size-10 place-items-center rounded-full bg-yale-blue-200 hover:bg-yale-blue-300"
              >
                <XIcon />
              </button>
            </div>

            {tab === "people" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Tile
                    Icon={LinkIcon}
                    label="Invite via link or email"
                    onClick={() => say("Invite link copied (demo)")}
                  />
                  <Tile
                    Icon={UserPlusIcon}
                    label="Add in-person guest"
                    badge
                    onClick={() => say("In-person guest added (demo)")}
                  />
                </div>
                <div className="mb-3.5 mt-7 flex items-center justify-between">
                  <h3 className="flex items-center gap-2.5 text-[17px] font-bold">
                    In the studio
                    <span className="grid h-[26px] min-w-[26px] place-items-center rounded-lg bg-yale-blue-200 px-1.5 text-[13px] font-medium">
                      1
                    </span>
                  </h3>
                  <button
                    onClick={() => {
                      toggleMic(!mic);
                      // setMic(!mic);
                      say(mic ? "Everyone muted" : "Mic on");
                    }}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 font-semibold hover:bg-yale-blue-200"
                  >
                    {mic ? <MicOffIcon /> : <MicIcon />}{" "}
                    {mic ? "Mute all" : "Unmute"}
                  </button>
                </div>
                <div className="rounded-xl border border-yale-blue-300 bg-ink-black-400 p-2.5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="grid h-16 w-20 shrink-0 place-items-center rounded-lg bg-ink-black-500 text-lg font-bold sm:w-30">
                      A
                    </div>
                    <div className="min-w-0 flex-1 ml-1">
                      <b className="block text-sm font-semibold">ayush (You)</b>
                      <small className="text-xs text-yale-blue-900/60">
                        Host · 720p
                      </small>
                    </div>
                    <Button
                      variant={"myButton"}
                      aria-label="Options"
                      className=" bg-transparent border-none"
                    >
                      <MoreVerticalIcon />
                    </Button>
                    <Button
                      variant={"myButton"}
                      aria-label="Expand"
                      className=" bg-transparent border-none"
                    >
                      <ArrowDownIcon />
                    </Button>
                  </div>
                  <Meter on={mic} vol={vol} onVol={setVol} />
                </div>
                <p className="mt-auto pt-6 text-center text-[13px] text-yale-blue-900/60">
                  People join on stage by default.{" "}
                  <button
                    onClick={() => setTab("settings")}
                    className="font-medium text-yale-blue-700"
                  >
                    Change this in Settings
                  </button>
                </p>
              </>
            )}

            {tab === "chat" && (
              <Chat
                msgs={msgs}
                onSend={(text) =>
                  setMsgs((m) => [...m, { who: "You", text, me: true }])
                }
              />
            )}

            {tab !== "people" && tab !== "chat" && (
              <p className="text-yale-blue-900/60">
                {title} options will show up here.
              </p>
            )}
          </aside>
        )}

        {/* rail */}
        <nav
          aria-label="Studio panels"
          className="order-first flex shrink-0 gap-1 overflow-auto rounded-lg border border-ink-black-300 bg-ink-black-200 md:order-none md:w-18 md:flex-col scrollbar-none"
        >
          {RAIL.map(([key, Icon, label], i) => (
            <div key={key} className="contents scrollbar-none">
              {key === "settings" && (
                <hr className="mx-auto my-1.5 hidden w-6 border-yale-blue-300 md:block" />
              )}
              <Button
                variant={"myButton"}
                onClick={() => pickTab(key)}
                aria-pressed={open && tab === key}
                className={`flex flex-col gap-2 size-18 aspect-square border-none bg-transparent text-xs font-light ${open && tab === key ? "bg-yale-blue-300" : ""}`}
              >
                <Icon className={""} />
                {label}
              </Button>
            </div>
          ))}
        </nav>
      </main>
    </div>
  );
}
