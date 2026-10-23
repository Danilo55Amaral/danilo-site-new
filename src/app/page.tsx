import About from "@/components/About";
import CodeGuildsShowcase from "@/components/CodeGuildsShowcase";
import Contact from "@/components/Contact";
import Credentials from "@/components/Credentials";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import TechMarquee from "@/components/TechMarquee";
import Teaching from "@/components/Teaching";

/**
 * A home, na ordem de uma conversa de venda: quem sou e o que faço (topo e
 * serviços), a prova (CodeGuilds, trajetória, projetos, habilidades, ensino,
 * diplomas e recomendações), as dúvidas e o contato. Os preços e o pedido
 * ficam no catálogo (app/catalogo), pra onde os botões de serviço levam.
 */
export default function Home() {
  return (
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
  );
}
