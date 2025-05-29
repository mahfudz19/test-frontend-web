import Image from "next/image";
import IconLogoIpsum from "src/components/ui/Icon/IconLogoIpsum";
import Link from "src/components/ui/Link";
import { getArticles } from "src/lib/api";
import Category from "./articles/CategorySelesct";
import HeaderAvatar from "./articles/HeaderAvatar";
import PaginateArticels from "./articles/PaginateArticels";
import SearchArticles from "./articles/SearchArticles";
import LineLimit from "src/components/ui/LineLimit";
import PerseComponent from "src/components/ui/PerseComponent";
import Typography from "src/components/ui/Typograph";
import Container from "src/components/ui/Container";

type ArticleCardProps = {
  herf: string;
  imageUrl: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
};

function ArticleCard({
  imageUrl,
  date,
  title,
  description,
  tags,
  herf,
}: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${herf}`}
      className="overflow-hidden col-span-3 sm:col-auto hover:shadow-2xl rounded-2xl duration-300"
    >
      <div className="relative w-full h-64">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-2xl"
          sizes="(max-width: 640px) 100vw, 300px"
          priority
        />
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500 mb-2">
          {new Date(date).toLocaleDateString()}
        </p>

        <Typography component="h3" variant="subtitle1" fontWeight="bold">
          <LineLimit line={1}>{title}</LineLimit>
        </Typography>

        <LineLimit line={3}>
          <PerseComponent data={description} Component="span" />
        </LineLimit>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function Jumbotron() {
  return (
    <section
      className="relative bg-blue-700 text-white py-16 px-6 md:px-16 lg:px-32"
      style={{
        backgroundImage: "url(/images/jumbotron-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      {/* Overlay filter */}
      <div className="absolute inset-0 bg-blue-400 opacity-70 z-0" />

      {/* Content */}
      <div className="relative z-10 flex justify-between items-center">
        {/* Logo kiri */}
        <Link
          href="/"
          className="flex items-center justify-center my-auto space-x-2 text-white"
        >
          <IconLogoIpsum fontSize={32} />
          <span className="text-base sm:text-lg font-semibold">Logoipsum</span>
        </Link>

        {/* Avatar kanan */}
        <HeaderAvatar />
      </div>

      {/* Heading */}
      <div className="relative z-10 mt-10 text-center max-w-3xl mx-auto">
        <p className="uppercase text-sm font-medium mb-2">Blog genzet</p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          The Journal : Design Resources,
          <br />
          Interviews, and Industry News
        </h1>
        <p className="text-lg mt-4">Your daily dose of design insights!</p>
      </div>
      <div className="flex gap-2 my-2 z-10 relative bg-blue-500 p-2 rounded-xl">
        <div className="w-56">
          <Category />
        </div>
        <SearchArticles fullWidth />
      </div>
    </section>
  );
}

type Props = {
  searchParams: Promise<{ category?: string; page?: string; search: string }>;
};

export default async function home({ searchParams }: Props) {
  const { category, page, search } = await searchParams;

  const {
    data: articles,
    limit,
    page: curentPage,
    total,
  } = await getArticles({
    category: category,
    search,
    page: page,
    limit: "5",
  });

  return (
    <main>
      <Jumbotron />

      <Container>
        <ul className="grid grid-cols-3 gap-4 px-6 py-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              herf={article.id}
              imageUrl={article.imageUrl}
              date={article.createdAt}
              title={article.title}
              description={article.content}
              tags={article.category ? [article.category.name] : []}
            />
          ))}
        </ul>
      </Container>

      {/* Pagination Controls */}

      <PaginateArticels
        totalPage={Math.ceil(total / limit)}
        curentPage={curentPage}
      />
    </main>
  );
}
