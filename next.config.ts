import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/supply-chain-finance", destination: "/scf", permanent: true },
      { source: "/procurement", destination: "/proc", permanent: true },
      { source: "/procurement-internacional", destination: "/proc", permanent: true },
      { source: "/produtos", destination: "/motos", permanent: true },
      { source: "/produtos-da-china", destination: "/motos", permanent: true },
      { source: "/quem-somos", destination: "/sobre", permanent: true },
      { source: "/fale-conosco", destination: "/contato", permanent: true },
    ];
  },
};

export default nextConfig;
