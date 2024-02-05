import qs from "qs";
import InquirePage from "./component/InquirePage";

async function getData() {
  const page = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/6550eb65385b65df9c4b3343`,
    { cache: "no-store" }
  );
  const investor = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/64d34fc0281bd2de8791c8b4`,
    { cache: "no-store" }
  );
  const req = await Promise.all([page, investor]);

  return {
    page: (await req[0].json()) as any,
    investor: (await req[1].json()) as any,
  };
}
async function getProject(projectName: string) {
  try {

    if (!projectName) return
    const query = qs.stringify({
      where: {
        title: { equals: projectName },
      },
    });

    const rawProject = await fetch(
      `${process.env.CMS_URL}/api/prestige-projects?${query}`
    );

    const project = await rawProject.json();
    return project?.docs?.[0];
  } catch (error) {
    console.log(error)
  }
}


async function Inquire(params: any) {
  const req = (await getData()) as any;
  const sections = {
    page: req.page.content[0],
  };
  const investor = {
    page: req.investor.content,
  };

  const projectName = params.searchParams.project;

  const project = await getProject(projectName);

  return (
    <InquirePage project={project} sections={sections} investor={investor} />
  );
};

export default Inquire;
