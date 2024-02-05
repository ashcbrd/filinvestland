import { Block } from "payload/types";

const EnterpriseRiskManagementTable: Block = {
  slug: "enterprise-risk-management-table",
  fields: [
    {
      type: "array",
      name: "riskManagementTable",
      required: true,
      fields: [
        {
          type: "textarea",
          name: "riskExposure",
          required: true,
        },
        {
          type: "textarea",
          name: "riskManagementPolicy",
          required: true,
        },
        {
          type: "textarea",
          name: "riskObjective",
          required: true,
        },
      ],
    },
  ],
};

export default EnterpriseRiskManagementTable;
