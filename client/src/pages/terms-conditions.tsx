import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Website Usage Terms & Conditions
            </h1>
            <p className="text-muted-foreground">
              Updated: December 2022
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            <p>
              Welcome to our website which is operated by Pryme Group. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.
            </p>

            <p>
              The term 'Prime trans', 'Prime group' or 'Prime trans group' or 'we' refers to the owner of the website. The term 'you' refers to the user or viewer of our website.
            </p>

            <p>
              Where Prime trans group or one of our companies introduces by telephone, postal mail or electronic mail any candidate for a temporary assignment or employment with our hiring clients, the introductions shall be subject to our standard Terms of Business as applicable. We will provide all of our hiring clients with a copy of the standard Terms of Business applicable to them at the point of registration or following registration. These Terms of Use are in addition to and not in substitution for our standard Terms of Business.
            </p>

            <p>
              Candidates seeking work as temporary workers will be required to sign our standard Terms of Assignment. These Terms of Use are in addition to and not in substitution for our standard Terms of Assignment.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Your use of this site</h2>

            <p>The use of this website is subject to the following terms of use:</p>

            <ul className="space-y-3 list-disc pl-6">
              <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>

              <li>This website uses cookies to monitor browsing preferences. See privacy policy for details.</li>

              <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>

              <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</li>

              <li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>

              <li>All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.</li>

              <li>Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offense.</li>

              <li>From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li>

              <li>Your use of this website and any dispute arising out of such use of the website is subject to the laws of Ontario, Canada.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}