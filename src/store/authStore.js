import { create } from "zustand";

export const useAuthStore = create((set) => ({

  userId:
    localStorage.getItem("userId"),

  username:
    localStorage.getItem("username"),

  businessId:
    localStorage.getItem("businessId"),

  accessToken:
    localStorage.getItem("accessToken"),

  refreshToken:
    localStorage.getItem("refreshToken"),

  businessMembers: JSON.parse(
    localStorage.getItem(
      "businessMembers"
    ) || "[]"
  ),

  selectedBusinessMember: JSON.parse(
    localStorage.getItem(
      "selectedBusinessMember"
    ) || "null"
  ),

  setAuth: (data) => {

    localStorage.setItem(
      "userId",
      data.userId
    );

    localStorage.setItem(
      "username",
      data.username
    );

    localStorage.setItem(
      "businessId",
      data.businessId
    );

    localStorage.setItem(
      "businessMembers",
      JSON.stringify(
        data.businessMembers || []
      )
    );

    localStorage.setItem(
      "accessToken",
      data.accessToken
    );

    localStorage.setItem(
      "refreshToken",
      data.refreshToken
    );

    set({

      userId:
        data.userId,

      username:
        data.username,

      businessId:
        data.businessId,

      businessMembers:
        data.businessMembers || [],

      accessToken:
        data.accessToken,

      refreshToken:
        data.refreshToken,

    });

  },

  setBusinessMember: (
    member
  ) => {

    localStorage.setItem(
      "selectedBusinessMember",
      JSON.stringify(member)
    );

    set({
      selectedBusinessMember:
        member,
    });

  },

  setAccessToken: (
    accessToken
  ) => {

    localStorage.setItem(
      "accessToken",
      accessToken
    );

    set({
      accessToken,
    });

  },

  logout: () => {

    localStorage.clear();

    set({

      userId: null,

      username: null,

      businessId: null,

      accessToken: null,

      refreshToken: null,

      businessMembers: [],

      selectedBusinessMember: null,

    });

  },

}));