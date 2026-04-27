"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [demoInput, setDemoInput] = useState("");
  const [demoResponse, setDemoResponse] = useState(
    "Ask the system about AI automation, customer response, CRM workflows, or business use cases."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ask me about a business problem, and I’ll break it down into the problem, system design, AI workflow, and next steps.",
    },
  ]);

  const quickQuestions = [
    "How would AI automate customer follow-up for a dealership?",
    "How does an API connect AI to a CRM?",
    "What AI system would reduce missed customer messages?",
    "How would you design an AI assistant for a small business?",
  ];

  async function runDemo(customMessage?: string) {
    const message = (customMessage || demoInput).trim();

    if (!message) {
      setDemoResponse(
        "Enter a business problem first. Example: We are missing customer messages and need better follow-up."
      );
      return;
    }

    const userMessage: Message = { role: "user", content: message };
    setMessages((current) => [...current, userMessage]);
    setDemoInput("");

    try {
      setIsLoading(true);
      setDemoResponse(
        "Analyzing the business problem and building an AI systems recommendation..."
      );

      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("The AI system could not complete the request.");
      }

      const data = await response.json();
      const output = data.output || "The AI system returned no response.";

      setDemoResponse(output);
      setMessages((current) => [
        ...current,
        { role: "assistant", content: output },
      ]);
    } catch (error) {
      const fallback =
        "Something went wrong while connecting to the AI system. Check the API route, OpenAI key, and Vercel environment variable.";

      setDemoResponse(fallback);
      setMessages((current) => [
        ...current,
        { role: "assistant", content: fallback },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[30%] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between py-6">
          <a href="/" className="text-xl font-bold tracking-tight">
            AI Systems Lab
          </a>

          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#framework" className="hover:text-white">
              Framework
            </a>
            <a href="#case-studies" className="hover:text-white">
              Case Studies
            </a>
            <a href="#demo" className="hover:text-white">
              Assistant
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://www.linkedin.com/in/anthony-spearman-5466a61b6/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/TreveccaStudentpy/ai-systems-lab"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              GitHub
            </a>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              AI Systems • Automation • Business Workflows
            </p>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
              I design AI systems that turn business problems into clear next steps.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              AI Systems Lab is a live portfolio project built to demonstrate how
              AI, APIs, automation, CRM logic, and workflow design can help
              organizations respond faster, reduce manual work, and make better
              decisions.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#demo"
                className="rounded-full bg-white px-6 py-3 text-center font-semibold text-black transition hover:bg-cyan-200"
              >
                Try the AI Assistant
              </a>

              <a
                href="#case-studies"
                className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
              >
                View Case Studies
              </a>
            </div>

            <div className="mt-10 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
              {[
                "AI Systems Analyst",
                "AI Automation Specialist",
                "Technical Product Analyst",
              ].map((role) => (
                <div
                  key={role}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center font-semibold"
                >
                  {role}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
            <div className="rounded-[1.5rem] bg-black/40 p-6 ring-1 ring-white/10">
              <p className="text-sm text-cyan-300">System Blueprint</p>

              <h2 className="mt-3 text-2xl font-bold">
                The value is not just the AI tool. The value is the system around it.
              </h2>

              <p className="mt-4 text-white/60">
                A business problem becomes useful when it is mapped into a flow:
                user input, data capture, AI reasoning, automation, CRM updates,
                and human handoff when needed.
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  "Business Problem → AI Use Case",
                  "Website Input → API Route → OpenAI Response",
                  "AI Output → CRM Logic → Follow-Up Workflow",
                  "System Feedback → Better Decisions",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 transition hover:border-cyan-300/30 hover:bg-white/10"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proof" className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:grid-cols-4">
          {[
            "Live Vercel Deployment",
            "Next.js App Router",
            "OpenAI API Integration",
            "Business-Focused AI Demo",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center text-sm font-semibold text-white/80"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="framework" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            AI Decision Framework
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            My process: understand the system before choosing the AI.
          </h2>

          <p className="mt-6 text-white/70">
            This framework shows how I evaluate a business problem, identify the
            friction, choose the right AI system, and connect the solution to a
            measurable outcome.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {[
            {
              step: "01",
              title: "Gather the Signal",
              desc: "Understand the real business issue: missed leads, slow responses, manual work, poor visibility, or scattered data.",
            },
            {
              step: "02",
              title: "Map the Workflow",
              desc: "Break the system into steps: who sends information, where it goes, what gets stored, and where decisions happen.",
            },
            {
              step: "03",
              title: "Match the AI Layer",
              desc: "Choose the right system: LLM, automation, CRM integration, agent workflow, analytics layer, or human handoff.",
            },
            {
              step: "04",
              title: "Define Next Steps",
              desc: "Recommend what should be built, why it matters, how to test it, and what success should look like.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07] hover:shadow-cyan-500/10"
            >
              <p className="text-sm font-bold text-cyan-300">{item.step}</p>
              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/60">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="case-studies" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            AI System Case Studies
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            How I analyze problems and design AI systems.
          </h2>

          <p className="mt-6 text-white/70">
            These examples show how business problems are broken down, mapped to
            AI systems, and turned into practical workflows.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Missed Customer Messages",
              problem:
                "Businesses receive customer messages but respond too late or not at all.",
              analysis:
                "Slow response time creates lost leads, lower trust, and missed revenue opportunities.",
              solution:
                "AI assistant handles incoming questions, captures lead details, and routes complex issues to a human.",
              outcome: "100% response coverage and faster lead conversion",
            },
            {
              title: "No Follow-Up System",
              problem:
                "Leads are captured but follow-up depends on memory, manual effort, or scattered notes.",
              analysis:
                "Without automation, customers fall through the cracks and teams lose visibility.",
              solution:
                "CRM workflow with automated reminders, AI-generated follow-up messages, and pipeline tracking.",
              outcome: "Consistent engagement and fewer lost opportunities",
            },
            {
              title: "Overloaded Teams",
              problem:
                "Teams spend too much time answering repetitive questions and searching for information.",
              analysis:
                "Repetitive work slows down decisions and pulls people away from higher-value tasks.",
              solution:
                "Internal AI assistant for summaries, research, drafting, workflow support, and task routing.",
              outcome: "Reduced workload and faster team output",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>

              <p className="mt-4 text-sm text-red-400">
                Problem: {item.problem}
              </p>

              <p className="mt-3 text-sm text-yellow-300">
                Analysis: {item.analysis}
              </p>

              <p className="mt-3 text-sm text-cyan-300">
                Solution: {item.solution}
              </p>

              <p className="mt-4 text-sm text-green-400">
                → Outcome: {item.outcome}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="systems" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-3xl font-bold md:text-5xl">
          AI Systems & Their Roles
        </h2>

        <p className="mt-6 max-w-3xl text-white/70">
          Not all AI is the same. Each system has a specific function, strength,
          and limitation. Understanding this is what separates automation from
          real business intelligence.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "LLMs",
              subtitle: "Language Models",
              desc: "ChatGPT, Claude, Gemini, and similar models used for conversation, reasoning, writing, and understanding human intent.",
              best: "Customer support, chat systems, research, writing, and knowledge assistants",
              limit:
                "Can hallucinate and may not know real-time information unless connected to trusted data",
            },
            {
              title: "Computer Vision",
              subtitle: "Image & Video AI",
              desc: "AI that interprets images, video, screenshots, documents, objects, faces, and visual patterns.",
              best: "Security, healthcare imaging, quality control, product scanning, and visual search",
              limit:
                "Requires strong image quality, training data, and careful privacy controls",
            },
            {
              title: "Automation Systems",
              subtitle: "Workflow AI",
              desc: "AI connected to tools, CRMs, forms, calendars, email, websites, and business processes.",
              best: "Lead capture, follow-ups, CRM updates, scheduling, support routing, and operations",
              limit: "Only works well when the workflow is designed clearly",
            },
            {
              title: "AI Agents",
              subtitle: "Task-Based Systems",
              desc: "AI systems that can plan, choose tools, complete multi-step tasks, and act across platforms.",
              best: "Research workflows, sales operations, project support, and internal business assistants",
              limit: "Needs guardrails, permissions, and human oversight",
            },
            {
              title: "Predictive AI",
              subtitle: "Forecasting Systems",
              desc: "AI that studies patterns in data to predict outcomes, risks, trends, and future behavior.",
              best: "Sales forecasting, fraud detection, demand planning, and risk analysis",
              limit: "Predictions depend on the quality and honesty of the data",
            },
            {
              title: "Generative AI",
              subtitle: "Content Creation",
              desc: "AI that creates text, images, video, audio, code, designs, and marketing materials.",
              best: "Content creation, branding, prototypes, design support, and rapid idea development",
              limit:
                "Still needs human judgment, taste, review, and brand alignment",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07] hover:shadow-cyan-500/10"
            >
              <p className="text-sm font-semibold text-cyan-300">
                {item.subtitle}
              </p>

              <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>

              <p className="mt-4 text-white/60">{item.desc}</p>

              <div className="mt-6 space-y-3 text-sm">
                <p className="text-green-400">✔ Best For: {item.best}</p>
                <p className="text-red-400">✖ Limitation: {item.limit}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="use-cases" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Business Use Cases
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Where AI actually drives results.
          </h2>

          <p className="mt-6 text-white/70">
            Real value comes from matching the right AI system to a real
            operational problem.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Customer Response Automation",
              desc: "AI answers incoming messages instantly, captures lead data, and routes complex questions to a human.",
              result: "Faster response time and increased conversions",
            },
            {
              title: "CRM + Follow-Up Systems",
              desc: "Every customer interaction is stored and tracked with automated follow-ups and reminders.",
              result: "No lost leads and consistent engagement",
            },
            {
              title: "Internal AI Assistants",
              desc: "AI helps teams research, write, summarize, and complete repetitive tasks across the business.",
              result: "Reduced workload and increased productivity",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07] hover:shadow-cyan-500/10"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-4 text-white/60">{item.desc}</p>
              <p className="mt-6 text-sm text-green-400">
                → Outcome: {item.result}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20 backdrop-blur lg:grid-cols-2 md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              AI Systems Assistant
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Ask how I would solve a business workflow problem with AI.
            </h2>

            <p className="mt-6 text-white/70">
              This assistant demonstrates how AI can analyze a business issue,
              explain the system design, identify implementation steps, and show
              where automation or CRM logic could fit.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-sm font-semibold text-cyan-300">
                Recruiter-friendly prompts
              </p>
              <div className="mt-4 grid gap-3">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => runDemo(question)}
                    disabled={isLoading}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left text-sm text-white/70 transition hover:border-cyan-300/40 hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-cyan-300">
                Live AI Demo
              </p>
              <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-300">
                API Connected
              </span>
            </div>

            <div className="mt-4 max-h-80 space-y-4 overflow-y-auto rounded-2xl border border-white/10 bg-black/30 p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-2xl p-4 text-sm leading-6 ${
                    message.role === "user"
                      ? "ml-auto bg-cyan-300 text-black"
                      : "mr-auto border border-white/10 bg-white/[0.05] text-white/80"
                  }`}
                >
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] opacity-70">
                    {message.role === "user" ? "You" : "Assistant"}
                  </p>
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
              ))}

              {isLoading && (
                <div className="mr-auto rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm text-white/70">
                  Thinking through the problem, system, and next steps...
                </div>
              )}
            </div>

            <textarea
              value={demoInput}
              onChange={(event) => setDemoInput(event.target.value)}
              placeholder="Example: Our team misses Instagram messages and needs a better follow-up process."
              className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300/50"
            />

            <button
              type="button"
              onClick={() => runDemo()}
              disabled={isLoading}
              className="mt-4 w-full rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Thinking..." : "Ask AI Systems Assistant"}
            </button>

            <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-sm font-semibold text-cyan-300">
                Latest System Recommendation
              </p>
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/80">
                {demoResponse}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Featured Systems
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Demonstrations that map AI to real workflows.
          </h2>
          <p className="mt-6 text-white/70">
            Each build shows the problem, the AI system used, and the outcome it
            is designed to create.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "AI Customer Response Engine",
              desc: "Incoming messages → LLM responses → CRM capture → human handoff when needed.",
              outcome: "100% response coverage, faster conversion",
            },
            {
              title: "Lead Capture + Follow-Up System",
              desc: "Forms + website → automation → scheduled follow-ups → pipeline tracking.",
              outcome: "No lost leads, consistent engagement",
            },
            {
              title: "Internal AI Assistant",
              desc: "Team queries → knowledge base + LLM → summaries, drafts, task support.",
              outcome: "Reduced workload, faster decisions",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-4 text-white/60">{item.desc}</p>
              <p className="mt-6 text-sm text-green-400">
                → Outcome: {item.outcome}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="ai-tools" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            AI Tools Compared
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Choosing the right tool for the job.
          </h2>
          <p className="mt-6 text-white/70">
            Each AI tool has strengths. The key is knowing when to use each one,
            what it connects to, and what business problem it actually solves.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "ChatGPT",
              strength: "Best overall reasoning and versatility",
              use: "General AI tasks, automation, writing, system design",
            },
            {
              name: "Claude",
              strength: "Strong structured thinking and long context",
              use: "Deep analysis, documents, business logic",
            },
            {
              name: "Gemini",
              strength: "Google ecosystem + multimodal",
              use: "Search, integrations, workspace productivity",
            },
            {
              name: "Copilot",
              strength: "Code + Microsoft integration",
              use: "Development, enterprise workflows",
            },
            {
              name: "Perplexity",
              strength: "Real-time information + citations",
              use: "Research, fact-checking, current events",
            },
            {
              name: "Midjourney / DALL·E",
              strength: "Visual generation",
              use: "Design, branding, creative assets",
            },
          ].map((tool) => (
            <div
              key={tool.name}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-bold">{tool.name}</h3>
              <p className="mt-4 text-white/60">{tool.strength}</p>
              <p className="mt-4 text-sm text-green-400">→ Use: {tool.use}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Let’s talk AI systems, automation, and business workflows.
          </h2>
          <p className="mt-6 max-w-3xl text-white/70">
            Send a message below or reach me directly at
            <a
              href="mailto:iAnthonySpearman@gmail.com"
              className="ml-1 font-semibold text-cyan-300 hover:text-cyan-200"
            >
              iAnthonySpearman@gmail.com
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-xl font-bold">Quick Contact</h3>

          <form
            action="https://formspree.io/f/mpqkegwn"
            method="POST"
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300/50"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300/50"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              required
              className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-300/50 md:col-span-2"
              rows={4}
            />

            <button
              type="submit"
              className="rounded-xl bg-cyan-400/80 p-3 font-semibold text-black transition hover:bg-cyan-300 md:col-span-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-10">
        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 AI Systems Lab. Built by Anthony Spearman.</p>

          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:iAnthonySpearman@gmail.com"
              className="hover:text-cyan-300"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/anthony-spearman-5466a61b6/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/TreveccaStudentpy/ai-systems-lab"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
