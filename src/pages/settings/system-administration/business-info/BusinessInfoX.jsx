import { useState } from "react";

import {
Building2,
Users,
Store,
Pencil,
} from "lucide-react";

import {
PageHeader,
Card,
CardHeader,
Toolbar,
SearchInput,
DataTable,
Button,
Drawer,
Badge,
StatCard,
DescriptionList,
} from "../../../../components/ui";

export default function BusinessInfo() {

const [search, setSearch] =
useState("");

const [openBusinessDrawer, setOpenBusinessDrawer] =
useState(false);

const [openMemberDrawer, setOpenMemberDrawer] =
useState(false);

const business = {
name: "PT Enterprise Integrated System",
code: "EIS001",
email: "admin@eis.com",
phone: "+62 81234567890",
address: "Jakarta, Indonesia",
};

const members = [
{
businessMemberId: "1",
name: "Alvino",
email: "vinokyo@gmail.com",
roleCode: "CRE",
roleName: "Creator",
active: true,
},
{
businessMemberId: "2",
name: "John Doe",
email: "john@mail.com",
roleCode: "ADM",
roleName: "Administrator",
active: true,
},
];

const filteredMembers =
members.filter(
(item) =>
item.name
.toLowerCase()
.includes(search.toLowerCase()) ||
item.email
.toLowerCase()
.includes(search.toLowerCase())
);

const columns = [
{
key: "name",
title: "Name",
},
{
key: "email",
title: "Email",
},
{
key: "roleName",
title: "Role",

  render: (row) => {

    const color =
      row.roleCode === "CRE"
        ? "green"
        : row.roleCode === "ADM"
        ? "blue"
        : "gray";

    return (
      <Badge color={color}>
        {row.roleName}
      </Badge>
    );

  },
},
{
  key: "status",
  title: "Status",

  render: (row) => (
    <Badge
      color={
        row.active
          ? "green"
          : "red"
      }
    >
      {row.active
        ? "Active"
        : "Inactive"}
    </Badge>
  ),
},
{
  key: "action",
  title: "Action",

  render: () => (
    <Button
      size="sm"
      variant="secondary"
      onClick={() =>
        setOpenMemberDrawer(true)
      }
    >
      Edit
    </Button>
  ),
},

];

return (
  
  <PageHeader
    title="Business Information"
    description="Manage business profile and members"
  />

  {/* STATS */}

  <div
    className="
      grid
      gap-4
      md:grid-cols-3
    "
  >

    <StatCard
      title="Members"
      value={12}
      icon={
        <Users
          size={18}
        />
      }
    />

    <StatCard
      title="Active Users"
      value={10}
      icon={
        <Users
          size={18}
        />
      }
    />

    <StatCard
      title="Branches"
      value={3}
      icon={
        <Store
          size={18}
        />
      }
    />

  </div>

  {/* BUSINESS INFO */}

  <Card>

    <CardHeader
      title="Business Information"
      description="General information about business"
      action={
        <Button
          onClick={() =>
            setOpenBusinessDrawer(true)
          }
        >
          <Pencil size={14} />
          Edit
        </Button>
      }
    />

    <div className="p-5">

      <DescriptionList
        items={[
          {
            label: "Business Name",
            value: business.name,
          },
          {
            label: "Business Code",
            value: business.code,
          },
          {
            label: "Email",
            value: business.email,
          },
          {
            label: "Phone",
            value: business.phone,
          },
          {
            label: "Address",
            value: business.address,
          },
        ]}
      />

    </div>

  </Card>

  {/* MEMBERS */}

  <Card>

    <CardHeader
      title="Business Members"
      description="Manage users and permissions"
      action={
        <Button
          onClick={() =>
            setOpenMemberDrawer(true)
          }
        >
          Add Member
        </Button>
      }
    />

    <Toolbar
      left={
        <SearchInput
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search member..."
        />
      }
    />

    <DataTable
      columns={columns}
      data={filteredMembers}
    />

  </Card>

  {/* BUSINESS DRAWER */}

  <Drawer
    open={openBusinessDrawer}
    title="Edit Business Information"
    onClose={() =>
      setOpenBusinessDrawer(false)
    }
  >

    <div className="space-y-4">

      <div>

        <label>
          Business Name
        </label>

        <input
          defaultValue={
            business.name
          }
          className="
            mt-1
            w-full
            border
            rounded-md
            px-3
            py-2
          "
        />

      </div>

      <div>

        <label>
          Email
        </label>

        <input
          defaultValue={
            business.email
          }
          className="
            mt-1
            w-full
            border
            rounded-md
            px-3
            py-2
          "
        />

      </div>

      <div>

        <label>
          Phone
        </label>

        <input
          defaultValue={
            business.phone
          }
          className="
            mt-1
            w-full
            border
            rounded-md
            px-3
            py-2
          "
        />

      </div>

      <div>

        <label>
          Address
        </label>

        <textarea
          rows={4}
          defaultValue={
            business.address
          }
          className="
            mt-1
            w-full
            border
            rounded-md
            px-3
            py-2
          "
        />

      </div>

      <div
        className="
          flex
          justify-end
          gap-2
        "
      >

        <Button
          variant="secondary"
          onClick={() =>
            setOpenBusinessDrawer(false)
          }
        >
          Cancel
        </Button>

        <Button>
          Save
        </Button>

      </div>

    </div>

  </Drawer>

  {/* MEMBER DRAWER */}

  <Drawer
    open={openMemberDrawer}
    title="Business Member"
    onClose={() =>
      setOpenMemberDrawer(false)
    }
  >

    <div className="space-y-4">

      <div>

        <label>
          Name
        </label>

        <input
          className="
            mt-1
            w-full
            border
            rounded-md
            px-3
            py-2
          "
        />

      </div>

      <div>

        <label>
          Email
        </label>

        <input
          className="
            mt-1
            w-full
            border
            rounded-md
            px-3
            py-2
          "
        />

      </div>

      <div>

        <label>
          Role
        </label>

        <select
          className="
            mt-1
            w-full
            border
            rounded-md
            px-3
            py-2
          "
        >
          <option>
            Creator
          </option>

          <option>
            Administrator
          </option>

          <option>
            Staff
          </option>

        </select>

      </div>

      <div
        className="
          flex
          justify-end
          gap-2
        "
      >

        <Button
          variant="secondary"
          onClick={() =>
            setOpenMemberDrawer(false)
          }
        >
          Cancel
        </Button>

        <Button>
          Save
        </Button>

      </div>

    </div>

  </Drawer>

</div>

);
}