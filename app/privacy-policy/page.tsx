import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Privacy Policy | Crafted Loops by Purvi",
  description: "Learn how Crafted Loops handles information submitted through craftedloops.art.",
};

export default function PrivacyPolicyPage() {
  return <main>
    <SiteHeader />
    <article className="policy-page">
      <header className="policy-heading">
        <p className="eyebrow">Your privacy</p>
        <h1>Privacy Policy</h1>
        <p className="policy-effective">Effective October 15, 2026</p>
        <p>Crafted Loops (“Crafted Loops,” “we,” “us,” or “our”) respects your privacy. This Privacy Policy explains what information we collect when you visit craftedloops.art, how we use it, and the choices available to you.</p>
      </header>

      <section>
        <h2>1. Information we collect</h2>
        <h3>Information you provide</h3>
        <p>When you contact us or submit a product inquiry, we may collect:</p>
        <ul>
          <li>Your name and email address</li>
          <li>Your product selections and customization preferences</li>
          <li>Your yarn color selections</li>
          <li>Measurements or sizing information you choose to provide</li>
          <li>Any message or other information included with your inquiry</li>
        </ul>
        <p>If you contact us through Instagram, Instagram may process information according to its own privacy policy.</p>

        <h3>Information collected automatically</h3>
        <p>Our website hosting provider may automatically receive limited technical information through standard server logs, including your IP address, browser and device type, pages visited, access date and time, referring website, and basic security or diagnostic information. We have not intentionally installed a separate analytics or advertising service.</p>
      </section>

      <section>
        <h2>2. How we use information</h2>
        <p>We may use collected information to:</p>
        <ul>
          <li>Respond to product inquiries</li>
          <li>Discuss customization options</li>
          <li>Prepare and fulfil requested orders</li>
          <li>Communicate about an inquiry or order</li>
          <li>Provide customer support</li>
          <li>Maintain, secure, and improve our website</li>
          <li>Comply with applicable legal obligations</li>
        </ul>
        <p>We do not currently operate a marketing mailing list, and we will not use your contact information for unrelated promotional emails without your consent.</p>
      </section>

      <section>
        <h2>3. Payments and sensitive information</h2>
        <p>Crafted Loops does not collect or store payment-card information through this website. Please do not send credit-card numbers, passwords, government identification numbers, or other sensitive information through our inquiry form or ordinary email.</p>
      </section>

      <section>
        <h2>4. Cookies and similar technologies</h2>
        <p>Our website or hosting provider may use essential cookies or similar technologies needed for security and proper website operation. We do not currently use customer information for targeted advertising. If we introduce analytics, advertising tools, additional cookies, or a marketing list in the future, we will update this policy and provide any legally required notices or choices.</p>
      </section>

      <section>
        <h2>5. How we share information</h2>
        <p>We may share information only when reasonably necessary with:</p>
        <ul>
          <li>Website hosting and technical service providers</li>
          <li>Email and communication providers</li>
          <li>Professional advisers or government authorities when required by law</li>
          <li>A successor organization if the business is sold, transferred, or reorganized</li>
        </ul>
        <p>These providers may access information only to perform services on our behalf or as permitted by their own terms and privacy policies. Crafted Loops does not sell personal information or share it for cross-context behavioral advertising.</p>
      </section>

      <section>
        <h2>6. Information retention</h2>
        <p>We retain inquiry and order information only for as long as reasonably necessary to respond to you, complete an order, maintain appropriate business and tax records, resolve disputes, enforce agreements, and meet legal obligations. Information that is no longer needed may be deleted or securely disposed of.</p>
      </section>

      <section>
        <h2>7. Your privacy choices</h2>
        <p>You may contact us to request access to the personal information we hold about you, correction of inaccurate information, or deletion of your information, subject to applicable legal and business-record exceptions. We may need to verify your identity before completing certain requests, and we will not discriminate against you for exercising applicable privacy rights.</p>
        <p>California residents may have additional rights concerning access, correction, deletion, and certain uses or disclosures of personal information under applicable California law.</p>
      </section>

      <section>
        <h2>8. Data security</h2>
        <p>We use reasonable administrative and technical measures intended to protect personal information. However, no website, email transmission, or electronic storage system can be guaranteed to be completely secure.</p>
      </section>

      <section>
        <h2>9. Children’s privacy</h2>
        <p>Our website and products are intended for a general audience and are not directed to children under 13. We do not knowingly collect personal information online from children under 13. If you believe a child has provided personal information to us, please contact us so we can review and, where appropriate, delete it.</p>
      </section>

      <section>
        <h2>10. Third-party websites</h2>
        <p>Our website may include links to third-party services such as Instagram. We do not control these services and are not responsible for their privacy practices. We encourage you to review their privacy policies before providing information.</p>
      </section>

      <section>
        <h2>11. Changes to this policy</h2>
        <p>We may update this Privacy Policy when our website, services, or legal obligations change. The revised policy will be posted on this page with an updated effective date.</p>
      </section>

      <section>
        <h2>12. Contact us</h2>
        <p>For questions or privacy-related requests, contact:</p>
        <address><strong>Crafted Loops</strong><br />Website: <a href="https://craftedloops.art">craftedloops.art</a><br />Email: <a href="mailto:inquiry@craftedloops.art">inquiry@craftedloops.art</a></address>
      </section>
    </article>
    <SiteFooter />
  </main>;
}
