import * as React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '../shared/styles/theme';

export const ThemeProvider: React.FC = ({ children }) => (
    <StyledThemeProvider theme={theme}>
        { children }
    </StyledThemeProvider>
);
