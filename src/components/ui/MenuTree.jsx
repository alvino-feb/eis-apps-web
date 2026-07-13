export default function MenuTree({
    menus = [],
    onToggle,
}) {

    const renderMenus = (
        parentCode = null,
        level = 0
    ) => {

        return menus
            .filter(
                menu =>
                    menu.parentCode === parentCode
            )
            .map(menu => {

                const hasChild =
                    menus.some(
                        x =>
                            x.parentCode === menu.menuCode
                    );

                return (

                    <div
                        key={menu.menuCode}
                    >

                        <div
                            className="flex items-center gap-2 py-1"
                            style={{
                                paddingLeft:
                                    `${level * 20}px`
                            }}
                        >

                            <input
                                type="checkbox"
                                checked={
                                    menu.checked ?? false
                                }
                                onChange={() =>
                                    onToggle(menu)
                                }
                            />

                            <span
                                className={
                                    hasChild
                                        ? "font-semibold"
                                        : ""
                                }
                            >
                                {menu.name}
                            </span>

                        </div>

                        {renderMenus(
                            menu.menuCode,
                            level + 1
                        )}

                    </div>

                );

            });

    };

    return (
        <div>
            {renderMenus()}
        </div>
    );

}