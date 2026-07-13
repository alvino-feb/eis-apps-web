export const SYSTEM_ROLE_CODES = [
  "BA",
  "CR",
  "MA",
];

export const ROLE_PERMISSION = {

  canEdit(role) {

    return role &&
      !SYSTEM_ROLE_CODES.includes(role.code);

  },

  canDelete(role) {

    return role &&
      !SYSTEM_ROLE_CODES.includes(role.code);

  },

  canAssign(role) {

    return true;

  },

  canDeleteUser(user) {

    return user &&
      !SYSTEM_ROLE_CODES.includes(user.roleCode);

  },

};