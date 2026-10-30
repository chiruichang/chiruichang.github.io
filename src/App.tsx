"use client";

import { useEffect, useRef, useState } from "react";

type PaperLink = {
  label: string;
  href: string;
};

type Publication = {
  year: string;
  venue: string;
  title: string;
  authors: string;
  summary: string;
  image: string;
  video?: string;
  imageAlt: string;
  imagePosition?: string;
  links: PaperLink[];
};

const representativePublications: Publication[] = [
  {
    year: "2026",
    venue: "ACM SIGGRAPH Asia",
    title: "Geometry-Instructed Video Editing",
    authors:
      "Chirui Chang, Xiaoyang Lyu, Yi-Hua Huang, Haoru Tan, Shizhen Zhao, Yikang Ding, Jianmin Bao, Xin Tao, Pengfei Wan, Xiaojuan Qi",
    summary:
      "A unified framework for controllable object-level video editing, using explicit pre/post 3D state instructions and graphics-engine supervision.",
    image: "/papers/give-function.jpg",
    video: "/papers/give-function.mp4",
    imageAlt:
      "GIVE interface demonstrating object selection and geometry-aware video editing",
    links: [
      { label: "Project", href: "https://geometry-instructed-video-editing.github.io/give/" },
      { label: "Paper", href: "https://arxiv.org/abs/2606.24225" },
    ],
  },
  {
    year: "2025",
    venue: "ICCV",
    title: "How Far Are AI-Generated Videos from Simulating the 3D Visual World?",
    authors:
      "Chirui Chang, Jiahui Liu, Zhengzhe Liu, Xiaoyang Lyu, Yi-Hua Huang, Xin Tao, Pengfei Wan, Di Zhang, Xiaojuan Qi",
    summary:
      "L3DE measures and localizes appearance, motion, and geometry failures in generated videos through learned 3D visual coherence.",
    image: "/papers/l3de-feature.jpg",
    imageAlt: "Overview and examples of the L3DE video evaluation method",
    links: [
      { label: "Project", href: "https://justin-crchang.github.io/l3de-project-page/" },
      { label: "Paper", href: "https://arxiv.org/abs/2406.19568" },
      { label: "Code", href: "https://github.com/CVMI-Lab/L3DE" },
    ],
  },
  {
    year: "2024",
    venue: "CVPR",
    title: "Total-Decom: Decomposed 3D Scene Reconstruction with Minimal Interaction",
    authors:
      "Xiaoyang Lyu*, Chirui Chang*, Peng Dai, Yang-Tian Sun, Xiaojuan Qi",
    summary:
      "An interactive reconstruction system that turns complex scenes into editable 3D object entities with minimal human annotation.",
    image: "/papers/total-decom-feature.jpg",
    imageAlt: "Total-Decom scene reconstruction and object editing workflow",
    links: [
      { label: "Project", href: "https://cvmi-lab.github.io/Total-Decom/" },
      { label: "Paper", href: "https://arxiv.org/abs/2403.19314" },
      { label: "Code", href: "https://github.com/CVMI-Lab/Total-Decom" },
    ],
  },
  {
    year: "2023",
    venue: "CVPR",
    title:
      "MarS3D: A Plug-and-Play Motion-Aware Model for Semantic Segmentation on Multi-Scan 3D Point Clouds",
    authors:
      "Jiahui Liu*, Chirui Chang*, Jianhui Liu, Xiaoyang Wu, Lan Ma, Xiaojuan Qi",
    summary:
      "A motion-aware module that gives single-scan 3D segmentation models temporal perception through cross-frame feature learning.",
    image: "/papers/mars3d-feature.jpg",
    imageAlt: "Comparison of MarS3D point-cloud segmentation results",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2307.09316" },
      { label: "Code", href: "https://github.com/CVMI-Lab/MarS3D" },
    ],
  },
];

