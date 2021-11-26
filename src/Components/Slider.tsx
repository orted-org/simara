import { InputHTMLAttributes, useMemo, useState } from "react";
import styled from "styled-components";
import { useSimara } from "../Global/Context";
import { ISimaraThemeData } from "../Global/Interface";
import { ComponentIntent, ComponentSize } from "../Global/Type";

const SSlider = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  width: 100%;
  height: ${(p) => p.theme.height + "px"};
  border-radius: ${(p) => p.theme.height + "px"};
  cursor: pointer;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: ${(p) => p.theme.height * 2 + "px"};
    width: ${(p) => p.theme.height * 2 + "px"};
    border-radius: ${(p) => p.theme.height + "px"};
    background: ${(p) => p.theme.thumbColor};
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  }
`;
function getSliderTheme(p: SliderProps, baseTheme: ISimaraThemeData) {
  let height = baseTheme.MediumHeight / 4;
  let theme = baseTheme.Colors.primary;
  switch (p.cSize) {
    case "small":
      height = baseTheme.SmallHeight / 4;
      break;
    case "large":
      height = baseTheme.LargeHeight / 4;
      break;
  }
  switch (p.intent) {
    case "danger":
      theme = baseTheme.Colors.danger;
      break;
    case "success":
      theme = baseTheme.Colors.success;
      break;
  }
  return {
    height,
    backgroundColor: p.indicateComplete
      ? baseTheme.Colors.grey.dil60
      : theme.dil90,
    completedColor: theme.dil90,
    thumbColor: theme.dil0,
  };
}
interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  cSize?: ComponentSize;
  intent?: ComponentIntent;
  indicateComplete?: boolean;
}
function Slider(props: SliderProps) {
  const simaraTheme = useSimara();
  let badgeTheme = useMemo(
    () => getSliderTheme(props, simaraTheme),
    [props, simaraTheme]
  );
  const [value, setValue] = useState((props.value || 50) + "%");
  return (
    <SSlider
      theme={badgeTheme}
      type="range"
      onChange={(e) => {
        props.onChange && props.onChange(e);
        setValue(e.target.value + "%");
      }}
      {...props}
      style={{
        background: `linear-gradient(90deg, ${badgeTheme.completedColor} ${value}, ${badgeTheme.backgroundColor} ${value})`,
        ...props.style,
      }}
    />
  );
}

export default Slider;
