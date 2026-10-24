import { useEffect, useState, useCallback } from "react";
import {
  Eye,
  EyeOff
} from "lucide-react";

import {
  buildMenuTree,
  updateMenuTree 
} from "../../../../../common/helpers/menu.js";

import {
    TextInput,
    Select,
    Checkbox,
    DataTable
} from "../../../../../components/ui";

import { useAuthStore } from "../../../../../store/authStore";
import { sysAdminStore } from "../../system-administration.store";
import { useAppStore }  from "../../../../../store/appStore";

export default function UserMenuTab({
    formik,
    businessMember,
    selectedRole,
    userMenus,
    setUserMenus,
    // brandOptions = [],
    // unitOptions = [],
}) {

    const businessName = useAuthStore((state) => state.businessName);

    const fetchMenu = sysAdminStore((state) => state.fetchMenu);
    const menu = sysAdminStore((state) => state.menu);
    const menuFetched = sysAdminStore((state) => state.menuFetched);
    
    const menuLoading = sysAdminStore((state) => state.loading.menu);

    const isParent = (row) => row.type === "P";

    /*
     * =========================================================
     * FETCH MENU
     * =========================================================
    */
    useEffect(() => {
        if (!menuFetched || userMenus.length > 0) return;

        setUserMenus(buildMenuTree(menu));
    }, [menuFetched, menu, userMenus.length, setUserMenus]);

    // useEffect(() => {
    //     let cancelled = false;

    //     const loadMenu = async () => {
    //         const menu = await fetchMenu();

    //         if (cancelled) return;

    //          setUserForm({
    //             id:"",
    //             username: "",
    //             menus: buildMenuTree(menu),
    //         })
    //     }

    //     loadMenu();

    //     return () => {
    //         cancelled = true;
    //     }
    // }, [fetchMenu]);


    const handleToggleMenu = (row) => {
        setUserMenus((prev) =>
            updateMenuTree(
                prev,
                row.code,
                "view",
                !row.view
            )
        );
    };

    const handlePermission = (row, permission) => {
        setUserMenus((prev) =>
            prev.map((menuItem) => {
                if (menuItem.code !== row.code) {
                    return menuItem;
                }

                return {
                    ...menuItem,
                    [permission]: !menuItem[permission],
                };
            })
        );
    };

    const menuColumns=[
        {
        key: "code",
        title: "Code",
        width: 120,
        },
        {
        key:"name",
        title:"Name",
        render:(row)=>(
            <div
            className={
                row.level===0
                    ?"font-semibold"
                    :""
            }
            style={{
                paddingLeft:
                    `${row.level*25}px`
            }}
            >
            {row.name}
            </div>
        )
        },
        {
        key:"view",
        title:"Access",
        width:80,
            render:(row)=>(
            <input
                type="checkbox"
                checked={row.view ?? false}
                disabled={row.type === "P"}
                onChange={()=>
                handleToggleMenu(
                    row,
                    "view"
                )
                }
            />
            )
        },
        {
        key:"create",
        title:"Create",
        width:80,
        render:(row)=>(
            <input
            type="checkbox"
            checked={row.create ?? false}
            disabled={
                    isParent(row) || !row.view
                }
            onChange={()=>
                handlePermission(
                row,
                "create"
                )
            }
            />
        )
        },
        {
        key:"edit",
        title:"Edit",
        width:80,
        render:(row)=>(
            <input
            type="checkbox"
            checked={row.edit ?? false}
            disabled={
                    isParent(row) || !row.view
                }
            onChange={()=>
                handlePermission(
                row,
                "edit"
                )
            }
            />
        )
        },
    {
      key:"delete",
      title:"Delete",
      width:80,
      render:(row)=>(
        <input
          type="checkbox"
          checked={row.delete ?? false}
          disabled={
                isParent(row) || !row.view
            }
          onChange={()=>
            handlePermission(
              row,
              "delete"
            )
          }
        />
      )
    }
  ];

    return (
        <div className="grid gap-5">

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Business
                </label>
                <TextInput
                    name="businessName"
                    value={businessName}
                    disabled

                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Business Member
                </label>
                <TextInput
                    name="businessMemberName"
                    value={businessMember.name}
                    disabled
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Role
                </label>
                <TextInput
                    name="selectedRole"
                    value={selectedRole}
                    disabled
                />
            </div>

            <div className="h-[420px] overflow-auto">
                <DataTable
                columns={menuColumns}
                data={userMenus}
                loading={menuLoading}
                />
            </div>
        </div>

    );
}