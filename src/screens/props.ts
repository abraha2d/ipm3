import { CANDataProps, IPM3Screen } from "types";

export default interface ScreenProps extends CANDataProps {
  currentScreen: IPM3Screen;
}
