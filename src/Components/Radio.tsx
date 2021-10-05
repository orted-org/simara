import React from "react";
import styled from "styled-components";
import { useSimara } from "../Global/Context";
import { ISimaraThemeData } from "../Global/Interface";
import { ComponentIntent, ComponentSize } from "../Global/Type";
import { getNearestEven } from "../Utils/Size";
const SRadioTrack = styled.div`
  box-sizing: border-box;
  background: ${(p) => p.theme.trackColor};
  height: ${(p) => p.theme.height + "px"};
  width: ${(p) => p.theme.height + "px"};
  border-radius: ${(p) => p.theme.height / 2 + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(p) => p.theme.borderColor};
  cursor: pointer;
`;

const SRadioThumb = styled.div`
  height: ${(p) => getNearestEven(p.theme.height * 0.4) + "px"};
  width: ${(p) => getNearestEven(p.theme.height * 0.4) + "px"};
  border-radius: ${(p) => p.theme.height / 2 + "px"};
  transition: all 0.3s;
  background: white;
`;

function getRadioTheme(p: RadioProps, baseTheme: ISimaraThemeData) {
  let height = baseTheme.MediumHeight / 2;
  let trackColor = baseTheme.Colors.primary.dil0;
  let borderColor = baseTheme.Colors.primary.dil60;
  switch (p.cSize) {
    case "small":
      height = baseTheme.SmallHeight / 2;
      break;
    case "large":
      height = baseTheme.LargeHeight / 2;
      break;
  }
  if (!p.isOn) {
    trackColor = baseTheme.Colors.grey.dil90;
    borderColor = baseTheme.Colors.grey.dil60;
  } else {
    switch (p.intent) {
      case "success":
        trackColor = baseTheme.Colors.success.dil0;
        borderColor = baseTheme.Colors.success.dil60;
        break;
      case "danger":
        trackColor = baseTheme.Colors.danger.dil0;
        borderColor = baseTheme.Colors.danger.dil60;
        break;
    }
  }
  return {
    height,
    trackColor,
    borderColor,
  };
}
interface RadioProps {
  cSize?: ComponentSize;
  isOn?: boolean;
  onTap?: () => void;
  intent?: ComponentIntent;
  style?: React.CSSProperties;
  label?: string;
}
function Radio(props: RadioProps) {
  const radioTheme = getRadioTheme(props, useSimara());
  return (
    <label
      onClick={props.onTap}
      style={{
        fontSize: radioTheme.height / 1.5 + "px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        ...props.style,
      }}
    >
      <SRadioTrack theme={radioTheme}>
        <SRadioThumb
          theme={radioTheme}
          style={{ background: props.isOn ? "white" : radioTheme.trackColor }}
        />
      </SRadioTrack>
      <span style={{ marginLeft: "10px" }}>{props.label}</span>
    </label>
  );
}

export default Radio;
