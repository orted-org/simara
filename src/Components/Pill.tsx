import React, { useMemo } from "react";
import styled from "styled-components";
import { useSimara } from "../Global/Context";
import { ISimaraThemeData } from "../Global/Interface";
import { ComponentSize } from "../Global/Type";
const SBadge = styled.div`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  font-size: ${(p) => p.theme.fontSize + "px"};
  border-radius: ${(p) => p.theme.fontSize + "px"};
  background: ${(p) => p.theme.backgroundColor};
  color: ${(p) => p.theme.internalColor};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0 5px;
  font-weight: 700;
`;
interface BadgeProps {
  intent?: "info" | "danger" | "success" | "warning" | "grey";
  cSize?: ComponentSize;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function getBadgeTheme(p: BadgeProps, baseTheme: ISimaraThemeData) {
  const filterFactor =
    baseTheme.Colors.background === "#ffffff" ? "100%" : "200%";
  const filter = "brightness(" + filterFactor + ")";
  let fontSize = baseTheme.MediumHeight / 3;
  let theme = baseTheme.Colors.primary;

  switch (p.cSize) {
    case "small":
      fontSize = baseTheme.SmallHeight / 3;
      break;
    case "large":
      fontSize = baseTheme.LargeHeight / 3;
      break;
  }
  switch (p.intent) {
    case "danger":
      theme = baseTheme.Colors.danger;
      break;
    case "success":
      theme = baseTheme.Colors.success;
      break;
    case "warning":
      theme = baseTheme.Colors.warning;
      break;
    case "grey":
      theme = baseTheme.Colors.grey;
      break;
  }
  return {
    filter,
    fontSize,
    backgroundColor: theme.dil90,
    internalColor: theme.dil0,
  };
}
function Pill(props: BadgeProps) {
  const simaraTheme = useSimara();
  let badgeTheme = useMemo(
    () => getBadgeTheme(props, simaraTheme),
    [props, simaraTheme]
  );

  return (
    <SBadge theme={badgeTheme} style={props.style}>
      <p
        style={{
          filter: badgeTheme.filter,
        }}
      >
        {props.children}
      </p>
    </SBadge>
  );
}

export default Pill;
