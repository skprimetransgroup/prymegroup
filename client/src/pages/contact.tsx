import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SEOManager, { SEOConfigs } from "@/components/seo/SEOManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Building2, 
  Users, 
  CheckCircle,
  MessageSquare,
  Calendar
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  company: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      company: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Contact form submitted:", data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    form.reset();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <SEOManager data={SEOConfigs.contact} />
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-12 rounded-3xl border border-primary/20">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-secondary mb-4">
                Message Sent Successfully!
              </h1>
              <p className="text-lg text-secondary/80 mb-8">
                Thank you for reaching out to Pryme Group. Our team will review your message 
                and get back to you within 24 hours during business days.
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => setIsSubmitted(false)} 
                  className="bg-primary hover:bg-primary/90 text-white mr-4"
                >
                  Send Another Message
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = "/"}
                  className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOManager data={SEOConfigs.contact} />
      <Header />
      
      {/* Enhanced Hero Section */}
      <div className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm border border-primary/20">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get in Touch with Our Team
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            
            <p className="text-2xl text-secondary/80 max-w-3xl mx-auto leading-relaxed mb-12">
              Ready to take the next step in your career? Have questions about our services? 
              We're here to help connect you with the right opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Address Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">Visit Our Office</h3>
              <p className="text-secondary/80 text-sm leading-relaxed">
                7050 Bramalea Rd Unit 14A<br />
                Mississauga, ON L5S 1T1<br />
                Canada
              </p>
            </CardContent>
          </Card>

          {/* Phone Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">Call Us</h3>
              <p className="text-secondary/80 text-sm leading-relaxed">
                <a href="tel:249-444-0004" className="hover:text-primary transition-colors font-semibold">
                  249-444-0004
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">Email Us</h3>
              <p className="text-secondary/80 text-sm leading-relaxed">
                <a href="mailto:jobs@primetransgroup.ca" className="hover:text-primary transition-colors font-semibold">
                  jobs@primetransgroup.ca
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Business Hours Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">Business Hours</h3>
              <p className="text-secondary/80 text-sm leading-relaxed">
                Mon-Fri: 9:00 AM - 5:00 PM<br />
                Sat & Sun: CLOSED
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form and Info Section */}
        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="text-2xl font-bold text-secondary flex items-center">
                  <Send className="w-6 h-6 mr-3 text-primary" />
                  Send Us a Message
                </CardTitle>
                <p className="text-secondary/80">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-secondary font-semibold">Full Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field}
                                className="border-primary/20 focus:border-primary"
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-secondary font-semibold">Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your.email@example.com" 
                                {...field}
                                className="border-primary/20 focus:border-primary"
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-secondary font-semibold">Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="(555) 123-4567" 
                                {...field}
                                className="border-primary/20 focus:border-primary"
                                data-testid="input-phone"
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
                            <FormLabel className="text-secondary font-semibold">Company (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your company name" 
                                {...field}
                                className="border-primary/20 focus:border-primary"
                                data-testid="input-company"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-secondary font-semibold">Subject *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What is this regarding?" 
                              {...field}
                              className="border-primary/20 focus:border-primary"
                              data-testid="input-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-secondary font-semibold">Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us how we can help you..." 
                              className="min-h-[120px] border-primary/20 focus:border-primary resize-none"
                              {...field}
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 text-lg"
                      data-testid="button-submit"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="w-5 h-5 mr-3" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            
            {/* Why Choose Us */}
            <Card className="border-primary/20">
              <CardHeader className="bg-gradient-to-r from-secondary/5 to-primary/5">
                <CardTitle className="text-xl font-bold text-secondary flex items-center">
                  <Building2 className="w-5 h-5 mr-3 text-primary" />
                  Why Choose Pryme Group?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary/80 text-sm">Canada's leading workforce solutions provider</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary/80 text-sm">Specialized in transportation, manufacturing & warehousing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary/80 text-sm">Personalized career guidance and support</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-secondary/80 text-sm">Direct connections with top employers</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Response */}
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2">Quick Response</h3>
                <p className="text-secondary/80 text-sm mb-4">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  24 Hour Response Time
                </Badge>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold text-secondary mb-2">Need Immediate Assistance?</h3>
                <p className="text-secondary/80 text-sm mb-4">
                  For urgent employment matters, call us directly during business hours.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: 249-444-0004
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}