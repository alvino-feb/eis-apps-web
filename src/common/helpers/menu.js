export const getMenuCode = (menu) =>
  menu.code ?? menu.menuCode;

export const updateMenuTree = (
  menus,
  code,
  field,
  value
) => {

  // update menu yang dipilih
  let result = menus.map(menu => {
    if (getMenuCode(menu) === code) {
      return {
        ...menu,
        [field]: value,

        create: value ? menu.create : false,
        edit: value ? menu.edit : false,
        delete: value ? menu.delete : false,
      };
    }
    return {
      ...menu,
    };

  });

  // hitung ulang parent dari bawah ke atas
  const levels =
    [...new Set(result.map(x => x.level))]
      .sort((a, b) => b - a);

  levels.forEach(level => {

    result = result.map(menu => {

      if (menu.level !== level - 1)
        return menu;

      const children =
        result.filter(
          x => x.parentCode === getMenuCode(menu)
        );

      if (!children.length)
        return menu;

      const checked =
        children.some(
          x => x.view
        );

      return {
        ...menu,
        view: checked,
        
        create: checked ? menu.create : false,
        edit: checked ? menu.edit : false,
        delete: checked ? menu.delete : false,

      };

    });

  });

  return result;

};

export const buildMenuTree = (
  menus = [],
  parentCode = "",
  level = 0
) => {

  return menus
    .filter(
      menu => menu.parentCode === parentCode
    )
    .flatMap(menu => 
      // {
        // const code = menu.menuCode ?? menu.code;
          [
            {
              ...menu,
              level,
            },

            ...buildMenuTree(
              menus,
              menu.code,
              level + 1
            ),
        ]
      // }
  );

};