import { ChevronDownIcon } from "lucide-react";

export function FaqsSection({ mentorName }: { mentorName: string }) {
  const firstName = mentorName.split(" ")[0] ?? mentorName;

  const faqs = [
    {
      question: "How do sessions work?",
      answer: `Pick a duration and a time slot, and you'll get a video call link by email. ${firstName} will join at the scheduled time.`,
    },
    {
      question: "Can I reschedule or cancel a session?",
      answer:
        "Yes. You can reschedule or cancel up to 24 hours before the session starts at no cost.",
    },
    {
      question: "How should I prepare?",
      answer: `Write down your goals and a few specific questions. Sharing your resume or portfolio beforehand helps ${firstName} give more useful feedback.`,
    },
    {
      question: "What if I'm not satisfied with the session?",
      answer:
        "Contact our support team within 48 hours and we'll make it right, either with a re-do or a refund.",
    },
  ];

  return (
    <section id="faqs" className="scroll-mt-32 border-t py-8">
      <h2 className="text-xl font-bold">FAQs</h2>
      <div className="mt-3 divide-y rounded-xl bg-card ring-1 ring-foreground/10">
        {faqs.map((faq) => (
          <details key={faq.question} className="group px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
