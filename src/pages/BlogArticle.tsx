import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { mockArticles } from "@/data/mockData";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = mockArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Article non trouvé</h1>
          <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">
            Retour au blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-12">
        <div className="container max-w-3xl">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>

          <Badge variant="secondary" className="mb-4 rounded-lg">
            {article.category}
          </Badge>
          <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">{article.title}</h1>

          <div className="mb-8 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{article.author}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.read_time_min} min de lecture</span>
            <span>{new Date(article.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>

          <div className="mb-10 overflow-hidden rounded-2xl">
            <img src={article.image_url} alt={article.title} className="w-full object-cover" />
          </div>

          {/* Simulated article content */}
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam lacinia, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel aliquam lacinia, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
            <h2 className="mt-8 text-2xl font-bold">Pourquoi c'est important</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.
            </p>
            <h2 className="mt-8 text-2xl font-bold">Nos recommandations</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
            </p>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogArticle;