const additionalPublications: Publication[] = [
  {
    year: "2026",
    venue: "ACM SIGGRAPH",
    title: "AniGen: Unified S³ Fields for Animatable 3D Asset Generation",
    authors:
      "Yi-Hua Huang, Zi-Xin Zou, Yuting He, Chirui Chang, Cheng-Feng Pu, Ziyi Yang, Yuan-Chen Guo, Yan-Pei Cao, Xiaojuan Qi",
    summary:
      "Generates shape, skeleton, and skinning together as a coherent, animation-ready 3D asset from a single image.",
    image: "/papers/anigen.png",
    imageAlt: "AniGen examples of generated and rigged 3D characters and objects",
    links: [
      { label: "Project", href: "https://yihua7.github.io/AniGen_web/" },
      { label: "Paper", href: "https://arxiv.org/abs/2604.08746" },
      { label: "Code", href: "https://github.com/VAST-AI-Research/AniGen" },
    ],
  },
  {
    year: "2026",
    venue: "CVPR",
    title: "ObjectMorpher: 3D-Aware Image Editing via Deformable 3DGS",
    authors:
      "Yuhuan Xie, Aoxuan Pan, Yi-Hua Huang, Chirui Chang, Peng Dai, Xin Yu, Xiaojuan Qi",
    summary:
      "Lifts an image object into deformable 3D Gaussians for precise, physically plausible edits that preserve identity and context.",
    image: "/papers/objectmorpher.png",
    imageAlt: "Examples comparing ObjectMorpher with image editing baselines",
    imagePosition: "center 35%",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2603.28152" },
    ],
  },
  {
    year: "2026",
    venue: "AAAI",
    title: "ASSIST-3D: Adapted Scene Synthesis for Class-Agnostic 3D Instance Segmentation",
    authors:
      "Shengchao Zhou, Jiehong Lin, Jiahui Liu, Shizhen Zhao, Chirui Chang, Xiaojuan Qi",
    summary:
      "Synthesizes diverse, physically reasonable 3D scenes and point clouds to improve class-agnostic instance segmentation.",
    image: "/papers/assist3d.png",
    imageAlt: "ASSIST-3D scene synthesis and point-cloud construction pipeline",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2512.09364" },
      { label: "Code", href: "https://github.com/CVMI-Lab/ASSIST-3D" },
    ],
  },
  {
    year: "2026",
    venue: "CVPR",
    title: "Dynamic Important Example Mining for Reinforcement Finetuning",
    authors:
      "Haoru Tan, Sitong Wu, Yanfeng Chen, Shizhen Zhao, Yang-Tian Sun, Tianjia Liu, Chirui Chang, Shaofeng Zhang, Samm Sun, Xiuzhe Wu, Ruobing Xie, Xiaojuan Qi",
    summary:
      "DIEM continuously estimates and reweights sample importance as policy learning evolves during reinforcement fine-tuning.",
    image: "/papers/diem.png",
    imageAlt: "Pipeline for dynamic important example mining during reinforcement fine-tuning",
    imagePosition: "center top",
    links: [
      {
        label: "Paper",
        href: "https://openaccess.thecvf.com/content/CVPR2026/papers/Tan_Dynamic_Important_Example_Mining_for_Reinforcement_Finetuning_CVPR_2026_paper.pdf",
      },
      { label: "Code", href: "https://github.com/hrtan/DIEM" },
    ],
  },
  {
    year: "2026",
    venue: "CVPR",
    title: "Dataset Distillation by Influence Matching",
    authors:
      "Haoru Tan, Wang Wang, Sitong Wu, Xiuzhe Wu, Yang-Tian Sun, Chirui Chang, Shaofeng Zhang, Xiaojuan Qi",
    summary:
      "Inf-Match distills compact training sets by matching their effect on final model parameters rather than intermediate training steps.",
    image: "/papers/infmatch.png",
    imageAlt: "Feature, process, and outcome matching paradigms for dataset distillation",
    imagePosition: "center top",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2607.16859" },
      { label: "Code", href: "https://github.com/hrtan/infmatch" },
    ],
  },
  {
    year: "2025",
    venue: "ICCV",
    title: "Aligning Effective Tokens with Video Anomaly in Large Language Models",
    authors:
      "Yingxian Chen, Jiahui Liu, Ruidi Fan, Yanwei Li, Chirui Chang, Shizhen Zhao, Wilton W. T. Fok, Xiaojuan Qi, Yik-Chung Wu",
    summary:
      "VA-GPT selects spatial and temporal tokens that help multimodal language models localize and explain sparse video anomalies.",
    image: "/papers/vagpt.png",
    imageAlt: "VA-GPT spatial and temporal effective token selection",
    imagePosition: "center 32%",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2508.06350" },
    ],
  },
  {
    year: "2025",
    venue: "UIST",
    title: "NoteIt: Instructional Videos to Interactable Notes",
    authors:
      "Running Zhao, Zhihan Jiang, Xinchen Zhang, Chirui Chang, Handi Chen, Weipeng Deng, Luyao Jin, Xiaojuan Qi, Xun Qian, Edith C. H. Ngai",
    summary:
      "Transforms instructional videos into structured, customizable notes that retain both verbal explanations and visual demonstrations.",
    image: "/papers/noteit.png",
    imageAlt: "Illustration of converting instructional video into interactive notes",
    links: [
      { label: "Project", href: "https://zhaorunning.github.io/NoteIt/" },
      { label: "Paper", href: "https://arxiv.org/abs/2508.14395" },
    ],
  },
  {
    year: "2024",
    venue: "SIGGRAPH",
    title: "Object-Level Scene Deocclusion",
    authors:
      "Zhengzhe Liu, Qing Liu, Chirui Chang, Jianming Zhang, Daniil Pakhomov, Haitian Zheng, Zhe Lin, Daniel Cohen-Or, Chi-Wing Fu",
    summary:
      "PACO completes hidden object regions with a category-agnostic diffusion model, enabling scene deocclusion and recomposition.",
    image: "/papers/deocclusion.png",
    imageAlt: "PACO visible-to-complete scene deocclusion pipeline",
    links: [
      { label: "Project", href: "https://liuzhengzhe.github.io/Deocclude-Any-Object.github.io/" },
      { label: "Paper", href: "https://arxiv.org/abs/2406.07706" },
    ],
  },
];

