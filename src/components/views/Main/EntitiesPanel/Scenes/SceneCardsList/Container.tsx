import styled from 'styled-components';
import { getSize } from '../../../../../shared/styles/theme';

type Props = {
    width: number;
}

export const Container = styled.div<Props>`
    position: relative;
    height: 100%;
    will-change: width;
    width: 100%;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-auto-rows: 100%;
    grid-gap: ${getSize('sceneCardSpacing')}px;

    @media (min-height: 800px) {
        grid-auto-rows: calc(50% - ${getSize('sceneCardSpacing')}px);
    }
`;
