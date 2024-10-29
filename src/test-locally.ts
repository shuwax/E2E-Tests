import { AccountAPI } from "./AccountAPI/index.js";
import { ApiService } from "./ApiService/index.js";
import { GroupsAPI } from "./GroupsAPI/index.js";
import { OrganizationsAPI } from "./OrganizationsAPI/index.js";

const apiService = new ApiService(process.env.BASE_URL);
const accountsAPI = new AccountAPI(apiService);
const organizationsAPI = new OrganizationsAPI(apiService);
const groupsAPI = new GroupsAPI(apiService);

const userCredentials = {
  email: process.env.SUPERADMIN_EMAIL,
  password: process.env.SUPERADMIN_PASSWORD,
};

const setup = async () => {
  try {
    await accountsAPI.getAntiForgeryToken();
    const superAdminUser =
      await accountsAPI.loginAdminByEmailAndPassword(userCredentials);
    console.log(superAdminUser);
    const organization = await organizationsAPI.createOrganization({
      name: "E2E Test Organization",
      HasUserLimit: true,
      UserLimit: 10,
    });
    console.log("organization", organization.id); //Use this Id to teardown function
    await groupsAPI.registerGroup({
      name: `E2E Test Group 1`,
      organizationID: organization.id,
      latitude: 56.162868,
      longitude: 15.586335,
    });
    await teardown(organization.id); // Comment out this if you want to check in Admin panel if created items are in place
    await accountsAPI.logout();
  } catch (error) {
    console.error(error);
  }
};

const teardown = async (organizationId: number) => {
  try {
    await accountsAPI.getAntiForgeryToken();
    await accountsAPI.loginAdminByEmailAndPassword(userCredentials);
    const organization =
      await organizationsAPI.getOrganizationById(organizationId);

    if (!organization)
      throw new Error(`Organization by id: ${organizationId} not found`);

    await organizationsAPI.forceDeleteOrganization(organizationId);
    await accountsAPI.logout();
  } catch (error) {
    console.error(error);
  }
};

setup();
// teardown(25327);
