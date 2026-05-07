import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import { HomePage } from "@/routes/index";
import { AboutPage } from "@/routes/about";
import { ContactPage } from "@/routes/contact";
import { ProjectsPage } from "@/routes/projects";
import { WorkPage } from "@/routes/work";
import { NovelsPage } from "@/routes/novels";
import { NovelSlugPage } from "@/routes/novels-slug";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-sun-radial blur-xl opacity-70" />
        <h1 className="font-display text-7xl">404</h1>
        <h2 className="mt-4 font-display text-2xl">This page slipped through the cracks</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Let's get you back to somewhere brighter.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Take me home
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="novels" element={<NovelsPage />} />
        <Route path="novels/:slug" element={<NovelSlugPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
