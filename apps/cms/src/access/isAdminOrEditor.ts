import { Access } from "payload/config";

export const isAdminOrEditor =
  (
    accessType: string,
    collection: any,
    siteId: string,
    userData?: any
  ): Access =>
  ({ req: { user } }) => {
    const authUser = user ?? userData;

    // Need to be logged in
    if (authUser) {
      // If user has role of 'admin'
      const { read, update, create } = authUser;
      if (authUser.roles.includes("admin")) return true;

      // If user has role of 'editor' and has access to a site,
      // return a query constraint to restrict the documents this user can edit
      // to only those that are assigned to a site, or have no site assigned
      if (
        authUser.roles.includes("editor") &&
        authUser.sites.some((item: { id: string }) => item.id === siteId)
      ) {
        // Otherwise, we can restrict it based on the `site` field

        return getCollection(siteId, accessType, authUser, collection);
      } else if (
        authUser.roles.includes("subEditor") &&
        authUser.sites.some((item: { id: string }) => item.id === siteId)
      ) {
        // handle project manager
        return getCollection(siteId, accessType, authUser, collection);
      } else {
        return false;
      }
    }

    // Reject everyone else
    return false;
  };

export const isVisible = (
  accessType: string,
  collection: any,
  siteId: string,
  authUser?: any
) => {
  // Need to be logged in
  if (authUser) {
    // If user has role of 'admin'
    const { read, update, create } = authUser;
    if (authUser.roles.includes("admin")) return true;

    // If user has role of 'editor' and has access to a site,
    // return a query constraint to restrict the documents this user can edit
    // to only those that are assigned to a site, or have no site assigned
    if (
      authUser.roles.includes("editor") &&
      authUser.sites.some((item: { id: string }) => item.id === siteId)
    ) {
      // Otherwise, we can restrict it based on the `site` field

      return getCollection(siteId, accessType, authUser, collection);
    } else if (
      authUser.roles.includes("subEditor") &&
      authUser.sites.some((item: { id: string }) => item.id === siteId)
    ) {
      // handle project manager
      return getCollection(siteId, accessType, authUser, collection);
    } else {
      return false;
    }
  }

  // Reject everyone else
  return false;
};

