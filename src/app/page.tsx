import About from "@/components/About";
import CodeGuildsShowcase from "@/components/CodeGuildsShowcase";
import Contact from "@/components/Contact";
import Credentials from "@/components/Credentials";
import Faq from "@/components/Faq";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import TechMarquee from "@/components/TechMarquee";
import Teaching from "@/components/Teaching";

/**
 * O site é uma página só, na ordem de uma conversa de venda: quem sou e o que
 * faço (topo e serviços), a prova (CodeGuilds, trajetória, projetos,
 * habilidades, ensino, diplomas e recomendações), as dúvidas e o contato.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <CodeGuildsShowcase />
        <About />
        <Projects />
        <Skills />
        <Teaching />
        <Credentials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
