import { useState } from "react";

import {
  PageHeader,
  Card,
  CardHeader,
  Toolbar,
  SearchInput,
  DataTable,
  Modal,
  Button,
} from "../../../../components/ui";

export default function BusinessInfo() {

  const [search, setSearch] =
    useState("");

  const [openBusinessModal, setOpenBusinessModal] =
    useState(false);

  const [openMemberModal, setOpenMemberModal] =
    useState(false);

  const business = {
    name: "PT Enterprise Integrated System",
    email: "admin@eis.com",
    phone: "08123456789",
    address: "Jakarta, Indonesia",
  };

  const members = [
    {
      businessMemberId: "1",
      name: "Alvino",
      role: "Creator",
      email: "vinokyo@gmail.com",
    },
    {
      businessMemberId: "2",
      name: "John Doe",
      role: "Administrator",
      email: "john@mail.com",
    },
  ];

  const filteredMembers =
    members.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
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
      key: "role",
      title: "Role",
    },
    {
      key: "action",
      title: "Action",

      render: (row) => (
        <Button
          size="sm"
          onClick={() =>
            setOpenMemberModal(true)
          }
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">

      <PageHeader
        title="Business Information"
        description="Manage business profile and members"
      />

      {/* BUSINESS INFO */}

      <Card>

        <CardHeader
          title="Business Information"
          description="General information about business"
          action={
            <Button
              onClick={() =>
                setOpenBusinessModal(
                  true
                )
              }
            >
              Edit
            </Button>
          }
        />

        <div
          className="
            p-5
            grid
            md:grid-cols-2
            gap-5
          "
        >

          <div>

            <div
              className="
                text-xs
                text-gray-500
                mb-1
              "
            >
              Business Name
            </div>

            <div
              className="
                font-medium
              "
            >
              {business.name}
            </div>

          </div>

          <div>

            <div
              className="
                text-xs
                text-gray-500
                mb-1
              "
            >
              Email
            </div>

            <div>
              {business.email}
            </div>

          </div>

          <div>

            <div
              className="
                text-xs
                text-gray-500
                mb-1
              "
            >
              Phone
            </div>

            <div>
              {business.phone}
            </div>

          </div>

          <div>

            <div
              className="
                text-xs
                text-gray-500
                mb-1
              "
            >
              Address
            </div>

            <div>
              {business.address}
            </div>

          </div>

        </div>

      </Card>

      {/* MEMBERS */}

      <Card>

        <CardHeader
          title="Business Members"
          description="Manage business users and roles"
          action={
            <Button
              onClick={() =>
                setOpenMemberModal(
                  true
                )
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

      {/* BUSINESS MODAL */}

      <Modal
        open={openBusinessModal}
        onClose={() =>
          setOpenBusinessModal(
            false
          )
        }
        title="Edit Business Information"
      >

        <div
          className="
            grid
            gap-4
          "
        >

          <div>

            <label
              className="
                text-sm
                font-medium
              "
            >
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

            <label
              className="
                text-sm
                font-medium
              "
            >
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
                setOpenBusinessModal(
                  false
                )
              }
            >
              Cancel
            </Button>

            <Button>
              Save
            </Button>

          </div>

        </div>

      </Modal>

      {/* MEMBER MODAL */}

      <Modal
        open={openMemberModal}
        onClose={() =>
          setOpenMemberModal(
            false
          )
        }
        title="Business Member"
      >

        <div
          className="
            grid
            gap-4
          "
        >

          <div>

            <label
              className="
                text-sm
                font-medium
              "
            >
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

            <label
              className="
                text-sm
                font-medium
              "
            >
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

            <label
              className="
                text-sm
                font-medium
              "
            >
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
                setOpenMemberModal(
                  false
                )
              }
            >
              Cancel
            </Button>

            <Button>
              Save
            </Button>

          </div>

        </div>

      </Modal>

    </div>
  );
}