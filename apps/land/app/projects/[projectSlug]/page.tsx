import RegularContent from "@/components/pages/projects/regular/Content";
import OfficeContent from "@/components/pages/projects/office/Content";
import OfficeParkContent from "@/components/pages/projects/office-park/Content";
import { notFound } from "next/navigation";
import qs from "qs";
import { Project } from "shared-types";
import { metaBuilder } from "@/helpers/metaBuilder";

type PageProps = {
  params: {
    projectSlug: string;
  };
};

const stringifiedQuery = (query: Object) => {
  return qs.stringify(
    {
      where: query, // ensure that `qs` adds the `where` property, too!
    },
    { addQueryPrefix: true }
  );
};

async function getProject(slug: string) {
  const query = {
    slug: {
      equals: slug,
    },
  };
  const res = await fetch(
    `${process.env.CMS_URL}/api/projects${stringifiedQuery(query)}`,

    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const jsonData = await res.json();
  return jsonData.docs ? (jsonData.docs?.[0] as Project) : null;
}

export async function generateMetadata({ params: { projectSlug } }: PageProps) {
  const content = await getProject(projectSlug);
  return content ? metaBuilder(content) : null;
}

const ProjectsPage = async ({ params: { projectSlug } }: PageProps) => {
  const content = await getProject(projectSlug);
  if (!content) {
    return notFound();
  }
  const renderContent = () => {
    if (content?.dataType === "office") {
      return <OfficeContent project={content} />;
    } else if (content?.dataType === "office park") {
      return <OfficeParkContent project={content} />;
    } else {
      return <RegularContent project={content} />;
    }
  };
  return <div>{renderContent()}</div>;
};

export default ProjectsPage;
