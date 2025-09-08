import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";
import primeLogoPath from "@assets/Prime Group_Final (1)_1756488511870.png";
import { publicJobSchema } from "@shared/schema";
import type { z } from "zod";
import Header from "@/components/layout/header";

type JobFormData = z.infer<typeof publicJobSchema>;

export default function PostJobPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<JobFormData>({
    resolver: zodResolver(publicJobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      company: "",
      type: "",
      category: "",
      requirements: "",
      salary: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const jobTypes = ["Full-Time", "Part-time", "Contract", "Remote"];
  const jobCategories = [
    "Manufacturing",
    "Transportation", 
    "Warehouse",
    "Administrative",
    "Food Service",
    "Healthcare",
    "Construction",
    "Retail",
    "Other"
  ];

  const onSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/jobs/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Job submitted successfully!",
          description: "Your job posting is under review and will be published once approved.",
        });
      } else {
        toast({
          title: "Submission failed",
          description: result.message || "Please check your information and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to submit job posting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Job Posted Successfully!
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Thank you for posting with Prime Trans Group. Your job listing is now under review 
              and will be published on our website once approved by our team.
            </p>
            <div className="space-x-4">
              <Button onClick={() => setLocation("/")} variant="outline">
                Back to Home
              </Button>
              <Button onClick={() => setLocation("/jobs")}>
                Browse Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background via-background to-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <img 
                src={primeLogoPath} 
                alt="Prime Trans Group" 
                className="h-20 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Post a Job Opening
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with talented candidates through Prime Trans Group's extensive network. 
              Post your job today and find the perfect fit for your team.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Fill out the form below to post your job. All submissions are reviewed before being published.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Senior Software Developer"
                              {...field}
                              data-testid="input-job-title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your company name"
                              {...field}
                              data-testid="input-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-job-type">
                                <SelectValue placeholder="Select job type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {jobTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {jobCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Toronto, ON"
                              {...field}
                              data-testid="input-location"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Range</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. $50,000 - $70,000"
                              {...field}
                              value={field.value || ""}
                              data-testid="input-salary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                            className="min-h-[120px]"
                            {...field}
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List the qualifications, skills, and experience required..."
                            className="min-h-[100px]"
                            {...field}
                            value={field.value || ""}
                            data-testid="textarea-requirements"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="hiring@company.com"
                              {...field}
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone *</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              {...field}
                              data-testid="input-contact-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-6 border-t border-border">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <p className="text-sm text-muted-foreground">
                        By submitting this form, you agree to our terms and conditions. 
                        All job postings are subject to approval.
                      </p>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto"
                        data-testid="button-submit-job"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Job for Review
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}