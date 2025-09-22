import { Link } from "wouter";
import { Facebook, Linkedin, MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
import primeLogoPath from "@assets/Footer logo new_1758575059952.png";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground footer-3d">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3" data-testid="link-footer-logo">
              <img 
                src={primeLogoPath} 
                alt="Hopewell Group" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-secondary-foreground/80 max-w-xs">
              Canada's premier workforce solutions provider, connecting talent with opportunity since 2016.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=100088670138701" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors nav-item-3d"
                data-testid="link-social-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="http://linkedin.com/company/prymetransgroup/?originalSubdomain=ca" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors nav-item-3d"
                data-testid="link-social-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://api.whatsapp.com/send/?phone=12494440004&text&type=phone_number&app_absent=0" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors nav-item-3d"
                data-testid="link-social-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-3d">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                href="/jobs" 
                className="block text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                data-testid="link-footer-browse-jobs"
              >
                Browse Jobs
              </Link>
              <Link 
                href="/post-job" 
                className="block text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                data-testid="link-footer-post-job"
              >
                Post a Job
              </Link>
              <a 
                href="#services" 
                className="block text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                data-testid="link-footer-services"
              >
                Our Services
              </a>
              <a 
                href="#about" 
                className="block text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                data-testid="link-footer-about"
              >
                About Us
              </a>
              <a 
                href="#contact" 
                className="block text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                data-testid="link-footer-contact"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Job Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-3d">Popular Categories</h3>
            <div className="space-y-2">
              <Link 
                href="/jobs?category=Transportation" 
                className="block text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                data-testid="link-category-transportation"
              >
                Transportation
              </Link>
              <Link 
                href="/jobs?category=Manufacturing" 
                className="block text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                data-testid="link-category-manufacturing"
              >
                Manufacturing
              </Link>
              <Link 
                href="/jobs?category=Customer Service" 
                className="block text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                data-testid="link-category-customer-service"
              >
                Customer Service
              </Link>
              <Link 
                href="/jobs?category=Administrative" 
                className="block text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                data-testid="link-category-administrative"
              >
                Administrative
              </Link>
              <Link 
                href="/jobs?category=Warehouse" 
                className="block text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                data-testid="link-category-warehouse"
              >
                Warehouse
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-3d">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-secondary-foreground/80">
                  7050 Bramalea Rd Unit 14A<br />
                  Mississauga, ON L5S 1T1<br />
                  Canada
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-sm text-secondary-foreground/80">249-444-0004</div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-sm text-secondary-foreground/80">jobs@primetransgroup.ca</div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-secondary-foreground/80">
                  Mon – Friday: 9 am – 5 pm<br />
                  Sat & Sun: CLOSED
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/60">
            © 2024 Prime Trans Group. All rights reserved. | <Link href="/privacy-policy" className="hover:text-primary transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link> | <Link href="/terms-conditions" className="hover:text-primary transition-colors" data-testid="link-footer-terms">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