const getCollection = (
  siteId: string,
  accessType: string,
  user: any,
  collection: string
) => {
  switch (collection) {
    case "news":
      if (siteId === "63cb9d9a313bab61401c9b2a") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Aspire?.readAspire?.readAspireNews);
          case "update":
            return Boolean(user?.Aspire?.updateAspire?.updateAspireNews);
          case "create":
            return Boolean(user?.Aspire?.createAspire?.createAspireNews);
          case "delete":
            return Boolean(user?.Aspire?.deleteAspire?.deleteAspireNews);
          default:
            return false;
        }
      } else if (siteId === "63970ca74f38bc4992f1295d") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Prestige?.readPrestige?.readPrestigeNews);
          case "update":
            return Boolean(user?.Prestige?.updatePrestige?.updatePrestigeNews);
          case "create":
            return Boolean(user?.Prestige?.createPrestige?.createPrestigeNews);
          case "delete":
            return Boolean(user?.Prestige?.deletePrestige?.deletePrestigeNews);
          default:
            return false;
        }
      } else if (siteId === "6396fc1d4f38bc4992f127a9") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Futura?.readFutura?.readFuturaNews);
          case "update":
            return Boolean(user?.Futura?.updateFutura?.updateFuturaNews);
          case "create":
            return Boolean(user?.Futura?.createFutura?.createFuturaNews);
          case "delete":
            return Boolean(user?.Futura?.deleteFutura?.deleteFuturaNews);
          default:
            return false;
        }
      } else if (siteId === "63db1aca51fa9424f93f6591") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Filinvest?.readFilinvest?.readFilinvestNews);
          case "update":
            return Boolean(
              user?.Filinvest?.updateFilinvest?.updateFilinvestNews
            );
          case "create":
            return Boolean(
              user?.Filinvest?.createFilinvest?.createFilinvestNews
            );
          case "delete":
            return Boolean(
              user?.Filinvest?.deleteFilinvest?.deleteFilinvestNews
            );
          default:
            return false;
        }
      } else {
        return false;
      }

    case "projects":
      if (siteId === "63cb9d9a313bab61401c9b2a") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Aspire?.readAspire?.readAspireProjects);
          case "update":
            return Boolean(user?.Aspire?.updateAspire?.updateAspireProjects);
          case "create":
            return Boolean(user?.Aspire?.createAspire?.createAspireProjects);
          case "delete":
            return Boolean(user?.Aspire?.deleteAspire?.deleteAspireProjects);
          default:
            return false;
        }
      } else if (siteId === "63970ca74f38bc4992f1295d") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Prestige?.readPrestige?.readPrestigeProjects);
          case "update":
            return Boolean(
              user?.Prestige?.updatePrestige?.updatePrestigeProjects
            );
          case "create":
            return Boolean(
              user?.Prestige?.createPrestige?.createPrestigeProjects
            );
          case "delete":
            return Boolean(
              user?.Prestige?.deletePrestige?.deletePrestigeProjects
            );
          default:
            return false;
        }
      } else if (siteId === "6396fc1d4f38bc4992f127a9") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Futura?.readFutura?.readFuturaProjects);
          case "update":
            return Boolean(user?.Futura?.updateFutura?.updateFuturaProjects);
          case "create":
            return Boolean(user?.Futura?.createFutura?.createFuturaProjects);
          case "delete":
            return Boolean(user?.Futura?.deleteFutura?.deleteFuturaProjects);
          default:
            return false;
        }
      } else if (siteId === "63db1aca51fa9424f93f6591") {
        switch (accessType) {
          case "read":
            return Boolean(
              user?.Filinvest?.readFilinvest?.readFilinvestProjects
            );
          case "update":
            return Boolean(
              user?.Filinvest?.updateFilinvest?.updateFilinvestProjects
            );
          case "create":
            return Boolean(
              user?.Filinvest?.createFilinvest?.createFilinvestProjects
            );
          case "delete":
            return Boolean(
              user?.Filinvest?.deleteFilinvest?.deleteFilinvestProjects
            );
          default:
            return false;
        }
      } else {
        return false;
      }

    case "pages":
      if (siteId === "63cb9d9a313bab61401c9b2a") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Aspire?.readAspire?.readAspirePages);
          case "update":
            return Boolean(user?.Aspire?.updateAspire?.updateAspirePages);
          case "create":
            return Boolean(user?.Aspire?.createAspire?.createAspirePages);
          case "delete":
            return Boolean(user?.Aspire?.deleteAspire?.deleteAspirePages);
          default:
            return false;
        }
      } else if (siteId === "63970ca74f38bc4992f1295d") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Prestige?.readPrestige?.readPrestigePages);
          case "update":
            return Boolean(user?.Prestige?.updatePrestige?.updatePrestigePages);
          case "create":
            return Boolean(user?.Prestige?.createPrestige?.createPrestigePages);
          case "delete":
            return Boolean(user?.Prestige?.deletePrestige?.deletePrestigePages);
          default:
            return false;
        }
      } else if (siteId === "6396fc1d4f38bc4992f127a9") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Futura?.readFutura?.readFuturaPages);
          case "update":
            return Boolean(user?.Futura?.updateFutura?.updateFuturaPages);
          case "create":
            return Boolean(user?.Futura?.createFutura?.createFuturaPages);
          case "delete":
            return Boolean(user?.Futura?.deleteFutura?.deleteFuturaPages);
          default:
            return false;
        }
      } else if (siteId === "63db1aca51fa9424f93f6591") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Filinvest?.readFilinvest?.readFilinvestPages);
          case "update":
            return Boolean(
              user?.Filinvest?.updateFilinvest?.updateFilinvestPages
            );
          case "create":
            return Boolean(
              user?.Filinvest?.createFilinvest?.createFilinvestPages
            );
          case "delete":
            return Boolean(
              user?.Filinvest?.deleteFilinvest?.deleteFilinvestPages
            );
          default:
            return false;
        }
      } else {
        return false;
      }

    case "property-search":
      if (siteId === "63cb9d9a313bab61401c9b2a") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Aspire?.readAspire?.readAspirePropertySearch);
          case "update":
            return Boolean(
              user?.Aspire?.updateAspire?.updateAspirePropertySearch
            );
          case "create":
            return Boolean(
              user?.Aspire?.createAspire?.createAspirePropertySearch
            );
          case "delete":
            return Boolean(
              user?.Aspire?.deleteAspire?.deleteAspirePropertySearch
            );
          default:
            return false;
        }
      } else if (siteId === "63970ca74f38bc4992f1295d") {
        switch (accessType) {
          case "read":
            return Boolean(
              user?.Prestige?.readPrestige?.readPrestigePropertySearch
            );
          case "update":
            return Boolean(
              user?.Prestige?.updatePrestige?.updatePrestigePropertySearch
            );
          case "create":
            return Boolean(
              user?.Prestige?.createPrestige?.createPrestigePropertySearch
            );
          case "delete":
            return Boolean(
              user?.Prestige?.deletePrestige?.deletePrestigePropertySearch
            );
          default:
            return false;
        }
      } else if (siteId === "6396fc1d4f38bc4992f127a9") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Futura?.readFutura?.readFuturaPropertySearch);
          case "update":
            return Boolean(
              user?.Futura?.updateFutura?.updateFuturaPropertySearch
            );
          case "create":
            return Boolean(
              user?.Futura?.createFutura?.createFuturaPropertySearch
            );
          case "delete":
            return Boolean(
              user?.Futura?.deleteFutura?.deleteFuturaPropertySearch
            );
          default:
            return false;
        }
      } else if (siteId === "63db1aca51fa9424f93f6591") {
        switch (accessType) {
          case "read":
            return Boolean(
              user?.Filinvest?.readFilinvest?.readFilinvestPropertySearch
            );
          case "update":
            return Boolean(
              user?.Filinvest?.updateFilinvest?.updateFilinvestPropertySearch
            );
          case "create":
            return Boolean(
              user?.Filinvest?.createFilinvest?.createFilinvestPropertySearch
            );
          case "delete":
            return Boolean(
              user?.Filinvest?.deleteFilinvest?.deleteFilinvestPropertySearch
            );
          default:
            return false;
        }
      } else {
        return false;
      }

    case "menu":
      if (siteId === "63cb9d9a313bab61401c9b2a") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Aspire?.readAspire?.readAspireMenu);
          case "update":
            return Boolean(user?.Aspire?.updateAspire?.updateAspireMenu);
          case "create":
            return Boolean(user?.Aspire?.createAspire?.createAspireMenu);
          case "delete":
            return Boolean(user?.Aspire?.deleteAspire?.deleteAspireMenu);
          default:
            return false;
        }
      } else if (siteId === "63970ca74f38bc4992f1295d") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Prestige?.readPrestige?.readPrestigeMenu);
          case "update":
            return Boolean(user?.Prestige?.updatePrestige?.updatePrestigeMenu);
          case "create":
            return Boolean(user?.Prestige?.createPrestige?.createPrestigeMenu);
          case "delete":
            return Boolean(user?.Prestige?.deletePrestige?.deletePrestigeMenu);
          default:
            return false;
        }
      } else if (siteId === "6396fc1d4f38bc4992f127a9") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Futura?.readFutura?.readFuturaMenu);
          case "update":
            return Boolean(user?.Futura?.updateFutura?.updateFuturaMenu);
          case "create":
            return Boolean(user?.Futura?.createFutura?.createFuturaMenu);
          case "delete":
            return Boolean(user?.Futura?.deleteFutura?.deleteFuturaMenu);
          default:
            return false;
        }
      } else if (siteId === "63db1aca51fa9424f93f6591") {
        switch (accessType) {
          case "read":
            return Boolean(
              user?.Filinvest?.readFilinvest?.readFilinvestNavigation
            );
          case "update":
            return Boolean(
              user?.Filinvest?.updateFilinvest?.updateFilinvestNavigation
            );
          case "create":
            return Boolean(
              user?.Filinvest?.createFilinvest?.createFilinvestNavigation
            );
          case "delete":
            return Boolean(
              user?.Filinvest?.deleteFilinvest?.deleteFilinvestNavigation
            );
          default:
            return false;
        }
      } else {
        return false;
      }

    case "footer":
      if (siteId === "63cb9d9a313bab61401c9b2a") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Aspire?.readAspire?.readAspireFooter);
          case "update":
            return Boolean(user?.Aspire?.updateAspire?.updateAspireFooter);
          case "create":
            return Boolean(user?.Aspire?.createAspire?.createAspireFooter);
          case "delete":
            return Boolean(user?.Aspire?.deleteAspire?.deleteAspireFooter);
          default:
            return false;
        }
      } else if (siteId === "63970ca74f38bc4992f1295d") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Prestige?.readPrestige?.readPrestigeFooter);
          case "update":
            return Boolean(
              user?.Prestige?.updatePrestige?.updatePrestigeFooter
            );
          case "create":
            return Boolean(
              user?.Prestige?.createPrestige?.createPrestigeFooter
            );
          case "delete":
            return Boolean(
              user?.Prestige?.deletePrestige?.deletePrestigeFooter
            );
          default:
            return false;
        }
      } else if (siteId === "6396fc1d4f38bc4992f127a9") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Futura?.readFutura?.readFuturaFooter);
          case "update":
            return Boolean(user?.Futura?.updateFutura?.updateFuturaFooter);
          case "create":
            return Boolean(user?.Futura?.createFutura?.createFuturaFooter);
          case "delete":
            return Boolean(user?.Futura?.deleteFutura?.deleteFuturaFooter);
          default:
            return false;
        }
      } else if (siteId === "63db1aca51fa9424f93f6591") {
        switch (accessType) {
          case "read":
            return Boolean(user?.Filinvest?.readFilinvest?.readFilinvestFooter);
          case "update":
            return Boolean(
              user?.Filinvest?.updateFilinvest?.updateFilinvestFooter
            );
          case "create":
            return Boolean(
              user?.Filinvest?.createFilinvest?.createFilinvestFooter
            );
          case "delete":
            return Boolean(
              user?.Filinvest?.deleteFilinvest?.deleteFilinvestFooter
            );
          default:
            return false;
        }
      } else {
        return false;
      }

    case "stock-histories":
      if (siteId === "63db1aca51fa9424f93f6591") {
        switch (accessType) {
          case "read":
            return Boolean(
              user?.Filinvest?.readFilinvest?.readFilinvestStockHistories
            );
          case "update":
            return Boolean(
              user?.Filinvest?.updateFilinvest?.updateFilinvestStockHistories
            );
          case "create":
            return Boolean(
              user?.Filinvest?.createFilinvest?.createFilinvestStockHistories
            );
          case "delete":
            return Boolean(
              user?.Filinvest?.deleteFilinvest?.deleteFilinvestStockHistories
            );
          default:
            return false;
        }
      } else {
        return false;
      }

    case "manatal-careers":
      if (siteId === "63db1aca51fa9424f93f6591") {
        switch (accessType) {
          case "read":
            return Boolean(
              user?.Filinvest?.readFilinvest?.readFilinvestManatalCareers
            );
          case "update":
            return Boolean(
              user?.Filinvest?.updateFilinvest?.updateFilinvestManatalCareers
            );
          case "create":
            return Boolean(
              user?.Filinvest?.createFilinvest?.createFilinvestManatalCareers
            );
          case "delete":
            return Boolean(
              user?.Filinvest?.deleteFilinvest?.deleteFilinvestManatalCareers
            );
          default:
            return false;
        }
      } else {
        return false;
      }
    default:
      return false;
  }
};
