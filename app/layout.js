import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "TrendWise - Latest Trends & Articles",
  description: "AI, Tech, Climate, Trending Articles with SEO Optimized Content",
  openGraph: {
    title: "TrendWise",
    description: "Latest trends & AI generated articles",
    images: ["https://via.placeholder.com/600x300"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
