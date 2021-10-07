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
  border: 1.5px solid ${(p) => p.theme.intentColor};
  background: ${(p) => p.theme.background};
  overflow: hidden;
  padding: 10px;
  display: flex;
  margin-top: 10px;
  font-size: small;
  translate: all 0.3s;
  box-shadow: 0 0 0 2px ${(p) => p.theme.boxShadowColor};
  z-index: 98;
`;
function getToastTheme(p: ToastProps, baseTheme: ISimaraThemeData) {
  let intentColor = baseTheme.Colors.primary.dil0;
  let boxShadowColor = baseTheme.Colors.primary.dil60;
  let icon = IconInformationCircle;
  switch (p.intent) {
    case "danger":
      intentColor = baseTheme.Colors.danger.dil0;
      boxShadowColor = baseTheme.Colors.danger.dil60;
      icon = IconExclamationCircle;
      break;
    case "success":
      intentColor = baseTheme.Colors.success.dil0;
      boxShadowColor = baseTheme.Colors.success.dil60;
      icon = IconCheck;
      break;
    case "warning":
      intentColor = baseTheme.Colors.warning.dil0;
      boxShadowColor = baseTheme.Colors.warning.dil60;
      icon = IconExclamation;
      break;
  }
  return {
    boxShadowColor,
    intentColor,
    borderRadius: baseTheme.BorderRadius,
    icon,
    background: baseTheme.Colors.background,
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