const news = [
  {
    date: "2026.08",
    text: "GIVE is accepted to ACM SIGGRAPH Asia 2026.",
  },
  {
    date: "2026.06",
    text: "Joined Tencent as a Project UP research intern.",
  },
  {
    date: "2026.03",
    text: "Three papers accepted to CVPR 2026.",
  },
];

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function HighlightName({ authors }: { authors: string }) {
  const parts = authors.split("Chirui Chang");

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {index > 0 && <strong>Chirui Chang</strong>}
          {part}
        </span>
      ))}
    </>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : preferredTheme;

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      aria-pressed={theme === "dark"}
    >
      <span className="theme-toggle-dot" aria-hidden="true" />
      <span>{theme === "light" ? "Dark" : "Light"}</span>
    </button>
  );
}

function PublicationVisual({ paper }: { paper: Publication }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (!paper.video || !videoRef.current) return;

    const video = videoRef.current;
    video.muted = true;
    video.play().catch(() => setIsPlaying(false));
  }, [paper.video]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <div className={`paper-visual-wrap${paper.video ? " has-video" : ""}`}>
      <a
        className="paper-visual"
        href={paper.links[0].href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${paper.title}`}
      >
        {paper.video && !videoFailed ? (
          <video
            ref={videoRef}
            src={paper.video}
            poster={paper.image}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={(event) => {
              event.currentTarget.play().catch(() => setIsPlaying(false));
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setVideoFailed(true)}
            aria-label={paper.imageAlt}
          />
        ) : (
          <img
            src={paper.image}
            alt={paper.imageAlt}
            loading="lazy"
            style={{ objectPosition: paper.imagePosition ?? "center" }}
          />
        )}
      </a>
      {paper.video && !videoFailed && (
        <button
          className="video-toggle"
          type="button"
          onClick={togglePlayback}
          aria-label={`${isPlaying ? "Pause" : "Play"} ${paper.title} demo`}
        >
          <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
          {isPlaying ? "Pause" : "Play demo"}
        </button>
      )}
    </div>
  );
}

function PublicationItem({ paper }: { paper: Publication }) {
  return (
    <article className="publication" data-reveal>
      <PublicationVisual paper={paper} />
      <div className="publication-copy">
        <div className="paper-meta">
          <span className="venue">{paper.venue}</span>
          <span>{paper.year}</span>
        </div>
        <h3>
          <ExternalLink href={paper.links[0].href}>{paper.title}</ExternalLink>
        </h3>
        <p className="authors">
          <HighlightName authors={paper.authors} />
        </p>
        <p className="publication-summary">{paper.summary}</p>
        <div className="paper-links">
          {paper.links.map((link) => (
            <ExternalLink href={link.href} key={link.label}>
              {link.label} <span aria-hidden="true">↗</span>
            </ExternalLink>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="site-name" href="#top">
            Chirui Chang
          </a>
          <div className="header-actions">
            <nav aria-label="Primary navigation">
              <a href="#about">About</a>
              <a href="#research-direction">Research</a>
              <a href="#background">Background</a>
              <a href="/CV-Chirui-Chang.pdf">CV</a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="page" id="top">
        <section className="intro" id="about">
          <aside className="portrait-column">
            <div className="portrait-wrap">
              <img
                className="portrait"
                src="/chirui-chang-linkedin.png"
                alt="Portrait of Chirui Chang"
              />
            </div>
            <p>Hong Kong</p>
          </aside>

          <div className="intro-copy">
            <p className="eyebrow">Ph.D. candidate in Computer Vision · HKU</p>
            <h1>Chirui Chang</h1>
            <p className="lead">
              I study how visual models can <em>understand</em> and <em>shape</em>
              {" "}dynamic 3D worlds.
            </p>
            <p>
              My work sits at the intersection of 3D vision and video generation.
              I am particularly interested in using geometry, motion, and structured
              representations to make generative models more coherent, controllable,
              and grounded.
            </p>
            <p>
              I am a Ph.D. candidate at the University of Hong Kong, advised by
              Prof. Xiaojuan Qi in the CVMI Lab. I have worked with Kling&apos;s Base
              Model Team at Kuaishou and am now a Project UP research intern at
              Tencent, exploring streaming video generation.
            </p>

            <div className="profile-links" aria-label="Profile links">
              <a href="mailto:justinsheunghk@gmail.com">Email</a>
              {/* Google Scholar is temporarily hidden from the public profile. */}
              <ExternalLink href="https://github.com/jUstin-crchang">GitHub</ExternalLink>
              <ExternalLink href="https://www.linkedin.com/in/chirui-c-18529b21b/">
                LinkedIn
              </ExternalLink>
              <a href="/CV-Chirui-Chang.pdf">CV</a>
            </div>
          </div>
        </section>

        <section
          className="research-agenda"
          id="research-direction"
          aria-labelledby="research-direction-title"
        >
          <div className="research-agenda-heading">
            <p className="section-label">Research direction</p>
            <h2 id="research-direction-title">
              Structured visual intelligence for dynamic 3D worlds.
            </h2>
          </div>

          <div className="research-agenda-copy">
            <p>
              My research asks how visual models can perceive, reason about, and
              manipulate dynamic scenes. I connect 3D vision with video generation,
              treating geometry and motion as essential structure rather than
              incidental visual cues.
            </p>
            <p>
              The broader goal is to build visual systems that do more than produce
              plausible pixels: they should maintain a coherent world, understand
              how it changes, and give people precise control over those changes.
            </p>
          </div>

          <div className="research-themes" aria-label="Research themes">
            <article className="research-theme">
              <span>01 · Understand</span>
              <h3>Dynamic 3D scenes</h3>
              <p>Motion-aware perception, reconstruction, and object-centric representations.</p>
            </article>
            <article className="research-theme">
              <span>02 · Assess</span>
              <h3>Generated-world coherence</h3>
              <p>Geometry, motion, and appearance signals for diagnosing generated video.</p>
            </article>
            <article className="research-theme">
              <span>03 · Create</span>
              <h3>Controllable video worlds</h3>
              <p>Generation and editing grounded by 3D structure and graphics supervision.</p>
            </article>
          </div>
        </section>

        <section className="news-band" aria-labelledby="news-title">
          <div className="news-heading">
            <p className="section-label">Updates</p>
            <h2 id="news-title">News</h2>
          </div>
          <div className="news-list">
            {news.map((item) => (
              <div className="news-item" key={`${item.date}-${item.text}`}>
                <time>{item.date}</time>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section publications-section" id="publications" aria-labelledby="publications-title">
          <div className="section-heading">
            <div>
              <p className="section-label">Research</p>
              <h2 id="publications-title">Representative publications</h2>
              <p>
                Selected work in video generation and editing, 3D visual
                understanding, and geometry-aware learning.
              </p>
            </div>
            {/* Google Scholar is temporarily hidden from the publications section. */}
          </div>

          <div className="publication-list">
            {representativePublications.map((paper) => (
              <PublicationItem paper={paper} key={paper.title} />
            ))}
          </div>

          <div className="additional-heading">
            <h2>Additional publications</h2>
            <p>Collaborative work across 3D vision, generative models, and multimodal systems.</p>
          </div>

          <div className="publication-list additional-list">
            {additionalPublications.map((paper) => (
              <PublicationItem paper={paper} key={paper.title} />
            ))}
          </div>
        </section>

        <section className="section background-section" id="background" aria-labelledby="background-title">
          <div className="section-heading compact-heading">
            <div>
              <h2 id="background-title">Background</h2>
            </div>
          </div>

          <div className="background-grid compact-background">
            <div className="background-column">
              <h3>Experience</h3>
              <div className="timeline-item" data-reveal>
                <div className="institution-logo">
                  <img src="/logos/tencent.png" alt="" loading="lazy" />
                </div>
                <div className="timeline-copy">
                  <time>2026 — Present</time>
                  <strong>Tencent · Project UP</strong>
                  <p>Research Intern</p>
                </div>
              </div>
              <div className="timeline-item" data-reveal>
                <div className="institution-logo institution-logo-dark">
                  <img src="/logos/kling.png" alt="" loading="lazy" />
                </div>
                <div className="timeline-copy">
                  <time>2025 — 2026</time>
                  <strong>Kling · Kuaishou</strong>
                  <p>Research Intern</p>
                </div>
              </div>
            </div>

            <div className="background-column">
              <h3>Education</h3>
              <div className="timeline-item" data-reveal>
                <div className="institution-logo institution-logo-square">
                  <img src="/logos/hku.jpg" alt="" loading="lazy" />
                </div>
                <div className="timeline-copy">
                  <time>2023 — Present</time>
                  <strong>The University of Hong Kong</strong>
                  <p>Ph.D. in Computer Vision</p>
                </div>
              </div>
              <div className="timeline-item" data-reveal>
                <div className="institution-logo">
                  <img src="/logos/cuhk.png" alt="" loading="lazy" />
                </div>
                <div className="timeline-copy">
                  <time>2018 — 2022</time>
                  <strong>The Chinese University of Hong Kong</strong>
                  <p>B.Sc. in Computer Science</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <p>Chirui Chang · Computer Vision Researcher</p>
          <p>Last updated October 2026</p>
        </footer>
      </div>
    </main>
  );
}
