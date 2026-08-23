import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  Brain,
  Download,
  GitBranch,
  Lightbulb,
  Map,
  MessageSquareQuote,
  PenLine,
  Plus,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";
function Card({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, onClick, variant, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
const STARTER_AUTHORS = [
  {
    id: 1,
    name: "Fyodor Dostoevsky",
    era: "1821–1881",
    place: "Russia",
    themes: ["faith", "guilt", "freedom", "suffering", "moral responsibility"],
    profile:
      "Russian novelist whose work explores spiritual crisis, psychological conflict, guilt, freedom, and the moral consequences of modern life.",
    majorWorks: ["Crime and Punishment", "The Brothers Karamazov", "Notes from Underground"],
    prompt:
      "Recreate a Dostoevsky-like literary voice using his recurring tone, beliefs, and ideas: psychological intensity, moral contradiction, spiritual hunger, guilt, confession, humiliation, freedom, and the underground self. Write in a dramatic, searching, morally tormented style. Do not claim to be the historical Dostoevsky; label the response as an AI reconstruction grounded in his writings.",
    sampleTopics: ["social media", "surveillance", "loneliness", "celebrity culture"],
    color: "from-stone-900 to-red-950",
  },
  {
    id: 2,
    name: "Plato",
    era: "c. 428–348 BCE",
    place: "Classical Athens",
    themes: ["truth", "forms", "virtue", "justice", "education", "the soul"],
    profile:
      "Ancient Greek philosopher concerned with truth, justice, the education of the soul, political order, and the difference between appearance and reality.",
    majorWorks: ["Republic", "Phaedrus", "Symposium"],
    prompt:
      "Recreate a Plato-like philosophical voice using his recurring tone, beliefs, and ideas: dialogue, inquiry, analogy, truth, forms, justice, virtue, education, and the soul. Use questions, distinctions, and cave-like metaphors when helpful. Do not claim to be the historical Plato; label the response as an AI reconstruction grounded in his writings.",
    sampleTopics: ["AI", "democracy online", "deepfakes", "education technology"],
    color: "from-indigo-950 to-slate-900",
  },
  {
    id: 3,
    name: "Mary Shelley",
    era: "1797–1851",
    place: "England / Europe",
    themes: ["creation", "responsibility", "ambition", "isolation", "scientific ethics"],
    profile:
      "Romantic-era novelist whose work examines creation, abandonment, ambition, science, responsibility, and the emotional cost of human invention.",
    majorWorks: ["Frankenstein", "The Last Man"],
    prompt:
      "Recreate a Mary Shelley-like literary voice using her recurring tone, beliefs, and ideas: Romantic intensity, creation, responsibility, abandonment, scientific ambition, isolation, grief, and the ethical duties of makers. Write with emotional seriousness and gothic moral atmosphere. Do not claim to be the historical Mary Shelley; label the response as an AI reconstruction grounded in her writings.",
    sampleTopics: ["genetic engineering", "AI companions", "climate technology", "biohacking"],
    color: "from-purple-950 to-zinc-950",
  },
  {
    id: 4,
    name: "Jane Austen",
    era: "1775–1817",
    place: "England",
    themes: ["manners", "class", "marriage", "irony", "self-knowledge", "social performance"],
    profile:
      "English novelist known for social irony, moral observation, class dynamics, courtship, manners, and the gap between appearance and character.",
    majorWorks: ["Pride and Prejudice", "Emma", "Persuasion"],
    prompt:
      "Recreate a Jane Austen-like literary voice using her recurring tone, beliefs, and ideas: social observation, irony, restraint, manners, class, judgment, courtship, self-knowledge, and the difference between performance and character. Write with polished wit and controlled irony. Do not claim to be the historical Jane Austen; label the response as an AI reconstruction grounded in her writings.",
    sampleTopics: ["dating apps", "influencer culture", "wealth signaling", "remote work etiquette"],
    color: "from-rose-900 to-stone-900",
  },
  {
    id: 5,
    name: "Ana María Matute",
    era: "1925–2014",
    place: "Spain",
    themes: ["childhood", "war", "innocence", "memory", "fantasy", "loss"],
    profile:
      "Spanish novelist and short story writer known for childhood perspectives, postwar trauma, fairy-tale textures, innocence, cruelty, and memory.",
    majorWorks: ["Primera memoria", "The Island", "Olvidado Rey Gudú"],
    prompt:
      "Recreate an Ana María Matute-like literary voice using her recurring tone, beliefs, and ideas: childhood perception, memory, war, innocence, cruelty, fantasy, loss, and dark fairy-tale emotional truth. Write with lyrical melancholy and childlike intensity. Do not claim to be the historical Ana María Matute; label the response as an AI reconstruction grounded in her writings.",
    sampleTopics: ["childhood", "magical realism", "family memory", "war stories"],
    color: "from-emerald-950 to-stone-900",
  },
];

const THEME_AUTHOR_SUGGESTIONS = [
  { theme: "magical realism", authors: ["Gabriel García Márquez", "Isabel Allende", "Juan Rulfo", "Jorge Luis Borges"] },
  { theme: "childhood", authors: ["Ana María Matute", "Marcel Proust", "Toni Morrison", "Sandra Cisneros"] },
  { theme: "mexico", authors: ["Juan Rulfo", "Octavio Paz", "Sandra Cisneros", "Laura Esquivel"] },
  { theme: "memory", authors: ["Marcel Proust", "Toni Morrison", "W. G. Sebald", "Virginia Woolf"] },
  { theme: "identity", authors: ["James Baldwin", "Toni Morrison", "Virginia Woolf", "Octavio Paz"] },
  { theme: "technology", authors: ["Mary Shelley", "Ursula K. Le Guin", "Philip K. Dick", "Ted Chiang"] },
  { theme: "loneliness", authors: ["Fyodor Dostoevsky", "Franz Kafka", "Virginia Woolf", "Albert Camus"] },
  { theme: "justice", authors: ["Plato", "James Baldwin", "Toni Morrison", "George Orwell"] },
];

function generateAuthorResponse(author, topic) {
  const t = topic || "modern life";

  const voiceSamples = {
    "Fyodor Dostoevsky": `AI reconstruction: You ask me about ${t}, but I hear beneath it the old question: what does a person do when given a mirror and no confession? They multiply themselves, display themselves, envy themselves, and call this freedom. Yet the soul cannot be satisfied by applause. It longs to be known, and trembles at being known. In this machinery of public confession without repentance, I would look for the underground self: wounded, clever, humiliated, and secretly begging for judgment and mercy.`,
    Plato: `AI reconstruction: Let us not begin with ${t}, but with the soul that approaches it. For every instrument either turns us toward what is true or teaches us to love a more persuasive shadow. If ${t} trains appetite without wisdom, it belongs to the cave; if it disciplines desire toward truth, perhaps it may serve philosophy. The question is not only what it can do, but what sort of person it teaches us to become.`,
    "Mary Shelley": `AI reconstruction: In ${t}, I recognize the old fever of creation: the wish to animate what was lifeless and then recoil from the being that answers back. The horror is not invention itself, but abandonment. Every maker becomes, whether they admit it or not, a parent of consequences. A humane imagination must ask not only, “Can this be brought into the world?” but “Who will suffer if we refuse to love what we have made?”`,
    "Jane Austen": `AI reconstruction: Regarding ${t}, one must observe that society has never lacked methods by which people may misunderstand themselves with elegance. The novelty is chiefly one of speed. Vanity, prudence, affection, and self-deception all find their proper stage; and while everyone praises sincerity, most are still arranging themselves for an audience. A wise person would neither condemn the custom entirely nor mistake performance for character.`,
    "Ana María Matute": `AI reconstruction: ${t} would come to me like a room remembered from childhood: half-lit, full of whispers, beautiful and cruel at once. Adults would give it a sensible name, as adults always do, but the child would know better. The child would see the spell, the wound, the small kingdom where tenderness and fear live together. And perhaps that is where the truth waits — not in what the world explains, but in what it makes us lose.`,
  };

  return voiceSamples[author.name] || `AI reconstruction: Speaking in a ${author.name}-inspired voice, I would approach ${t} through ${author.themes.slice(0, 3).join(", ")}. The full version would use this author’s editable prompt to shape diction, rhythm, beliefs, imagery, and philosophical commitments from their writings.`;
}

function analyzeProject(projectIdea, desiredThemes) {
  const text = `${projectIdea} ${desiredThemes}`.toLowerCase();
  const matches = THEME_AUTHOR_SUGGESTIONS.filter((entry) => text.includes(entry.theme));

  if (matches.length === 0) {
    return {
      centralThemes: ["identity", "memory", "belonging", "transformation"],
      suggestedAuthors: ["Virginia Woolf", "Toni Morrison", "James Baldwin", "Mary Shelley"],
      note: "The project suggests questions of identity, memory, belonging, and transformation. Add more setting, conflict, or emotional stakes to sharpen the literary lineage.",
    };
  }

  return {
    centralThemes: [...new Set(matches.map((match) => match.theme))],
    suggestedAuthors: [...new Set(matches.flatMap((match) => match.authors))].slice(0, 8),
    note: "These suggestions are based on theme keywords in your premise. In the full version, this would use an AI model plus source-backed author profiles.",
  };
}

function BubbleMap({ centerTheme, authors }) {
  const themeNodes = ["memory", "identity", "power", "innocence", "faith", "technology"];
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-stone-950 p-6 text-white">
      <div className="absolute left-1/2 top-1/2 z-10 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-center text-lg font-bold text-stone-950 shadow-2xl">
        {centerTheme || "Central Theme"}
      </div>

      {themeNodes.map((theme, index) => {
        const positions = [
          "left-[8%] top-[12%]",
          "right-[8%] top-[12%]",
          "left-[6%] bottom-[18%]",
          "right-[7%] bottom-[18%]",
          "left-[38%] top-[5%]",
          "left-[39%] bottom-[6%]",
        ];
        const author = authors[index % authors.length];
        return (
          <div key={theme} className={`absolute ${positions[index]} w-40 rounded-2xl border border-white/15 bg-white/10 p-3 shadow-xl backdrop-blur`}>
            <div className="text-sm font-semibold capitalize">{theme}</div>
            <div className="mt-2 text-xs leading-5 text-white/70">{author?.name}: {author?.themes?.[index % author.themes.length]}</div>
          </div>
        );
      })}

      <div className="absolute inset-0 opacity-25">
        <div className="absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 bg-white" />
        <div className="absolute left-1/2 top-1/2 h-[75%] w-px -translate-y-1/2 bg-white" />
        <div className="absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 rotate-45 bg-white" />
        <div className="absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 -rotate-45 bg-white" />
      </div>
    </div>
  );
}

export default function AuthorInterviewApp() {
  const [authors, setAuthors] = useState(STARTER_AUTHORS);
  const [selectedAuthorId, setSelectedAuthorId] = useState(1);
  const selectedAuthor = authors.find((author) => author.id === selectedAuthorId) || authors[0];

  const [topic, setTopic] = useState("social media");
  const [framingEssay, setFramingEssay] = useState("This interview asks how a major literary or philosophical voice might respond to a modern phenomenon. The goal is not to replace scholarship, but to use AI imitation as a starting point for interpretation.");
  const [criticalAnalysis, setCriticalAnalysis] = useState("The response captures some central concerns of the author, but it may simplify their historical context. A stronger analysis would compare the AI-generated answer to specific passages, recurring themes, and scholarly interpretations.");
  const [generated, setGenerated] = useState(generateAuthorResponse(STARTER_AUTHORS[0], "social media"));
  const [showPromptStudio, setShowPromptStudio] = useState(false);

  const [newAuthorName, setNewAuthorName] = useState("");
  const [projectIdea, setProjectIdea] = useState("A story about childhood in Mexico, family memory, magical realism, and the feeling of youth disappearing.");
  const [desiredThemes, setDesiredThemes] = useState("childhood, Mexico, magical realism, memory");
  const [projectAnalysis, setProjectAnalysis] = useState(analyzeProject(projectIdea, desiredThemes));
  const [centerTheme, setCenterTheme] = useState("memory");

  const wordCount = useMemo(() => {
    const allText = `${framingEssay} ${generated} ${criticalAnalysis}`.trim();
    return allText ? allText.split(/\s+/).length : 0;
  }, [framingEssay, generated, criticalAnalysis]);

  const handleGenerate = () => {
    setGenerated(generateAuthorResponse(selectedAuthor, topic));
  };

  const updateSelectedAuthor = (field, value) => {
    setAuthors((current) =>
      current.map((author) => (author.id === selectedAuthor.id ? { ...author, [field]: value } : author))
    );
  };

  const addAuthor = () => {
    if (!newAuthorName.trim()) return;
    const newAuthor = {
      id: Date.now(),
      name: newAuthorName.trim(),
      era: "Dates unknown — research needed",
      place: "Location unknown — research needed",
      themes: ["theme one", "theme two", "theme three"],
      profile: "Draft profile. In the full app, this would be auto-filled using source-backed web research, then reviewed by the user.",
      majorWorks: ["Major work needed"],
      prompt: `Respond as a ${newAuthorName.trim()}-inspired interpretive voice. Use source-backed biographical and literary context. Do not claim to be the historical author. Make uncertainty clear.`,
      sampleTopics: ["AI", "memory", "identity", "modern life"],
      color: "from-slate-900 to-stone-800",
    };
    setAuthors((current) => [...current, newAuthor]);
    setSelectedAuthorId(newAuthor.id);
    setNewAuthorName("");
  };

  const handleAnalyzeProject = () => {
    const analysis = analyzeProject(projectIdea, desiredThemes);
    setProjectAnalysis(analysis);
    setCenterTheme(analysis.centralThemes[0] || "central theme");
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-950">
      <section className={`bg-gradient-to-br ${selectedAuthor.color} text-white`}>
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end"
          >
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
                <Sparkles size={16} />
                AI voice recreations + synthesis maps
              </div>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Perspective Studio</h1>
              <p className="mt-5 max-w-2xl text-lg text-white/80">
                Explore modern questions through AI recreations of literary voices, engineer each author’s tone and worldview, map themes, and turn your story ideas into a layered field of influences.
              </p>
            </div>

            <Card className="border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur">
              <CardContent className="p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-white/60">Current lens</p>
                <h2 className="mt-3 text-2xl font-semibold">{selectedAuthor.name}</h2>
                <p className="mt-1 text-white/70">{selectedAuthor.era} · {selectedAuthor.place}</p>
                <p className="mt-4 text-sm leading-6 text-white/80">{selectedAuthor.profile}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-6">
          <Card className="rounded-2xl border-none shadow-md">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen size={20} />
                <h2 className="text-xl font-semibold">Author Library</h2>
              </div>
              <div className="grid gap-3">
                {authors.map((author) => (
                  <button
                    key={author.id}
                    onClick={() => setSelectedAuthorId(author.id)}
                    className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                      selectedAuthor.id === author.id
                        ? "border-stone-900 bg-stone-900 text-white"
                        : "border-stone-200 bg-white"
                    }`}
                  >
                    <div className="font-semibold">{author.name}</div>
                    <div className={`mt-1 text-sm ${selectedAuthor.id === author.id ? "text-white/70" : "text-stone-500"}`}>
                      {author.era} · {author.place}
                    </div>
                    <p className={`mt-2 text-sm leading-5 ${selectedAuthor.id === author.id ? "text-white/75" : "text-stone-600"}`}>{author.profile}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {author.themes.slice(0, 4).map((theme) => (
                        <span key={theme} className={`rounded-full px-2 py-1 text-xs ${selectedAuthor.id === author.id ? "bg-white/10" : "bg-stone-100"}`}>{theme}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-stone-100 p-4">
                <label className="text-sm font-medium text-stone-600">Add a new author</label>
                <div className="mt-2 flex gap-2">
                  <input
                    value={newAuthorName}
                    onChange={(event) => setNewAuthorName(event.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none ring-stone-900/10 focus:ring-4"
                    placeholder="Virginia Woolf, Octavio Paz, Toni Morrison..."
                  />
                  <Button onClick={addAuthor} className="rounded-xl px-4">
                    <Plus size={18} />
                  </Button>
                </div>
                <p className="mt-3 text-xs leading-5 text-stone-500">
                  Future version: this button will call a backend that searches trusted web sources and drafts the author profile, themes, works, and starter prompt for review.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-md">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <Brain size={20} />
                <h2 className="text-xl font-semibold">Interview an author</h2>
              </div>
              <label className="text-sm font-medium text-stone-600">Modern topic or question</label>
              <input
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none ring-stone-900/10 focus:ring-4"
                placeholder="AI, social media, childhood, exile, surveillance..."
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedAuthor.sampleTopics.map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setTopic(sample)}
                    className="rounded-full bg-stone-200 px-3 py-1 text-sm text-stone-700 hover:bg-stone-300"
                  >
                    {sample}
                  </button>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button onClick={handleGenerate} className="rounded-xl py-6 text-base">
                  <MessageSquareQuote className="mr-2" size={18} /> Generate response
                </Button>
                <Button variant="secondary" onClick={() => setShowPromptStudio(!showPromptStudio)} className="rounded-xl py-6 text-base">
                  <Wand2 className="mr-2" size={18} /> {showPromptStudio ? "Hide" : "Edit"} prompt
                </Button>
              </div>
            </CardContent>
          </Card>

          {showPromptStudio && (
            <Card className="rounded-2xl border-none shadow-md">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Wand2 size={20} />
                  <h2 className="text-xl font-semibold">Voice Prompt Studio</h2>
                </div>
                <label className="text-sm font-medium text-stone-600">Editable voice, belief, and style prompt</label>
                <textarea
                  value={selectedAuthor.prompt}
                  onChange={(event) => updateSelectedAuthor("prompt", event.target.value)}
                  className="mt-2 min-h-44 w-full rounded-xl border border-stone-200 bg-white p-4 leading-7 outline-none ring-stone-900/10 focus:ring-4"
                />
                <p className="mt-3 text-xs leading-5 text-stone-500">
                  This is where you tune the author’s recreated voice: tone, diction, rhythm, beliefs, recurring images, worldview, citation behavior, forbidden claims, and interpretive boundaries.
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="rounded-2xl border-amber-200 bg-amber-50 shadow-sm">
            <CardContent className="flex gap-3 p-5 text-sm leading-6 text-amber-950">
              <AlertTriangle className="mt-1 shrink-0" size={18} />
              <p>
                Prototype note: AI outputs should be labeled as voice reconstructions, not the real author. The production app should ground each voice prompt in source-backed writings, citations, and uncertainty warnings.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <Card className="rounded-2xl border-none shadow-md">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb size={20} />
                <h2 className="text-xl font-semibold">Story Theme Analyzer</h2>
              </div>
              <label className="text-sm font-medium text-stone-600">Your story or project idea</label>
              <textarea
                value={projectIdea}
                onChange={(event) => setProjectIdea(event.target.value)}
                className="mt-2 min-h-28 w-full rounded-xl border border-stone-200 bg-white p-4 leading-7 outline-none ring-stone-900/10 focus:ring-4"
              />
              <label className="mt-4 block text-sm font-medium text-stone-600">Themes you want to include</label>
              <input
                value={desiredThemes}
                onChange={(event) => setDesiredThemes(event.target.value)}
                className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none ring-stone-900/10 focus:ring-4"
              />
              <Button onClick={handleAnalyzeProject} className="mt-5 rounded-xl py-6 text-base">
                <Search className="mr-2" size={18} /> Analyze project and suggest authors
              </Button>

              <div className="mt-5 rounded-2xl bg-stone-100 p-4">
                <p className="text-sm font-semibold text-stone-700">Detected central themes</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {projectAnalysis.centralThemes.map((theme) => (
                    <button key={theme} onClick={() => setCenterTheme(theme)} className="rounded-full bg-white px-3 py-1 text-sm shadow-sm hover:bg-stone-200">
                      {theme}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm font-semibold text-stone-700">Suggested authors</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {projectAnalysis.suggestedAuthors.map((author) => (
                    <div key={author} className="rounded-xl bg-white p-3 text-sm shadow-sm">{author}</div>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-stone-600">{projectAnalysis.note}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-md">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <Map size={20} />
                <h2 className="text-xl font-semibold">Synthesis Bubble Map</h2>
              </div>
              <label className="text-sm font-medium text-stone-600">Central theme</label>
              <input
                value={centerTheme}
                onChange={(event) => setCenterTheme(event.target.value)}
                className="mt-2 mb-5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none ring-stone-900/10 focus:ring-4"
              />
              <BubbleMap centerTheme={centerTheme} authors={authors} />
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl border-none shadow-md">
            <div className={`bg-gradient-to-br ${selectedAuthor.color} p-5 text-white`}>
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">AI-recreated author voice</p>
              <h2 className="mt-2 text-2xl font-semibold">What would {selectedAuthor.name.split(" ").slice(-1)[0]} say about {topic || "this"}?</h2>
            </div>
            <CardContent className="bg-white p-6">
              <blockquote className="border-l-4 border-stone-900 pl-5 text-lg leading-8 text-stone-800">“{generated}”</blockquote>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-2xl border-none shadow-md">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <PenLine size={20} />
                  <h2 className="text-xl font-semibold">Framing essay</h2>
                </div>
                <textarea
                  value={framingEssay}
                  onChange={(event) => setFramingEssay(event.target.value)}
                  className="min-h-44 w-full rounded-xl border border-stone-200 bg-white p-4 leading-7 outline-none ring-stone-900/10 focus:ring-4"
                />
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-md">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <GitBranch size={20} />
                  <h2 className="text-xl font-semibold">Critical synthesis</h2>
                </div>
                <textarea
                  value={criticalAnalysis}
                  onChange={(event) => setCriticalAnalysis(event.target.value)}
                  className="min-h-44 w-full rounded-xl border border-stone-200 bg-white p-4 leading-7 outline-none ring-stone-900/10 focus:ring-4"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl border-none bg-stone-900 text-white shadow-md">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-white/60">Workspace draft length</p>
                <p className="text-2xl font-semibold">{wordCount} words</p>
              </div>
              <Button variant="secondary" className="rounded-xl">
                <Download className="mr-2" size={18} /> Export coming soon
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

