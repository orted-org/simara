import React, { useEffect } from "react";
import styled from "styled-components";
import { useSimara } from "../Global/Context";
import { ISimaraThemeData } from "../Global/Interface";
import {
  IconCheck,
  IconExclamation,
  IconExclamationCircle,
  IconInformationCircle,
  IconX,
} from "./Icons";
import IconWrapper from "./IconWrapper";

const STC = styled.div`
  box-sizing: border-box;
  max-width: 100%;
  width: 400px;
  height: fit-content;
  border-radius: ${(p) => p.theme.borderRadius + "px"};
  background: ${(p) => p.theme.backgroundColor};
  border: 0.2px solid ${(p) => p.theme.intentColor};
  overflow: hidden;
  padding: 10px;
  display: flex;
  margin-top: 10px;
  font-size: small;
  translate: all 0.3s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  z-index: 98;
`;
function getToastTheme(p: ToastProps, baseTheme: ISimaraThemeData) {
  let intentColor = baseTheme.Colors.primary.dil0;
  let backgroundColor = baseTheme.Colors.primary.dil90;
  let icon = IconInformationCircle;
  switch (p.intent) {
    case "danger":
      intentColor = baseTheme.Colors.danger.dil0;
      backgroundColor = baseTheme.Colors.danger.dil90;
      icon = IconExclamationCircle;
      break;
    case "success":
      intentColor = baseTheme.Colors.success.dil0;
      backgroundColor = baseTheme.Colors.success.dil90;
      icon = IconCheck;
      break;
    case "warning":
      intentColor = baseTheme.Colors.warning.dil0;
      backgroundColor = baseTheme.Colors.warning.dil90;
      icon = IconExclamation;
      break;
  }
  return {
    backgroundColor,
    intentColor,
    borderRadius: baseTheme.BorderRadius,
    icon,
  };
}

interface ToastProps {
  intent?: "info" | "danger" | "success" | "warning";
  title?: string;
  message: string;
  customIcon?: JSX.Element;
  duration?: number;
  onClose: () => void;
  id: string;
  style?: React.CSSProperties;
}
function Toast(props: ToastProps) {
  const simara = useSimara();
  const toastTheme = getToastTheme(props, useSimara());
  useEffect(() => {
    const duration = props.duration || simara.AlertDuration;
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      props.onClose && props.onClose();
    }, duration);
  }, [props, props.duration, simara.AlertDuration]);
  return (
    <STC theme={toastTheme}>
      <IconWrapper
        color={toastTheme.intentColor}
        cSize="large"
        style={{
          borderRadius: "50%",
          flex: "0 0 auto",
          marginRight: "10px",
        }}
      >
        {toastTheme.icon}
      </IconWrapper>
      <div style={{ flex: "1 1 auto" }}>
        <b
          style={{
            filter: "brightness(70%)",
            padding: "0",
            margin: "0",
            color: toastTheme.intentColor,
            fontWeight: 600,
          }}
        >
          {props.title}
        </b>
        <p
          style={{
            padding: "0",
            margin: "0",
            color: useSimara().Colors.grey.dil30,
          }}
        >
          {props.message}
        </p>
      </div>
      <div onClick={props.onClose}>
        <IconWrapper
          color={toastTheme.intentColor}
          cSize="small"
          style={{
            borderRadius: "50%",
            flex: "0 0 auto",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          {IconX}
        </IconWrapper>
      </div>
    </STC>
  );
}

export default Toast;
