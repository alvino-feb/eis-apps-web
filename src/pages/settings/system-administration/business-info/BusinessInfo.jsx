import {
  PageHeader,
} from "../../../../components/ui";

import Business from "./Business";

import BusinessMember from "./BusinessMember";

export default function BusinessInfo() {

  return (
    <div className="space-y-4 p-3">

      <PageHeader
        title="Business Information"
        description="Manage business profile and members"
      />

      {/* BUSINESS */}
      <Business/>

      {/* MEMBERS MEMBER*/}
      <BusinessMember/>

    </div>
  );
}