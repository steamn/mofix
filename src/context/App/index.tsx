import React, {createContext, FC} from 'react';
import Modules from 'modules';
import {Provider} from 'mobx-react';

export const AppContext = createContext(Modules);

export const AppContextProvider: FC = props => (
  <AppContext.Provider
    value={{
      services: Modules.services,
      repositories: Modules.repositories,
      stores: Modules.stores,
    }}>
    <Provider {...Modules.stores}>{props.children}</Provider>
  </AppContext.Provider>
);
