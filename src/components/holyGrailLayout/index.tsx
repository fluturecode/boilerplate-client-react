import {
  HolyGrailWrapper,
  HolyGrailMainWrapper,
  HolyGrailLeftAside,
  HolyGrailMain,
  HolyGrailRightAside
} from './styled';
import { HolyGrailType } from './types';

export const HolyGrailLayout: HolyGrailType = ({ leftSidebar, children, rightSidebar, footer }) => (
  <HolyGrailWrapper data-testid="wrapper">
    <HolyGrailMainWrapper data-testid="mainWrapper">
      {!!leftSidebar && <HolyGrailLeftAside data-testid="leftAside">{leftSidebar}</HolyGrailLeftAside>}
      {!!children && <HolyGrailMain data-testid="main">{children}</HolyGrailMain>}
      {!!rightSidebar && <HolyGrailRightAside data-testid="rightAside">{rightSidebar}</HolyGrailRightAside>}
    </HolyGrailMainWrapper>
    {!!footer && footer}
  </HolyGrailWrapper>
);