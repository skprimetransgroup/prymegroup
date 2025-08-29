import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Access to the very best professionals in Canada.",
  "Focus on your own core business while we focus on your needs.",
  "Lower cost of Hiring, overall higher efficiency"
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Why we are one of the best workforce solution providers since 2016.
              </h2>
              <p className="text-lg text-muted-foreground">
                Just give us a few details, and let us get to work — with matching technology that instantly identifies the best available local and national talent, and staffing specialists that help you quickly close the deal.
              </p>
              <p className="text-lg font-semibold text-foreground">
                Find the best talent, in the right location, at the right cost with Prime Trans Group.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div 
                    className="text-muted-foreground"
                    data-testid={`benefit-${index + 1}`}
                  >
                    {benefit}
                  </div>
                </div>
              ))}
            </div>

            <Button className="px-8 py-3" data-testid="button-post-job-cta">
              Post a Job
            </Button>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Executive team meeting in boardroom"
              className="rounded-xl shadow-xl w-full h-auto"
              data-testid="img-why-choose-us"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
