"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [demoInput, setDemoInput] = useState("");
  const [demoResponse, setDemoResponse] = useState(
    "Ask the system about missed leads, slow response times, CRM workflows, automation, or AI use cases."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Describe a business problem, and I’ll break it down into the problem, AI workflow, CRM logic, automation path, and recommended next steps.",
    },
  ]);

  const quickQuestions = [
    "How would AI reduce missed customer messages?",
    "How would AI improve follow-up for sales leads?",
    "How does an API connect AI to a CRM?",
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
            <a href="#value" className="hover:text-white">
              Value
            </a>
            <a href="#case-studies" className="hover:text-white">
              Case Studies
            </a>
            <a href="#framework" className="hover:text-white">
              Framework
            </a>
            <a href="#demo" className="hover:text-white">
              Demo
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
              AI Solutions • Workflow Automation • Business Systems
            </p>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
              I design AI systems that help businesses capture leads, automate
              follow-ups, and increase conversions.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              I focus on turning real business problems into intelligent
              workflows using AI, CRM logic, APIs, automation, and human
              handoff. This portfolio demonstrates how I analyze problems,
              design AI-enabled systems, and connect technology to measurable
              business outcomes.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#demo"
                className="rounded-full bg-white px-6 py-3 text-center font-semibold text-black transition hover:bg-cyan-200"
              >
                Try the AI Systems Demo
              </a>

              <a
                href="#case-studies"
                className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
              >
                View Business Use Cases
              </a>
            </div>

            <div className="mt-10 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
              {[
                "AI Solutions Analyst",
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
              <p className="text-sm text-cyan-300">Business System Blueprint</p>

              <h2 className="mt-3 text-2xl font-bold">
                The value is not just the AI tool. The value is the system
                around it.
              </h2>

              <p className="mt-4 text-white/60">
                A profitable AI use case starts with a business gap: missed
                leads, slow response times, repetitive work, scattered customer
                data, or poor follow-up. The solution is a clear workflow that
                captures data, uses AI intelligently, automates action, and
                routes complex issues to people.
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  "Business Problem → AI Use Case",
                  "Customer Input → API Route → AI Response",
                  "AI Output → CRM Record → Follow-Up Workflow",
                  "Human Handoff → Quality Control → Better Outcomes",
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

      <section id="value" className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "What I Solve",
              desc: "Missed leads, slow customer response, weak follow-up, repetitive questions, and disconnected workflows.",
            },
            {
              title: "How I Think",
              desc: "I map the full system: input, data capture, AI reasoning, CRM memory, automation, human handoff, and feedback.",
            },
            {
              title: "Business Outcome",
              desc: "Faster response times, better lead engagement, fewer lost opportunities, and clearer next steps for teams.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/65">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="proof" className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:grid-cols-4">
          {[
            "Live Next.js Portfolio",
            "OpenAI API Integration",
            "Business-Focused AI Demo",
            "Workflow + CRM Logic",
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

      <section id="case-studies" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Business Case Studies
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            AI systems designed around real business problems.
          </h2>

          <p className="mt-6 text-white/70">
            These case studies show how I think through the problem, workflow,
            AI layer, automation path, and business impact.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Missed Customer Messages",
              problem:
                "Businesses lose leads when customer messages are answered too late or not answered at all.",
              system:
                "AI assistant responds instantly, captures lead details, answers common questions, and escalates complex issues to a human.",
              workflow:
                "Message → AI Response → Lead Capture → CRM Update → Human Handoff",
              outcome:
                "Improves response coverage, reduces missed opportunities, and increases trust with prospects.",
            },
            {
              title: "Weak Follow-Up Process",
              problem:
                "Leads show interest, but teams forget to follow up or do not know when to re-engage.",
              system:
                "CRM workflow stores lead status, triggers timed follow-ups, and uses AI-generated messages based on customer interest.",
              workflow:
                "Lead Captured → CRM Tag → Follow-Up Sequence → Booking Link → Pipeline Tracking",
              outcome:
                "Creates consistent engagement and turns more conversations into booked appointments.",
            },
            {
              title: "Overloaded Teams",
              problem:
                "Employees spend too much time answering repeated questions, searching for information, and drafting responses.",
              system:
                "Internal AI assistant helps summarize, draft, research, route tasks, and support team decision-making.",
              workflow:
                "Team Request → AI Assistant → Knowledge Support → Draft/Summary → Human Review",
              outcome:
                "Reduces manual workload and helps teams move faster without removing human judgment.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>

              <p className="mt-4 text-sm leading-6 text-red-300">
                <span className="font-bold">Problem:</span> {item.problem}
              </p>

              <p className="mt-4 text-sm leading-6 text-cyan-300">
                <span className="font-bold">System:</span> {item.system}
              </p>

              <p className="mt-4 text-sm leading-6 text-yellow-200">
                <span className="font-bold">Workflow:</span> {item.workflow}
              </p>

              <p className="mt-5 text-sm leading-6 text-green-400">
                <span className="font-bold">Outcome:</span> {item.outcome}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="framework" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            My AI Solution Framework
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            I start with the business outcome, then design the system.
          </h2>

          <p className="mt-6 text-white/70">
            A strong AI solution is not just about using a model. It requires a
            clear problem, clean workflow, useful data, guardrails, automation,
            and measurable results.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {[
            {
              step: "01",
              title: "Identify the Gap",
              desc: "Find where the business loses time, revenue, visibility, or customer engagement.",
            },
            {
              step: "02",
              title: "Map the Workflow",
              desc: "Break the process into inputs, decisions, data storage, actions, and escalation points.",
            },
            {
              step: "03",
              title: "Select the AI Layer",
              desc: "Choose whether the problem needs reactive automation, deliberative AI, autonomous agents, CRM logic, or human handoff.",
            },
            {
              step: "04",
              title: "Measure the Result",
              desc: "Define success through response rate, booked meetings, conversion rate, workload reduction, or customer satisfaction.",
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

      <section id="systems" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            AI System Layers
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Matching the right AI layer to the right business problem.
          </h2>

          <p className="mt-6 text-white/70">
            Different AI systems serve different purposes. The key is knowing
            when to use each layer and how to connect it to a real business
            workflow.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Reactive AI",
              subtitle: "Fast Answers",
              desc: "Handles simple, repeated questions such as pricing, hours, location, policies, or FAQs.",
              best: "High-volume basic questions",
              limit: "Does not deeply personalize or reason through complex needs",
            },
            {
              title: "Deliberative AI",
              subtitle: "Guided Decisions",
              desc: "Understands context, asks clarifying questions, recommends next steps, and adapts to the customer’s response.",
              best: "Sales conversations, product fit, lead qualification, and support guidance",
              limit: "Needs controlled knowledge, guardrails, and human review for sensitive issues",
            },
            {
              title: "Autonomous AI",
              subtitle: "Workflow Execution",
              desc: "Completes multi-step tasks such as follow-ups, booking reminders, CRM updates, routing, and workflow triggers.",
              best: "Operations, lead nurture, scheduling, and repeatable business processes",
              limit: "Requires clear permissions, rules, monitoring, and escalation paths",
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

      <section id="demo" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20 backdrop-blur lg:grid-cols-2 md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Live AI Systems Demo
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Test how I think through AI workflow problems.
            </h2>

            <p className="mt-6 text-white/70">
              This assistant demonstrates how I analyze a business issue,
              explain the system design, identify where automation fits, and
              recommend practical next steps.
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
                AI Systems Assistant
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
            Demonstrations that connect AI to measurable workflows.
          </h2>
          <p className="mt-6 text-white/70">
            Each system is designed around the same principle: find the business
            gap, map the workflow, choose the AI layer, automate the next step,
            and measure the outcome.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "AI Customer Response Engine",
              desc: "Incoming messages are answered quickly, lead details are captured, and complex questions are routed to a person.",
              outcome: "Improves response speed and reduces missed customer opportunities",
            },
            {
              title: "Lead Capture + Follow-Up System",
              desc: "Website forms, social messages, or inbound leads connect to CRM logic and timed follow-up sequences.",
              outcome: "Creates consistent engagement and better appointment flow",
            },
            {
              title: "Internal AI Workflow Assistant",
              desc: "Teams use AI to summarize, draft, research, classify requests, and reduce repetitive administrative work.",
              outcome: "Improves productivity and helps teams make faster decisions",
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

      <section id="tools" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Tools & Concepts
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            The tools matter, but the workflow matters more.
          </h2>
          <p className="mt-6 text-white/70">
            I focus on how tools connect: AI models for reasoning, APIs for
            communication, CRM systems for memory, automation platforms for
            action, and analytics for improvement.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "AI Models",
              use: "Understand messages, generate responses, summarize, recommend, and reason through business needs.",
            },
            {
              name: "APIs",
              use: "Connect websites, apps, CRMs, AI services, forms, calendars, and messaging systems.",
            },
            {
              name: "CRM Systems",
              use: "Store lead information, track customer status, manage follow-ups, and support pipeline visibility.",
            },
            {
              name: "Automation",
              use: "Trigger actions such as reminders, follow-ups, routing, notifications, and workflow updates.",
            },
          ].map((tool) => (
            <div
              key={tool.name}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-bold">{tool.name}</h3>
              <p className="mt-4 text-sm leading-6 text-white/60">
                {tool.use}
              </p>
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
            I’m focused on AI Solutions, workflow automation, CRM-connected
            systems, and business process improvement. Reach me directly at
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