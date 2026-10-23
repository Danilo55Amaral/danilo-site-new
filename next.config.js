/** @type {import('next').NextConfig} */
const nextConfig = {
  // As imagens ficam em public/img e passam pelo otimizador do Next (sharp),
  // que entrega WebP/AVIF no tamanho certo de cada tela.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
