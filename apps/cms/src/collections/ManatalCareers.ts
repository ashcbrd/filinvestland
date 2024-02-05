import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import payload from "payload";
import { isVisible } from "../access/isAdminOrEditor";

export const getJobsFromManatal = async () => {
  let jobCount = 100;
  let page = 1;
  let jobPerPage = 100;
  let jobs = [];
  while (jobCount != 0 && jobCount >= (page - 1) * jobPerPage) {
    const response = await fetch(
      `https://api.manatal.com/open/v3/career-page/${process.env.MANATAL_CLIENT_ID}/jobs/?page_size=${jobPerPage}&page=${page}`
    );
    if (response.ok) {
      const res = await response.json();
      jobCount = res.count;
      res.results.map((item) => jobs.push(item));
    }
    page++;
  }

  const exist = await payload.find({
    collection: "manatal-careers",
    where: {},
    limit: 0,
  });
  const docs = exist.docs.map((item) => item.id);
  
  jobs = jobs.filter(
    (item) =>
      !docs.includes(item.id) &&
      item?.organization_name == process.env.MANATAL_ORG
  );
  for (let i = 0; i < jobs.length; i++) {
    let job = jobs[i];
    job = {
      ...job,
      address: typeof job.address == "string" ? job.address : "",
      zipcode: typeof job.zipcode == "string" ? job.zipcode : "",
      is_remote: job.is_remote == "true" || job.is_remote == true,
      _hash: job.hash,
    };
    delete job["hash"];
    try {
      await payload.create({
        collection: "manatal-careers",
        data: job,
      });
      // console.log(`success ${jobs.length} / ${i + 1}`);
    } catch (error) {
      // console.log(`error ${i + 1}`, job, error);
    }
  }
};

export const ManatalCareers: CollectionConfig = {
  slug: "manatal-careers",
  admin: {
    useAsTitle: "title",
    group: "Filinvest",
    hidden: ({ user }) => {
      return !isVisible(
        "read",
        "manatal-careers",
        "63db1aca51fa9424f93f6591",
        user
      );
    },
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: "id",
      type: "number",
      required: true,
      access: {
        update: () => false,
      },
    },
    {
      name: "_hash",
      type: "text",
      label: "Hash",
      required: true,
      access: {
        update: () => false,
        read: () => true,
      },
    },
    {
      name: "organization_name",
      label: "Organization name",
      type: "text",
      required: true,
      access: {
        update: () => false,
      },
    },
    {
      name: "position_name",
      label: "Position name",
      type: "text",
      required: true,
      access: {
        update: () => false,
      },
    },
    {
      name: "careerCategory",
      type: "relationship",
      relationTo: "career-categories",
    },
    {
      name: "description",
      type: "textarea",
      access: {
        update: () => false,
      },
    },
    {
      name: "country",
      type: "text",
      access: {
        update: () => false,
      },
    },
    {
      name: "state",
      type: "text",
      access: {
        update: () => false,
      },
    },
    {
      name: "city",
      type: "text",
      access: {
        update: () => false,
      },
    },
    {
      name: "address",
      type: "text",
      access: {
        update: () => false,
      },
    },
    {
      name: "zipcode",
      type: "text",
      access: {
        update: () => false,
      },
    },
    {
      name: "location_display",
      label: "Location display",
      type: "text",
      access: {
        update: () => false,
      },
    },
    {
      name: "is_salary_visible",
      label: "Salary visible",
      type: "checkbox",
      access: {
        update: () => false,
      },
    },
    {
      name: "is_remote",
      label: "Remote",
      type: "checkbox",
      access: {
        update: () => false,
      },
    },
    {
      name: "contract_details",
      label: "Contract",
      type: "text",
      access: {
        update: () => false,
      },
    },
    {
      name: "is_pinned_in_career_page",
      label: "Pinned in career page",
      type: "checkbox",
      access: {
        update: () => false,
      },
    },
  ],
};
