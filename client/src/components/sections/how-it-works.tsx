import { Search, CheckCircle, Briefcase } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search a Job",
    description: "Find a job either by making a search in the search box or by scrolling down to see the list of the latest jobs available.",
  },
  {
    icon: CheckCircle,
    title: "Check the requirements",
    description: "Read the requirements. Make sure you are eligible before you apply. Give special attention to academics and experience required, along with work location.",
  },
  {
    icon: Briefcase,
    title: "Apply for Job",
    description: "Fill out the job application by entering the required information. An agent will review your application and if eligible you will get notified for an interview.",
  },
];

export default function HowItWorks() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-sm font-semibold text-primary mb-2">Looking for a Job?</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-3d">See How it Works</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Our streamlined process makes finding your next opportunity simple and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="text-center space-y-4 sm:space-y-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 
                    className="text-lg sm:text-xl font-semibold text-foreground px-2 sm:px-0"
                    data-testid={`step-title-${index + 1}`}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-sm sm:text-base text-muted-foreground px-4 sm:px-2 md:px-0 leading-relaxed"
                    data-testid={`step-description-${index + 1}`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
