import { createContext, PropsWithChildren, useState } from "react";
import { MenuItem } from "../interfaces/menu.interface";
import { TopLevelCategory } from "../interfaces/page.interface";

export interface AppContext {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  setMenu?: (newMenu: MenuItem[]) => void;
}

export const Context = createContext<AppContext>({ menu: [], firstCategory: TopLevelCategory.Courses });

export const ContextProvider = ({ menu, firstCategory, children }: PropsWithChildren<AppContext>): JSX.Element => {
  const [menuState, setMenuState] = useState<MenuItem[]>(menu);
  const setMenu = (newMenu: MenuItem[]) => {
    setMenuState(newMenu);
  };

  return (
    <Context.Provider value={{ menu: menuState, firstCategory, setMenu }}>
      {children}
    </Context.Provider>
  );
};
