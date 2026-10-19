import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import { Card, CardContent, CardFooter } from "@repo/ui/components/card";

const testimonials = [
  {
    quote:
      "My session helped me get clarity on my career path. The mentor was super helpful and practical with their advice.",
    name: "Rohan Mehta",
    role: "Software Engineer",
  },
  {
    quote:
      "Loved the experience! Got actionable feedback on my portfolio and interview prep.",
    name: "Priya Sharma",
    role: "UI/UX Designer",
  },
  {
    quote:
      "The mentorship session gave me a new perspective and helped me transition into product management.",
    name: "Aman Verma",
    role: "Product Manager",
  },
];

export function Testimonials() {
  return (
    <section className="bg-primary/5">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            What learners say
          </h2>
          <p className="mt-2 text-muted-foreground">
            Real stories from people who&apos;ve grown with Mentora.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map(({ quote, name, role }) => (
            <Card key={name}>
              <CardContent className="flex-1">
                <blockquote className="text-sm leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </CardContent>
              <CardFooter className="gap-3 border-t-0 bg-transparent">
                <Avatar size="lg">
                  <AvatarFallback>
                    {name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
