import { useState,useEffect } from "react";

import {
  PageHeader,
} from "../../../../components/ui";

import Business from "./Business";

import BusinessMember from "./businessMember";

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