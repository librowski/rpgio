import * as React from 'react';
import { StoreProvider } from './StoreProvider';
import { RouterProvider } from './RouterProvider';
import { I18nProvider } from './I18nProvider';
import { ThemeProvider } from './ThemeProvider';
import { GlobalStylesProvider } from './GlobalStylesProvider';

export const Provider: React.FC = ({ children }) => (
    <StoreProvider>
        <I18nProvider>
            <RouterProvider>
                <ThemeProvider>
                    <GlobalStylesProvider>
                        { children }
                    </GlobalStylesProvider>
                </ThemeProvider>
            </RouterProvider>
        </I18nProvider>
    </StoreProvider>
);
