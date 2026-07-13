import { create } from "zustand";
import * as sysAdminService from "./system-administration.service.js";

const initialState = {
  error: null,

  loading: {
    business: false,
    saveBusiness: false,
    updateBusiness: false,

    businessMember: false,
    saveBusinessMember: false,
    updateBusinessMember: false,
    deleteBusinessMember: false,

    user: false,
    userByMemberAndRole: false,
    saveUser: false,
    updateUser: false,
    deleteUser: false,

    userBusinessMember: false,
    userBusinessMemberByUser: false,

    role: false,
    createRole: false,
    updateRole: false,
    deleteRole: false,

    roleMember: false,
    
    userMenu: false,
    userMenuList: false,
    saveUserMenu: false,
    updateUserMenu: false,

    menu: false,
  },
};

export const sysAdminStore = create((set, get) => ({
    ...initialState,

    setLoading: (
      key,
      value
    ) =>
      set((state) => ({
        loading: {
          ...state.loading,
          [key]: value,
        },
      })),

// *********************** BUSINESS ***********************//
    fetchBusiness: async (businessId) => {
        try {

            get().setLoading(
                "business",
                true
            );

            set({
                business: [],
                error: null,
            });
            
            const result = await sysAdminService.getBusinessInfo(businessId);
           
            set({ business: result.data.data });
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "business",
                false
            );
        }
    },

    updateBusiness:
      async (
        businessId,
        payload
      ) => {

        try{

            get().setLoading(
                "updateBusiness",
                true
            );

            return await sysAdminService.updateBusinessInfo(
            businessId,
            payload);
        } finally {

            get().setLoading(
            "updateBusiness",
            false
            );

        }
        
      },

    clearBusiness: () =>
        set({
            business: [],
    }), 

// *********************** BUSINESS MEMBER ***********************//
    fetchBusinessMember: async (businessId) => {
        try {
            
            get().setLoading(
                "businessMember",
                true
            );

            set({
                businessMember:[],
                error: null,
            });
            
            const result = await sysAdminService.getBusinessMembers(businessId);
           
            set({ businessMember: result.data.data.data });
        
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {

            get().setLoading(
                "businessMember",
                false
            );
        }
    },

    createBusinessMember:
      async (payload) => {
        
        try{

            get().setLoading(
                "saveBusinessMember",
                true
            );

            return await sysAdminService.createBusinessMember(
                payload
            );

        } finally{

            get().setLoading(
                "saveBusinessMember",
                false
            );

        }
        
      },

    updateBusinessMember:
      async (
        businessId,
        payload
      ) => {
        
        try{

            get().setLoading(
                "updateBusinessMember",
                true
            );

            return await sysAdminService.updateBusinessMember(
                businessId,
                payload
            );
        } finally{

            get().setLoading(
                "saveBusinessMember",
                false
            );

        }
        

      },

    deleteBusinessMember:
      async (
        businessId,
        businessMemberId
      ) => {

        try{
            get().setLoading(
                "deleteBusinessMember",
                true
            );

            return await sysAdminService.deleteBusinessMember(
                businessId,
                businessMemberId
            );
        } finally {
            
            get().setLoading(
                "deleteBusinessMember",
                false
            );

        }
        
      },

    clearBusinessMember: () =>
        set({
            businessMember: [],
    }), 

// *********************** USER ***********************//
    fetchUsers: async (businessId) => {
        try {

            get().setLoading(
                "user",
                true
            );

            set({
                users:[],
                error: null,
            });
            
            const result = await sysAdminService.getUsers(businessId);
           
            set({ users: result.data.data.data });
        
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "user",
                false
            );
        }
    },

    fetchUser: async (id) => {
        try {

            get().setLoading(
                "user",
                true
            );

            set({
                user:[],
                error: null,
            });
            
            const result = await sysAdminService.getUsers(id);
           
            set({ user: result.data.data.data });
        
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "user",
                false
            );
        }
    },

    fetchUserByMemberAndRole: async (businessId,businessMemberId,roleId) => {
        try {

            get().setLoading(
                "userByMemberAndRole",
                true
            );

            set({
                userByMemberAndRole:[],
                error: null,
            });
            
            const result = await sysAdminService.getUserByMemberAndRole(businessId,businessMemberId,roleId);
           
            set({ userByMemberAndRole: result.data.data });
        
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {

            get().setLoading(
                "userByMemberAndRole",
                false
            );

        }
    },

    createUser:
      async (payload) => {

        try{
            get().setLoading(
                "saveUser",
                true
            );

            return await sysAdminService.createUser(
                payload
            );
    
        } finally {
            get().setLoading(
                "saveUser",
                false
            );
        }
      },

    updateUser: async (payload) => {
        try {
            get().setLoading(
                "updateUser",
                true
            );
            return await sysAdminService.updateUser(
                payload
            );
        } finally {
            get().setLoading(
                "updateUser",
                false
            );
        }
      },

    deleteUser:
      async (
        businessId,
        businessMemberId,
        id
      ) => {

        try {

            get().setLoading(
                "deleteUser",
                true
            );

            return await sysAdminService.deleteUser(
                businessId,
                businessMemberId,
                id
            );
        } finally {

            get().setLoading(
                "deleteUser",
                false
            );

        }
        
      },
    
    clearUser: () =>
        set({
            user: [],
    }), 

    clearUserByMemberAndRole: () =>
        set({
            userByMemberAndRole: [],
    }), 

// *********************** USER BUSINESS MEMBER ***********************//
    fetchUserBusinessMembers: async (userId) => {
        try {
            
            get().setLoading(
                "userBusinessMember",
                true
            );

            set({
                userBusinessMember:[],
                error: null,
            });
            
            const result = await sysAdminService.getUserBusinessMembers(userId);
           
            set({ userBusinessMember: result.data.data.data });
        
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {

            get().setLoading(
                "userBusinessMember",
                false
            );

        }
    },

    fetchUserBusinessMembersbyUser: async (businessId,userId) => {
        try {

            get().setLoading(
                "userBusinessMemberByUser",
                true
            );

            set({
                userBusinessMemberByUser:[],
                error: null,
            });
            
            const result = await sysAdminService.getUserBusinessMembersByUser(businessId,userId);
           
            set({ userBusinessMemberByUser: result.data.data });
        
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {

            get().setLoading(
                "userBusinessMemberByUser",
                false
            );

        }
    },

    assignUserMember:
      async (payload) => {

        return await sysAdminService.assignMember(
          payload
        );

    },

    deleteUserMember:
      async (
        businessMemberId
      ) => {

        return await sysAdminService.deleteUserMember(
          businessMemberId
        );

    },

    clearUserBusinessMember: () =>
        set({
            userBusinessMember: [],
    }), 

// *********************** USER MENU ***********************//
    fetchUserMenu: async (userId,businessMemberId) => {
        try {

            get().setLoading(
                "userMenu",
                true
            );

            set({
                userMenu:[],
                error: null,
            });

            const result = await sysAdminService.getUserMenus(userId,businessMemberId);
           
            set({ userMenu: result.data.data.data });
        
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "userMenu",
                false
            );
        }
    },

    fetchUserMenuList: async (businessId,businessMemberId,userId) => {
        try {

            get().setLoading(
                "userMenuList",
                true
            );

            set({
                userMenu:[],
                error: null,
            });

            const result = await sysAdminService.getUserMenuList(businessId,businessMemberId,userId);
           
            set({ userMenuList: result.data.data });
        
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "userMenuList",
                false
            );
        }
    },

    clearUserMenuList: () =>
        set({
            userMenuList: [],
    }), 

// *********************** ROLE ***********************//
    fetchRole: async (businessId) => {
        try {
            get().setLoading(
                "role",
                true
            );

            set({
                roles:[],
                error: null,
            });
            
            const result = await sysAdminService.getRole(businessId);
           
            set({ roles: result.data.data.data });
        
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "role",
                false
            );
        }
    },

    fetchRoleWithMenu : async (businessId,id) => {
        try {

            get().setLoading(
                "roleWithMenu",
                true
            );

            set({
                roleWithMenu:[],
                error: null,
            });
            
            const result = await sysAdminService.getRoleWithMenu(businessId,id);

            set({ roleWithMenu: result.data.data });
            return result.data.data;

        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "roleWithMenu",
                false
            );
        }
    },

    fetchRoleByMember : async (businessId,selectedMember) => {
        try {

            get().setLoading(
                "roleMember",
                true
            );

            set({
                rolesByMember:[],
                error: null,
            });
            
            const result = await sysAdminService.getRolebyMember(businessId,selectedMember);

            set({ rolesByMember: result.data.data });
        
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "roleMember",
                false
            );
        }
    },

    clearRolesByMember: () =>
        set({
            rolesByMember: [],
    }), 

    createRole: async (payload) => {
        try{
            get().setLoading(
                "createRole",
                true
            );
            return await sysAdminService.createRole(
                payload
            );
    
        } finally {
            get().setLoading(
                "createRole",
                false
            );
        }
    },

    updateRole: async (payload) => {        
        try{
            get().setLoading(
                "updateRole",
                true
            );
            return await sysAdminService.updateRole(
                payload
            );
    
        } finally {
            get().setLoading(
                "updateRole",
                false
            );
        }
    },

    deleteRole: async (businessId,id) => {        
        try{
            get().setLoading(
                "deleteRole",
                true
            );
            return await sysAdminService.deleteRole(
                businessId,id
            );
    
        } finally {
            get().setLoading(
                "deleteRole",
                false
            );
        }
    },

    // *********************** MENU ***********************//
    fetchMenu: async () => {
        try {

            get().setLoading(
                "menu",
                true
            );

            set({
                menus:[],
                error: null,
            });
            
            const result = await sysAdminService.getMenu();
           
            set({ menus: result.data.data.data });
            
            return result.data.data.data;

        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "menu",
                false
            );
        }
    },


}));

